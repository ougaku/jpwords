import * as SQLite from "expo-sqlite";
import type { Entitlement } from "../entitlement";
import { builtInLexicons, type AccessLevel, type BuiltInLexicon, type BuiltInWord } from "../data/freeLexicons";
import { createInitialProgress, type ProgressRecord } from "../srs";
import { localSchemaVersion, schemaSql } from "./schema";

export const VOCAB_BOOK_BUNDLE_SIZE = 30;

type Database = SQLite.SQLiteDatabase;

export type WordWithProgress = BuiltInWord & {
  lexiconTitle: string;
  access: AccessLevel;
  progress: ProgressRecord;
};

export type VocabBookReason = "forgotten" | "fuzzy" | "reveal" | "typo";

export type VocabBookEntry = {
  forgottenCount: number;
  fuzzyCount: number;
  revealCount: number;
  typoCount: number;
  lastReason: string;
  lastAddedAt: number;
  remembered: boolean;
  rememberedAt: number;
  bundleId: string;
  updatedAt: string;
};

export type VocabBookWord = WordWithProgress &
  VocabBookEntry & {
    vocabBookBundleId: string;
  };

export type VocabBookBundleSummary = {
  id: string;
  index: number;
  label: string;
  pendingCount: number;
  rememberedCount: number;
  totalCount: number;
  dateRangeStart: number;
  dateRangeEnd: number;
  words: VocabBookWord[];
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

export async function openLocalDatabase(): Promise<Database> {
  const db = await SQLite.openDatabaseAsync("jpwords.db");
  await migrateLocalDatabase(db);
  await seedBuiltInLexicons(db, builtInLexicons);
  await ensureDefaultProfile(db);
  await ensureVocabBundleAssignments(db, "default");
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

  await migrateProgressToProfiles(db);
  await migrateVocabBookFields(db);

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

async function migrateVocabBookFields(db: Database): Promise<void> {
  const columns = await db.getAllAsync<{ name: string }>("PRAGMA table_info(vocab_book)");
  if (!columns.length) return;
  const has = (name: string) => columns.some((column) => column.name === name);
  if (!has("last_added_at")) {
    await db.execAsync("ALTER TABLE vocab_book ADD COLUMN last_added_at INTEGER NOT NULL DEFAULT 0");
  }
  if (!has("remembered")) {
    await db.execAsync("ALTER TABLE vocab_book ADD COLUMN remembered INTEGER NOT NULL DEFAULT 0");
  }
  if (!has("remembered_at")) {
    await db.execAsync("ALTER TABLE vocab_book ADD COLUMN remembered_at INTEGER NOT NULL DEFAULT 0");
  }
  if (!has("bundle_id")) {
    await db.execAsync("ALTER TABLE vocab_book ADD COLUMN bundle_id TEXT NOT NULL DEFAULT ''");
    await db.execAsync("CREATE INDEX IF NOT EXISTS idx_vocab_book_bundle ON vocab_book(profile_id, bundle_id)");
  }
}

export async function ensureDefaultProfile(db: Database): Promise<Profile> {
  const now = new Date().toISOString();
  await db.runAsync(
    `INSERT OR IGNORE INTO profiles (id, nickname, created_at, updated_at)
     VALUES (?, ?, ?, ?)`,
    "默认学习者",
    "default",
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

function appendEntitlementFilter(
  whereClauses: string[],
  args: Array<string | number>,
  entitlement: Entitlement
): void {
  const unlocked = Array.from(entitlement.unlockedLexiconIds);
  if (!unlocked.length) {
    whereClauses.push("words.access = 'free'");
    return;
  }
  whereClauses.push(`(words.access = 'free' OR words.lexicon_id IN (${unlocked.map(() => "?").join(", ")}))`);
  args.push(...unlocked);
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

export async function listVocabBookBundleWords(
  db: Database,
  profileId: string,
  bundleId: string,
  entitlement: Entitlement,
  includeRemembered = false,
  now = new Date()
): Promise<VocabBookWord[]> {
  const whereClauses = ["vb.profile_id = ?", "vb.bundle_id = ?"];
  const args: Array<string | number> = [profileId, bundleId];
  if (!includeRemembered) whereClauses.push("vb.remembered = 0");
  appendEntitlementFilter(whereClauses, args, entitlement);

  const rows = await db.getAllAsync<VocabBookJoinedRow>(
    `SELECT
      vb.word_id,
      vb.forgotten_count,
      vb.fuzzy_count,
      vb.reveal_count,
      vb.typo_count,
      vb.last_reason,
      vb.last_added_at,
      vb.remembered,
      vb.remembered_at,
      vb.bundle_id,
      vb.updated_at AS vocab_updated_at,
      words.id,
      words.lexicon_id,
      words.japanese,
      words.kana,
      words.meaning,
      words.meaning_en,
      words.part,
      words.level,
      words.example,
      words.translation,
      words.tags_json,
      words.access,
      lexicons.title AS lexicon_title,
      progress.box,
      progress.correct_count,
      progress.wrong_count,
      progress.due_at,
      progress.last_result,
      progress.updated_at AS progress_updated_at
    FROM vocab_book vb
    JOIN words ON words.id = vb.word_id
    JOIN lexicons ON lexicons.id = words.lexicon_id
    JOIN progress ON progress.word_id = vb.word_id AND progress.profile_id = vb.profile_id
    WHERE ${whereClauses.join(" AND ")}
    ORDER BY vb.last_added_at DESC, vb.word_id DESC`,
    ...args
  );

  return rows.map((row) => mapVocabBookWordRow(row));
}

export async function listVocabBookBundleDueWords(
  db: Database,
  profileId: string,
  bundleId: string,
  entitlement: Entitlement,
  now = new Date()
): Promise<VocabBookWord[]> {
  const words = await listVocabBookBundleWords(db, profileId, bundleId, entitlement, false, now);
  return words.filter((word) => word.progress.dueAt <= now.toISOString());
}

export async function listVocabBookBundles(db: Database, profileId: string, entitlement: Entitlement): Promise<VocabBookBundleSummary[]> {
  const whereClauses = ["vb.profile_id = ?"];
  const args: Array<string | number> = [profileId];
  appendEntitlementFilter(whereClauses, args, entitlement);

  const rows = await db.getAllAsync<VocabBookJoinedRow>(
    `SELECT
      vb.word_id,
      vb.forgotten_count,
      vb.fuzzy_count,
      vb.reveal_count,
      vb.typo_count,
      vb.last_reason,
      vb.last_added_at,
      vb.remembered,
      vb.remembered_at,
      vb.bundle_id,
      vb.updated_at AS vocab_updated_at,
      words.id,
      words.lexicon_id,
      words.japanese,
      words.kana,
      words.meaning,
      words.meaning_en,
      words.part,
      words.level,
      words.example,
      words.translation,
      words.tags_json,
      words.access,
      lexicons.title AS lexicon_title,
      progress.box,
      progress.correct_count,
      progress.wrong_count,
      progress.due_at,
      progress.last_result,
      progress.updated_at AS progress_updated_at
    FROM vocab_book vb
    JOIN words ON words.id = vb.word_id
    JOIN lexicons ON lexicons.id = words.lexicon_id
    JOIN progress ON progress.word_id = vb.word_id AND progress.profile_id = vb.profile_id
    WHERE ${whereClauses.join(" AND ")}
    ORDER BY vb.bundle_id, vb.last_added_at DESC`,
    ...args
  );

  const byBundle = new Map<string, VocabBookWord[]>();
  for (const row of rows) {
    if (!row.bundle_id) continue;
    const list = byBundle.get(row.bundle_id) || [];
    list.push(mapVocabBookWordRow(row));
    byBundle.set(row.bundle_id, list);
  }

  return [...byBundle.entries()].map(([bundleId, words]) => {
      const match = /^vocab-book-(\d+)$/.exec(bundleId);
      const index = match ? Number(match[1]) + 1 : 1;
      const pendingCount = words.filter((word) => !word.remembered).length;
      const rememberedCount = words.length - pendingCount;
      const dateRangeValues = words
        .map((word) => Number(word.lastAddedAt || 0))
        .filter((value) => value > 0 && Number.isFinite(value));
      const rangeStart = dateRangeValues.length ? Math.min(...dateRangeValues) : 0;
      const rangeEnd = dateRangeValues.length ? Math.max(...dateRangeValues) : 0;
      return {
        id: bundleId,
        index,
        label: `\u8bcd\u5e93${index}`,
        pendingCount,
        rememberedCount,
        totalCount: words.length,
        dateRangeStart: rangeStart,
        dateRangeEnd: rangeEnd,
        words
      };
    })
    .filter((bundle) => bundle.totalCount > 0)
    .sort((left, right) => left.index - right.index);
}

export async function getVocabBookBundle(
  db: Database,
  profileId: string,
  bundleId: string,
  entitlement: Entitlement
): Promise<VocabBookBundleSummary | null> {
  const bundles = await listVocabBookBundles(db, profileId, entitlement);
  return bundles.find((bundle) => bundle.id === bundleId) || null;
}

export async function upsertVocabBookEntry(
  db: Database,
  profileId: string,
  wordId: string,
  patch: Partial<VocabBookEntry>
): Promise<VocabBookWord | null> {
  const current = await getVocabBookEntry(db, profileId, wordId);
  const normalized = normalizeVocabBookEntry(current ? { ...current, ...patch } : patch);
  const now = new Date().toISOString();
  await db.runAsync(
    `INSERT OR REPLACE INTO vocab_book
    (profile_id, word_id, forgotten_count, fuzzy_count, reveal_count, typo_count, last_reason, last_added_at, remembered, remembered_at, bundle_id, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    profileId,
    wordId,
    normalized.forgottenCount,
    normalized.fuzzyCount,
    normalized.revealCount,
    normalized.typoCount,
    normalized.lastReason,
    normalized.lastAddedAt,
    normalized.remembered ? 1 : 0,
    normalized.rememberedAt,
    normalized.bundleId,
    now
  );
  await ensureVocabBundleAssignments(db, profileId);
  return getVocabBookJoinedWord(db, profileId, wordId);
}

export async function recordVocabBook(db: Database, profileId: string, wordId: string, reason: VocabBookReason): Promise<void> {
  const current = normalizeVocabBookEntry((await getVocabBookEntry(db, profileId, wordId)) || { });
  const now = Date.now();
  if (reason === "forgotten" || reason === "reveal") current.forgottenCount += 1;
  if (reason === "fuzzy") current.fuzzyCount += 1;
  if (reason === "typo") current.typoCount += 1;
  current.lastReason = reason === "reveal" ? "forgotten" : reason;
  current.lastAddedAt = now;
  await upsertVocabBookEntry(db, profileId, wordId, current);
}

export async function rememberVocabWord(db: Database, profileId: string, wordId: string): Promise<VocabBookWord | null> {
  const current = await getVocabBookEntry(db, profileId, wordId);
  if (!current) return null;
  if (current.remembered) return getVocabBookJoinedWord(db, profileId, wordId);
  const updated = normalizeVocabBookEntry(current);
  updated.remembered = true;
  updated.rememberedAt = Date.now();
  await upsertVocabBookEntry(db, profileId, wordId, updated);
  await maybeFinalizeVocabBookBundle(db, profileId, updated.bundleId);
  return getVocabBookJoinedWord(db, profileId, wordId);
}

export async function maybeFinalizeVocabBookBundle(db: Database, profileId: string, bundleId: string): Promise<boolean> {
  const row = await db.getFirstAsync<{ pending_count: number }>(
    "SELECT COUNT(*) AS pending_count FROM vocab_book WHERE profile_id = ? AND bundle_id = ? AND remembered = 0",
    profileId,
    bundleId
  );
  if (!row || row.pending_count > 0) return false;
  await deleteVocabBookBundle(db, profileId, bundleId);
  return true;
}

export async function deleteVocabBookBundle(db: Database, profileId: string, bundleId: string): Promise<void> {
  await db.runAsync("DELETE FROM vocab_book WHERE profile_id = ? AND bundle_id = ?", profileId, bundleId);
}

export async function ensureVocabBundleAssignments(db: Database, profileId: string): Promise<void> {
  const nowIso = new Date().toISOString();
  const rows = await db.getAllAsync<VocabBookRawRow>(
    "SELECT word_id, bundle_id, last_added_at FROM vocab_book WHERE profile_id = ? ORDER BY last_added_at DESC, word_id DESC",
    profileId
  );
  if (!rows.length) return;

  const pending: VocabBookRawRow[] = [];
  const bundleCounts = new Map<number, number>();
  let maxBundleIndex = -1;
  for (const row of rows) {
    const bundleIndex = parseVocabBookBundleIndex(row.bundle_id);
    if (bundleIndex === null) {
      pending.push(row);
      continue;
    }
    const nextCount = (bundleCounts.get(bundleIndex) || 0) + 1;
    bundleCounts.set(bundleIndex, nextCount);
    maxBundleIndex = Math.max(maxBundleIndex, bundleIndex);
  }

  if (!pending.length) return;

  let currentBundleIndex = maxBundleIndex >= 0 ? maxBundleIndex : 0;
  let currentBundleCount = Math.min(bundleCounts.get(currentBundleIndex) || 0, VOCAB_BOOK_BUNDLE_SIZE);
  if (currentBundleCount >= VOCAB_BOOK_BUNDLE_SIZE) {
    currentBundleIndex += 1;
    currentBundleCount = 0;
  }
  const sortedPending = pending
    .slice()
    .sort((a, b) => Number(b.last_added_at || 0) - Number(a.last_added_at || 0) || b.word_id.localeCompare(a.word_id));

  for (const item of sortedPending) {
    if (currentBundleCount >= VOCAB_BOOK_BUNDLE_SIZE) {
      currentBundleIndex += 1;
      currentBundleCount = 0;
    }
    const bundleId = `vocab-book-${currentBundleIndex}`;
    currentBundleCount += 1;
    bundleCounts.set(currentBundleIndex, currentBundleCount);
    const nextLastAddedAt = Number(item.last_added_at || 0) > 0 ? Number(item.last_added_at) : Date.now();
    await db.runAsync(
      "UPDATE vocab_book SET bundle_id = ?, last_added_at = ?, updated_at = ? WHERE profile_id = ? AND word_id = ?",
      bundleId,
      nextLastAddedAt,
      nowIso,
      profileId,
      item.word_id
    );
  }
}

async function getVocabBookEntry(db: Database, profileId: string, wordId: string): Promise<VocabBookEntry | null> {
  const row = await db.getFirstAsync<VocabBookStoredRow>(
    "SELECT forgotten_count, fuzzy_count, reveal_count, typo_count, last_reason, last_added_at, remembered, remembered_at, bundle_id, updated_at FROM vocab_book WHERE profile_id = ? AND word_id = ?",
    profileId,
    wordId
  );
  if (!row) return null;
  return normalizeVocabBookEntry(row);
}

async function getVocabBookJoinedWord(db: Database, profileId: string, wordId: string): Promise<VocabBookWord | null> {
  const rows = await db.getAllAsync<VocabBookJoinedRow>(
    `SELECT
      vb.word_id,
      vb.forgotten_count,
      vb.fuzzy_count,
      vb.reveal_count,
      vb.typo_count,
      vb.last_reason,
      vb.last_added_at,
      vb.remembered,
      vb.remembered_at,
      vb.bundle_id,
      vb.updated_at AS vocab_updated_at,
      words.id,
      words.lexicon_id,
      words.japanese,
      words.kana,
      words.meaning,
      words.meaning_en,
      words.part,
      words.level,
      words.example,
      words.translation,
      words.tags_json,
      words.access,
      lexicons.title AS lexicon_title,
      progress.box,
      progress.correct_count,
      progress.wrong_count,
      progress.due_at,
      progress.last_result,
      progress.updated_at AS progress_updated_at
    FROM vocab_book vb
    JOIN words ON words.id = vb.word_id
    JOIN lexicons ON lexicons.id = words.lexicon_id
    JOIN progress ON progress.word_id = vb.word_id AND progress.profile_id = vb.profile_id
    WHERE vb.profile_id = ? AND vb.word_id = ?`,
    profileId,
    wordId
  );
  const word = rows[0];
  return word ? mapVocabBookWordRow(word) : null;
}

export async function clearVocabBookBundleSession(
  db: Database,
  profileId: string,
  bundleId: string,
  entitlement: Entitlement,
  now = new Date()
): Promise<void> {
  const words = await listVocabBookBundleWords(db, profileId, bundleId, entitlement, false, now);
  await db.withTransactionAsync(async () => {
    for (const word of words) {
      await upsertProgress(db, profileId, {
        ...word.progress,
        dueAt: now.toISOString(),
      });
    }
  });
}

function normalizeVocabBookEntry(item: Partial<VocabBookEntry> | VocabBookStoredRow): VocabBookEntry {
  const raw: Record<string, unknown> = item || {};
  return {
    forgottenCount: Number((raw.forgottenCount as number) || (raw.forgotten_count as number) || 0),
    fuzzyCount: Number((raw.fuzzyCount as number) || (raw.fuzzy_count as number) || 0),
    revealCount: Number((raw.revealCount as number) || (raw.reveal_count as number) || 0),
    typoCount: Number((raw.typoCount as number) || (raw.typo_count as number) || 0),
    lastReason: (raw.lastReason as string) || (raw.last_reason as string) || "",
    lastAddedAt: Number((raw.lastAddedAt as number) || (raw.last_added_at as number) || Date.now()),
    remembered: isRememberedValue((raw.remembered as boolean) || (raw.remembered as number)),
    rememberedAt: Number((raw.rememberedAt as number) || (raw.remembered_at as number) || 0),
    bundleId: (raw.bundleId as string) || (raw.bundle_id as string) || "",
    updatedAt: (raw.updatedAt as string) || (raw.updated_at as string) || new Date().toISOString()
  };
}

function isRememberedValue(value: VocabBookEntry["remembered"] | VocabBookStoredRow["remembered"] | undefined): boolean {
  if (typeof value === "boolean") return value;
  return value === 1;
}

function parseVocabBookBundleIndex(bundleId: string | null | undefined): number | null {
  const match = /^vocab-book-(\d+)$/.exec(bundleId || "");
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
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

type VocabBookStoredRow = {
  forgotten_count: number;
  fuzzy_count: number;
  reveal_count: number;
  typo_count: number;
  last_reason: string;
  last_added_at: number;
  remembered: number | boolean;
  remembered_at: number;
  bundle_id: string;
  updated_at: string;
};

type VocabBookRawRow = {
  word_id: string;
  bundle_id: string;
  last_added_at: number;
};

type VocabBookJoinedRow = {
  word_id: string;
  forgotten_count: number;
  fuzzy_count: number;
  reveal_count: number;
  typo_count: number;
  last_reason: string;
  last_added_at: number;
  remembered: number | boolean;
  remembered_at: number;
  bundle_id: string;
  vocab_updated_at: string;
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
  access: AccessLevel;
  lexicon_title: string;
  box: number;
  correct_count: number;
  wrong_count: number;
  due_at: string;
  last_result: ProgressRecord["lastResult"];
  progress_updated_at: string;
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
    tags: JSON.parse(row.tags_json || "[]") as string[],
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

function mapVocabBookWordRow(row: VocabBookJoinedRow): VocabBookWord {
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
    tags: JSON.parse(row.tags_json || "[]") as string[],
    lexiconTitle: row.lexicon_title,
    access: row.access,
    progress: {
      wordId: row.word_id,
      box: row.box,
      correctCount: row.correct_count,
      wrongCount: row.wrong_count,
      dueAt: row.due_at,
      lastResult: row.last_result,
      updatedAt: row.progress_updated_at
    },
    forgottenCount: Number(row.forgotten_count || 0),
    fuzzyCount: Number(row.fuzzy_count || 0),
    revealCount: Number(row.reveal_count || 0),
    typoCount: Number(row.typo_count || 0),
    lastReason: row.last_reason || "",
    lastAddedAt: Number(row.last_added_at || 0),
    remembered: Boolean(row.remembered),
    rememberedAt: Number(row.remembered_at || 0),
    vocabBookBundleId: row.bundle_id,
    bundleId: row.bundle_id,
    updatedAt: row.vocab_updated_at
  };
}
