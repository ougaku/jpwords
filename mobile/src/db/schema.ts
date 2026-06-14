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
  part TEXT NOT NULL,
  level TEXT NOT NULL,
  example TEXT NOT NULL,
  translation TEXT NOT NULL,
  tags_json TEXT NOT NULL,
  FOREIGN KEY (lexicon_id) REFERENCES lexicons(id)
);

CREATE TABLE IF NOT EXISTS progress (
  word_id TEXT PRIMARY KEY NOT NULL,
  box INTEGER NOT NULL,
  correct_count INTEGER NOT NULL,
  wrong_count INTEGER NOT NULL,
  due_at TEXT NOT NULL,
  last_result TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (word_id) REFERENCES words(id)
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_words_lexicon_id ON words(lexicon_id);
CREATE INDEX IF NOT EXISTS idx_progress_due_at ON progress(due_at);
`;

