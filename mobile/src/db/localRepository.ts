import * as SQLite from "expo-sqlite";
import type { Entitlement } from "../entitlement";
import { builtInLexicons, type AccessLevel, type BuiltInLexicon, type BuiltInWord } from "../data/freeLexicons";
import { createInitialProgress, type ProgressRecord } from "../srs";
import { localSchemaVersion, schemaSql } from "./schema";

export type WordWithProgress = BuiltInWord & {
  lexiconTitle: string;
  access: AccessLevel;
  progress: ProgressRecord;
};

export type Profile = {
  id: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
};

export type EntitlementRecord = {
  productId: string;
  lexiconId: string;
  source: "app_store" | "google_play" | "local";
  transactionId: string;
  unlockedAt: string;
};

type Database = SQLite.SQLiteDatabase;

export async function openLocalDatabase(): Promise<Database> {
  const db = await SQLite.openDatabaseAsync("jpwords.db");
  await migrateLocalDatabase(db);
  await seedBuiltInLexicons(db, builtInLexicons);
  return db;
}

async function migrateLocalDatabase(db: Database): Promise<void> {
  await db.execAsync(schemaSql);
  const row = await db.getFirstAsync<{ value: string }>("SELECT value FROM settings WHERE key = ?", "schema_version");
  const currentVersion = Number(row?.value || 1);
  if (currentVersion > localSchemaVersion) {
    throw new Error(`Unsupported local database schema version: ${currentVersion}`);
  }

  const wordColumns = await db.getAllAsync<{ name: string }>("PRAGMA table_info(words)");
  const hasMeaningEn = wordColumns.some((column) => column.name === "meaning_en");
  if (!hasMeaningEn) {
    await db.execAsync("ALTER TABLE words ADD COLUMN meaning_en TEXT NOT NULL DEFAULT ''");
  }

  await ensureDefaultProfile(db);
  await migrateProgressToProfiles(db);

  await db.runAsync(
    "INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)",
    "schema_version",
    String(localSchemaVersion)
  );
}

async function migrateProgressToProfiles(db: Database): Promise<void> {
  const columns = await db.getAllAsync<{ name: string }>("PRAGMA table_info(progress)");
  const hasProfileId = columns.some((column) => column.name === "profile_id");
  if (hasProfileId) return;

  await db.execAsync(`
    ALTER TABLE progress RENAME TO progress_legacy;
    CREATE TABLE progress (
      profile_id TEXT NOT NULL DEFAULT 'default',
      word_id TEXT NOT NULL,
      box INTEGER NOT NULL,
      correct_count INTEGER NOT NULL,
      wrong_count INTEGER NOT NULL,
      due_at TEXT NOT NULL,
      last_result TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      PRIMARY KEY (profile_id, word_id),
      FOREIGN KEY (profile_id) REFERENCES profiles(id),
      FOREIGN KEY (word_id) REFERENCES words(id)
    );
    INSERT OR REPLACE INTO progress
      (profile_id, word_id, box, correct_count, wrong_count, due_at, last_result, updated_at)
      SELECT 'default', word_id, box, correct_count, wrong_count, due_at, last_result, updated_at
      FROM progress_legacy;
    DROP TABLE progress_legacy;
    CREATE INDEX IF NOT EXISTS idx_progress_due_at ON progress(due_at);
    CREATE INDEX IF NOT EXISTS idx_progress_profile_due ON progress(profile_id, due_at);
  `);
}

export async function ensureDefaultProfile(db: Database): Promise<Profile> {
  const now = new Date().toISOString();
  await db.runAsync(
    `INSERT OR IGNORE INTO profiles (id, nickname, created_at, updated_at)
     VALUES (?, ?, ?, ?)`,
    "default",
    "默认学习者",
    now,
    now
  );
  const row = await db.getFirstAsync<ProfileRow>("SELECT id, nickname, created_at, updated_at FROM profiles WHERE id = ?", "default");
  if (!row) throw new Error("Default profile was not created");
  return mapProfile(row);
}

export async function seedBuiltInLexicons(db: Database, lexicons: BuiltInLexicon[]): Promise<void> {
  await db.withTransactionAsync(async () => {
    for (const lexicon of lexicons) {
      await db.runAsync(
        "INSERT OR REPLACE INTO lexicons (id, title, level, access, version, word_count) VALUES (?, ?, ?, ?, ?, ?)",
        lexicon.id,
        lexicon.title,
        lexicon.level,
        lexicon.access,
        lexicon.version,
        lexicon.words.length
      );

      for (const word of lexicon.words) {
        await db.runAsync(
          `INSERT OR REPLACE INTO words
          (id, lexicon_id, japanese, kana, meaning, meaning_en, part, level, example, translation, tags_json)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          word.id,
          word.lexiconId,
          word.japanese,
          word.kana,
          word.meaning,
          word.meaningEn,
          word.part,
          word.level,
          word.example,
          word.translation,
          JSON.stringify(word.tags)
        );

        const existing = await db.getFirstAsync<{ word_id: string }>(
          "SELECT word_id FROM progress WHERE profile_id = ? AND word_id = ?",
          "default",
          word.id
        );
        if (!existing) {
          await upsertProgress(db, "default", createInitialProgress(word.id));
        }
      }
    }
  });
}

export async function listLexicons(db: Database): Promise<Array<Omit<BuiltInLexicon, "words"> & { wordCount: number }>> {
  const rows = await db.getAllAsync<{
    id: string;
    title: string;
    level: string;
    access: AccessLevel;
    version: number;
    word_count: number;
  }>("SELECT id, title, level, access, version, word_count FROM lexicons ORDER BY access, level, title");

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    level: row.level,
    access: row.access,
    version: row.version,
    wordCount: row.word_count
  }));
}

export async function listEntitlements(db: Database): Promise<EntitlementRecord[]> {
  const rows = await db.getAllAsync<EntitlementRow>(
    "SELECT product_id, lexicon_id, source, transaction_id, unlocked_at FROM entitlements ORDER BY unlocked_at DESC"
  );
  return rows.map(mapEntitlement);
}

export async function upsertEntitlement(db: Database, record: EntitlementRecord): Promise<void> {
  await db.runAsync(
    `INSERT OR REPLACE INTO entitlements
     (product_id, lexicon_id, source, transaction_id, unlocked_at)
     VALUES (?, ?, ?, ?, ?)`,
    record.productId,
    record.lexiconId,
    record.source,
    record.transactionId,
    record.unlockedAt
  );
}

export async function listDueWords(
  db: Database,
  entitlement: Entitlement,
  profileId: string,
  lexiconId?: string,
  now = new Date()
): Promise<WordWithProgress[]> {
  return listWords(db, entitlement, profileId, lexiconId, true, now);
}

export async function listStudyWords(
  db: Database,
  entitlement: Entitlement,
  profileId: string,
  lexiconId?: string
): Promise<WordWithProgress[]> {
  return listWords(db, entitlement, profileId, lexiconId, false);
}

async function listWords(
  db: Database,
  entitlement: Entitlement,
  profileId: string,
  lexiconId: string | undefined,
  dueOnly: boolean,
  now = new Date()
): Promise<WordWithProgress[]> {
  const unlocked = Array.from(entitlement.unlockedLexiconIds);
  const paidClause = unlocked.length
    ? ` OR lexicons.id IN (${unlocked.map(() => "?").join(", ")})`
    : "";
  const dueClause = dueOnly ? " AND progress.due_at <= ?" : "";
  const args: Array<string | null> = [profileId];
  args.push(...unlocked);
  if (dueOnly) args.push(now.toISOString());
  args.push(lexiconId ?? null, lexiconId ?? null);

  const rows = await db.getAllAsync<WordRow>(
    `SELECT words.*, lexicons.title AS lexicon_title, lexicons.access, progress.*
     FROM words
     JOIN lexicons ON lexicons.id = words.lexicon_id
     JOIN progress ON progress.word_id = words.id AND progress.profile_id = ?
     WHERE (lexicons.access = 'free'${paidClause})${dueClause}
       AND (? IS NULL OR lexicons.id = ?)
     ORDER BY lexicons.access, lexicons.level, words.id
     LIMIT ${dueOnly ? 30 : 1000}`,
    ...args
  );

  return rows.map(mapWordRow);
}

export async function upsertProgress(db: Database, profileId: string, progress: ProgressRecord): Promise<void> {
  await db.runAsync(
    `INSERT OR REPLACE INTO progress
    (profile_id, word_id, box, correct_count, wrong_count, due_at, last_result, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    profileId,
    progress.wordId,
    progress.box,
    progress.correctCount,
    progress.wrongCount,
    progress.dueAt,
    progress.lastResult,
    progress.updatedAt
  );
}

type ProfileRow = {
  id: string;
  nickname: string;
  created_at: string;
  updated_at: string;
};

type EntitlementRow = {
  product_id: string;
  lexicon_id: string;
  source: EntitlementRecord["source"];
  transaction_id: string;
  unlocked_at: string;
};

type WordRow = {
  id: string;
  lexicon_id: string;
  japanese: string;
  kana: string;
  meaning: string;
  meaning_en: string;
  part: string;
  level: BuiltInWord["level"];
  example: string;
  translation: string;
  tags_json: string;
  lexicon_title: string;
  access: AccessLevel;
  word_id: string;
  box: number;
  correct_count: number;
  wrong_count: number;
  due_at: string;
  last_result: ProgressRecord["lastResult"];
  updated_at: string;
};

function mapProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    nickname: row.nickname,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapEntitlement(row: EntitlementRow): EntitlementRecord {
  return {
    productId: row.product_id,
    lexiconId: row.lexicon_id,
    source: row.source,
    transactionId: row.transaction_id,
    unlockedAt: row.unlocked_at
  };
}

function mapWordRow(row: WordRow): WordWithProgress {
  return {
    id: row.id,
    lexiconId: row.lexicon_id,
    japanese: row.japanese,
    kana: row.kana,
    meaning: row.meaning,
    meaningEn: row.meaning_en || row.meaning,
    part: row.part,
    level: row.level,
    example: row.example,
    translation: row.translation,
    tags: JSON.parse(row.tags_json) as string[],
    lexiconTitle: row.lexicon_title,
    access: row.access,
    progress: {
      wordId: row.word_id,
      box: row.box,
      correctCount: row.correct_count,
      wrongCount: row.wrong_count,
      dueAt: row.due_at,
      lastResult: row.last_result,
      updatedAt: row.updated_at
    }
  };
}
