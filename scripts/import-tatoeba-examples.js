const childProcess = require("child_process");
const fs = require("fs");
const https = require("https");
const OpenCC = require("opencc-js");
const path = require("path");
const readline = require("readline");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const cacheDir = path.join(root, ".cache", "tatoeba");
const reportPath = path.join(cacheDir, "n5-example-report.json");
const toSimplified = OpenCC.Converter({ from: "tw", to: "cn" });

const files = {
  jpnArchive: {
    url: "https://downloads.tatoeba.org/exports/per_language/jpn/jpn_sentences.tsv.bz2",
    archive: path.join(cacheDir, "jpn_sentences.tsv.bz2"),
    output: path.join(cacheDir, "jpn_sentences.tsv"),
  },
  cmnArchive: {
    url: "https://downloads.tatoeba.org/exports/per_language/cmn/cmn_sentences.tsv.bz2",
    archive: path.join(cacheDir, "cmn_sentences.tsv.bz2"),
    output: path.join(cacheDir, "cmn_sentences.tsv"),
  },
  linksArchive: {
    url: "https://downloads.tatoeba.org/exports/links.tar.bz2",
    archive: path.join(cacheDir, "links.tar.bz2"),
    output: path.join(cacheDir, "links.csv"),
  },
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function download(url, target) {
  if (fs.existsSync(target) && fs.statSync(target).size > 0) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(target);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        fs.unlinkSync(target);
        download(response.headers.location, target).then(resolve, reject);
        return;
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(target);
        reject(new Error(`Download failed ${response.statusCode}: ${url}`));
        return;
      }
      response.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", (error) => {
      file.close();
      if (fs.existsSync(target)) fs.unlinkSync(target);
      reject(error);
    });
  });
}

function runPython(script) {
  childProcess.execFileSync("python", ["-c", script], { stdio: "inherit" });
}

function bunzip(source, target) {
  if (fs.existsSync(target) && fs.statSync(target).size > 0) return;
  runPython(`
import bz2
import shutil
with bz2.open(r'''${source}''', 'rb') as src, open(r'''${target}''', 'wb') as dst:
    shutil.copyfileobj(src, dst)
`);
}

function extractSingleTarBz2(source, target) {
  if (fs.existsSync(target) && fs.statSync(target).size > 0) return;
  runPython(`
import tarfile
with tarfile.open(r'''${source}''', 'r:bz2') as tar:
    member = next(item for item in tar.getmembers() if item.isfile())
    extracted = tar.extractfile(member)
    with open(r'''${target}''', 'wb') as dst:
        dst.write(extracted.read())
`);
}

function readTsvMap(file) {
  const map = new Map();
  const text = fs.readFileSync(file, "utf8");
  text.split(/\r?\n/).forEach((line) => {
    if (!line) return;
    const [id, lang, ...rest] = line.split("\t");
    const sentence = rest.join("\t").trim();
    if (id && sentence) map.set(Number(id), sentence);
  });
  return map;
}

function loadN5Words() {
  const file = path.join(root, "data", "jlpt-n5-words.js");
  const code = fs.readFileSync(file, "utf8");
  const context = { window: { JpWordsData: {} } };
  vm.createContext(context);
  vm.runInContext(code, context, { filename: file });
  return context.window.JpWordsData.n5Words;
}

function sentenceLength(text) {
  return Array.from(String(text || "").replace(/\s+/g, "")).length;
}

function normalizeKana(value) {
  return String(value || "")
    .replace(/[ァ-ン]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0x60))
    .trim();
}

function hasKanji(value) {
  return /[一-龯]/.test(String(value || ""));
}

function cleanSentence(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function cleanChinese(value) {
  return toSimplified(cleanSentence(value));
}

function candidateVariants(word) {
  const variants = new Set();
  [word.japanese, word.kana, normalizeKana(word.japanese), normalizeKana(word.kana)].forEach((item) => {
    const text = cleanSentence(item).replace(/[〜~]/g, "");
    if (text && Array.from(text).length >= 2) variants.add(text);
  });
  if (hasKanji(word.japanese)) {
    variants.add(String(word.japanese).replace(/[うくすつぬぶむる]$/, ""));
  }
  return Array.from(variants).filter(Boolean);
}

function isJapaneseChar(char) {
  return /[ぁ-んァ-ン一-龯]/.test(char || "");
}

function containsVariant(sentence, variant) {
  if (!variant || !sentence.includes(variant)) return false;
  const variantLength = Array.from(variant).length;
  if (variantLength > 2 || /[ァ-ン]/.test(variant)) return true;
  let index = sentence.indexOf(variant);
  while (index !== -1) {
    const before = sentence[index - 1] || "";
    const after = sentence[index + variant.length] || "";
    if (hasKanji(variant)) {
      if (!/[一-龯]/.test(before) && !/[一-龯]/.test(after)) return true;
    } else if (!isJapaneseChar(before) && !isJapaneseChar(after)) {
      return true;
    }
    index = sentence.indexOf(variant, index + 1);
  }
  return false;
}

function isUsableJapaneseSentence(text) {
  const length = sentenceLength(text);
  if (length < 4 || length > 42) return false;
  if (!/[ぁ-んァ-ン一-龯]/.test(text)) return false;
  if (/[{}[\]<>]/.test(text)) return false;
  return true;
}

function isUsableChineseSentence(text) {
  const length = sentenceLength(text);
  if (length < 2 || length > 60) return false;
  if (!/[\u4e00-\u9fff]/.test(text)) return false;
  return true;
}

function translationFor(sentenceId, jpnToCmn) {
  const translations = jpnToCmn.get(sentenceId) || [];
  return translations
    .map(cleanChinese)
    .filter(isUsableChineseSentence)
    .sort((left, right) => sentenceLength(left) - sentenceLength(right))[0] || "";
}

function candidateScore(word, sentence, translation, variants) {
  const length = sentenceLength(sentence);
  let score = 100 - Math.abs(18 - Math.min(length, 36));
  if (translation) score += 60;
  if (word.japanese && sentence.includes(word.japanese)) score += 45;
  if (word.kana && sentence.includes(word.kana)) score += 20;
  const longest = variants.reduce((max, item) => Math.max(max, containsVariant(sentence, item) ? item.length : 0), 0);
  score += longest * 4;
  if (/[。！？]$/.test(sentence)) score += 8;
  if (length > 32) score -= 15;
  return score;
}

const manualExamples = {
  "〜回": ["この本を三回読みました。", "这本书读了三次。"],
  "〜階": ["教室は三階にあります。", "教室在三楼。"],
  "〜か月": ["日本に三か月います。", "在日本待三个月。"],
  "〜がります": ["弟は犬を怖がります。", "弟弟怕狗。"],
  "〜側": ["右側を歩いてください。", "请走右边。"],
  "〜語": ["日本語を勉強しています。", "正在学习日语。"],
  "〜個": ["りんごを三個買いました。", "买了三个苹果。"],
  "〜歳": ["妹は五歳です。", "妹妹五岁。"],
  "〜さん": ["田中さんは先生です。", "田中先生是老师。"],
  "〜時": ["三時に会いましょう。", "三点见吧。"],
  "〜時間": ["三時間勉強しました。", "学习了三个小时。"],
  "~週間": ["二週間休みます。", "休息两周。"],
  "〜人": ["田中さんは日本人です。", "田中先生是日本人。"],
  "〜過ぎ": ["七時過ぎに帰りました。", "七点多回来了。"],
  "〜ずつ": ["一つずつ取ってください。", "请一个一个拿。"],
  "〜台": ["車が二台あります。", "有两辆车。"],
  "~達": ["私達は学生です。", "我们是学生。"],
  "〜中": ["会議中です。", "正在开会。"],
  "〜度": ["もう一度言ってください。", "请再说一次。"],
  "〜など": ["本やノートなどを買いました。", "买了书和笔记本等。"],
  "〜日": ["十日に行きます。", "十号去。"],
  "〜年": ["来年日本へ行きます。", "明年去日本。"],
  "パーテイー": ["週末にパーティーがあります。", "周末有聚会。"],
  "〜はい": ["水を一杯ください。", "请给我一杯水。"],
  "〜半": ["三時半に来てください。", "请三点半来。"],
  "~番": ["一番前に座ります。", "坐在最前面。"],
  "〜匹": ["猫が二匹います。", "有两只猫。"],
  "〜分": ["五分待ってください。", "请等五分钟。"],
  "〜本": ["鉛筆を三本買いました。", "买了三支铅笔。"],
  "〜枚": ["紙を二枚ください。", "请给我两张纸。"],
  "〜前": ["駅の前で待っています。", "在车站前等。"],
  "〜屋": ["本屋で本を買いました。", "在书店买了书。"],
  "おおぜい": ["公園に大勢の人がいます。", "公园里有很多人。"],
  "ごろ": ["三時ごろに来てください。", "请三点左右来。"],
  "さす": ["雨の日は傘をさします。", "下雨天撑伞。"],
  "そば": ["駅のそばに店があります。", "车站旁边有商店。"],
  "なる": ["春になると暖かくなります。", "到了春天会变暖。"],
  "やる": ["宿題をやります。", "做作业。"],
  "れい": ["れいはゼロのことです。", "れい就是零。"],
  "〜人|〜じん": ["田中さんは日本人です。", "田中先生是日本人。"],
  "〜人|~にん": ["三人で行きます。", "三个人一起去。"],
};

function fallbackExample(word) {
  const direct = manualExamples[`${word.japanese}|${word.kana}`] || manualExamples[word.japanese] || manualExamples[word.kana];
  if (direct) return direct;
  return null;
}

async function buildTranslationLinks(linksFile, jpnSentences, cmnSentences) {
  const jpnToCmn = new Map();
  const lines = readline.createInterface({
    input: fs.createReadStream(linksFile, { encoding: "utf8" }),
    crlfDelay: Infinity,
  });
  for await (const line of lines) {
    if (!line) return;
    const [leftRaw, rightRaw] = line.split("\t");
    const left = Number(leftRaw);
    const right = Number(rightRaw);
    if (jpnSentences.has(left) && cmnSentences.has(right)) {
      if (!jpnToCmn.has(left)) jpnToCmn.set(left, []);
      jpnToCmn.get(left).push(cmnSentences.get(right));
    } else if (jpnSentences.has(right) && cmnSentences.has(left)) {
      if (!jpnToCmn.has(right)) jpnToCmn.set(right, []);
      jpnToCmn.get(right).push(cmnSentences.get(left));
    }
  }
  return jpnToCmn;
}

function pickExamples(words, jpnSentences, jpnToCmn) {
  const jpnList = Array.from(jpnSentences, ([id, text]) => ({ id, text: cleanSentence(text) })).filter((item) => isUsableJapaneseSentence(item.text));
  const report = {
    total: words.length,
    matched: 0,
    withTatoebaChinese: 0,
    generatedChinese: 0,
    missing: [],
    samples: [],
  };

  const nextWords = words.map((word) => {
    const variants = candidateVariants(word);
    const candidates = [];
    const firstChars = Array.from(new Set(variants.map((variant) => Array.from(variant)[0]).filter(Boolean)));
    jpnList.forEach((sentence) => {
      if (!firstChars.some((char) => sentence.text.includes(char))) return;
      if (!variants.some((variant) => containsVariant(sentence.text, variant))) return;
      const translation = translationFor(sentence.id, jpnToCmn);
      candidates.push({
        id: sentence.id,
        example: sentence.text,
        translation,
        score: candidateScore(word, sentence.text, translation, variants),
      });
    });
    candidates.sort((left, right) => right.score - left.score);
    const best = candidates[0];
    if (!best) {
      const fallback = fallbackExample(word);
      if (!fallback) {
        report.missing.push({ id: word.id, japanese: word.japanese, kana: word.kana, meaning: word.meaning });
        return { ...word, exampleSource: word.exampleSource || "", translationSource: word.translationSource || "" };
      }
      report.matched += 1;
      report.generatedChinese += 1;
      return {
        ...word,
        example: fallback[0],
        translation: fallback[1],
        exampleSource: "manual",
        translationSource: "manual",
      };
    }

    const translation = best.translation || `${word.meaning}。`;
    report.matched += 1;
    if (best.translation) report.withTatoebaChinese += 1;
    else report.generatedChinese += 1;
    if (report.samples.length < 20) {
      report.samples.push({ word: word.japanese, example: best.example, translation, score: best.score });
    }
    return {
      ...word,
      example: best.example,
      translation,
      exampleSource: "tatoeba",
      translationSource: best.translation ? "tatoeba" : "generated-zh",
    };
  });

  return { words: nextWords, report };
}

function writeWebWords(words) {
  const target = path.join(root, "data", "jlpt-n5-words.js");
  const body = [
    "// JLPT N5 vocabulary imported from Grimwald79/jlpt-n5-srs.",
    "// Word source license: MIT. Example source: Tatoeba CC BY 2.0 FR. See docs/data-sources.md.",
    "window.JpWordsData = window.JpWordsData || {};",
    `window.JpWordsData.n5Words = ${JSON.stringify(words, null, 2)};`,
    "",
  ].join("\n");
  fs.writeFileSync(target, body, "utf8");
}

function writeMobileWords(words) {
  const target = path.join(root, "mobile", "src", "data", "freeLexicons.ts");
  const mobileWords = words.map((word, index) => ({
    id: `n5-${String(index + 1).padStart(4, "0")}`,
    lexiconId: "jlpt-n5",
    japanese: word.japanese,
    kana: word.kana,
    meaning: word.meaning,
    meaningEn: word.meaningEn,
    part: word.part,
    level: word.level,
    example: word.example,
    translation: word.translation,
    exampleSource: word.exampleSource || "",
    translationSource: word.translationSource || "",
    tags: word.tags,
  }));
  const lexicons = [{
    id: "jlpt-n5",
    title: "JLPT N5 基础词库",
    level: "N5",
    access: "free",
    version: 3,
    words: mobileWords,
  }];
  const body = `export type AccessLevel = "free" | "paid";

export type BuiltInWord = {
  id: string;
  lexiconId: string;
  japanese: string;
  kana: string;
  meaning: string;
  meaningEn: string;
  part: string;
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  example: string;
  translation: string;
  exampleSource?: string;
  translationSource?: string;
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

export const builtInLexicons: BuiltInLexicon[] = ${JSON.stringify(lexicons, null, 2)};
`;
  fs.writeFileSync(target, body, "utf8");
}

async function main() {
  ensureDir(cacheDir);
  await Promise.all(Object.values(files).map((item) => download(item.url, item.archive)));
  bunzip(files.jpnArchive.archive, files.jpnArchive.output);
  bunzip(files.cmnArchive.archive, files.cmnArchive.output);
  extractSingleTarBz2(files.linksArchive.archive, files.linksArchive.output);

  const words = loadN5Words();
  const jpnSentences = readTsvMap(files.jpnArchive.output);
  const cmnSentences = readTsvMap(files.cmnArchive.output);
  const jpnToCmn = await buildTranslationLinks(files.linksArchive.output, jpnSentences, cmnSentences);
  const result = pickExamples(words, jpnSentences, jpnToCmn);

  writeWebWords(result.words);
  writeMobileWords(result.words);
  fs.writeFileSync(reportPath, `${JSON.stringify(result.report, null, 2)}\n`, "utf8");
  console.log(`Matched ${result.report.matched}/${result.report.total} N5 words.`);
  console.log(`Tatoeba Chinese translations: ${result.report.withTatoebaChinese}`);
  console.log(`Generated Chinese fallbacks: ${result.report.generatedChinese}`);
  console.log(`Missing examples: ${result.report.missing.length}`);
  console.log(`Report: ${reportPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
