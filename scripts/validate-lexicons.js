const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const errors = [];

function fail(message) {
  errors.push(message);
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
}

function validateWebN5() {
  const file = path.join(root, "data", "jlpt-n5-words.js");
  const code = fs.readFileSync(file, "utf8");
  const context = { window: { JpWordsData: {} } };
  vm.createContext(context);
  vm.runInContext(code, context, { filename: file });

  const words = context.window.JpWordsData.n5Words;
  if (!Array.isArray(words)) {
    fail("data/jlpt-n5-words.js: window.JpWordsData.n5Words is not an array");
    return;
  }

  const seenIds = new Set();
  words.forEach((word) => validateWord(word, "data/jlpt-n5-words.js", seenIds));
}

function validateMobileLexicons() {
  const file = path.join(root, "mobile", "src", "data", "freeLexicons.ts");
  const text = fs.readFileSync(file, "utf8");
  const blocks = text.match(/\{\s*id:\s*"[^"]+"[\s\S]*?tags:\s*\[[\s\S]*?\]\s*\}/g) || [];
  const seenIds = new Set();

  blocks.forEach((block) => {
    const id = block.match(/id:\s*"([^"]+)"/)?.[1];
    if (!id) return;
    const fields = ["japanese", "kana", "meaning", "meaningEn", "part", "level"];
    fields.forEach((field) => {
      if (!new RegExp(`${field}:\\s*"[^"]+"`).test(block)) {
        fail(`mobile/src/data/freeLexicons.ts: missing ${field} on word ${id}`);
      }
    });
    if (seenIds.has(id)) fail(`mobile/src/data/freeLexicons.ts: duplicate word id ${id}`);
    seenIds.add(id);
  });
}

validateWebN5();
validateMobileLexicons();

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Lexicon validation passed.");
