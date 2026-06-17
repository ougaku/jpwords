const fs = require("fs");
const path = require("path");

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/import-n5-vocab.js <JLPT_N5_Vocab.csv>");
  process.exit(1);
}

const root = path.resolve(__dirname, "..");
const webDataPath = path.join(root, "data", "jlpt-n5-words.js");
const mobileDataPath = path.join(root, "mobile", "src", "data", "freeLexicons.ts");

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current);
  return values.map((value) => value.trim());
}

function primaryKana(value) {
  return value.split(/[／/]/)[0].trim();
}

function stableId(index) {
  return 5000 + index;
}

function toWord(row, index) {
  const [kanji, furigana, romaji, meaning] = row;
  const kana = primaryKana(furigana);
  const surface = (kanji || kana).trim();

  return {
    id: stableId(index),
    japanese: surface,
    kana,
    meaning: meaning.trim(),
    part: "词汇",
    level: "N5",
    example: "",
    translation: "",
    tags: ["JLPT", "N5", "MIT数据", romaji.trim()].filter(Boolean),
    status: "published",
    version: 1,
    access: "free",
  };
}

function parseWords(csv) {
  const words = [];
  const seen = new Set();
  const lines = csv.replace(/^\uFEFF/, "").split(/\r?\n/);

  for (const line of lines) {
    if (!line.trim()) continue;
    const row = parseCsvLine(line);
    if (row.length < 4) continue;
    if (row[0] === "Kanji" && row[1] === "Furigana") continue;
    if (!row[1] || !row[3]) continue;

    const key = `${row[0]}|${row[1]}|${row[3]}`;
    if (seen.has(key)) continue;
    seen.add(key);
    words.push(toWord(row, words.length + 1));
  }

  return words;
}

function writeWebData(words) {
  fs.mkdirSync(path.dirname(webDataPath), { recursive: true });
  const body = JSON.stringify(words, null, 2);
  fs.writeFileSync(
    webDataPath,
    [
      "// JLPT N5 vocabulary imported from Grimwald79/jlpt-n5-srs.",
      "// Source license: MIT. See docs/data-sources.md.",
      "window.JpWordsData = window.JpWordsData || {};",
      `window.JpWordsData.n5Words = ${body};`,
      "",
    ].join("\n"),
    "utf8",
  );
}

function writeMobileData(words) {
  const mobileWords = words.map((word) => ({
    id: `n5-${String(word.id - 5000).padStart(4, "0")}`,
    lexiconId: "jlpt-n5",
    japanese: word.japanese,
    kana: word.kana,
    meaning: word.meaning,
    part: word.part,
    level: word.level,
    example: word.example,
    translation: word.translation,
    tags: word.tags,
  }));

  const body = JSON.stringify(mobileWords, null, 6).replace(/\n/g, "\n      ");
  fs.writeFileSync(
    mobileDataPath,
    `export type AccessLevel = "free" | "paid";

export type BuiltInWord = {
  id: string;
  lexiconId: string;
  japanese: string;
  kana: string;
  meaning: string;
  part: string;
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  example: string;
  translation: string;
  tags: string[];
};

export type BuiltInLexicon = {
  id: string;
  title: string;
  level: string;
  access: AccessLevel;
  version: number;
  words: BuiltInWord[];
};

export const builtInLexicons: BuiltInLexicon[] = [
  {
    id: "jlpt-n5",
    title: "JLPT N5 基础词库",
    level: "N5",
    access: "free",
    version: 2,
    words: ${body}
  },
  {
    id: "daily-n4-starter",
    title: "N4 日常高频词",
    level: "N4",
    access: "free",
    version: 1,
    words: [
      {
        id: "n4-0001",
        lexiconId: "daily-n4-starter",
        japanese: "アルバイト",
        kana: "あるばいと",
        meaning: "兼职；打工",
        part: "名词・する动词",
        level: "N4",
        example: "週末にアルバイトをしています。",
        translation: "周末在打工。",
        tags: ["日常", "生活"]
      }
    ]
  },
  {
    id: "business-japanese",
    title: "商务日语高频表达",
    level: "N3-N2",
    access: "paid",
    version: 1,
    words: [
      {
        id: "biz-0001",
        lexiconId: "business-japanese",
        japanese: "申請",
        kana: "しんせい",
        meaning: "申请",
        part: "名词・する动词",
        level: "N3",
        example: "ビザを申請しました。",
        translation: "申请了签证。",
        tags: ["商务", "手续"]
      }
    ]
  }
];
`,
    "utf8",
  );
}

const csv = fs.readFileSync(inputPath, "utf8");
const words = parseWords(csv);
writeWebData(words);
writeMobileData(words);
console.log(`Imported ${words.length} N5 words`);
