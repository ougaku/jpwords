import type { Entitlement } from "../entitlement";
import { builtInLexicons, type AccessLevel, type BuiltInLexicon, type BuiltInWord } from "../data/freeLexicons";
import { createInitialProgress, type ProgressRecord } from "../srs";

export const VOCAB_BOOK_BUNDLE_SIZE = 30;

type Database = { web: true };

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

const profile: Profile = {
  id: "default",
  nickname: "默认学习者",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const progress = new Map<string, ProgressRecord>();
const settings = new Map<string, string>();
const vocabBook = new Map<string, VocabBookEntry>();
const entitlements: EntitlementRecord[] = [];

export async function openLocalDatabase(): Promise<Database> {
  for (const lexicon of builtInLexicons) {
    for (const word of lexicon.words) {
      if (!progress.has(word.id)) progress.set(word.id, createInitialProgress(word.id));
    }
  }
  return { web: true };
}

export async function ensureDefaultProfile(): Promise<Profile> {
  return profile;
}

export async function listLexicons(): Promise<Array<Omit<BuiltInLexicon, "words"> & { wordCount: number }>> {
  return builtInLexicons.map(({ words, ...lexicon }) => ({ ...lexicon, wordCount: words.length }));
}

export async function listEntitlements(): Promise<EntitlementRecord[]> {
  return entitlements;
}

export async function upsertEntitlement(_db: Database, record: EntitlementRecord): Promise<void> {
  const index = entitlements.findIndex((item) => item.transactionId === record.transactionId);
  if (index >= 0) entitlements[index] = record;
  else entitlements.push(record);
}

export async function getSetting(_db: Database, key: string): Promise<string | null> {
  return settings.get(key) ?? null;
}

export async function setSetting(_db: Database, key: string, value: string): Promise<void> {
  settings.set(key, value);
}

export async function listDueWords(
  _db: Database,
  entitlement: Entitlement,
  _profileId: string,
  lexiconId?: string
): Promise<WordWithProgress[]> {
  return wordsFor(entitlement, lexiconId).slice(0, 20);
}

export async function listStudyWords(
  _db: Database,
  entitlement: Entitlement,
  _profileId: string,
  lexiconId?: string
): Promise<WordWithProgress[]> {
  return wordsFor(entitlement, lexiconId);
}

export async function upsertProgress(_db: Database, _profileId: string, record: ProgressRecord): Promise<void> {
  progress.set(record.wordId, record);
}

export async function recordVocabBook(
  _db: Database,
  _profileId: string,
  wordId: string,
  reason: VocabBookReason
): Promise<void> {
  const now = Date.now();
  const current = vocabBook.get(wordId) || emptyVocabEntry();
  const next: VocabBookEntry = {
    ...current,
    forgottenCount: current.forgottenCount + (reason === "forgotten" ? 1 : 0),
    fuzzyCount: current.fuzzyCount + (reason === "fuzzy" ? 1 : 0),
    revealCount: current.revealCount + (reason === "reveal" ? 1 : 0),
    typoCount: current.typoCount + (reason === "typo" ? 1 : 0),
    lastReason: reason,
    lastAddedAt: now,
    bundleId: current.bundleId || "bundle-1",
    updatedAt: new Date(now).toISOString()
  };
  vocabBook.set(wordId, next);
}

export async function listVocabBookBundles(
  _db: Database,
  _profileId: string,
  entitlement: Entitlement
): Promise<VocabBookBundleSummary[]> {
  const words = vocabWords(entitlement);
  if (!words.length) return [];
  return [bundleFromWords("bundle-1", 1, "生词1", words)];
}

export async function listVocabBookBundleWords(
  _db: Database,
  _profileId: string,
  _bundleId: string,
  entitlement: Entitlement
): Promise<VocabBookWord[]> {
  return vocabWords(entitlement);
}

export async function rememberVocabWord(_db: Database, _profileId: string, wordId: string): Promise<boolean> {
  const current = vocabBook.get(wordId);
  if (!current) return false;
  vocabBook.set(wordId, { ...current, remembered: true, rememberedAt: Date.now() });
  return true;
}

export async function deleteVocabBookBundle(): Promise<void> {
  vocabBook.clear();
}

export async function clearVocabBookBundleSession(): Promise<void> {
  return;
}

function wordsFor(entitlement: Entitlement, lexiconId?: string): WordWithProgress[] {
  return builtInLexicons
    .filter((lexicon) => !lexiconId || lexicon.id === lexiconId)
    .filter((lexicon) => lexicon.access === "free" || entitlement.unlockedLexiconIds.has(lexicon.id))
    .flatMap((lexicon) =>
      lexicon.words.map((word) => ({
        ...word,
        lexiconTitle: lexicon.title,
        access: lexicon.access,
        progress: progress.get(word.id) || createInitialProgress(word.id)
      }))
    );
}

function vocabWords(entitlement: Entitlement): VocabBookWord[] {
  const allWords = new Map(wordsFor(entitlement).map((word) => [word.id, word]));
  return Array.from(vocabBook.entries())
    .map(([wordId, entry]) => {
      const word = allWords.get(wordId);
      return word ? { ...word, ...entry, vocabBookBundleId: entry.bundleId || "bundle-1" } : null;
    })
    .filter((word): word is VocabBookWord => !!word);
}

function bundleFromWords(id: string, index: number, label: string, words: VocabBookWord[]): VocabBookBundleSummary {
  const pending = words.filter((word) => !word.remembered);
  const dates = words.map((word) => word.lastAddedAt).filter(Boolean);
  return {
    id,
    index,
    label,
    pendingCount: pending.length,
    rememberedCount: words.length - pending.length,
    totalCount: words.length,
    dateRangeStart: dates.length ? Math.min(...dates) : 0,
    dateRangeEnd: dates.length ? Math.max(...dates) : 0,
    words
  };
}

function emptyVocabEntry(): VocabBookEntry {
  return {
    forgottenCount: 0,
    fuzzyCount: 0,
    revealCount: 0,
    typoCount: 0,
    lastReason: "",
    lastAddedAt: 0,
    remembered: false,
    rememberedAt: 0,
    bundleId: "",
    updatedAt: new Date().toISOString()
  };
}
