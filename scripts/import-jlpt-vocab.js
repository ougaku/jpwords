const fs = require("fs");
const path = require("path");
const readline = require("readline");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const levelArg = (process.argv.find((arg) => arg.startsWith("--level=")) || "--level=N4").split("=")[1].toUpperCase();
const level = levelArg;
const lowerLevel = level.toLowerCase();
const lexiconId = `jlpt-${lowerLevel}`;
const access = "free";

const dataFile = path.join(root, "data", `jlpt-${lowerLevel}-words.js`);
const mobileFile = path.join(root, "mobile", "src", "data", "freeLexicons.ts");
const tatoebaDir = path.join(root, ".cache", "tatoeba");

const partMap = new Map([
  ["Noun", "名词"],
  ["Noun, used as a suffix", "后缀名词"],
  ["Noun, used as a prefix", "前缀名词"],
  ["Pronoun", "代词"],
  ["Expression", "表达"],
  ["Adverb", "副词"],
  ["Adverb taking the 'to' particle", "副词"],
  ["Adjective (i)", "形容词"],
  ["Na-adjective (keiyodoshi)", "な形容词"],
  ["No-adjective", "の形容词"],
  ["Pre-noun adjectival (rentaishi)", "连体词"],
  ["Ichidan verb", "一段动词"],
  ["Godan verb with 'u' ending", "五段动词"],
  ["Godan verb with 'ku' ending", "五段动词"],
  ["Godan verb with 'gu' ending", "五段动词"],
  ["Godan verb with 'su' ending", "五段动词"],
  ["Godan verb with 'tsu' ending", "五段动词"],
  ["Godan verb with 'nu' ending", "五段动词"],
  ["Godan verb with 'bu' ending", "五段动词"],
  ["Godan verb with 'mu' ending", "五段动词"],
  ["Godan verb with 'ru' ending", "五段动词"],
  ["Suru verb", "する动词"],
  ["Kuru verb - special class", "くる动词"],
  ["Transitive verb", "他动词"],
  ["Intransitive verb", "自动词"],
  ["Auxiliary verb", "助动词"],
  ["Auxiliary adjective", "辅助形容词"],
  ["Particle", "助词"],
  ["Conjunction", "接续词"],
  ["Interjection", "感叹词"],
  ["Counter", "量词"],
  ["Numeric", "数词"],
  ["Prefix", "前缀"],
  ["Suffix", "后缀"],
]);

const definitionMap = [
  ["circumference", "周围"],
  ["surroundings", "周围"],
  ["neighbourhood", "附近"],
  ["neighborhood", "附近"],
  ["vicinity", "附近"],
  ["people surrounding oneself", "周围的人"],
  ["surrounding circumstances", "周围情况"],
  ["to remain", "剩下"],
  ["to be left", "留下"],
  ["to save", "保存"],
  ["to reserve", "预留"],
  ["to decide", "决定"],
  ["to determine", "决定"],
  ["to be decided", "被决定"],
  ["to be fixed", "固定"],
  ["to arrive", "到达"],
  ["to reach", "到达"],
  ["to attend", "出席"],
  ["to contact", "联系"],
  ["to inform", "通知"],
  ["to tell", "告诉"],
  ["to say", "说"],
  ["to speak", "说话"],
  ["to talk", "交谈"],
  ["to ask", "询问"],
  ["to answer", "回答"],
  ["to reply", "回复"],
  ["to think", "思考"],
  ["to believe", "相信"],
  ["to know", "知道"],
  ["to understand", "理解"],
  ["to remember", "记住"],
  ["to forget", "忘记"],
  ["to learn", "学习"],
  ["to study", "学习"],
  ["to teach", "教"],
  ["to explain", "说明"],
  ["to read", "读"],
  ["to write", "写"],
  ["to draw", "画"],
  ["to watch", "看"],
  ["to see", "看见"],
  ["to look", "看"],
  ["to listen", "听"],
  ["to hear", "听见"],
  ["to sing", "唱"],
  ["to use", "使用"],
  ["to make", "制作"],
  ["to create", "创造"],
  ["to build", "建造"],
  ["to work", "工作"],
  ["to rest", "休息"],
  ["to sleep", "睡觉"],
  ["to wake up", "醒来"],
  ["to get up", "起床"],
  ["to eat", "吃"],
  ["to drink", "喝"],
  ["to cook", "做饭"],
  ["to buy", "买"],
  ["to sell", "卖"],
  ["to pay", "支付"],
  ["to lend", "借出"],
  ["to borrow", "借入"],
  ["to rent", "租借"],
  ["to return", "归还"],
  ["to receive", "收到"],
  ["to get", "得到"],
  ["to give", "给"],
  ["to send", "发送"],
  ["to put", "放置"],
  ["to place", "放置"],
  ["to enter", "进入"],
  ["to go out", "出去"],
  ["to leave", "离开"],
  ["to go", "去"],
  ["to come", "来"],
  ["to come together", "合在一起"],
  ["to fit", "合适"],
  ["to suit", "合适"],
  ["to match", "匹配"],
  ["to rise", "上升"],
  ["to go up", "上升"],
  ["to increase", "增加"],
  ["to return", "返回"],
  ["to walk", "走路"],
  ["to run", "跑"],
  ["to fly", "飞"],
  ["to ride", "乘坐"],
  ["to drive", "驾驶"],
  ["to carry", "搬运"],
  ["to move", "移动"],
  ["to open", "打开"],
  ["to close", "关闭"],
  ["to turn on", "打开"],
  ["to turn off", "关闭"],
  ["to begin", "开始"],
  ["to start", "开始"],
  ["to end", "结束"],
  ["to finish", "完成"],
  ["to stop", "停止"],
  ["to continue", "继续"],
  ["to change", "改变"],
  ["to become", "变成"],
  ["to decrease", "减少"],
  ["to be enough", "足够"],
  ["to be different", "不同"],
  ["to be wrong", "错误"],
  ["to be correct", "正确"],
  ["important", "重要"],
  ["necessary", "必要"],
  ["convenient", "方便"],
  ["inconvenient", "不方便"],
  ["safe", "安全"],
  ["dangerous", "危险"],
  ["beautiful", "美丽"],
  ["clean", "干净"],
  ["dirty", "脏"],
  ["quiet", "安静"],
  ["noisy", "吵闹"],
  ["busy", "忙"],
  ["free time", "空闲"],
  ["interesting", "有趣"],
  ["boring", "无聊"],
  ["easy", "简单"],
  ["difficult", "困难"],
  ["hard", "困难"],
  ["expensive", "贵"],
  ["cheap", "便宜"],
  ["high", "高"],
  ["low", "低"],
  ["long", "长"],
  ["short", "短"],
  ["wide", "宽"],
  ["narrow", "窄"],
  ["heavy", "重"],
  ["light", "轻"],
  ["strong", "强"],
  ["weak", "弱"],
  ["fast", "快"],
  ["slow", "慢"],
  ["new", "新"],
  ["old", "旧"],
  ["young", "年轻"],
  ["hot", "热"],
  ["cold", "冷"],
  ["warm", "温暖"],
  ["cool", "凉爽"],
  ["weather", "天气"],
  ["rain", "雨"],
  ["snow", "雪"],
  ["wind", "风"],
  ["sky", "天空"],
  ["cloud", "云"],
  ["sun", "太阳"],
  ["moon", "月亮"],
  ["morning", "早上"],
  ["afternoon", "下午"],
  ["evening", "傍晚"],
  ["night", "晚上"],
  ["today", "今天"],
  ["tomorrow", "明天"],
  ["yesterday", "昨天"],
  ["week", "星期"],
  ["month", "月份"],
  ["year", "年"],
  ["time", "时间"],
  ["minute", "分钟"],
  ["hour", "小时"],
  ["day", "天"],
  ["person", "人"],
  ["people", "人们"],
  ["family", "家人"],
  ["friend", "朋友"],
  ["child", "孩子"],
  ["teacher", "老师"],
  ["student", "学生"],
  ["company", "公司"],
  ["school", "学校"],
  ["station", "车站"],
  ["shop", "商店"],
  ["store", "商店"],
  ["hospital", "医院"],
  ["bank", "银行"],
  ["post office", "邮局"],
  ["library", "图书馆"],
  ["restaurant", "餐厅"],
  ["room", "房间"],
  ["house", "房子"],
  ["home", "家"],
  ["apartment", "公寓"],
  ["building", "建筑物"],
  ["road", "道路"],
  ["street", "街道"],
  ["bridge", "桥"],
  ["river", "河"],
  ["mountain", "山"],
  ["sea", "海"],
  ["food", "食物"],
  ["meal", "饭"],
  ["rice", "米饭"],
  ["meat", "肉"],
  ["fish", "鱼"],
  ["vegetable", "蔬菜"],
  ["fruit", "水果"],
  ["tea", "茶"],
  ["water", "水"],
  ["money", "钱"],
  ["price", "价格"],
  ["book", "书"],
  ["newspaper", "报纸"],
  ["letter", "信"],
  ["photo", "照片"],
  ["picture", "图片"],
  ["movie", "电影"],
  ["music", "音乐"],
  ["language", "语言"],
  ["word", "单词"],
  ["sentence", "句子"],
  ["question", "问题"],
  ["answer", "答案"],
  ["meaning", "意思"],
  ["name", "名字"],
  ["color", "颜色"],
  ["red", "红色"],
  ["blue", "蓝色"],
  ["white", "白色"],
  ["black", "黑色"],
  ["green", "绿色"],
  ["yellow", "黄色"],
  ["body", "身体"],
  ["head", "头"],
  ["hand", "手"],
  ["foot", "脚"],
  ["eye", "眼睛"],
  ["ear", "耳朵"],
  ["mouth", "嘴"],
  ["heart", "心"],
  ["illness", "疾病"],
  ["medicine", "药"],
  ["bag", "包"],
  ["clothes", "衣服"],
  ["shoes", "鞋"],
  ["car", "汽车"],
  ["train", "电车"],
  ["bus", "公交车"],
  ["airplane", "飞机"],
  ["ticket", "票"],
  ["map", "地图"],
  ["number", "数字"],
  ["reason", "理由"],
  ["method", "方法"],
  ["way", "方法"],
  ["case", "情况"],
  ["place", "地方"],
  ["thing", "东西"],
  ["like that", "那样"],
  ["baby", "婴儿"],
  ["infant", "婴儿"],
  ["flavor", "味道"],
  ["flavour", "味道"],
  ["taste", "味道"],
  ["charm", "魅力"],
  ["appeal", "吸引力"],
  ["Asia", "亚洲"],
  ["Africa", "非洲"],
  ["America", "美国"],
  ["United States", "美国"],
  ["that sort of", "那种"],
  ["that kind of", "那种"],
  ["excluding", "除外"],
  ["except", "除外"],
  ["not less than", "以上"],
  ["and over", "以上"],
  ["within", "以内"],
  ["inside of", "以内"],
  ["to gather", "集合"],
  ["to collect", "收集"],
  ["to assemble", "集合"],
  ["to plant", "种植"],
  ["to grow", "培育"],
  ["reception", "接待"],
  ["information desk", "服务台"],
  ["arm", "手臂"],
  ["ability", "能力"],
  ["skill", "技能"],
  ["talent", "才能"],
  ["yes", "嗯"],
  ["escalator", "自动扶梯"],
  ["branch", "树枝"],
  ["bough", "树枝"],
  ["to choose", "选择"],
  ["to select", "选择"],
  ["congratulation", "祝贺"],
  ["celebration", "庆祝"],
  ["gift", "礼物"],
  ["motorcycle", "摩托车"],
  ["motorbike", "摩托车"],
  ["assistance", "帮助"],
  ["help", "帮助"],
  ["funny", "可笑"],
  ["amusing", "有趣"],
  ["strange", "奇怪"],
  ["husband", "丈夫"],
  ["change (for a purchase)", "零钱"],
  ["dance", "舞蹈"],
  ["to dance", "跳舞"],
  ["to be surprised", "吃惊"],
  ["thanks", "感谢"],
  ["gratitude", "感谢"],
  ["end", "结束"],
  ["ending", "结束"],
  ["meeting", "会议"],
  ["conference", "会议"],
  ["conversation", "会话"],
  ["return", "返回"],
  ["fire", "火灾"],
  ["gasoline", "汽油"],
  ["petrol", "汽油"],
  ["section manager", "课长"],
  ["section chief", "课长"],
  ["to win", "获胜"],
  ["sad", "悲伤"],
  ["glass", "玻璃"],
  ["relation", "关系"],
  ["relationship", "关系"],
  ["connection", "关联"],
  ["chance", "机会"],
  ["opportunity", "机会"],
  ["danger", "危险"],
  ["peril", "危险"],
  ["risk", "风险"],
  ["technology", "技术"],
  ["engineering", "工程"],
  ["technique", "技术"],
  ["surely", "一定"],
  ["silk", "丝绸"],
  ["feeling", "心情"],
  ["mood", "心情"],
  ["church", "教堂"],
  ["competition", "竞争"],
  ["air", "空气"],
  ["atmosphere", "气氛"],
  ["airport", "机场"],
  ["grass", "草"],
  ["hair", "毛发"],
  ["fur", "毛"],
  ["economy", "经济"],
  ["finance", "财务"],
  ["cake", "蛋糕"],
  ["scenery", "景色"],
  ["landscape", "风景"],
  ["eraser", "橡皮"],
  ["but", "但是"],
  ["however", "但是"],
  ["cause", "原因"],
  ["origin", "起因"],
  ["quarrel", "吵架"],
  ["fight", "打架"],
  ["sightseeing", "观光"],
  ["suburb", "郊外"],
  ["lecture", "讲义"],
  ["industry", "工业"],
  ["traffic", "交通"],
  ["transportation", "交通"],
  ["auditorium", "讲堂"],
  ["public employee", "公务员"],
  ["government employee", "公务员"],
  ["international", "国际"],
  ["knowing", "知道"],
  ["acquaintance", "熟人"],
  ["small bird", "小鸟"],
  ["from now on", "从现在起"],
  ["in the future", "今后"],
  ["to break", "破坏"],
  ["to destroy", "破坏"],
  ["concert", "音乐会"],
  ["computer", "电脑"],
  ["last", "最后"],
  ["final", "最后"],
  ["beginning", "最初"],
  ["first", "最初"],
  ["slope", "坡"],
  ["hill", "坡"],
  ["lonely", "寂寞"],
  ["salad", "沙拉"],
  ["sandal", "凉鞋"],
  ["sandwich", "三明治"],
  ["regrettable", "遗憾"],
  ["unfortunate", "遗憾"],
  ["city", "市"],
  ["match", "比赛"],
  ["game", "比赛"],
  ["examination", "考试"],
  ["exam", "考试"],
  ["test", "考试"],
  ["failure", "失败"],
  ["mistake", "错误"],
  ["dictionary", "词典"],
  ["island", "岛"],
  ["office", "办公室"],
  ["society", "社会"],
  ["community", "社会"],
  ["freedom", "自由"],
  ["liberty", "自由"],
  ["habit", "习惯"],
  ["custom", "习惯"],
  ["judo", "柔道"],
  ["enough", "足够"],
  ["sufficient", "足够"],
  ["novel", "小说"],
  ["story", "故事"],
  ["woman", "女性"],
  ["female", "女性"],
  ["population", "人口"],
  ["Shinto shrine", "神社"],
  ["swimming", "游泳"],
  ["mathematics", "数学"],
  ["screen", "屏幕"],
  ["completely", "完全"],
  ["totally", "完全"],
  ["stereo", "立体声"],
  ["sand", "沙子"],
  ["to slide", "滑"],
  ["corner", "角落"],
  ["pickpocket", "扒手"],
  ["life", "生活"],
  ["living", "生活"],
  ["production", "生产"],
  ["manufacture", "生产"],
];

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "jpwords-lexicon-importer/1.0",
      "Accept": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  return response.json();
}

async function fetchJishoWords() {
  const collected = [];
  const seen = new Set();
  for (let page = 1; page <= 80; page += 1) {
    const url = `https://jisho.org/api/v1/search/words?keyword=%23jlpt-${lowerLevel}&page=${page}`;
    const payload = await fetchJson(url);
    const entries = Array.isArray(payload.data) ? payload.data : [];
    if (!entries.length) break;
    entries.forEach((entry) => {
      const jp = (entry.japanese || []).find((item) => item.reading) || {};
      const kana = jp.reading || "";
      const japanese = jp.word || kana;
      if (!kana || !japanese) return;
      const key = `${japanese}|${kana}`;
      if (seen.has(key)) return;
      seen.add(key);
      collected.push({ ...entry, _japanese: japanese, _kana: kana });
    });
  }
  return collected.sort((a, b) => a._kana.localeCompare(b._kana, "ja"));
}

function normalizePart(parts) {
  const values = Array.isArray(parts) ? parts : [];
  const mapped = values.map((part) => partMap.get(part)).filter(Boolean);
  if (mapped.length) return Array.from(new Set(mapped)).join("・");
  if (values.some((part) => /verb/i.test(part))) return "动词";
  if (values.some((part) => /adjective/i.test(part))) return "形容词";
  if (values.some((part) => /adverb/i.test(part))) return "副词";
  return "名词";
}

function translateDefinitions(definitions) {
  const weakFuzzyKeys = new Set(["to go", "to come", "to be", "end", "time", "day", "way", "case", "place", "thing", "person", "people"]);
  const found = [];
  definitions.forEach((definition) => {
    const lower = definition.toLowerCase();
    const exact = definitionMap.find(([en]) => lower === en);
    const fuzzy = exact || definitionMap
      .filter(([en]) => !weakFuzzyKeys.has(en))
      .sort((left, right) => right[0].length - left[0].length)
      .find(([en]) => lower.includes(en));
    if (fuzzy && !found.includes(fuzzy[1])) found.push(fuzzy[1]);
  });
  if (found.length) return found.slice(0, 4).join("；");
  return `英文释义：${definitions.slice(0, 3).join("；")}`;
}

function toWord(entry, index) {
  const firstSense = (entry.senses || [])[0] || {};
  const definitions = (entry.senses || [])
    .flatMap((sense) => sense.english_definitions || [])
    .map((value) => String(value).trim())
    .filter(Boolean);
  const meaningEn = definitions.slice(0, 6).join("; ");
  return {
    id: Number(`${level.slice(1)}${String(index + 1).padStart(4, "0")}`),
    japanese: entry._japanese,
    kana: entry._kana,
    meaning: translateDefinitions(definitions),
    meaningEn: meaningEn || entry.slug || entry._japanese,
    part: normalizePart(firstSense.parts_of_speech),
    level,
    example: "",
    translation: "",
    exampleSource: "",
    translationSource: "",
    tags: ["JLPT", level, "Jisho", "JMdict"],
    status: "published",
    version: 1,
    access,
  };
}

function readTsv(file) {
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, "utf8").split(/\r?\n/).filter(Boolean).map((line) => line.split("\t"));
}

function sentenceMatchesWord(text, word) {
  return word.japanese && text.includes(word.japanese) || word.kana && text.includes(word.kana);
}

async function loadTatoeba(words) {
  const jpnRows = readTsv(path.join(tatoebaDir, "jpn_sentences.tsv"));
  const cmnRows = readTsv(path.join(tatoebaDir, "cmn_sentences.tsv"));

  const jpn = new Map();
  const cmn = new Map();
  const candidateJpnIds = new Set();
  const links = new Map();

  jpnRows.forEach(([id, lang, text]) => {
    if (!id || lang !== "jpn" || !text || text.length > 55) return;
    if (!words.some((word) => sentenceMatchesWord(text, word))) return;
    jpn.set(id, text);
    candidateJpnIds.add(id);
  });
  cmnRows.forEach(([id, lang, text]) => {
    if (id && lang === "cmn" && text) cmn.set(id, text);
  });

  const linksFile = path.join(tatoebaDir, "links.csv");
  if (!fs.existsSync(linksFile) || !candidateJpnIds.size) return [];

  const rl = readline.createInterface({
    input: fs.createReadStream(linksFile, { encoding: "utf8" }),
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    const [source, target] = line.split("\t");
    if (!candidateJpnIds.has(source) || !cmn.has(target)) continue;
    if (!links.has(source)) links.set(source, []);
    links.get(source).push(target);
  }

  const candidates = [];
  jpn.forEach((text, id) => {
    const linked = links.get(id) || [];
    const translation = linked.map((target) => cmn.get(target)).find(Boolean) || "";
    if (translation) candidates.push({ id, text, translation });
  });
  return candidates;
}

async function enrichExamples(words) {
  const candidates = await loadTatoeba(words);
  if (!candidates.length) return words;

  const used = new Set();
  return words.map((word) => {
    const needles = [word.japanese, word.kana].filter((value, index, arr) => value && arr.indexOf(value) === index);
    const match = candidates.find((candidate) => (
      !used.has(candidate.id)
      && candidate.text.length <= 55
      && needles.some((needle) => candidate.text.includes(needle))
    ));
    if (!match) return word;
    used.add(match.id);
    return {
      ...word,
      example: match.text,
      translation: match.translation,
      exampleSource: "tatoeba",
      translationSource: "tatoeba",
    };
  });
}

function loadMobileLexicons() {
  const text = fs.readFileSync(mobileFile, "utf8");
  const start = text.indexOf("export const builtInLexicons");
  const dataCode = text
    .slice(start)
    .replace("export const builtInLexicons: BuiltInLexicon[] =", "const builtInLexicons =")
    .replace(/;\s*$/, ";\nthis.builtInLexicons = builtInLexicons;");
  const context = {};
  vm.createContext(context);
  vm.runInContext(dataCode, context, { filename: mobileFile });
  return context.builtInLexicons;
}

function writeWebData(words) {
  const body = JSON.stringify(words, null, 2);
  const content = [
    `// JLPT ${level} vocabulary imported from Jisho API / JMdict fields.`,
    "window.JpWordsData = window.JpWordsData || {};",
    `window.JpWordsData.${lowerLevel}Words = ${body};`,
    "",
  ].join("\n");
  fs.writeFileSync(dataFile, content, "utf8");
}

function writeMobileData(words) {
  const mobileWords = words.map((word, index) => ({
    ...word,
    id: `${lowerLevel}-${String(index + 1).padStart(4, "0")}`,
    lexiconId,
  }));
  const lexicons = loadMobileLexicons().filter((lexicon) => lexicon.id !== lexiconId);
  lexicons.push({
    id: lexiconId,
    title: `JLPT ${level} 基础词库`,
    level,
    access: "free",
    version: 1,
    words: mobileWords,
  });
  lexicons.sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const content = `export type AccessLevel = "free" | "paid";

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
  fs.writeFileSync(mobileFile, content, "utf8");
}

async function main() {
  if (level !== "N4") {
    throw new Error("This importer is currently configured for JLPT N4.");
  }
  const entries = await fetchJishoWords();
  if (!entries.length) throw new Error("No JLPT entries returned from Jisho.");
  const words = await enrichExamples(entries.map(toWord));
  writeWebData(words);
  writeMobileData(words);
  const exampleCount = words.filter((word) => word.example && word.translation).length;
  console.log(`Imported ${words.length} JLPT ${level} words.`);
  console.log(`Tatoeba examples matched: ${exampleCount}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
