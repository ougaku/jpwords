export const localSchemaVersion = 4;

export const schemaSql = `
CREATE TABLE IF NOT EXISTS lexicons (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  level TEXT NOT NULL,
  access TEXT NOT NULL,
  version INTEGER NOT NULL,
  word_count INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS words (
  id TEXT PRIMARY KEY NOT NULL,
  lexicon_id TEXT NOT NULL,
  japanese TEXT NOT NULL,
  kana TEXT NOT NULL,
  meaning TEXT NOT NULL,
  meaning_en TEXT NOT NULL DEFAULT '',
  part TEXT NOT NULL,
  level TEXT NOT NULL,
  example TEXT NOT NULL,
  translation TEXT NOT NULL,
  tags_json TEXT NOT NULL,
  FOREIGN KEY (lexicon_id) REFERENCES lexicons(id)
);

CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY NOT NULL,
  nickname TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS progress (
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

CREATE TABLE IF NOT EXISTS entitlements (
  product_id TEXT PRIMARY KEY NOT NULL,
  lexicon_id TEXT NOT NULL,
  source TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  unlocked_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS vocab_book (
  profile_id TEXT NOT NULL DEFAULT 'default',
  word_id TEXT NOT NULL,
  forgotten_count INTEGER NOT NULL DEFAULT 0,
  fuzzy_count INTEGER NOT NULL DEFAULT 0,
  reveal_count INTEGER NOT NULL DEFAULT 0,
  typo_count INTEGER NOT NULL DEFAULT 0,
  last_reason TEXT NOT NULL DEFAULT '',
  last_added_at INTEGER NOT NULL DEFAULT 0,
  remembered INTEGER NOT NULL DEFAULT 0,
  remembered_at INTEGER NOT NULL DEFAULT 0,
  bundle_id TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL,
  PRIMARY KEY (profile_id, word_id),
  FOREIGN KEY (profile_id) REFERENCES profiles(id),
  FOREIGN KEY (word_id) REFERENCES words(id)
);

CREATE INDEX IF NOT EXISTS idx_words_lexicon_id ON words(lexicon_id);
CREATE INDEX IF NOT EXISTS idx_progress_due_at ON progress(due_at);
CREATE INDEX IF NOT EXISTS idx_progress_profile_due ON progress(profile_id, due_at);
CREATE INDEX IF NOT EXISTS idx_entitlements_lexicon_id ON entitlements(lexicon_id);
CREATE INDEX IF NOT EXISTS idx_vocab_book_profile ON vocab_book(profile_id);
CREATE INDEX IF NOT EXISTS idx_vocab_book_bundle ON vocab_book(profile_id, bundle_id);
`;
