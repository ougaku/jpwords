const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");

function loadWebWords() {
  const file = path.join(root, "data", "jlpt-n5-words.js");
  const context = { window: { JpWordsData: {} } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  return context.window.JpWordsData.n5Words || [];
}

function loadMobileLexicons() {
  const file = path.join(root, "mobile", "src", "data", "freeLexicons.ts");
  const text = fs.readFileSync(file, "utf8");
  const dataStart = text.indexOf("export const builtInLexicons");
  const dataCode = text
    .slice(dataStart)
    .replace("export const builtInLexicons: BuiltInLexicon[] =", "const builtInLexicons =")
    .replace(/;\s*$/, ";\nthis.builtInLexicons = builtInLexicons;");
  const context = {};
  vm.createContext(context);
  vm.runInContext(dataCode, context, { filename: file });
  return context.builtInLexicons || [];
}

function hasMojibake(value) {
  return /縺|繧|譁|蝠|荳|蜊|謖|隸|髞|鬚|蜈|莨|邂|螳|遑|邱|霑|蠕/.test(String(value || ""));
}

function summarizeWords(words) {
  const summary = {
    total: words.length,
    missingMeaning: 0,
    missingMeaningEn: 0,
    missingPart: 0,
    missingExample: 0,
    missingTranslation: 0,
    possibleMojibake: 0,
    duplicateIds: 0
  };
  const seen = new Set();

  words.forEach((word) => {
    if (!String(word.meaning || "").trim()) summary.missingMeaning += 1;
    if (!String(word.meaningEn || "").trim()) summary.missingMeaningEn += 1;
    if (!String(word.part || "").trim()) summary.missingPart += 1;
    if (!String(word.example || "").trim()) summary.missingExample += 1;
    if (!String(word.translation || "").trim()) summary.missingTranslation += 1;
    if (hasMojibake(word.japanese) || hasMojibake(word.kana) || hasMojibake(word.meaning) || hasMojibake(word.part)) {
      summary.possibleMojibake += 1;
    }
    if (seen.has(String(word.id))) summary.duplicateIds += 1;
    seen.add(String(word.id));
  });

  return summary;
}

const webN5 = loadWebWords();
const mobileLexicons = loadMobileLexicons();
const mobileWords = mobileLexicons.flatMap((lexicon) => lexicon.words || []);

const report = {
  webN5: summarizeWords(webN5),
  mobile: summarizeWords(mobileWords),
  mobileLexicons: mobileLexicons.map((lexicon) => ({
    id: lexicon.id,
    title: lexicon.title,
    access: lexicon.access,
    words: lexicon.words?.length || 0,
    quality: summarizeWords(lexicon.words || [])
  }))
};

console.log(JSON.stringify(report, null, 2));
