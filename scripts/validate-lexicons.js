const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const errors = [];
const warnings = [];
const strictQuality = process.env.STRICT_LEXICON_QUALITY === "1";
const validLevels = new Set(["N5", "N4", "N3", "N2", "N1"]);
const validAccess = new Set(["free", "paid", "member"]);
const validStatus = new Set(["draft", "review", "published", "archived"]);

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function validateWord(word, source, seenIds) {
  const required = ["id", "japanese", "kana", "meaning", "meaningEn", "part", "level"];
  required.forEach((field) => {
    if (word[field] === undefined || word[field] === null || String(word[field]).trim() === "") {
      fail(`${source}: missing ${field} on word ${word.id || "(no id)"}`);
    }
  });

  if (seenIds.has(String(word.id))) {
    fail(`${source}: duplicate word id ${word.id}`);
  }
  seenIds.add(String(word.id));

  if (word.level && !validLevels.has(String(word.level))) {
    fail(`${source}: invalid level ${word.level} on word ${word.id}`);
  }

  if (word.access && !validAccess.has(String(word.access))) {
    fail(`${source}: invalid access ${word.access} on word ${word.id}`);
  }

  if (word.status && !validStatus.has(String(word.status))) {
    fail(`${source}: invalid status ${word.status} on word ${word.id}`);
  }

  if (!/[ぁ-んァ-ン一-龯]/.test(String(word.kana || ""))) {
    warn(`${source}: kana may not contain Japanese text on word ${word.id}`);
  }

  if (hasMojibake(word.japanese) || hasMojibake(word.kana) || hasMojibake(word.meaning) || hasMojibake(word.part)) {
    warn(`${source}: possible mojibake on word ${word.id}`);
  }

  if (!String(word.example || "").trim() || !String(word.translation || "").trim()) {
    warn(`${source}: missing example or translation on word ${word.id}`);
  }
}

function hasMojibake(value) {
  return /縺|繧|譁|蝠|荳|蜊|謖|隸|髞|鬚|蜈|莨|邂|螳|遑|邱|霑|蠕/.test(String(value || ""));
}

function validateWebLexicon(fileName, dataKey) {
  const file = path.join(root, "data", fileName);
  const code = fs.readFileSync(file, "utf8");
  const context = { window: { JpWordsData: {} } };
  vm.createContext(context);
  vm.runInContext(code, context, { filename: file });

  const words = context.window.JpWordsData[dataKey];
  if (!Array.isArray(words)) {
    fail(`data/${fileName}: window.JpWordsData.${dataKey} is not an array`);
    return;
  }

  const seenIds = new Set();
  words.forEach((word) => validateWord(word, `data/${fileName}`, seenIds));
}

function validateMobileLexicons() {
  const file = path.join(root, "mobile", "src", "data", "freeLexicons.ts");
  const text = fs.readFileSync(file, "utf8");
  const dataStart = text.indexOf("export const builtInLexicons");
  if (dataStart === -1) {
    fail("mobile/src/data/freeLexicons.ts: builtInLexicons export not found");
    return;
  }

  const dataCode = text
    .slice(dataStart)
    .replace("export const builtInLexicons: BuiltInLexicon[] =", "const builtInLexicons =")
    .replace(/;\s*$/, ";\nthis.builtInLexicons = builtInLexicons;");
  const context = {};
  vm.createContext(context);
  vm.runInContext(dataCode, context, { filename: file });

  const lexicons = context.builtInLexicons;
  if (!Array.isArray(lexicons)) {
    fail("mobile/src/data/freeLexicons.ts: builtInLexicons is not an array");
    return;
  }

  const seenIds = new Set();

  lexicons.forEach((lexicon) => {
    if (!Array.isArray(lexicon.words)) {
      fail(`mobile/src/data/freeLexicons.ts: words is not an array on lexicon ${lexicon.id}`);
      return;
    }

    lexicon.words.forEach((word) => {
      validateWord(word, "mobile/src/data/freeLexicons.ts", seenIds);
      if (word.lexiconId !== lexicon.id) {
        fail(`mobile/src/data/freeLexicons.ts: word ${word.id} lexiconId does not match ${lexicon.id}`);
      }
    });
  });
}

validateWebLexicon("jlpt-n5-words.js", "n5Words");
validateWebLexicon("jlpt-n4-words.js", "n4Words");
validateMobileLexicons();

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

if (warnings.length) {
  console.warn(`Lexicon quality warnings: ${warnings.length}`);
  warnings.slice(0, 20).forEach((message) => console.warn(`- ${message}`));
  if (warnings.length > 20) console.warn(`- ...and ${warnings.length - 20} more`);
  if (strictQuality) process.exit(1);
}

console.log("Lexicon validation passed.");
