import * as SQLite from "expo-sqlite";
import { builtInLexicons, type AccessLevel, type BuiltInLexicon, type BuiltInWord } from "../data/freeLexicons";
import { createInitialProgress, type ProgressRecord } from "../srs";
import { schemaSql } from "./schema";

export type WordWithProgress = BuiltInWord & {
  lexiconTitle: string;
  access: AccessLevel;
  progress: ProgressRecord;
};

type Database = SQLite.SQLiteDatabase;

export async function openLocalDatabase(): Promise<Database> {
  const db = await SQLite.openDatabaseAsync("jpwords.db");
  await db.execAsync(schemaSql);
  await seedBuiltInLexicons(db, builtInLexicons);
  return db;
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
          (id, lexicon_id, japanese, kana, meaning, part, level, example, translation, tags_json)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          word.id,
          word.lexiconId,
          word.japanese,
          word.kana,
          word.meaning,
          word.part,
          word.level,
          word.example,
          word.translation,
          JSON.stringify(word.tags)
        );

        const existing = await db.getFirstAsync<{ word_id: string }>("SELECT word_id FROM progress WHERE word_id = ?", word.id);
        if (!existing) {
          await upsertProgress(db, createInitialProgress(word.id));
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

export async function listDueWords(db: Database, includePaid: boolean, now = new Date()): Promise<WordWithProgress[]> {
  const rows = await db.getAllAsync<WordRow>(
    `SELECT words.*, lexicons.title AS lexicon_title, lexicons.access, progress.*
     FROM words
     JOIN lexicons ON lexicons.id = words.lexicon_id
     JOIN progress ON progress.word_id = words.id
     WHERE progress.due_at <= ? AND (? = 1 OR lexicons.access = 'free')
     ORDER BY progress.updated_at ASC
     LIMIT 30`,
    now.toISOString(),
    includePaid ? 1 : 0
  );

  return rows.map(mapWordRow);
}

export async function upsertProgress(db: Database, progress: ProgressRecord): Promise<void> {
  await db.runAsync(
    `INSERT OR REPLACE INTO progress
    (word_id, box, correct_count, wrong_count, due_at, last_result, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    progress.wordId,
    progress.box,
    progress.correctCount,
    progress.wrongCount,
    progress.dueAt,
    progress.lastResult,
    progress.updatedAt
  );
}

type WordRow = {
  id: string;
  lexicon_id: string;
  japanese: string;
  kana: string;
  meaning: string;
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

function mapWordRow(row: WordRow): WordWithProgress {
  return {
    id: row.id,
    lexiconId: row.lexicon_id,
    japanese: row.japanese,
    kana: row.kana,
    meaning: row.meaning,
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

