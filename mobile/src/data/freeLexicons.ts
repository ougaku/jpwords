export type AccessLevel = "free" | "paid";

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
    words: [
            {
                  "id": "n5-0001",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ああ",
                  "kana": "ああ",
                  "meaning": "啊！",
                  "meaningEn": "Ah!",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ah"
                  ]
            },
            {
                  "id": "n5-0002",
                  "lexiconId": "jlpt-n5",
                  "japanese": "会う",
                  "kana": "あう",
                  "meaning": "见面",
                  "meaningEn": "to meet",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "au"
                  ]
            },
            {
                  "id": "n5-0003",
                  "lexiconId": "jlpt-n5",
                  "japanese": "青い",
                  "kana": "あおい",
                  "meaning": "蓝色的",
                  "meaningEn": "blue",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "aoi"
                  ]
            },
            {
                  "id": "n5-0004",
                  "lexiconId": "jlpt-n5",
                  "japanese": "赤い",
                  "kana": "あかい",
                  "meaning": "红色的",
                  "meaningEn": "red",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "akai"
                  ]
            },
            {
                  "id": "n5-0005",
                  "lexiconId": "jlpt-n5",
                  "japanese": "明るい",
                  "kana": "あかるい",
                  "meaning": "明亮的",
                  "meaningEn": "light, bright",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "akarui"
                  ]
            },
            {
                  "id": "n5-0006",
                  "lexiconId": "jlpt-n5",
                  "japanese": "秋",
                  "kana": "あき",
                  "meaning": "秋天",
                  "meaningEn": "autumn, fall",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "aki"
                  ]
            },
            {
                  "id": "n5-0007",
                  "lexiconId": "jlpt-n5",
                  "japanese": "開く",
                  "kana": "あく",
                  "meaning": "开；打开",
                  "meaningEn": "open",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "aku"
                  ]
            },
            {
                  "id": "n5-0008",
                  "lexiconId": "jlpt-n5",
                  "japanese": "開ける",
                  "kana": "あける",
                  "meaning": "打开",
                  "meaningEn": "to open",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "akeru"
                  ]
            },
            {
                  "id": "n5-0009",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あげる",
                  "kana": "あげる",
                  "meaning": "给",
                  "meaningEn": "to give",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ageru"
                  ]
            },
            {
                  "id": "n5-0010",
                  "lexiconId": "jlpt-n5",
                  "japanese": "朝",
                  "kana": "あさ",
                  "meaning": "早上",
                  "meaningEn": "morning",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "asa"
                  ]
            },
            {
                  "id": "n5-0011",
                  "lexiconId": "jlpt-n5",
                  "japanese": "朝ご飯",
                  "kana": "あさごはん",
                  "meaning": "早饭",
                  "meaningEn": "breakfast",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "asagohan"
                  ]
            },
            {
                  "id": "n5-0012",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あさって",
                  "kana": "あさって",
                  "meaning": "后天",
                  "meaningEn": "the day after tomorrow",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "asatte"
                  ]
            },
            {
                  "id": "n5-0013",
                  "lexiconId": "jlpt-n5",
                  "japanese": "足",
                  "kana": "あし",
                  "meaning": "腿；脚",
                  "meaningEn": "leg, foot",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ashi"
                  ]
            },
            {
                  "id": "n5-0014",
                  "lexiconId": "jlpt-n5",
                  "japanese": "明日",
                  "kana": "あした",
                  "meaning": "明天",
                  "meaningEn": "tomorrow",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ashita"
                  ]
            },
            {
                  "id": "n5-0015",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あそこ",
                  "kana": "あそこ",
                  "meaning": "那边",
                  "meaningEn": "over there",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "asoko"
                  ]
            },
            {
                  "id": "n5-0016",
                  "lexiconId": "jlpt-n5",
                  "japanese": "遊ぶ",
                  "kana": "あそぶ",
                  "meaning": "玩；演奏",
                  "meaningEn": "to play",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "asobu"
                  ]
            },
            {
                  "id": "n5-0017",
                  "lexiconId": "jlpt-n5",
                  "japanese": "温かい",
                  "kana": "あたたかい",
                  "meaning": "温暖的",
                  "meaningEn": "warm",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "atatakai"
                  ]
            },
            {
                  "id": "n5-0018",
                  "lexiconId": "jlpt-n5",
                  "japanese": "頭",
                  "kana": "あたま",
                  "meaning": "头",
                  "meaningEn": "head",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "atama"
                  ]
            },
            {
                  "id": "n5-0019",
                  "lexiconId": "jlpt-n5",
                  "japanese": "新しい",
                  "kana": "あたらしい",
                  "meaning": "新的",
                  "meaningEn": "new",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "atarashii"
                  ]
            },
            {
                  "id": "n5-0020",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あちら",
                  "kana": "あちら",
                  "meaning": "那边（礼貌说法）",
                  "meaningEn": "over there (polite)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "achira"
                  ]
            },
            {
                  "id": "n5-0021",
                  "lexiconId": "jlpt-n5",
                  "japanese": "暑い",
                  "kana": "あつい",
                  "meaning": "热的（天气）",
                  "meaningEn": "hot (air)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "atsui"
                  ]
            },
            {
                  "id": "n5-0022",
                  "lexiconId": "jlpt-n5",
                  "japanese": "厚い",
                  "kana": "あつい",
                  "meaning": "厚的",
                  "meaningEn": "thick",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "atsui"
                  ]
            },
            {
                  "id": "n5-0023",
                  "lexiconId": "jlpt-n5",
                  "japanese": "後",
                  "kana": "あと",
                  "meaning": "之后；以后",
                  "meaningEn": "later, after",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ato"
                  ]
            },
            {
                  "id": "n5-0024",
                  "lexiconId": "jlpt-n5",
                  "japanese": "貴方",
                  "kana": "あなた",
                  "meaning": "你",
                  "meaningEn": "you",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "anata"
                  ]
            },
            {
                  "id": "n5-0025",
                  "lexiconId": "jlpt-n5",
                  "japanese": "兄",
                  "kana": "あに",
                  "meaning": "哥哥",
                  "meaningEn": "older brother",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ani"
                  ]
            },
            {
                  "id": "n5-0026",
                  "lexiconId": "jlpt-n5",
                  "japanese": "姉",
                  "kana": "あね",
                  "meaning": "姐姐",
                  "meaningEn": "older sister",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ane"
                  ]
            },
            {
                  "id": "n5-0027",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あの",
                  "kana": "あの",
                  "meaning": "那边的那个",
                  "meaningEn": "that (over there)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ano"
                  ]
            },
            {
                  "id": "n5-0028",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あの",
                  "kana": "あの",
                  "meaning": "那么；那就",
                  "meaningEn": "well, then",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ano"
                  ]
            },
            {
                  "id": "n5-0029",
                  "lexiconId": "jlpt-n5",
                  "japanese": "アパート",
                  "kana": "アパート",
                  "meaning": "公寓",
                  "meaningEn": "apartment",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "apaato"
                  ]
            },
            {
                  "id": "n5-0030",
                  "lexiconId": "jlpt-n5",
                  "japanese": "浴びる",
                  "kana": "あびる",
                  "meaning": "淋浴",
                  "meaningEn": "to take a shower",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "abiru"
                  ]
            },
            {
                  "id": "n5-0031",
                  "lexiconId": "jlpt-n5",
                  "japanese": "危ない",
                  "kana": "あぶない",
                  "meaning": "危险的",
                  "meaningEn": "dangerous",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "abunai"
                  ]
            },
            {
                  "id": "n5-0032",
                  "lexiconId": "jlpt-n5",
                  "japanese": "甘い",
                  "kana": "あまい",
                  "meaning": "甜的",
                  "meaningEn": "sweet",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "amai"
                  ]
            },
            {
                  "id": "n5-0033",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あまり",
                  "kana": "あまり",
                  "meaning": "不太",
                  "meaningEn": "not so",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "amari"
                  ]
            },
            {
                  "id": "n5-0034",
                  "lexiconId": "jlpt-n5",
                  "japanese": "雨",
                  "kana": "あめ",
                  "meaning": "雨",
                  "meaningEn": "rain",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ame"
                  ]
            },
            {
                  "id": "n5-0035",
                  "lexiconId": "jlpt-n5",
                  "japanese": "洗う",
                  "kana": "あらう",
                  "meaning": "洗",
                  "meaningEn": "to wash",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "arau"
                  ]
            },
            {
                  "id": "n5-0036",
                  "lexiconId": "jlpt-n5",
                  "japanese": "有る",
                  "kana": "ある",
                  "meaning": "在；存在",
                  "meaningEn": "to be, to exist",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "aru"
                  ]
            },
            {
                  "id": "n5-0037",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ある",
                  "kana": "ある",
                  "meaning": "拥有",
                  "meaningEn": "to possess",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "aru"
                  ]
            },
            {
                  "id": "n5-0038",
                  "lexiconId": "jlpt-n5",
                  "japanese": "歩く",
                  "kana": "あるく",
                  "meaning": "走路",
                  "meaningEn": "to walk",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "aruku"
                  ]
            },
            {
                  "id": "n5-0039",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あれ",
                  "kana": "あれ",
                  "meaning": "那个",
                  "meaningEn": "that one",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "are"
                  ]
            },
            {
                  "id": "n5-0040",
                  "lexiconId": "jlpt-n5",
                  "japanese": "良い",
                  "kana": "いい",
                  "meaning": "好的",
                  "meaningEn": "good",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ii, yoi"
                  ]
            },
            {
                  "id": "n5-0041",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いいえ",
                  "kana": "いいえ",
                  "meaning": "不；不是",
                  "meaningEn": "no",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "iie"
                  ]
            },
            {
                  "id": "n5-0042",
                  "lexiconId": "jlpt-n5",
                  "japanese": "言う",
                  "kana": "いう",
                  "meaning": "说；告诉",
                  "meaningEn": "to say, to tell",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "iu"
                  ]
            },
            {
                  "id": "n5-0043",
                  "lexiconId": "jlpt-n5",
                  "japanese": "家",
                  "kana": "いえ",
                  "meaning": "房子；家",
                  "meaningEn": "house, home",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ie"
                  ]
            },
            {
                  "id": "n5-0044",
                  "lexiconId": "jlpt-n5",
                  "japanese": "行く",
                  "kana": "いく",
                  "meaning": "去",
                  "meaningEn": "to go",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "iku"
                  ]
            },
            {
                  "id": "n5-0045",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いくつ",
                  "kana": "いくつ",
                  "meaning": "几个；几岁",
                  "meaningEn": "how many, how old",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ikutsu"
                  ]
            },
            {
                  "id": "n5-0046",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いくら",
                  "kana": "いくら",
                  "meaning": "多少钱",
                  "meaningEn": "how much",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ikura"
                  ]
            },
            {
                  "id": "n5-0047",
                  "lexiconId": "jlpt-n5",
                  "japanese": "池",
                  "kana": "いけ",
                  "meaning": "池塘",
                  "meaningEn": "pond",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ike"
                  ]
            },
            {
                  "id": "n5-0048",
                  "lexiconId": "jlpt-n5",
                  "japanese": "医者",
                  "kana": "いしゃ",
                  "meaning": "医生",
                  "meaningEn": "doctor",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "isha"
                  ]
            },
            {
                  "id": "n5-0049",
                  "lexiconId": "jlpt-n5",
                  "japanese": "椅子",
                  "kana": "いす",
                  "meaning": "椅子",
                  "meaningEn": "chair",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "isu"
                  ]
            },
            {
                  "id": "n5-0050",
                  "lexiconId": "jlpt-n5",
                  "japanese": "忙しい",
                  "kana": "いそがしい",
                  "meaning": "忙",
                  "meaningEn": "to be busy",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "isogashii"
                  ]
            },
            {
                  "id": "n5-0051",
                  "lexiconId": "jlpt-n5",
                  "japanese": "痛い",
                  "kana": "いたい",
                  "meaning": "疼的；痛的",
                  "meaningEn": "to be painful",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "itai"
                  ]
            },
            {
                  "id": "n5-0052",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一",
                  "kana": "いち",
                  "meaning": "一",
                  "meaningEn": "one",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ichi"
                  ]
            },
            {
                  "id": "n5-0053",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一日",
                  "kana": "いちにち",
                  "meaning": "一天",
                  "meaningEn": "one day",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ichinichi"
                  ]
            },
            {
                  "id": "n5-0054",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一番",
                  "kana": "いちばん",
                  "meaning": "第一；最好；最初",
                  "meaningEn": "No. 1, the best, the first",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ichiban"
                  ]
            },
            {
                  "id": "n5-0055",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いつ",
                  "kana": "いつ",
                  "meaning": "什么时候",
                  "meaningEn": "when",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "itsu"
                  ]
            },
            {
                  "id": "n5-0056",
                  "lexiconId": "jlpt-n5",
                  "japanese": "五日",
                  "kana": "いつか",
                  "meaning": "每月5日；5天",
                  "meaningEn": "the 5th day of the month, 5 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "itsuka"
                  ]
            },
            {
                  "id": "n5-0057",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一緒",
                  "kana": "いっしょ",
                  "meaning": "一起",
                  "meaningEn": "together",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "issho"
                  ]
            },
            {
                  "id": "n5-0058",
                  "lexiconId": "jlpt-n5",
                  "japanese": "五つ",
                  "kana": "いつつ",
                  "meaning": "五",
                  "meaningEn": "five",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "itsutsu"
                  ]
            },
            {
                  "id": "n5-0059",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いつも",
                  "kana": "いつも",
                  "meaning": "总是；一直",
                  "meaningEn": "always",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "itsumo"
                  ]
            },
            {
                  "id": "n5-0060",
                  "lexiconId": "jlpt-n5",
                  "japanese": "今",
                  "kana": "いま",
                  "meaning": "现在",
                  "meaningEn": "now",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ima"
                  ]
            },
            {
                  "id": "n5-0061",
                  "lexiconId": "jlpt-n5",
                  "japanese": "意味",
                  "kana": "いみ",
                  "meaning": "意思",
                  "meaningEn": "meaning",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "imi"
                  ]
            },
            {
                  "id": "n5-0062",
                  "lexiconId": "jlpt-n5",
                  "japanese": "妹",
                  "kana": "いもうと",
                  "meaning": "别人的妹妹",
                  "meaningEn": "someone’s younger sister",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "imouto"
                  ]
            },
            {
                  "id": "n5-0063",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いや",
                  "kana": "いや",
                  "meaning": "讨厌；不愉快",
                  "meaningEn": "not likable, unpleasant",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "iya"
                  ]
            },
            {
                  "id": "n5-0064",
                  "lexiconId": "jlpt-n5",
                  "japanese": "入口",
                  "kana": "いりぐち",
                  "meaning": "入口",
                  "meaningEn": "entrance",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "iriguchi"
                  ]
            },
            {
                  "id": "n5-0065",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いる",
                  "kana": "いる",
                  "meaning": "需要；必须有",
                  "meaningEn": "need, must have, be required",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "iru"
                  ]
            },
            {
                  "id": "n5-0066",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いる",
                  "kana": "いる",
                  "meaning": "存在",
                  "meaningEn": "to exist",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "iru"
                  ]
            },
            {
                  "id": "n5-0067",
                  "lexiconId": "jlpt-n5",
                  "japanese": "入れる",
                  "kana": "いれる",
                  "meaning": "放入；插入",
                  "meaningEn": "to insert, to put in",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ireru"
                  ]
            },
            {
                  "id": "n5-0068",
                  "lexiconId": "jlpt-n5",
                  "japanese": "色",
                  "kana": "いろ",
                  "meaning": "颜色",
                  "meaningEn": "color",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "iro"
                  ]
            },
            {
                  "id": "n5-0069",
                  "lexiconId": "jlpt-n5",
                  "japanese": "色々",
                  "kana": "いろいろ",
                  "meaning": "各种各样",
                  "meaningEn": "various",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "iroiro"
                  ]
            },
            {
                  "id": "n5-0070",
                  "lexiconId": "jlpt-n5",
                  "japanese": "上",
                  "kana": "うえ",
                  "meaning": "上面；顶部",
                  "meaningEn": "top, on, above",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ue"
                  ]
            },
            {
                  "id": "n5-0071",
                  "lexiconId": "jlpt-n5",
                  "japanese": "後ろ",
                  "kana": "うしろ",
                  "meaning": "后面；后方；后面",
                  "meaningEn": "back, rear, behind",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ushiro"
                  ]
            },
            {
                  "id": "n5-0072",
                  "lexiconId": "jlpt-n5",
                  "japanese": "薄い",
                  "kana": "うすい",
                  "meaning": "薄的",
                  "meaningEn": "thin",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "usui"
                  ]
            },
            {
                  "id": "n5-0073",
                  "lexiconId": "jlpt-n5",
                  "japanese": "歌",
                  "kana": "うた",
                  "meaning": "歌",
                  "meaningEn": "song",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "uta"
                  ]
            },
            {
                  "id": "n5-0074",
                  "lexiconId": "jlpt-n5",
                  "japanese": "歌う",
                  "kana": "うたう",
                  "meaning": "唱歌",
                  "meaningEn": "to sing",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "utau"
                  ]
            },
            {
                  "id": "n5-0075",
                  "lexiconId": "jlpt-n5",
                  "japanese": "内",
                  "kana": "うち",
                  "meaning": "家",
                  "meaningEn": "home",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "uchi"
                  ]
            },
            {
                  "id": "n5-0076",
                  "lexiconId": "jlpt-n5",
                  "japanese": "生まれる",
                  "kana": "うまれる",
                  "meaning": "出生",
                  "meaningEn": "to be born",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "umareru"
                  ]
            },
            {
                  "id": "n5-0077",
                  "lexiconId": "jlpt-n5",
                  "japanese": "海",
                  "kana": "うみ",
                  "meaning": "海",
                  "meaningEn": "sea",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "umi"
                  ]
            },
            {
                  "id": "n5-0078",
                  "lexiconId": "jlpt-n5",
                  "japanese": "売る",
                  "kana": "うる",
                  "meaning": "卖",
                  "meaningEn": "to sell",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "uru"
                  ]
            },
            {
                  "id": "n5-0079",
                  "lexiconId": "jlpt-n5",
                  "japanese": "上着",
                  "kana": "うわぎ",
                  "meaning": "外套；夹克",
                  "meaningEn": "coat, jacket",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "uwagi"
                  ]
            },
            {
                  "id": "n5-0080",
                  "lexiconId": "jlpt-n5",
                  "japanese": "絵",
                  "kana": "え",
                  "meaning": "图画；照片",
                  "meaningEn": "picture",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "e"
                  ]
            },
            {
                  "id": "n5-0081",
                  "lexiconId": "jlpt-n5",
                  "japanese": "映画",
                  "kana": "えいが",
                  "meaning": "电影",
                  "meaningEn": "movie",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "eiga"
                  ]
            },
            {
                  "id": "n5-0082",
                  "lexiconId": "jlpt-n5",
                  "japanese": "映画館",
                  "kana": "えいがかん",
                  "meaning": "电影院",
                  "meaningEn": "cinema",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "eigakan"
                  ]
            },
            {
                  "id": "n5-0083",
                  "lexiconId": "jlpt-n5",
                  "japanese": "英語",
                  "kana": "えいご",
                  "meaning": "英语",
                  "meaningEn": "English language",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "eigo"
                  ]
            },
            {
                  "id": "n5-0084",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ええ",
                  "kana": "ええ",
                  "meaning": "是的；我明白了",
                  "meaningEn": "Yes, I see",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ee"
                  ]
            },
            {
                  "id": "n5-0085",
                  "lexiconId": "jlpt-n5",
                  "japanese": "駅",
                  "kana": "えき",
                  "meaning": "车站",
                  "meaningEn": "station",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "eki"
                  ]
            },
            {
                  "id": "n5-0086",
                  "lexiconId": "jlpt-n5",
                  "japanese": "エレベータ",
                  "kana": "エレベータ",
                  "meaning": "电梯",
                  "meaningEn": "elevator",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "erebeeta"
                  ]
            },
            {
                  "id": "n5-0087",
                  "lexiconId": "jlpt-n5",
                  "japanese": "円",
                  "kana": "えん",
                  "meaning": "日元",
                  "meaningEn": "Yen",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "en"
                  ]
            },
            {
                  "id": "n5-0088",
                  "lexiconId": "jlpt-n5",
                  "japanese": "鉛筆",
                  "kana": "えんぴつ",
                  "meaning": "铅笔",
                  "meaningEn": "pencil",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "enpitsu"
                  ]
            },
            {
                  "id": "n5-0089",
                  "lexiconId": "jlpt-n5",
                  "japanese": "御",
                  "kana": "お",
                  "meaning": "敬语前缀",
                  "meaningEn": "honorific prefix",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "o"
                  ]
            },
            {
                  "id": "n5-0090",
                  "lexiconId": "jlpt-n5",
                  "japanese": "美味しい",
                  "kana": "おいしい",
                  "meaning": "好吃的；美味的",
                  "meaningEn": "tasty, delicious",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "oishii"
                  ]
            },
            {
                  "id": "n5-0091",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大きい",
                  "kana": "おおきい",
                  "meaning": "大的",
                  "meaningEn": "big",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ookii"
                  ]
            },
            {
                  "id": "n5-0092",
                  "lexiconId": "jlpt-n5",
                  "japanese": "おおぜい",
                  "kana": "おおぜい",
                  "meaning": "很多人",
                  "meaningEn": "many people",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "oozei"
                  ]
            },
            {
                  "id": "n5-0093",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お母さん",
                  "kana": "おかあさん",
                  "meaning": "自己的母亲",
                  "meaningEn": "my own mother",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "okaasan"
                  ]
            },
            {
                  "id": "n5-0094",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お菓子",
                  "kana": "おかし",
                  "meaning": "点心；糕点",
                  "meaningEn": "confectionary, cake",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "okashi"
                  ]
            },
            {
                  "id": "n5-0095",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お金",
                  "kana": "おかね",
                  "meaning": "钱",
                  "meaningEn": "money",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "okane"
                  ]
            },
            {
                  "id": "n5-0096",
                  "lexiconId": "jlpt-n5",
                  "japanese": "起きる",
                  "kana": "おきる",
                  "meaning": "起床；站起来",
                  "meaningEn": "to get up, to stand up",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "okiru"
                  ]
            },
            {
                  "id": "n5-0097",
                  "lexiconId": "jlpt-n5",
                  "japanese": "置く",
                  "kana": "おく",
                  "meaning": "放；放置",
                  "meaningEn": "to put, to place",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "oku"
                  ]
            },
            {
                  "id": "n5-0098",
                  "lexiconId": "jlpt-n5",
                  "japanese": "奥さん",
                  "kana": "おくさん",
                  "meaning": "别人的妻子",
                  "meaningEn": "someone’s wife",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "okusan"
                  ]
            },
            {
                  "id": "n5-0099",
                  "lexiconId": "jlpt-n5",
                  "japanese": "送る",
                  "kana": "おくる",
                  "meaning": "发送",
                  "meaningEn": "to send",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "okuru"
                  ]
            },
            {
                  "id": "n5-0100",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お酒",
                  "kana": "おさけ",
                  "meaning": "酒；日本酒",
                  "meaningEn": "alcohol, sake",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "osake"
                  ]
            },
            {
                  "id": "n5-0101",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お皿",
                  "kana": "おさら",
                  "meaning": "盘子",
                  "meaningEn": "plate",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "osara"
                  ]
            },
            {
                  "id": "n5-0102",
                  "lexiconId": "jlpt-n5",
                  "japanese": "伯父さん",
                  "kana": "おじさん",
                  "meaning": "叔叔；伯父；舅舅",
                  "meaningEn": "uncle",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ojisan"
                  ]
            },
            {
                  "id": "n5-0103",
                  "lexiconId": "jlpt-n5",
                  "japanese": "おじいさん",
                  "kana": "おじいさん",
                  "meaning": "祖父；爷爷",
                  "meaningEn": "grand father",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ojiisan"
                  ]
            },
            {
                  "id": "n5-0104",
                  "lexiconId": "jlpt-n5",
                  "japanese": "押す",
                  "kana": "おす",
                  "meaning": "推",
                  "meaningEn": "to push",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "osu"
                  ]
            },
            {
                  "id": "n5-0105",
                  "lexiconId": "jlpt-n5",
                  "japanese": "遅い",
                  "kana": "おそい",
                  "meaning": "晚的；慢的",
                  "meaningEn": "late, slow",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "osoi"
                  ]
            },
            {
                  "id": "n5-0106",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お茶",
                  "kana": "おちゃ",
                  "meaning": "茶",
                  "meaningEn": "tea",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ocha"
                  ]
            },
            {
                  "id": "n5-0107",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お手洗い",
                  "kana": "おてあらい",
                  "meaning": "厕所；洗手间",
                  "meaningEn": "toilet, lavatory",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "otearai"
                  ]
            },
            {
                  "id": "n5-0108",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お父さん",
                  "kana": "おとうさん",
                  "meaning": "父亲",
                  "meaningEn": "father",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "otousan"
                  ]
            },
            {
                  "id": "n5-0109",
                  "lexiconId": "jlpt-n5",
                  "japanese": "弟",
                  "kana": "おとうと",
                  "meaning": "别人的弟弟",
                  "meaningEn": "someone’s younger brother",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "otouto"
                  ]
            },
            {
                  "id": "n5-0110",
                  "lexiconId": "jlpt-n5",
                  "japanese": "男",
                  "kana": "おとこ",
                  "meaning": "男人",
                  "meaningEn": "man",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "otoko"
                  ]
            },
            {
                  "id": "n5-0111",
                  "lexiconId": "jlpt-n5",
                  "japanese": "男の子",
                  "kana": "おとこのこ",
                  "meaning": "男孩",
                  "meaningEn": "boy",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "otokonoko"
                  ]
            },
            {
                  "id": "n5-0112",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一昨日",
                  "kana": "おととい",
                  "meaning": "前天",
                  "meaningEn": "the day before yesterday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ototoi"
                  ]
            },
            {
                  "id": "n5-0113",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一昨年",
                  "kana": "おととし",
                  "meaning": "前年",
                  "meaningEn": "the year before last",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ototoshi"
                  ]
            },
            {
                  "id": "n5-0114",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大人",
                  "kana": "おとな",
                  "meaning": "大人；成年人",
                  "meaningEn": "adult",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "otona"
                  ]
            },
            {
                  "id": "n5-0115",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お腹",
                  "kana": "おなか",
                  "meaning": "肚子",
                  "meaningEn": "stomach",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "onaka"
                  ]
            },
            {
                  "id": "n5-0116",
                  "lexiconId": "jlpt-n5",
                  "japanese": "同じ",
                  "kana": "おなじ",
                  "meaning": "相同的",
                  "meaningEn": "same",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "onaji"
                  ]
            },
            {
                  "id": "n5-0117",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お兄さん",
                  "kana": "おにいさん",
                  "meaning": "别人的哥哥",
                  "meaningEn": "someone’s elder brother",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "oniisan"
                  ]
            },
            {
                  "id": "n5-0118",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お姉さん",
                  "kana": "おねえさん",
                  "meaning": "别人的姐姐",
                  "meaningEn": "someone’s elder sister",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "oneesan"
                  ]
            },
            {
                  "id": "n5-0119",
                  "lexiconId": "jlpt-n5",
                  "japanese": "伯母さん",
                  "kana": "おばさん",
                  "meaning": "阿姨；伯母；婶婶",
                  "meaningEn": "aunt",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "obasan"
                  ]
            },
            {
                  "id": "n5-0120",
                  "lexiconId": "jlpt-n5",
                  "japanese": "おばあさん",
                  "kana": "おばあさん",
                  "meaning": "祖母；奶奶",
                  "meaningEn": "grandmother",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "obaasan"
                  ]
            },
            {
                  "id": "n5-0121",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お弁当",
                  "kana": "おべんとう",
                  "meaning": "便当",
                  "meaningEn": "lunchbox",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "obentou"
                  ]
            },
            {
                  "id": "n5-0122",
                  "lexiconId": "jlpt-n5",
                  "japanese": "覚える",
                  "kana": "おぼえる",
                  "meaning": "记住；记得",
                  "meaningEn": "to memorize, to remember",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "oboeru"
                  ]
            },
            {
                  "id": "n5-0123",
                  "lexiconId": "jlpt-n5",
                  "japanese": "重い",
                  "kana": "おもい",
                  "meaning": "重的",
                  "meaningEn": "heavy",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "omoi"
                  ]
            },
            {
                  "id": "n5-0124",
                  "lexiconId": "jlpt-n5",
                  "japanese": "面白い",
                  "kana": "おもしろい",
                  "meaning": "有趣的",
                  "meaningEn": "interesting, funny",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "omoshiroi"
                  ]
            },
            {
                  "id": "n5-0125",
                  "lexiconId": "jlpt-n5",
                  "japanese": "泳ぐ",
                  "kana": "およぐ",
                  "meaning": "游泳",
                  "meaningEn": "to swim",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "oyogu"
                  ]
            },
            {
                  "id": "n5-0126",
                  "lexiconId": "jlpt-n5",
                  "japanese": "降りる",
                  "kana": "おりる",
                  "meaning": "下车",
                  "meaningEn": "to get off",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "oriru"
                  ]
            },
            {
                  "id": "n5-0127",
                  "lexiconId": "jlpt-n5",
                  "japanese": "終わる",
                  "kana": "おわる",
                  "meaning": "结束",
                  "meaningEn": "to end",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "owaru"
                  ]
            },
            {
                  "id": "n5-0128",
                  "lexiconId": "jlpt-n5",
                  "japanese": "音楽",
                  "kana": "おんがく",
                  "meaning": "音乐",
                  "meaningEn": "music",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ongaku"
                  ]
            },
            {
                  "id": "n5-0129",
                  "lexiconId": "jlpt-n5",
                  "japanese": "女",
                  "kana": "おんな",
                  "meaning": "女人",
                  "meaningEn": "woman",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "onna"
                  ]
            },
            {
                  "id": "n5-0130",
                  "lexiconId": "jlpt-n5",
                  "japanese": "女の子",
                  "kana": "おんなのこ",
                  "meaning": "女孩",
                  "meaningEn": "girl",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "onnanoko"
                  ]
            },
            {
                  "id": "n5-0131",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜回",
                  "kana": "〜かい",
                  "meaning": "～次",
                  "meaningEn": "~times",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~kai"
                  ]
            },
            {
                  "id": "n5-0132",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜階",
                  "kana": "〜かい",
                  "meaning": "～层；～楼",
                  "meaningEn": "~floor",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~kai"
                  ]
            },
            {
                  "id": "n5-0133",
                  "lexiconId": "jlpt-n5",
                  "japanese": "外国",
                  "kana": "がいこく",
                  "meaning": "外国",
                  "meaningEn": "foreign country",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "gaikoku"
                  ]
            },
            {
                  "id": "n5-0134",
                  "lexiconId": "jlpt-n5",
                  "japanese": "外国人",
                  "kana": "がいこくじん",
                  "meaning": "外国人",
                  "meaningEn": "foreigner",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "gaikokujin"
                  ]
            },
            {
                  "id": "n5-0135",
                  "lexiconId": "jlpt-n5",
                  "japanese": "会社",
                  "kana": "かいしゃ",
                  "meaning": "公司；企业",
                  "meaningEn": "company, enterprise",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kaisha"
                  ]
            },
            {
                  "id": "n5-0136",
                  "lexiconId": "jlpt-n5",
                  "japanese": "階段",
                  "kana": "かいだん",
                  "meaning": "楼梯",
                  "meaningEn": "stairs",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kaidan"
                  ]
            },
            {
                  "id": "n5-0137",
                  "lexiconId": "jlpt-n5",
                  "japanese": "買物",
                  "kana": "かいもの",
                  "meaning": "购物",
                  "meaningEn": "shopping",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kaimono"
                  ]
            },
            {
                  "id": "n5-0138",
                  "lexiconId": "jlpt-n5",
                  "japanese": "買う",
                  "kana": "かう",
                  "meaning": "买",
                  "meaningEn": "to buy",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kau"
                  ]
            },
            {
                  "id": "n5-0139",
                  "lexiconId": "jlpt-n5",
                  "japanese": "返す",
                  "kana": "かえす",
                  "meaning": "归还物品",
                  "meaningEn": "to return an object",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kaesu"
                  ]
            },
            {
                  "id": "n5-0140",
                  "lexiconId": "jlpt-n5",
                  "japanese": "帰る",
                  "kana": "かえる",
                  "meaning": "回家",
                  "meaningEn": "to return home",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kaeru"
                  ]
            },
            {
                  "id": "n5-0141",
                  "lexiconId": "jlpt-n5",
                  "japanese": "顔",
                  "kana": "かお",
                  "meaning": "脸",
                  "meaningEn": "face",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kao"
                  ]
            },
            {
                  "id": "n5-0142",
                  "lexiconId": "jlpt-n5",
                  "japanese": "かかる",
                  "kana": "かかる",
                  "meaning": "花时间；钱",
                  "meaningEn": "to take time, money",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kakaru"
                  ]
            },
            {
                  "id": "n5-0143",
                  "lexiconId": "jlpt-n5",
                  "japanese": "鍵",
                  "kana": "かぎ",
                  "meaning": "钥匙",
                  "meaningEn": "key",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kagi"
                  ]
            },
            {
                  "id": "n5-0144",
                  "lexiconId": "jlpt-n5",
                  "japanese": "書く",
                  "kana": "かく",
                  "meaning": "写",
                  "meaningEn": "to write",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kaku"
                  ]
            },
            {
                  "id": "n5-0145",
                  "lexiconId": "jlpt-n5",
                  "japanese": "学生",
                  "kana": "がくせい",
                  "meaning": "学生",
                  "meaningEn": "student",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "gakusei"
                  ]
            },
            {
                  "id": "n5-0146",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜か月",
                  "kana": "〜かげつ",
                  "meaning": "～个月",
                  "meaningEn": "~ number of months",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~kagetsu"
                  ]
            },
            {
                  "id": "n5-0147",
                  "lexiconId": "jlpt-n5",
                  "japanese": "かける",
                  "kana": "かける",
                  "meaning": "穿；戴",
                  "meaningEn": "to wear",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kakeru"
                  ]
            },
            {
                  "id": "n5-0148",
                  "lexiconId": "jlpt-n5",
                  "japanese": "かける",
                  "kana": "かける",
                  "meaning": "打电话",
                  "meaningEn": "to make a phone call",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kakeru"
                  ]
            },
            {
                  "id": "n5-0149",
                  "lexiconId": "jlpt-n5",
                  "japanese": "傘",
                  "kana": "かさ",
                  "meaning": "伞",
                  "meaningEn": "umbrella",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kasa"
                  ]
            },
            {
                  "id": "n5-0150",
                  "lexiconId": "jlpt-n5",
                  "japanese": "貸す",
                  "kana": "かす",
                  "meaning": "借出",
                  "meaningEn": "to lend",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kasu"
                  ]
            },
            {
                  "id": "n5-0151",
                  "lexiconId": "jlpt-n5",
                  "japanese": "風",
                  "kana": "かぜ",
                  "meaning": "风",
                  "meaningEn": "wind",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kaze"
                  ]
            },
            {
                  "id": "n5-0152",
                  "lexiconId": "jlpt-n5",
                  "japanese": "風邪",
                  "kana": "かぜ",
                  "meaning": "感冒",
                  "meaningEn": "a cold",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kaze"
                  ]
            },
            {
                  "id": "n5-0153",
                  "lexiconId": "jlpt-n5",
                  "japanese": "家族",
                  "kana": "かぞく",
                  "meaning": "家人；家庭",
                  "meaningEn": "family",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kazoku"
                  ]
            },
            {
                  "id": "n5-0154",
                  "lexiconId": "jlpt-n5",
                  "japanese": "方",
                  "kana": "かた",
                  "meaning": "人（礼貌说法）",
                  "meaningEn": "person (polite)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kata"
                  ]
            },
            {
                  "id": "n5-0155",
                  "lexiconId": "jlpt-n5",
                  "japanese": "片仮名",
                  "kana": "かたかな",
                  "meaning": "片假名",
                  "meaningEn": "Katakana",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "katakana"
                  ]
            },
            {
                  "id": "n5-0156",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一月",
                  "kana": "いちがつ",
                  "meaning": "一月",
                  "meaningEn": "January",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ichigatsu"
                  ]
            },
            {
                  "id": "n5-0157",
                  "lexiconId": "jlpt-n5",
                  "japanese": "二月",
                  "kana": "にがつ",
                  "meaning": "二月",
                  "meaningEn": "February",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nigatsu"
                  ]
            },
            {
                  "id": "n5-0158",
                  "lexiconId": "jlpt-n5",
                  "japanese": "三月",
                  "kana": "さんがつ",
                  "meaning": "三月",
                  "meaningEn": "March",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sangatsu"
                  ]
            },
            {
                  "id": "n5-0159",
                  "lexiconId": "jlpt-n5",
                  "japanese": "四月",
                  "kana": "しがつ",
                  "meaning": "四月",
                  "meaningEn": "April",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shigatsu"
                  ]
            },
            {
                  "id": "n5-0160",
                  "lexiconId": "jlpt-n5",
                  "japanese": "五月",
                  "kana": "ごがつ",
                  "meaning": "五月",
                  "meaningEn": "May",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "gogatsu"
                  ]
            },
            {
                  "id": "n5-0161",
                  "lexiconId": "jlpt-n5",
                  "japanese": "六月",
                  "kana": "ろくがつ",
                  "meaning": "六月",
                  "meaningEn": "June",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "rokugatsu"
                  ]
            },
            {
                  "id": "n5-0162",
                  "lexiconId": "jlpt-n5",
                  "japanese": "七月",
                  "kana": "しちがつ",
                  "meaning": "七月",
                  "meaningEn": "July",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shichigatsu"
                  ]
            },
            {
                  "id": "n5-0163",
                  "lexiconId": "jlpt-n5",
                  "japanese": "八月",
                  "kana": "はちがつ",
                  "meaning": "八月",
                  "meaningEn": "August",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hachigatsu"
                  ]
            },
            {
                  "id": "n5-0164",
                  "lexiconId": "jlpt-n5",
                  "japanese": "九月",
                  "kana": "くがつ",
                  "meaning": "九月",
                  "meaningEn": "September",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kugatsu"
                  ]
            },
            {
                  "id": "n5-0165",
                  "lexiconId": "jlpt-n5",
                  "japanese": "十月",
                  "kana": "じゅうがつ",
                  "meaning": "十月",
                  "meaningEn": "October",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "juugatsu"
                  ]
            },
            {
                  "id": "n5-0166",
                  "lexiconId": "jlpt-n5",
                  "japanese": "十一月",
                  "kana": "じゅういちがつ",
                  "meaning": "十一月",
                  "meaningEn": "November",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "juuichigatsu"
                  ]
            },
            {
                  "id": "n5-0167",
                  "lexiconId": "jlpt-n5",
                  "japanese": "十二月",
                  "kana": "じゅうにがつ",
                  "meaning": "十二月",
                  "meaningEn": "December",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "juunigatsu"
                  ]
            },
            {
                  "id": "n5-0168",
                  "lexiconId": "jlpt-n5",
                  "japanese": "学校",
                  "kana": "がっこう",
                  "meaning": "学校",
                  "meaningEn": "school",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "gakkou"
                  ]
            },
            {
                  "id": "n5-0169",
                  "lexiconId": "jlpt-n5",
                  "japanese": "角",
                  "kana": "かど",
                  "meaning": "角落",
                  "meaningEn": "corner",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kado"
                  ]
            },
            {
                  "id": "n5-0170",
                  "lexiconId": "jlpt-n5",
                  "japanese": "家内",
                  "kana": "かない",
                  "meaning": "我的妻子",
                  "meaningEn": "my wife",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kanai"
                  ]
            },
            {
                  "id": "n5-0171",
                  "lexiconId": "jlpt-n5",
                  "japanese": "鞄",
                  "kana": "かばん",
                  "meaning": "包；书包",
                  "meaningEn": "bag",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kaban"
                  ]
            },
            {
                  "id": "n5-0172",
                  "lexiconId": "jlpt-n5",
                  "japanese": "花瓶",
                  "kana": "かびん",
                  "meaning": "花瓶",
                  "meaningEn": "vase",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kabin"
                  ]
            },
            {
                  "id": "n5-0173",
                  "lexiconId": "jlpt-n5",
                  "japanese": "冠る",
                  "kana": "かぶる",
                  "meaning": "戴帽子",
                  "meaningEn": "to put on a hat",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kaburu"
                  ]
            },
            {
                  "id": "n5-0174",
                  "lexiconId": "jlpt-n5",
                  "japanese": "紙",
                  "kana": "かみ",
                  "meaning": "纸",
                  "meaningEn": "paper",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kami"
                  ]
            },
            {
                  "id": "n5-0175",
                  "lexiconId": "jlpt-n5",
                  "japanese": "カメラ",
                  "kana": "かめら",
                  "meaning": "照相机",
                  "meaningEn": "camera",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kamera"
                  ]
            },
            {
                  "id": "n5-0176",
                  "lexiconId": "jlpt-n5",
                  "japanese": "火曜日",
                  "kana": "かようび",
                  "meaning": "星期二",
                  "meaningEn": "Tuesday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kayoubi"
                  ]
            },
            {
                  "id": "n5-0177",
                  "lexiconId": "jlpt-n5",
                  "japanese": "辛い",
                  "kana": "からい",
                  "meaning": "辣的",
                  "meaningEn": "hot, spicy",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "karai"
                  ]
            },
            {
                  "id": "n5-0178",
                  "lexiconId": "jlpt-n5",
                  "japanese": "体",
                  "kana": "からだ",
                  "meaning": "身体",
                  "meaningEn": "body",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "karada"
                  ]
            },
            {
                  "id": "n5-0179",
                  "lexiconId": "jlpt-n5",
                  "japanese": "借りる",
                  "kana": "かりる",
                  "meaning": "借入",
                  "meaningEn": "to borrow",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kariru"
                  ]
            },
            {
                  "id": "n5-0180",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜がります",
                  "kana": "〜がります",
                  "meaning": "第三人称想要",
                  "meaningEn": "3rd person wants to",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~garimasu"
                  ]
            },
            {
                  "id": "n5-0181",
                  "lexiconId": "jlpt-n5",
                  "japanese": "軽い",
                  "kana": "かるい",
                  "meaning": "轻的",
                  "meaningEn": "light (not heavy)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "karui"
                  ]
            },
            {
                  "id": "n5-0182",
                  "lexiconId": "jlpt-n5",
                  "japanese": "カレンダー",
                  "kana": "カレンダー",
                  "meaning": "日历",
                  "meaningEn": "calendar",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "karendaa"
                  ]
            },
            {
                  "id": "n5-0183",
                  "lexiconId": "jlpt-n5",
                  "japanese": "川",
                  "kana": "かわ",
                  "meaning": "河",
                  "meaningEn": "river",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kawa"
                  ]
            },
            {
                  "id": "n5-0184",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜側",
                  "kana": "~がわ",
                  "meaning": "~边",
                  "meaningEn": "~side",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~gawa"
                  ]
            },
            {
                  "id": "n5-0185",
                  "lexiconId": "jlpt-n5",
                  "japanese": "可愛い",
                  "kana": "かわいい",
                  "meaning": "可爱的；漂亮的",
                  "meaningEn": "cute, pretty",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kawaii"
                  ]
            },
            {
                  "id": "n5-0186",
                  "lexiconId": "jlpt-n5",
                  "japanese": "漢字",
                  "kana": "かんじ",
                  "meaning": "汉字",
                  "meaningEn": "Kanji character",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kanji"
                  ]
            },
            {
                  "id": "n5-0187",
                  "lexiconId": "jlpt-n5",
                  "japanese": "木",
                  "kana": "き",
                  "meaning": "树",
                  "meaningEn": "tree",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ki"
                  ]
            },
            {
                  "id": "n5-0188",
                  "lexiconId": "jlpt-n5",
                  "japanese": "黄色い",
                  "kana": "きいろい",
                  "meaning": "黄色的",
                  "meaningEn": "yellow",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kiiroi"
                  ]
            },
            {
                  "id": "n5-0189",
                  "lexiconId": "jlpt-n5",
                  "japanese": "消える",
                  "kana": "きえる",
                  "meaning": "出去；消失",
                  "meaningEn": "to go out, to vanish",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kieru"
                  ]
            },
            {
                  "id": "n5-0190",
                  "lexiconId": "jlpt-n5",
                  "japanese": "聞く",
                  "kana": "きく",
                  "meaning": "听；询问",
                  "meaningEn": "to hear, to listen, to ask",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kiku"
                  ]
            },
            {
                  "id": "n5-0191",
                  "lexiconId": "jlpt-n5",
                  "japanese": "北",
                  "kana": "きた",
                  "meaning": "北",
                  "meaningEn": "north",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kita"
                  ]
            },
            {
                  "id": "n5-0192",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ギター",
                  "kana": "ギター",
                  "meaning": "吉他",
                  "meaningEn": "guitar",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "gitaa"
                  ]
            },
            {
                  "id": "n5-0193",
                  "lexiconId": "jlpt-n5",
                  "japanese": "汚い",
                  "kana": "きたない",
                  "meaning": "脏的",
                  "meaningEn": "dirty",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kitanai"
                  ]
            },
            {
                  "id": "n5-0194",
                  "lexiconId": "jlpt-n5",
                  "japanese": "喫茶店",
                  "kana": "きっさてん",
                  "meaning": "咖啡店",
                  "meaningEn": "coffee shop",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kissaten"
                  ]
            },
            {
                  "id": "n5-0195",
                  "lexiconId": "jlpt-n5",
                  "japanese": "切手",
                  "kana": "きって",
                  "meaning": "邮票",
                  "meaningEn": "stamp",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kitte"
                  ]
            },
            {
                  "id": "n5-0196",
                  "lexiconId": "jlpt-n5",
                  "japanese": "切符",
                  "kana": "きっぷ",
                  "meaning": "票",
                  "meaningEn": "ticket",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kippu"
                  ]
            },
            {
                  "id": "n5-0197",
                  "lexiconId": "jlpt-n5",
                  "japanese": "昨日",
                  "kana": "きのう",
                  "meaning": "昨天",
                  "meaningEn": "yesterday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kinou"
                  ]
            },
            {
                  "id": "n5-0198",
                  "lexiconId": "jlpt-n5",
                  "japanese": "九",
                  "kana": "きゅう",
                  "meaning": "九",
                  "meaningEn": "nine",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kyuu"
                  ]
            },
            {
                  "id": "n5-0199",
                  "lexiconId": "jlpt-n5",
                  "japanese": "牛肉",
                  "kana": "ぎゅうにく",
                  "meaning": "牛肉",
                  "meaningEn": "beef",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "gyuuniku"
                  ]
            },
            {
                  "id": "n5-0200",
                  "lexiconId": "jlpt-n5",
                  "japanese": "牛乳",
                  "kana": "ぎゅうにゅう",
                  "meaning": "牛奶",
                  "meaningEn": "milk",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "gyuunyuu"
                  ]
            },
            {
                  "id": "n5-0201",
                  "lexiconId": "jlpt-n5",
                  "japanese": "今日",
                  "kana": "きょう",
                  "meaning": "今天",
                  "meaningEn": "today",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kyou"
                  ]
            },
            {
                  "id": "n5-0202",
                  "lexiconId": "jlpt-n5",
                  "japanese": "教室",
                  "kana": "きょうしつ",
                  "meaning": "教室",
                  "meaningEn": "class room",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kyoushitsu"
                  ]
            },
            {
                  "id": "n5-0203",
                  "lexiconId": "jlpt-n5",
                  "japanese": "兄弟",
                  "kana": "きょうだい",
                  "meaning": "兄弟姐妹",
                  "meaningEn": "siblings",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kyoudai"
                  ]
            },
            {
                  "id": "n5-0204",
                  "lexiconId": "jlpt-n5",
                  "japanese": "去年",
                  "kana": "きょねん",
                  "meaning": "去年",
                  "meaningEn": "last year",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kyonen"
                  ]
            },
            {
                  "id": "n5-0205",
                  "lexiconId": "jlpt-n5",
                  "japanese": "嫌い",
                  "kana": "きらい",
                  "meaning": "讨厌；不喜欢",
                  "meaningEn": "unpleasant, not likable",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kirai"
                  ]
            },
            {
                  "id": "n5-0206",
                  "lexiconId": "jlpt-n5",
                  "japanese": "切る",
                  "kana": "きる",
                  "meaning": "切；剪",
                  "meaningEn": "to cut",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kiru"
                  ]
            },
            {
                  "id": "n5-0207",
                  "lexiconId": "jlpt-n5",
                  "japanese": "着る",
                  "kana": "きる",
                  "meaning": "穿；戴",
                  "meaningEn": "to wear, to put on",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kiru"
                  ]
            },
            {
                  "id": "n5-0208",
                  "lexiconId": "jlpt-n5",
                  "japanese": "来る",
                  "kana": "くる",
                  "meaning": "来",
                  "meaningEn": "to come",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kuru"
                  ]
            },
            {
                  "id": "n5-0209",
                  "lexiconId": "jlpt-n5",
                  "japanese": "きれい",
                  "kana": "きれい",
                  "meaning": "漂亮的；干净的",
                  "meaningEn": "beautiful, clean",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kirei"
                  ]
            },
            {
                  "id": "n5-0210",
                  "lexiconId": "jlpt-n5",
                  "japanese": "キロ",
                  "kana": "キロ",
                  "meaning": "公斤",
                  "meaningEn": "kg",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kiro"
                  ]
            },
            {
                  "id": "n5-0211",
                  "lexiconId": "jlpt-n5",
                  "japanese": "キロ",
                  "kana": "キロ",
                  "meaning": "公里",
                  "meaningEn": "km",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kiro"
                  ]
            },
            {
                  "id": "n5-0212",
                  "lexiconId": "jlpt-n5",
                  "japanese": "銀行",
                  "kana": "ぎんこう",
                  "meaning": "银行",
                  "meaningEn": "bank",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ginkou"
                  ]
            },
            {
                  "id": "n5-0213",
                  "lexiconId": "jlpt-n5",
                  "japanese": "金曜日",
                  "kana": "きんようび",
                  "meaning": "星期五",
                  "meaningEn": "Friday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kinyoubi"
                  ]
            },
            {
                  "id": "n5-0214",
                  "lexiconId": "jlpt-n5",
                  "japanese": "九",
                  "kana": "く",
                  "meaning": "九",
                  "meaningEn": "nine",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ku"
                  ]
            },
            {
                  "id": "n5-0215",
                  "lexiconId": "jlpt-n5",
                  "japanese": "薬",
                  "kana": "くすり",
                  "meaning": "药",
                  "meaningEn": "medicine",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kusuri"
                  ]
            },
            {
                  "id": "n5-0216",
                  "lexiconId": "jlpt-n5",
                  "japanese": "下さい",
                  "kana": "ください",
                  "meaning": "请给我……",
                  "meaningEn": "give me…",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kudasai"
                  ]
            },
            {
                  "id": "n5-0217",
                  "lexiconId": "jlpt-n5",
                  "japanese": "果物",
                  "kana": "くだもの",
                  "meaning": "水果",
                  "meaningEn": "fruit",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kudamono"
                  ]
            },
            {
                  "id": "n5-0218",
                  "lexiconId": "jlpt-n5",
                  "japanese": "口",
                  "kana": "くち",
                  "meaning": "嘴",
                  "meaningEn": "mouth",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kuchi"
                  ]
            },
            {
                  "id": "n5-0219",
                  "lexiconId": "jlpt-n5",
                  "japanese": "靴",
                  "kana": "くつ",
                  "meaning": "鞋",
                  "meaningEn": "shoe",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kutsu"
                  ]
            },
            {
                  "id": "n5-0220",
                  "lexiconId": "jlpt-n5",
                  "japanese": "靴下",
                  "kana": "くつした",
                  "meaning": "袜子",
                  "meaningEn": "socks",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kutsushita"
                  ]
            },
            {
                  "id": "n5-0221",
                  "lexiconId": "jlpt-n5",
                  "japanese": "国",
                  "kana": "くに",
                  "meaning": "国家",
                  "meaningEn": "country",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kuni"
                  ]
            },
            {
                  "id": "n5-0222",
                  "lexiconId": "jlpt-n5",
                  "japanese": "曇り",
                  "kana": "くもり",
                  "meaning": "阴天",
                  "meaningEn": "cloudy weather",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kumori"
                  ]
            },
            {
                  "id": "n5-0223",
                  "lexiconId": "jlpt-n5",
                  "japanese": "暗い",
                  "kana": "くらい",
                  "meaning": "暗的；黑暗的",
                  "meaningEn": "dark",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kurai"
                  ]
            },
            {
                  "id": "n5-0224",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ぐらい",
                  "kana": "ぐらい",
                  "meaning": "大约",
                  "meaningEn": "about",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "gurai"
                  ]
            },
            {
                  "id": "n5-0225",
                  "lexiconId": "jlpt-n5",
                  "japanese": "クラス",
                  "kana": "クラス",
                  "meaning": "班级；课",
                  "meaningEn": "class",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kurasu"
                  ]
            },
            {
                  "id": "n5-0226",
                  "lexiconId": "jlpt-n5",
                  "japanese": "グラム",
                  "kana": "グラム",
                  "meaning": "克",
                  "meaningEn": "gram",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "guramu"
                  ]
            },
            {
                  "id": "n5-0227",
                  "lexiconId": "jlpt-n5",
                  "japanese": "車",
                  "kana": "くるま",
                  "meaning": "汽车",
                  "meaningEn": "car",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kuruma"
                  ]
            },
            {
                  "id": "n5-0228",
                  "lexiconId": "jlpt-n5",
                  "japanese": "黒い",
                  "kana": "くろい",
                  "meaning": "黑色的",
                  "meaningEn": "black",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kuroi"
                  ]
            },
            {
                  "id": "n5-0229",
                  "lexiconId": "jlpt-n5",
                  "japanese": "今朝",
                  "kana": "けさ",
                  "meaning": "今天早上",
                  "meaningEn": "this morning",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kesa"
                  ]
            },
            {
                  "id": "n5-0230",
                  "lexiconId": "jlpt-n5",
                  "japanese": "消す",
                  "kana": "けす",
                  "meaning": "关掉",
                  "meaningEn": "to turn off, switch off",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kesu"
                  ]
            },
            {
                  "id": "n5-0231",
                  "lexiconId": "jlpt-n5",
                  "japanese": "けっこう",
                  "kana": "けっこう",
                  "meaning": "可以；很好",
                  "meaningEn": "fine, all right",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kekkou"
                  ]
            },
            {
                  "id": "n5-0232",
                  "lexiconId": "jlpt-n5",
                  "japanese": "結婚",
                  "kana": "けっこん",
                  "meaning": "结婚",
                  "meaningEn": "marriage",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kekkon"
                  ]
            },
            {
                  "id": "n5-0233",
                  "lexiconId": "jlpt-n5",
                  "japanese": "月曜日",
                  "kana": "げつようび",
                  "meaning": "星期一",
                  "meaningEn": "Monday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "getsuyoubi"
                  ]
            },
            {
                  "id": "n5-0234",
                  "lexiconId": "jlpt-n5",
                  "japanese": "玄関",
                  "kana": "げんかん",
                  "meaning": "玄关",
                  "meaningEn": "entrance of a house",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "genkan"
                  ]
            },
            {
                  "id": "n5-0235",
                  "lexiconId": "jlpt-n5",
                  "japanese": "元気",
                  "kana": "げんき",
                  "meaning": "精神；健康",
                  "meaningEn": "vigor, health, vitality",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "genki"
                  ]
            },
            {
                  "id": "n5-0236",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜個",
                  "kana": "〜こ",
                  "meaning": "小物品的量词",
                  "meaningEn": "counter for small objects",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~ko"
                  ]
            },
            {
                  "id": "n5-0237",
                  "lexiconId": "jlpt-n5",
                  "japanese": "五",
                  "kana": "ご",
                  "meaning": "五",
                  "meaningEn": "five",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "go"
                  ]
            },
            {
                  "id": "n5-0238",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜語",
                  "kana": "〜ご",
                  "meaning": "～语",
                  "meaningEn": "~ language",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~go"
                  ]
            },
            {
                  "id": "n5-0239",
                  "lexiconId": "jlpt-n5",
                  "japanese": "公園",
                  "kana": "こうえん",
                  "meaning": "公园；大花园",
                  "meaningEn": "park, large garden",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kouen"
                  ]
            },
            {
                  "id": "n5-0240",
                  "lexiconId": "jlpt-n5",
                  "japanese": "交番",
                  "kana": "こうばん",
                  "meaning": "派出所；交番",
                  "meaningEn": "police box",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kouban"
                  ]
            },
            {
                  "id": "n5-0241",
                  "lexiconId": "jlpt-n5",
                  "japanese": "声",
                  "kana": "こえ",
                  "meaning": "声音",
                  "meaningEn": "voice",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "koe"
                  ]
            },
            {
                  "id": "n5-0242",
                  "lexiconId": "jlpt-n5",
                  "japanese": "コート",
                  "kana": "コート",
                  "meaning": "外套",
                  "meaningEn": "coat",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kooto"
                  ]
            },
            {
                  "id": "n5-0243",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ここ",
                  "kana": "ここ",
                  "meaning": "这里",
                  "meaningEn": "here",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "koko"
                  ]
            },
            {
                  "id": "n5-0244",
                  "lexiconId": "jlpt-n5",
                  "japanese": "午後",
                  "kana": "ごご",
                  "meaning": "下午",
                  "meaningEn": "afternoon",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "gogo"
                  ]
            },
            {
                  "id": "n5-0245",
                  "lexiconId": "jlpt-n5",
                  "japanese": "九日",
                  "kana": "ここのか",
                  "meaning": "每月9日；9天",
                  "meaningEn": "9th day of a month, 9 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kokonoka"
                  ]
            },
            {
                  "id": "n5-0246",
                  "lexiconId": "jlpt-n5",
                  "japanese": "九つ",
                  "kana": "ここのつ",
                  "meaning": "九",
                  "meaningEn": "nine",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kokonotsu"
                  ]
            },
            {
                  "id": "n5-0247",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ご主人",
                  "kana": "ごしゅじん",
                  "meaning": "别人的丈夫",
                  "meaningEn": "someone else’s husband",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "goshujin"
                  ]
            },
            {
                  "id": "n5-0248",
                  "lexiconId": "jlpt-n5",
                  "japanese": "午前",
                  "kana": "ごぜん",
                  "meaning": "早上；上午",
                  "meaningEn": "morning, a.m.",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "gozen"
                  ]
            },
            {
                  "id": "n5-0249",
                  "lexiconId": "jlpt-n5",
                  "japanese": "答える",
                  "kana": "こたえる",
                  "meaning": "回答",
                  "meaningEn": "to answer",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kotaeru"
                  ]
            },
            {
                  "id": "n5-0250",
                  "lexiconId": "jlpt-n5",
                  "japanese": "こちら",
                  "kana": "こちら",
                  "meaning": "这边；这个地方",
                  "meaningEn": "this side, this place",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kochira"
                  ]
            },
            {
                  "id": "n5-0251",
                  "lexiconId": "jlpt-n5",
                  "japanese": "コップ",
                  "kana": "コップ",
                  "meaning": "杯子；玻璃杯",
                  "meaningEn": "cup, glass",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "koppu"
                  ]
            },
            {
                  "id": "n5-0252",
                  "lexiconId": "jlpt-n5",
                  "japanese": "今年",
                  "kana": "ことし",
                  "meaning": "今年",
                  "meaningEn": "this year",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kotoshi"
                  ]
            },
            {
                  "id": "n5-0253",
                  "lexiconId": "jlpt-n5",
                  "japanese": "言葉",
                  "kana": "ことば",
                  "meaning": "词语；语言",
                  "meaningEn": "phrase, language",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kotoba"
                  ]
            },
            {
                  "id": "n5-0254",
                  "lexiconId": "jlpt-n5",
                  "japanese": "子供",
                  "kana": "こども",
                  "meaning": "孩子",
                  "meaningEn": "child",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kodomo"
                  ]
            },
            {
                  "id": "n5-0255",
                  "lexiconId": "jlpt-n5",
                  "japanese": "この",
                  "kana": "この",
                  "meaning": "这个……",
                  "meaningEn": "this…",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kono"
                  ]
            },
            {
                  "id": "n5-0256",
                  "lexiconId": "jlpt-n5",
                  "japanese": "御飯",
                  "kana": "ごはん",
                  "meaning": "饭；米饭",
                  "meaningEn": "meal, cooked rice",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "gohan"
                  ]
            },
            {
                  "id": "n5-0257",
                  "lexiconId": "jlpt-n5",
                  "japanese": "困る",
                  "kana": "こまる",
                  "meaning": "困扰；为难",
                  "meaningEn": "to be in trouble",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "komaru"
                  ]
            },
            {
                  "id": "n5-0258",
                  "lexiconId": "jlpt-n5",
                  "japanese": "これ",
                  "kana": "これ",
                  "meaning": "这个",
                  "meaningEn": "this",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kore"
                  ]
            },
            {
                  "id": "n5-0259",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ごろ",
                  "kana": "ごろ",
                  "meaning": "大约；左右",
                  "meaningEn": "around…",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "goro"
                  ]
            },
            {
                  "id": "n5-0260",
                  "lexiconId": "jlpt-n5",
                  "japanese": "今月",
                  "kana": "こんげつ",
                  "meaning": "这个月",
                  "meaningEn": "this month",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "kongetsu"
                  ]
            },
            {
                  "id": "n5-0261",
                  "lexiconId": "jlpt-n5",
                  "japanese": "今週",
                  "kana": "こんしゅう",
                  "meaning": "这周",
                  "meaningEn": "this week",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "konshuu"
                  ]
            },
            {
                  "id": "n5-0262",
                  "lexiconId": "jlpt-n5",
                  "japanese": "こんな",
                  "kana": "こんな",
                  "meaning": "这种；这样的",
                  "meaningEn": "this sort of, this kind of",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "konna"
                  ]
            },
            {
                  "id": "n5-0263",
                  "lexiconId": "jlpt-n5",
                  "japanese": "今晩",
                  "kana": "こんばん",
                  "meaning": "今晚",
                  "meaningEn": "this evening",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "konban"
                  ]
            },
            {
                  "id": "n5-0264",
                  "lexiconId": "jlpt-n5",
                  "japanese": "さあ",
                  "kana": "さあ",
                  "meaning": "嗯；那么",
                  "meaningEn": "well…",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "saa"
                  ]
            },
            {
                  "id": "n5-0265",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜歳",
                  "kana": "〜さい",
                  "meaning": "岁",
                  "meaningEn": "years old",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~sai"
                  ]
            },
            {
                  "id": "n5-0266",
                  "lexiconId": "jlpt-n5",
                  "japanese": "魚",
                  "kana": "さかな",
                  "meaning": "鱼",
                  "meaningEn": "fish",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sakana"
                  ]
            },
            {
                  "id": "n5-0267",
                  "lexiconId": "jlpt-n5",
                  "japanese": "先",
                  "kana": "さき",
                  "meaning": "早些；以前的",
                  "meaningEn": "earlier, former",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "saki"
                  ]
            },
            {
                  "id": "n5-0268",
                  "lexiconId": "jlpt-n5",
                  "japanese": "咲く",
                  "kana": "さく",
                  "meaning": "开花",
                  "meaningEn": "to blossom",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "saku"
                  ]
            },
            {
                  "id": "n5-0269",
                  "lexiconId": "jlpt-n5",
                  "japanese": "作文",
                  "kana": "さくぶん",
                  "meaning": "作文",
                  "meaningEn": "composition",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sakubun"
                  ]
            },
            {
                  "id": "n5-0270",
                  "lexiconId": "jlpt-n5",
                  "japanese": "さす",
                  "kana": "さす",
                  "meaning": "撑伞",
                  "meaningEn": "to open an umbrella",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sasu"
                  ]
            },
            {
                  "id": "n5-0271",
                  "lexiconId": "jlpt-n5",
                  "japanese": "冊",
                  "kana": "〜さつ",
                  "meaning": "书本的量词",
                  "meaningEn": "counter for books",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~satsu"
                  ]
            },
            {
                  "id": "n5-0272",
                  "lexiconId": "jlpt-n5",
                  "japanese": "雑誌",
                  "kana": "ざっし",
                  "meaning": "杂志",
                  "meaningEn": "magazine",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "zasshi"
                  ]
            },
            {
                  "id": "n5-0273",
                  "lexiconId": "jlpt-n5",
                  "japanese": "砂糖",
                  "kana": "さとう",
                  "meaning": "砂糖",
                  "meaningEn": "sugar",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "satou"
                  ]
            },
            {
                  "id": "n5-0274",
                  "lexiconId": "jlpt-n5",
                  "japanese": "寒い",
                  "kana": "さむい",
                  "meaning": "冷的；凉的",
                  "meaningEn": "cold",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "samui"
                  ]
            },
            {
                  "id": "n5-0275",
                  "lexiconId": "jlpt-n5",
                  "japanese": "再来年",
                  "kana": "さらいねん",
                  "meaning": "后年",
                  "meaningEn": "the year after next year",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sarainen"
                  ]
            },
            {
                  "id": "n5-0276",
                  "lexiconId": "jlpt-n5",
                  "japanese": "三",
                  "kana": "さん",
                  "meaning": "三",
                  "meaningEn": "three",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "san"
                  ]
            },
            {
                  "id": "n5-0277",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜さん",
                  "kana": "〜さん",
                  "meaning": "先生；女士",
                  "meaningEn": "Mr., Mrs.",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~san"
                  ]
            },
            {
                  "id": "n5-0278",
                  "lexiconId": "jlpt-n5",
                  "japanese": "散歩",
                  "kana": "さんぽ",
                  "meaning": "散步",
                  "meaningEn": "to take a walk",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sanpo"
                  ]
            },
            {
                  "id": "n5-0279",
                  "lexiconId": "jlpt-n5",
                  "japanese": "四",
                  "kana": "し",
                  "meaning": "四",
                  "meaningEn": "four",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shi"
                  ]
            },
            {
                  "id": "n5-0280",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜時",
                  "kana": "〜じ",
                  "meaning": "点钟",
                  "meaningEn": "o’clock",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~ji"
                  ]
            },
            {
                  "id": "n5-0281",
                  "lexiconId": "jlpt-n5",
                  "japanese": "塩",
                  "kana": "しお",
                  "meaning": "盐",
                  "meaningEn": "salt",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shio"
                  ]
            },
            {
                  "id": "n5-0282",
                  "lexiconId": "jlpt-n5",
                  "japanese": "しかし",
                  "kana": "しかし",
                  "meaning": "但是；然而",
                  "meaningEn": "however, but",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shikashi"
                  ]
            },
            {
                  "id": "n5-0283",
                  "lexiconId": "jlpt-n5",
                  "japanese": "時間",
                  "kana": "じかん",
                  "meaning": "时间",
                  "meaningEn": "time",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "jikan"
                  ]
            },
            {
                  "id": "n5-0284",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜時間",
                  "kana": "〜じかん",
                  "meaning": "～小时",
                  "meaningEn": "~hours (classificator)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~jikan"
                  ]
            },
            {
                  "id": "n5-0285",
                  "lexiconId": "jlpt-n5",
                  "japanese": "仕事",
                  "kana": "しごと",
                  "meaning": "工作",
                  "meaningEn": "work",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shigoto"
                  ]
            },
            {
                  "id": "n5-0286",
                  "lexiconId": "jlpt-n5",
                  "japanese": "辞書",
                  "kana": "じしょ",
                  "meaning": "词典；字典",
                  "meaningEn": "dictionary",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "jisho"
                  ]
            },
            {
                  "id": "n5-0287",
                  "lexiconId": "jlpt-n5",
                  "japanese": "静か",
                  "kana": "しずか",
                  "meaning": "安静的",
                  "meaningEn": "quiet",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shizuka"
                  ]
            },
            {
                  "id": "n5-0288",
                  "lexiconId": "jlpt-n5",
                  "japanese": "下",
                  "kana": "した",
                  "meaning": "下面；下方",
                  "meaningEn": "under, below",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shita"
                  ]
            },
            {
                  "id": "n5-0289",
                  "lexiconId": "jlpt-n5",
                  "japanese": "質問",
                  "kana": "しつもん",
                  "meaning": "问题",
                  "meaningEn": "question",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shitsumon"
                  ]
            },
            {
                  "id": "n5-0290",
                  "lexiconId": "jlpt-n5",
                  "japanese": "自転車",
                  "kana": "じてんしゃ",
                  "meaning": "自行车",
                  "meaningEn": "bicycle",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "jitensha"
                  ]
            },
            {
                  "id": "n5-0291",
                  "lexiconId": "jlpt-n5",
                  "japanese": "自動車",
                  "kana": "じどうしゃ",
                  "meaning": "汽车；车辆",
                  "meaningEn": "car, vehicle",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "jidousha"
                  ]
            },
            {
                  "id": "n5-0292",
                  "lexiconId": "jlpt-n5",
                  "japanese": "死ぬ",
                  "kana": "しぬ",
                  "meaning": "死；去世",
                  "meaningEn": "to die, to pas away",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shinu"
                  ]
            },
            {
                  "id": "n5-0293",
                  "lexiconId": "jlpt-n5",
                  "japanese": "字引",
                  "kana": "じびき",
                  "meaning": "词典；字典",
                  "meaningEn": "dictionary",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "jibiki"
                  ]
            },
            {
                  "id": "n5-0294",
                  "lexiconId": "jlpt-n5",
                  "japanese": "自分",
                  "kana": "じぶん",
                  "meaning": "自己",
                  "meaningEn": "oneself",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "jibun"
                  ]
            },
            {
                  "id": "n5-0295",
                  "lexiconId": "jlpt-n5",
                  "japanese": "閉まる",
                  "kana": "しまる",
                  "meaning": "关闭",
                  "meaningEn": "to close",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shimaru"
                  ]
            },
            {
                  "id": "n5-0296",
                  "lexiconId": "jlpt-n5",
                  "japanese": "閉める",
                  "kana": "しめる",
                  "meaning": "关闭",
                  "meaningEn": "to close",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shimeru"
                  ]
            },
            {
                  "id": "n5-0297",
                  "lexiconId": "jlpt-n5",
                  "japanese": "締める",
                  "kana": "しめる",
                  "meaning": "系上安全带",
                  "meaningEn": "to fasten a seatbelt",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shimeru"
                  ]
            },
            {
                  "id": "n5-0298",
                  "lexiconId": "jlpt-n5",
                  "japanese": "じゃ",
                  "kana": "じゃ",
                  "meaning": "那么；那就",
                  "meaningEn": "well, then",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ja"
                  ]
            },
            {
                  "id": "n5-0299",
                  "lexiconId": "jlpt-n5",
                  "japanese": "写真",
                  "kana": "しゃしん",
                  "meaning": "照片",
                  "meaningEn": "photo",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shashin"
                  ]
            },
            {
                  "id": "n5-0300",
                  "lexiconId": "jlpt-n5",
                  "japanese": "シャツ",
                  "kana": "シャツ",
                  "meaning": "衬衫",
                  "meaningEn": "shirt",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shatsu"
                  ]
            },
            {
                  "id": "n5-0301",
                  "lexiconId": "jlpt-n5",
                  "japanese": "十",
                  "kana": "じゅう",
                  "meaning": "十",
                  "meaningEn": "ten",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "juu"
                  ]
            },
            {
                  "id": "n5-0302",
                  "lexiconId": "jlpt-n5",
                  "japanese": "~週間",
                  "kana": "〜しゅうかん",
                  "meaning": "……周",
                  "meaningEn": "… weeks",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~shuukan"
                  ]
            },
            {
                  "id": "n5-0303",
                  "lexiconId": "jlpt-n5",
                  "japanese": "授業",
                  "kana": "じゅぎょう",
                  "meaning": "课；课程",
                  "meaningEn": "lesson, class",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "jugyou"
                  ]
            },
            {
                  "id": "n5-0304",
                  "lexiconId": "jlpt-n5",
                  "japanese": "宿題",
                  "kana": "しゅくだい",
                  "meaning": "作业",
                  "meaningEn": "homework",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shukudai"
                  ]
            },
            {
                  "id": "n5-0305",
                  "lexiconId": "jlpt-n5",
                  "japanese": "上手",
                  "kana": "じょうず",
                  "meaning": "擅长",
                  "meaningEn": "to be good at something",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "jouzu"
                  ]
            },
            {
                  "id": "n5-0306",
                  "lexiconId": "jlpt-n5",
                  "japanese": "丈夫",
                  "kana": "じょうぶ",
                  "meaning": "结实的；耐用的",
                  "meaningEn": "to be strong, durable",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "joubu"
                  ]
            },
            {
                  "id": "n5-0307",
                  "lexiconId": "jlpt-n5",
                  "japanese": "醤油",
                  "kana": "しょうゆ",
                  "meaning": "酱油",
                  "meaningEn": "soy sauce",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shouyu"
                  ]
            },
            {
                  "id": "n5-0308",
                  "lexiconId": "jlpt-n5",
                  "japanese": "食堂",
                  "kana": "しょくどう",
                  "meaning": "食堂",
                  "meaningEn": "dining room, canteen",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shokudou"
                  ]
            },
            {
                  "id": "n5-0309",
                  "lexiconId": "jlpt-n5",
                  "japanese": "知る",
                  "kana": "しる",
                  "meaning": "知道",
                  "meaningEn": "to know",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shiru"
                  ]
            },
            {
                  "id": "n5-0310",
                  "lexiconId": "jlpt-n5",
                  "japanese": "白い",
                  "kana": "しろい",
                  "meaning": "白色的",
                  "meaningEn": "white",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shiroi"
                  ]
            },
            {
                  "id": "n5-0311",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜人",
                  "kana": "〜じん",
                  "meaning": "～人（国籍）",
                  "meaningEn": "~an, ~ese (nationality)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~jin"
                  ]
            },
            {
                  "id": "n5-0312",
                  "lexiconId": "jlpt-n5",
                  "japanese": "新聞",
                  "kana": "しんぶん",
                  "meaning": "报纸",
                  "meaningEn": "newspaper",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "shinbun"
                  ]
            },
            {
                  "id": "n5-0313",
                  "lexiconId": "jlpt-n5",
                  "japanese": "水曜日",
                  "kana": "すいようび",
                  "meaning": "星期三",
                  "meaningEn": "Wednesday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "suiyoubi"
                  ]
            },
            {
                  "id": "n5-0314",
                  "lexiconId": "jlpt-n5",
                  "japanese": "吸う",
                  "kana": "すう",
                  "meaning": "呼吸；吸烟",
                  "meaningEn": "to breathe, to smoke",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "suu"
                  ]
            },
            {
                  "id": "n5-0315",
                  "lexiconId": "jlpt-n5",
                  "japanese": "スカート",
                  "kana": "スカート",
                  "meaning": "裙子",
                  "meaningEn": "skirt",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sukaato"
                  ]
            },
            {
                  "id": "n5-0316",
                  "lexiconId": "jlpt-n5",
                  "japanese": "好き",
                  "kana": "すき",
                  "meaning": "喜欢",
                  "meaningEn": "to like",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "suki"
                  ]
            },
            {
                  "id": "n5-0317",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜過ぎ",
                  "kana": "〜すぎ",
                  "meaning": "过了；超过",
                  "meaningEn": "past, over",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~sugi"
                  ]
            },
            {
                  "id": "n5-0318",
                  "lexiconId": "jlpt-n5",
                  "japanese": "すぐに",
                  "kana": "すぐに",
                  "meaning": "立刻；马上",
                  "meaningEn": "at once",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sugu ni"
                  ]
            },
            {
                  "id": "n5-0319",
                  "lexiconId": "jlpt-n5",
                  "japanese": "少し",
                  "kana": "すこし",
                  "meaning": "一点儿",
                  "meaningEn": "a little",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sukoshi"
                  ]
            },
            {
                  "id": "n5-0320",
                  "lexiconId": "jlpt-n5",
                  "japanese": "涼しい",
                  "kana": "すずしい",
                  "meaning": "凉爽的",
                  "meaningEn": "cool",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "suzushii"
                  ]
            },
            {
                  "id": "n5-0321",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜ずつ",
                  "kana": "〜ずつ",
                  "meaning": "各自",
                  "meaningEn": "each",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~zutsu"
                  ]
            },
            {
                  "id": "n5-0322",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ストーブ",
                  "kana": "ストーブ",
                  "meaning": "炉子；取暖器",
                  "meaningEn": "stove, heater",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sutoobu"
                  ]
            },
            {
                  "id": "n5-0323",
                  "lexiconId": "jlpt-n5",
                  "japanese": "スプーン",
                  "kana": "スプーン",
                  "meaning": "勺子",
                  "meaningEn": "spoon",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "supuun"
                  ]
            },
            {
                  "id": "n5-0324",
                  "lexiconId": "jlpt-n5",
                  "japanese": "スポーツ",
                  "kana": "スポーツ",
                  "meaning": "运动",
                  "meaningEn": "sports",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "supootsu"
                  ]
            },
            {
                  "id": "n5-0325",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ズボン",
                  "kana": "ズボン",
                  "meaning": "裤子",
                  "meaningEn": "trousers",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "zubon"
                  ]
            },
            {
                  "id": "n5-0326",
                  "lexiconId": "jlpt-n5",
                  "japanese": "住む",
                  "kana": "すむ",
                  "meaning": "居住",
                  "meaningEn": "to live, to reside somewhere",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sumu"
                  ]
            },
            {
                  "id": "n5-0327",
                  "lexiconId": "jlpt-n5",
                  "japanese": "スリッパ",
                  "kana": "スリッパ",
                  "meaning": "拖鞋",
                  "meaningEn": "slipper",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "surippa"
                  ]
            },
            {
                  "id": "n5-0328",
                  "lexiconId": "jlpt-n5",
                  "japanese": "する",
                  "kana": "する",
                  "meaning": "做",
                  "meaningEn": "to do",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "suru"
                  ]
            },
            {
                  "id": "n5-0329",
                  "lexiconId": "jlpt-n5",
                  "japanese": "座る",
                  "kana": "すわる",
                  "meaning": "坐",
                  "meaningEn": "to sit",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "suwaru"
                  ]
            },
            {
                  "id": "n5-0330",
                  "lexiconId": "jlpt-n5",
                  "japanese": "背",
                  "kana": "せい",
                  "meaning": "身高",
                  "meaningEn": "height",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sei"
                  ]
            },
            {
                  "id": "n5-0331",
                  "lexiconId": "jlpt-n5",
                  "japanese": "生徒",
                  "kana": "せいと",
                  "meaning": "学生",
                  "meaningEn": "student",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "seito"
                  ]
            },
            {
                  "id": "n5-0332",
                  "lexiconId": "jlpt-n5",
                  "japanese": "セーター",
                  "kana": "セーター",
                  "meaning": "毛衣",
                  "meaningEn": "sweater",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "seetaa"
                  ]
            },
            {
                  "id": "n5-0333",
                  "lexiconId": "jlpt-n5",
                  "japanese": "石鹸",
                  "kana": "せっけん",
                  "meaning": "肥皂",
                  "meaningEn": "soap",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sekken"
                  ]
            },
            {
                  "id": "n5-0334",
                  "lexiconId": "jlpt-n5",
                  "japanese": "背広",
                  "kana": "せびろ",
                  "meaning": "西装；夹克",
                  "meaningEn": "jacket, suit",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sebiro"
                  ]
            },
            {
                  "id": "n5-0335",
                  "lexiconId": "jlpt-n5",
                  "japanese": "狭い",
                  "kana": "せまい",
                  "meaning": "狭窄的",
                  "meaningEn": "narrow",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "semai"
                  ]
            },
            {
                  "id": "n5-0336",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ゼロ",
                  "kana": "ゼロ",
                  "meaning": "零",
                  "meaningEn": "zero",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "zero"
                  ]
            },
            {
                  "id": "n5-0337",
                  "lexiconId": "jlpt-n5",
                  "japanese": "千",
                  "kana": "せん",
                  "meaning": "一千",
                  "meaningEn": "1,000, thousand",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sen"
                  ]
            },
            {
                  "id": "n5-0338",
                  "lexiconId": "jlpt-n5",
                  "japanese": "先月",
                  "kana": "せんげつ",
                  "meaning": "上个月",
                  "meaningEn": "last month",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sengetsu"
                  ]
            },
            {
                  "id": "n5-0339",
                  "lexiconId": "jlpt-n5",
                  "japanese": "先週",
                  "kana": "せんしゅう",
                  "meaning": "上周",
                  "meaningEn": "last week",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "senshuu"
                  ]
            },
            {
                  "id": "n5-0340",
                  "lexiconId": "jlpt-n5",
                  "japanese": "先生",
                  "kana": "せんせい",
                  "meaning": "老师",
                  "meaningEn": "teacher",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sensei"
                  ]
            },
            {
                  "id": "n5-0341",
                  "lexiconId": "jlpt-n5",
                  "japanese": "洗濯",
                  "kana": "せんたく",
                  "meaning": "洗涤；洗",
                  "meaningEn": "washing, to wash",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sentaku"
                  ]
            },
            {
                  "id": "n5-0342",
                  "lexiconId": "jlpt-n5",
                  "japanese": "全部",
                  "kana": "ぜんぶ",
                  "meaning": "全部；所有",
                  "meaningEn": "all",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "zenbu"
                  ]
            },
            {
                  "id": "n5-0343",
                  "lexiconId": "jlpt-n5",
                  "japanese": "そう",
                  "kana": "そう",
                  "meaning": "这样；如此",
                  "meaningEn": "so",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sou"
                  ]
            },
            {
                  "id": "n5-0344",
                  "lexiconId": "jlpt-n5",
                  "japanese": "掃除",
                  "kana": "そうじ",
                  "meaning": "打扫",
                  "meaningEn": "to clean",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "souji"
                  ]
            },
            {
                  "id": "n5-0345",
                  "lexiconId": "jlpt-n5",
                  "japanese": "そうして",
                  "kana": "そうして",
                  "meaning": "然后",
                  "meaningEn": "and then",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "soushite"
                  ]
            },
            {
                  "id": "n5-0346",
                  "lexiconId": "jlpt-n5",
                  "japanese": "そこ",
                  "kana": "そこ",
                  "meaning": "那里",
                  "meaningEn": "there",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "soko"
                  ]
            },
            {
                  "id": "n5-0347",
                  "lexiconId": "jlpt-n5",
                  "japanese": "そちら",
                  "kana": "そちら",
                  "meaning": "那里（礼貌说法）",
                  "meaningEn": "there (polite)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sochira"
                  ]
            },
            {
                  "id": "n5-0348",
                  "lexiconId": "jlpt-n5",
                  "japanese": "外",
                  "kana": "そと",
                  "meaning": "外面",
                  "meaningEn": "outside",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "soto"
                  ]
            },
            {
                  "id": "n5-0349",
                  "lexiconId": "jlpt-n5",
                  "japanese": "その",
                  "kana": "その",
                  "meaning": "那个……",
                  "meaningEn": "that…",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sono"
                  ]
            },
            {
                  "id": "n5-0350",
                  "lexiconId": "jlpt-n5",
                  "japanese": "そば",
                  "kana": "そば",
                  "meaning": "旁边",
                  "meaningEn": "next to",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "soba"
                  ]
            },
            {
                  "id": "n5-0351",
                  "lexiconId": "jlpt-n5",
                  "japanese": "空",
                  "kana": "そら",
                  "meaning": "天空",
                  "meaningEn": "sky",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sora"
                  ]
            },
            {
                  "id": "n5-0352",
                  "lexiconId": "jlpt-n5",
                  "japanese": "それ",
                  "kana": "それ",
                  "meaning": "那个",
                  "meaningEn": "that",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sore"
                  ]
            },
            {
                  "id": "n5-0353",
                  "lexiconId": "jlpt-n5",
                  "japanese": "それから",
                  "kana": "それから",
                  "meaning": "然后；之后",
                  "meaningEn": "after that",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "sorekara"
                  ]
            },
            {
                  "id": "n5-0354",
                  "lexiconId": "jlpt-n5",
                  "japanese": "それでは",
                  "kana": "それでは",
                  "meaning": "那么；那就",
                  "meaningEn": "then, well",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "soredewa"
                  ]
            },
            {
                  "id": "n5-0355",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜台",
                  "kana": "〜だい",
                  "meaning": "机器、车辆的量词",
                  "meaningEn": "counter for machines",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~dai"
                  ]
            },
            {
                  "id": "n5-0356",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大学",
                  "kana": "だいがく",
                  "meaning": "大学",
                  "meaningEn": "university",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "daigaku"
                  ]
            },
            {
                  "id": "n5-0357",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大使館",
                  "kana": "たいしかん",
                  "meaning": "大使馆",
                  "meaningEn": "embassy",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "taishikan"
                  ]
            },
            {
                  "id": "n5-0358",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大丈夫",
                  "kana": "だいじょうぶ",
                  "meaning": "可以；没问题",
                  "meaningEn": "OK",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "daijoubu"
                  ]
            },
            {
                  "id": "n5-0359",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大好き",
                  "kana": "だいすき",
                  "meaning": "非常喜欢",
                  "meaningEn": "to be very fond of",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "daisuki"
                  ]
            },
            {
                  "id": "n5-0360",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大切",
                  "kana": "たいせつ",
                  "meaning": "重要的",
                  "meaningEn": "very important",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "taisetsu"
                  ]
            },
            {
                  "id": "n5-0361",
                  "lexiconId": "jlpt-n5",
                  "japanese": "たいてい",
                  "kana": "たいてい",
                  "meaning": "大多；通常",
                  "meaningEn": "mostly, usually",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "taitei"
                  ]
            },
            {
                  "id": "n5-0362",
                  "lexiconId": "jlpt-n5",
                  "japanese": "台所",
                  "kana": "だいどころ",
                  "meaning": "厨房",
                  "meaningEn": "kitchen",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "daidokoro"
                  ]
            },
            {
                  "id": "n5-0363",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大変",
                  "kana": "たいへん",
                  "meaning": "非常；严重的",
                  "meaningEn": "very, serious",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "taihen"
                  ]
            },
            {
                  "id": "n5-0364",
                  "lexiconId": "jlpt-n5",
                  "japanese": "高い",
                  "kana": "たかい",
                  "meaning": "高的；贵的",
                  "meaningEn": "high, expensive",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "takai"
                  ]
            },
            {
                  "id": "n5-0365",
                  "lexiconId": "jlpt-n5",
                  "japanese": "沢山",
                  "kana": "たくさん",
                  "meaning": "很多",
                  "meaningEn": "many, much",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "takusan"
                  ]
            },
            {
                  "id": "n5-0366",
                  "lexiconId": "jlpt-n5",
                  "japanese": "タクシー",
                  "kana": "タクシー",
                  "meaning": "出租车",
                  "meaningEn": "taxi",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "takushii"
                  ]
            },
            {
                  "id": "n5-0367",
                  "lexiconId": "jlpt-n5",
                  "japanese": "出す",
                  "kana": "だす",
                  "meaning": "拿出；提交",
                  "meaningEn": "to take out, hand in",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "dasu"
                  ]
            },
            {
                  "id": "n5-0368",
                  "lexiconId": "jlpt-n5",
                  "japanese": "~達",
                  "kana": "〜たち",
                  "meaning": "复数；等人",
                  "meaningEn": "more than one, and others",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~tachi"
                  ]
            },
            {
                  "id": "n5-0369",
                  "lexiconId": "jlpt-n5",
                  "japanese": "立つ",
                  "kana": "たつ",
                  "meaning": "站立",
                  "meaningEn": "to stand",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tatsu"
                  ]
            },
            {
                  "id": "n5-0370",
                  "lexiconId": "jlpt-n5",
                  "japanese": "建物",
                  "kana": "たてもの",
                  "meaning": "建筑物",
                  "meaningEn": "building",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tatemono"
                  ]
            },
            {
                  "id": "n5-0371",
                  "lexiconId": "jlpt-n5",
                  "japanese": "楽しい",
                  "kana": "たのしい",
                  "meaning": "愉快的；开心的",
                  "meaningEn": "pleasant, enjoyable",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tanoshii"
                  ]
            },
            {
                  "id": "n5-0372",
                  "lexiconId": "jlpt-n5",
                  "japanese": "頼む",
                  "kana": "たのむ",
                  "meaning": "询问；请求",
                  "meaningEn": "to ask, to request",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tanomu"
                  ]
            },
            {
                  "id": "n5-0373",
                  "lexiconId": "jlpt-n5",
                  "japanese": "たばこ",
                  "kana": "たばこ",
                  "meaning": "香烟",
                  "meaningEn": "cigarette",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tabako"
                  ]
            },
            {
                  "id": "n5-0374",
                  "lexiconId": "jlpt-n5",
                  "japanese": "多分",
                  "kana": "たぶん",
                  "meaning": "也许；大概",
                  "meaningEn": "perhaps, probably",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tabun"
                  ]
            },
            {
                  "id": "n5-0375",
                  "lexiconId": "jlpt-n5",
                  "japanese": "食べ物",
                  "kana": "たべもの",
                  "meaning": "食物",
                  "meaningEn": "food",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tabemono"
                  ]
            },
            {
                  "id": "n5-0376",
                  "lexiconId": "jlpt-n5",
                  "japanese": "食べる",
                  "kana": "たべる",
                  "meaning": "吃",
                  "meaningEn": "to eat",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "taberu"
                  ]
            },
            {
                  "id": "n5-0377",
                  "lexiconId": "jlpt-n5",
                  "japanese": "卵",
                  "kana": "たまご",
                  "meaning": "鸡蛋",
                  "meaningEn": "egg",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tamago"
                  ]
            },
            {
                  "id": "n5-0378",
                  "lexiconId": "jlpt-n5",
                  "japanese": "誰",
                  "kana": "だれ",
                  "meaning": "谁？",
                  "meaningEn": "who?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "dare"
                  ]
            },
            {
                  "id": "n5-0379",
                  "lexiconId": "jlpt-n5",
                  "japanese": "誕生日",
                  "kana": "たんじょうび",
                  "meaning": "生日",
                  "meaningEn": "birthday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tanjoubi"
                  ]
            },
            {
                  "id": "n5-0380",
                  "lexiconId": "jlpt-n5",
                  "japanese": "だんだん",
                  "kana": "だんだん",
                  "meaning": "渐渐地",
                  "meaningEn": "gradually",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "dandan"
                  ]
            },
            {
                  "id": "n5-0381",
                  "lexiconId": "jlpt-n5",
                  "japanese": "小さい",
                  "kana": "ちいさい",
                  "meaning": "小的",
                  "meaningEn": "small",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "chiisai"
                  ]
            },
            {
                  "id": "n5-0382",
                  "lexiconId": "jlpt-n5",
                  "japanese": "近い",
                  "kana": "ちかい",
                  "meaning": "近的",
                  "meaningEn": "near, close",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "chikai"
                  ]
            },
            {
                  "id": "n5-0383",
                  "lexiconId": "jlpt-n5",
                  "japanese": "違う",
                  "kana": "ちがう",
                  "meaning": "不同的",
                  "meaningEn": "different",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "chigau"
                  ]
            },
            {
                  "id": "n5-0384",
                  "lexiconId": "jlpt-n5",
                  "japanese": "地下鉄",
                  "kana": "ちかてつ",
                  "meaning": "地铁",
                  "meaningEn": "subway",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "chikatetsu"
                  ]
            },
            {
                  "id": "n5-0385",
                  "lexiconId": "jlpt-n5",
                  "japanese": "地図",
                  "kana": "ちず",
                  "meaning": "地图",
                  "meaningEn": "map",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "chizu"
                  ]
            },
            {
                  "id": "n5-0386",
                  "lexiconId": "jlpt-n5",
                  "japanese": "父",
                  "kana": "ちち",
                  "meaning": "我的父亲",
                  "meaningEn": "my father",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "chichi"
                  ]
            },
            {
                  "id": "n5-0387",
                  "lexiconId": "jlpt-n5",
                  "japanese": "茶色",
                  "kana": "ちゃいろ",
                  "meaning": "茶色；棕色",
                  "meaningEn": "brown",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "chairo"
                  ]
            },
            {
                  "id": "n5-0388",
                  "lexiconId": "jlpt-n5",
                  "japanese": "茶碗",
                  "kana": "ちゃわん",
                  "meaning": "饭碗",
                  "meaningEn": "rice bowl",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "chawan"
                  ]
            },
            {
                  "id": "n5-0389",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜中",
                  "kana": "〜ちゅう",
                  "meaning": "在……中；正在……中",
                  "meaningEn": "in the middle of",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~chuu"
                  ]
            },
            {
                  "id": "n5-0390",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ちょうど",
                  "kana": "ちょうど",
                  "meaning": "正好；刚刚",
                  "meaningEn": "just",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "choudo"
                  ]
            },
            {
                  "id": "n5-0391",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ちょっと",
                  "kana": "ちょっと",
                  "meaning": "一点儿",
                  "meaningEn": "a little",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "chotto"
                  ]
            },
            {
                  "id": "n5-0392",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一日",
                  "kana": "ついたち",
                  "meaning": "每月一日",
                  "meaningEn": "the 1st day of a month",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tsuitachi"
                  ]
            },
            {
                  "id": "n5-0393",
                  "lexiconId": "jlpt-n5",
                  "japanese": "使う",
                  "kana": "つかう",
                  "meaning": "使用",
                  "meaningEn": "to use",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tsukau"
                  ]
            },
            {
                  "id": "n5-0394",
                  "lexiconId": "jlpt-n5",
                  "japanese": "疲れる",
                  "kana": "つかれる",
                  "meaning": "累",
                  "meaningEn": "to get tired",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tsukareru"
                  ]
            },
            {
                  "id": "n5-0395",
                  "lexiconId": "jlpt-n5",
                  "japanese": "次",
                  "kana": "つぎ",
                  "meaning": "下一个",
                  "meaningEn": "next",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tsugi"
                  ]
            },
            {
                  "id": "n5-0396",
                  "lexiconId": "jlpt-n5",
                  "japanese": "着く",
                  "kana": "つく",
                  "meaning": "到达",
                  "meaningEn": "to arrive",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tsuku"
                  ]
            },
            {
                  "id": "n5-0397",
                  "lexiconId": "jlpt-n5",
                  "japanese": "机",
                  "kana": "つくえ",
                  "meaning": "桌子",
                  "meaningEn": "table",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tsukue"
                  ]
            },
            {
                  "id": "n5-0398",
                  "lexiconId": "jlpt-n5",
                  "japanese": "作る",
                  "kana": "つくる",
                  "meaning": "制作；生产",
                  "meaningEn": "to make, to produce",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tsukuru"
                  ]
            },
            {
                  "id": "n5-0399",
                  "lexiconId": "jlpt-n5",
                  "japanese": "点ける",
                  "kana": "つける",
                  "meaning": "打开",
                  "meaningEn": "to turn on",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tsukeru"
                  ]
            },
            {
                  "id": "n5-0400",
                  "lexiconId": "jlpt-n5",
                  "japanese": "勤める",
                  "kana": "つとめる",
                  "meaning": "为某人工作",
                  "meaningEn": "to work for someone",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tsutomeru"
                  ]
            },
            {
                  "id": "n5-0401",
                  "lexiconId": "jlpt-n5",
                  "japanese": "詰らない",
                  "kana": "つまらない",
                  "meaning": "无聊的",
                  "meaningEn": "uninteresting",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tsumaranai"
                  ]
            },
            {
                  "id": "n5-0402",
                  "lexiconId": "jlpt-n5",
                  "japanese": "冷たい",
                  "kana": "つめたい",
                  "meaning": "冷的；凉的",
                  "meaningEn": "cold",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tsumetai"
                  ]
            },
            {
                  "id": "n5-0403",
                  "lexiconId": "jlpt-n5",
                  "japanese": "強い",
                  "kana": "つよい",
                  "meaning": "强的",
                  "meaningEn": "strong",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tsuyoi"
                  ]
            },
            {
                  "id": "n5-0404",
                  "lexiconId": "jlpt-n5",
                  "japanese": "手",
                  "kana": "て",
                  "meaning": "手",
                  "meaningEn": "hand",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "te"
                  ]
            },
            {
                  "id": "n5-0405",
                  "lexiconId": "jlpt-n5",
                  "japanese": "テープ",
                  "kana": "テープ",
                  "meaning": "磁带",
                  "meaningEn": "tape",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "teepu"
                  ]
            },
            {
                  "id": "n5-0406",
                  "lexiconId": "jlpt-n5",
                  "japanese": "テープレコーダー",
                  "kana": "テープレコーダー",
                  "meaning": "录音机",
                  "meaningEn": "tape recorder",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "teepu rekoodaa"
                  ]
            },
            {
                  "id": "n5-0407",
                  "lexiconId": "jlpt-n5",
                  "japanese": "テーブル",
                  "kana": "テーブル",
                  "meaning": "桌子",
                  "meaningEn": "table",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "teeburu"
                  ]
            },
            {
                  "id": "n5-0408",
                  "lexiconId": "jlpt-n5",
                  "japanese": "出かける",
                  "kana": "でかける",
                  "meaning": "外出",
                  "meaningEn": "to go out",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "dekakeru"
                  ]
            },
            {
                  "id": "n5-0409",
                  "lexiconId": "jlpt-n5",
                  "japanese": "手紙",
                  "kana": "てがみ",
                  "meaning": "信",
                  "meaningEn": "letter",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tegami"
                  ]
            },
            {
                  "id": "n5-0410",
                  "lexiconId": "jlpt-n5",
                  "japanese": "出来る",
                  "kana": "できる",
                  "meaning": "能；会",
                  "meaningEn": "can",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "dekiru"
                  ]
            },
            {
                  "id": "n5-0411",
                  "lexiconId": "jlpt-n5",
                  "japanese": "出口",
                  "kana": "でぐち",
                  "meaning": "出口",
                  "meaningEn": "exit",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "deguchi"
                  ]
            },
            {
                  "id": "n5-0412",
                  "lexiconId": "jlpt-n5",
                  "japanese": "テスト",
                  "kana": "テスト",
                  "meaning": "考试；测试",
                  "meaningEn": "test",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tesuto"
                  ]
            },
            {
                  "id": "n5-0413",
                  "lexiconId": "jlpt-n5",
                  "japanese": "では",
                  "kana": "では",
                  "meaning": "那么；那就",
                  "meaningEn": "then, well",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "dewa"
                  ]
            },
            {
                  "id": "n5-0414",
                  "lexiconId": "jlpt-n5",
                  "japanese": "デパート",
                  "kana": "デパート",
                  "meaning": "百货商店",
                  "meaningEn": "department store",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "depaato"
                  ]
            },
            {
                  "id": "n5-0415",
                  "lexiconId": "jlpt-n5",
                  "japanese": "でも",
                  "kana": "でも",
                  "meaning": "但是",
                  "meaningEn": "but",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "demo"
                  ]
            },
            {
                  "id": "n5-0416",
                  "lexiconId": "jlpt-n5",
                  "japanese": "出ます",
                  "kana": "でます",
                  "meaning": "离开",
                  "meaningEn": "to leave",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "demasu"
                  ]
            },
            {
                  "id": "n5-0417",
                  "lexiconId": "jlpt-n5",
                  "japanese": "テレビ",
                  "kana": "テレビ",
                  "meaning": "电视",
                  "meaningEn": "TV",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "terebi"
                  ]
            },
            {
                  "id": "n5-0418",
                  "lexiconId": "jlpt-n5",
                  "japanese": "天気",
                  "kana": "てんき",
                  "meaning": "天气",
                  "meaningEn": "weather",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tenki"
                  ]
            },
            {
                  "id": "n5-0419",
                  "lexiconId": "jlpt-n5",
                  "japanese": "電気",
                  "kana": "でんき",
                  "meaning": "电；电灯",
                  "meaningEn": "electricity",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "denki"
                  ]
            },
            {
                  "id": "n5-0420",
                  "lexiconId": "jlpt-n5",
                  "japanese": "電車",
                  "kana": "でんしゃ",
                  "meaning": "电车；火车",
                  "meaningEn": "train",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "densha"
                  ]
            },
            {
                  "id": "n5-0421",
                  "lexiconId": "jlpt-n5",
                  "japanese": "電話",
                  "kana": "でんわ",
                  "meaning": "电话",
                  "meaningEn": "phone",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "denwa"
                  ]
            },
            {
                  "id": "n5-0422",
                  "lexiconId": "jlpt-n5",
                  "japanese": "戸",
                  "kana": "と",
                  "meaning": "门",
                  "meaningEn": "door",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "to"
                  ]
            },
            {
                  "id": "n5-0423",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜度",
                  "kana": "〜ど",
                  "meaning": "～次；～度",
                  "meaningEn": "~times, ~degree",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~do"
                  ]
            },
            {
                  "id": "n5-0424",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ドア",
                  "kana": "ドア",
                  "meaning": "门",
                  "meaningEn": "door",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "doa"
                  ]
            },
            {
                  "id": "n5-0425",
                  "lexiconId": "jlpt-n5",
                  "japanese": "トイレ",
                  "kana": "トイレ",
                  "meaning": "厕所；洗手间",
                  "meaningEn": "toilet, lavatory",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "toire"
                  ]
            },
            {
                  "id": "n5-0426",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どう",
                  "kana": "どう",
                  "meaning": "怎样？",
                  "meaningEn": "how?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "dou"
                  ]
            },
            {
                  "id": "n5-0427",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どうして",
                  "kana": "どうして",
                  "meaning": "为什么？",
                  "meaningEn": "why?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "doushite"
                  ]
            },
            {
                  "id": "n5-0428",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どうぞ",
                  "kana": "どうぞ",
                  "meaning": "请；给你",
                  "meaningEn": "please, here you are",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "douzo"
                  ]
            },
            {
                  "id": "n5-0429",
                  "lexiconId": "jlpt-n5",
                  "japanese": "動物",
                  "kana": "どうぶつ",
                  "meaning": "动物",
                  "meaningEn": "animal",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "doubutsu"
                  ]
            },
            {
                  "id": "n5-0430",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どうも",
                  "kana": "どうも",
                  "meaning": "谢谢",
                  "meaningEn": "thanks",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "doumo"
                  ]
            },
            {
                  "id": "n5-0431",
                  "lexiconId": "jlpt-n5",
                  "japanese": "十",
                  "kana": "とお",
                  "meaning": "十",
                  "meaningEn": "ten",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "too"
                  ]
            },
            {
                  "id": "n5-0432",
                  "lexiconId": "jlpt-n5",
                  "japanese": "遠い",
                  "kana": "とおい",
                  "meaning": "远的",
                  "meaningEn": "far",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tooi"
                  ]
            },
            {
                  "id": "n5-0433",
                  "lexiconId": "jlpt-n5",
                  "japanese": "十日",
                  "kana": "とおか",
                  "meaning": "每月10日；10天",
                  "meaningEn": "the 10th day of a month, 10 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tooka"
                  ]
            },
            {
                  "id": "n5-0434",
                  "lexiconId": "jlpt-n5",
                  "japanese": "時々",
                  "kana": "ときどき",
                  "meaning": "有时",
                  "meaningEn": "sometimes",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tokidoki"
                  ]
            },
            {
                  "id": "n5-0435",
                  "lexiconId": "jlpt-n5",
                  "japanese": "時計",
                  "kana": "とけい",
                  "meaning": "手表；钟",
                  "meaningEn": "watch, clock",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tokei"
                  ]
            },
            {
                  "id": "n5-0436",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どこ",
                  "kana": "どこ",
                  "meaning": "哪里？",
                  "meaningEn": "where?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "doko"
                  ]
            },
            {
                  "id": "n5-0437",
                  "lexiconId": "jlpt-n5",
                  "japanese": "所",
                  "kana": "ところ",
                  "meaning": "地方；场所",
                  "meaningEn": "place",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tokoro"
                  ]
            },
            {
                  "id": "n5-0438",
                  "lexiconId": "jlpt-n5",
                  "japanese": "図書館",
                  "kana": "としょかん",
                  "meaning": "图书馆",
                  "meaningEn": "library",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "toshokan"
                  ]
            },
            {
                  "id": "n5-0439",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どちら",
                  "kana": "どちら",
                  "meaning": "哪边；哪里（礼貌说法）",
                  "meaningEn": "which, where (polite)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "dochira"
                  ]
            },
            {
                  "id": "n5-0440",
                  "lexiconId": "jlpt-n5",
                  "japanese": "とても",
                  "kana": "とても",
                  "meaning": "非常；很",
                  "meaningEn": "very much, quiet",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "totemo"
                  ]
            },
            {
                  "id": "n5-0441",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どなた",
                  "kana": "どなた",
                  "meaning": "哪位？",
                  "meaningEn": "who (polite)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "donata"
                  ]
            },
            {
                  "id": "n5-0442",
                  "lexiconId": "jlpt-n5",
                  "japanese": "隣り",
                  "kana": "となり",
                  "meaning": "旁边",
                  "meaningEn": "next to",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tonari"
                  ]
            },
            {
                  "id": "n5-0443",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どの",
                  "kana": "どの",
                  "meaning": "哪个？",
                  "meaningEn": "which?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "dono"
                  ]
            },
            {
                  "id": "n5-0444",
                  "lexiconId": "jlpt-n5",
                  "japanese": "飛ぶ",
                  "kana": "とぶ",
                  "meaning": "飞",
                  "meaningEn": "to fly",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tobu"
                  ]
            },
            {
                  "id": "n5-0445",
                  "lexiconId": "jlpt-n5",
                  "japanese": "止まる",
                  "kana": "とまる",
                  "meaning": "停止",
                  "meaningEn": "to stop",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tomaru"
                  ]
            },
            {
                  "id": "n5-0446",
                  "lexiconId": "jlpt-n5",
                  "japanese": "友達",
                  "kana": "ともだち",
                  "meaning": "朋友",
                  "meaningEn": "friend",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tomodachi"
                  ]
            },
            {
                  "id": "n5-0447",
                  "lexiconId": "jlpt-n5",
                  "japanese": "土曜日",
                  "kana": "どようび",
                  "meaning": "星期六",
                  "meaningEn": "Saturday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "doyoubi"
                  ]
            },
            {
                  "id": "n5-0448",
                  "lexiconId": "jlpt-n5",
                  "japanese": "鳥",
                  "kana": "とり",
                  "meaning": "鸟",
                  "meaningEn": "bird",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "tori"
                  ]
            },
            {
                  "id": "n5-0449",
                  "lexiconId": "jlpt-n5",
                  "japanese": "鶏肉",
                  "kana": "とりにく",
                  "meaning": "鸡肉",
                  "meaningEn": "chicken meat",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "toriniku"
                  ]
            },
            {
                  "id": "n5-0450",
                  "lexiconId": "jlpt-n5",
                  "japanese": "取る",
                  "kana": "とる",
                  "meaning": "拿；取",
                  "meaningEn": "to take",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "toru"
                  ]
            },
            {
                  "id": "n5-0451",
                  "lexiconId": "jlpt-n5",
                  "japanese": "撮る",
                  "kana": "とる",
                  "meaning": "拍照",
                  "meaningEn": "to take a photo",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "toru"
                  ]
            },
            {
                  "id": "n5-0452",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どれ",
                  "kana": "どれ",
                  "meaning": "哪个？",
                  "meaningEn": "which?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "dore"
                  ]
            },
            {
                  "id": "n5-0453",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どんな",
                  "kana": "どんな",
                  "meaning": "什么样的？",
                  "meaningEn": "what kind of?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "donna"
                  ]
            },
            {
                  "id": "n5-0454",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ナイフ",
                  "kana": "ナイフ",
                  "meaning": "刀",
                  "meaningEn": "knife",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "naifu"
                  ]
            },
            {
                  "id": "n5-0455",
                  "lexiconId": "jlpt-n5",
                  "japanese": "中",
                  "kana": "なか",
                  "meaning": "里面",
                  "meaningEn": "inside",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "naka"
                  ]
            },
            {
                  "id": "n5-0456",
                  "lexiconId": "jlpt-n5",
                  "japanese": "長い",
                  "kana": "ながい",
                  "meaning": "长的",
                  "meaningEn": "long",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nagai"
                  ]
            },
            {
                  "id": "n5-0457",
                  "lexiconId": "jlpt-n5",
                  "japanese": "鳴く",
                  "kana": "なく",
                  "meaning": "鸣叫；唱歌",
                  "meaningEn": "to sing, mew, moo",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "naku"
                  ]
            },
            {
                  "id": "n5-0458",
                  "lexiconId": "jlpt-n5",
                  "japanese": "夏",
                  "kana": "なつ",
                  "meaning": "夏天",
                  "meaningEn": "summer",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "natsu"
                  ]
            },
            {
                  "id": "n5-0459",
                  "lexiconId": "jlpt-n5",
                  "japanese": "夏休み",
                  "kana": "なつやすみ",
                  "meaning": "暑假",
                  "meaningEn": "summer vacation",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "natsuyasumi"
                  ]
            },
            {
                  "id": "n5-0460",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜など",
                  "kana": "〜など",
                  "meaning": "等等",
                  "meaningEn": "and so on",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~nado"
                  ]
            },
            {
                  "id": "n5-0461",
                  "lexiconId": "jlpt-n5",
                  "japanese": "七つ",
                  "kana": "ななつ",
                  "meaning": "七",
                  "meaningEn": "seven",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nanatsu"
                  ]
            },
            {
                  "id": "n5-0462",
                  "lexiconId": "jlpt-n5",
                  "japanese": "何",
                  "kana": "なに",
                  "meaning": "什么？",
                  "meaningEn": "what?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nani"
                  ]
            },
            {
                  "id": "n5-0463",
                  "lexiconId": "jlpt-n5",
                  "japanese": "七日",
                  "kana": "なのか",
                  "meaning": "每月七日；七天",
                  "meaningEn": "the 7th of a month, 7 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nanoka"
                  ]
            },
            {
                  "id": "n5-0464",
                  "lexiconId": "jlpt-n5",
                  "japanese": "名前",
                  "kana": "なまえ",
                  "meaning": "名字",
                  "meaningEn": "name",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "namae"
                  ]
            },
            {
                  "id": "n5-0465",
                  "lexiconId": "jlpt-n5",
                  "japanese": "習う",
                  "kana": "ならう",
                  "meaning": "学习",
                  "meaningEn": "to learn",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "narau"
                  ]
            },
            {
                  "id": "n5-0466",
                  "lexiconId": "jlpt-n5",
                  "japanese": "並ぶ",
                  "kana": "ならぶ",
                  "meaning": "排队",
                  "meaningEn": "to form a line",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "narabu"
                  ]
            },
            {
                  "id": "n5-0467",
                  "lexiconId": "jlpt-n5",
                  "japanese": "並べる",
                  "kana": "ならべる",
                  "meaning": "排列",
                  "meaningEn": "to line up",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "naraberu"
                  ]
            },
            {
                  "id": "n5-0468",
                  "lexiconId": "jlpt-n5",
                  "japanese": "なる",
                  "kana": "なる",
                  "meaning": "成为；变成",
                  "meaningEn": "to become",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "naru"
                  ]
            },
            {
                  "id": "n5-0469",
                  "lexiconId": "jlpt-n5",
                  "japanese": "二",
                  "kana": "に",
                  "meaning": "二",
                  "meaningEn": "two",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ni"
                  ]
            },
            {
                  "id": "n5-0470",
                  "lexiconId": "jlpt-n5",
                  "japanese": "賑やか",
                  "kana": "にぎやか",
                  "meaning": "热闹的",
                  "meaningEn": "lively",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nigiyaka"
                  ]
            },
            {
                  "id": "n5-0471",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お肉",
                  "kana": "おにく",
                  "meaning": "肉",
                  "meaningEn": "meat",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "oniku"
                  ]
            },
            {
                  "id": "n5-0472",
                  "lexiconId": "jlpt-n5",
                  "japanese": "西",
                  "kana": "にし",
                  "meaning": "西",
                  "meaningEn": "west",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nishi"
                  ]
            },
            {
                  "id": "n5-0473",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜日",
                  "kana": "〜にち",
                  "meaning": "…st；..nd；..th",
                  "meaningEn": "…st, ..nd, ..th",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~nichi"
                  ]
            },
            {
                  "id": "n5-0474",
                  "lexiconId": "jlpt-n5",
                  "japanese": "日曜日",
                  "kana": "にちようび",
                  "meaning": "星期日",
                  "meaningEn": "Sunday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nichiyoubi"
                  ]
            },
            {
                  "id": "n5-0475",
                  "lexiconId": "jlpt-n5",
                  "japanese": "荷物",
                  "kana": "にもつ",
                  "meaning": "行李",
                  "meaningEn": "luggage",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nimotsu"
                  ]
            },
            {
                  "id": "n5-0476",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ニュース",
                  "kana": "ニュース",
                  "meaning": "新闻",
                  "meaningEn": "news",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nyuusu"
                  ]
            },
            {
                  "id": "n5-0477",
                  "lexiconId": "jlpt-n5",
                  "japanese": "庭",
                  "kana": "にわ",
                  "meaning": "庭院；花园",
                  "meaningEn": "garden",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "niwa"
                  ]
            },
            {
                  "id": "n5-0478",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜人",
                  "kana": "~にん",
                  "meaning": "……人",
                  "meaningEn": "… people",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~nin"
                  ]
            },
            {
                  "id": "n5-0479",
                  "lexiconId": "jlpt-n5",
                  "japanese": "脱ぐ",
                  "kana": "ぬぐ",
                  "meaning": "脱衣服",
                  "meaningEn": "to take off clothes",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nugu"
                  ]
            },
            {
                  "id": "n5-0480",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ネクタイ",
                  "kana": "ネクタイ",
                  "meaning": "领带",
                  "meaningEn": "necktie",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nekutai"
                  ]
            },
            {
                  "id": "n5-0481",
                  "lexiconId": "jlpt-n5",
                  "japanese": "寝る",
                  "kana": "ねる",
                  "meaning": "睡觉",
                  "meaningEn": "to go to bed",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "neru"
                  ]
            },
            {
                  "id": "n5-0482",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜年",
                  "kana": "〜ねん",
                  "meaning": "～年",
                  "meaningEn": "~years",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~nen"
                  ]
            },
            {
                  "id": "n5-0483",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ノート",
                  "kana": "ノート",
                  "meaning": "笔记本",
                  "meaningEn": "notebook",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nooto"
                  ]
            },
            {
                  "id": "n5-0484",
                  "lexiconId": "jlpt-n5",
                  "japanese": "登る",
                  "kana": "のぼる",
                  "meaning": "登上",
                  "meaningEn": "to climb up",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "noboru"
                  ]
            },
            {
                  "id": "n5-0485",
                  "lexiconId": "jlpt-n5",
                  "japanese": "飲物",
                  "kana": "のみもの",
                  "meaning": "饮料",
                  "meaningEn": "drinks",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nomimono"
                  ]
            },
            {
                  "id": "n5-0486",
                  "lexiconId": "jlpt-n5",
                  "japanese": "飲む",
                  "kana": "のむ",
                  "meaning": "喝",
                  "meaningEn": "to drink",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "nomu"
                  ]
            },
            {
                  "id": "n5-0487",
                  "lexiconId": "jlpt-n5",
                  "japanese": "乗る",
                  "kana": "のる",
                  "meaning": "乘坐；拿取",
                  "meaningEn": "to take, to ride",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "noru"
                  ]
            },
            {
                  "id": "n5-0488",
                  "lexiconId": "jlpt-n5",
                  "japanese": "歯",
                  "kana": "は",
                  "meaning": "牙齿",
                  "meaningEn": "teeth",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ha"
                  ]
            },
            {
                  "id": "n5-0489",
                  "lexiconId": "jlpt-n5",
                  "japanese": "パーテイー",
                  "kana": "パーテイー",
                  "meaning": "聚会",
                  "meaningEn": "party",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "paateii"
                  ]
            },
            {
                  "id": "n5-0490",
                  "lexiconId": "jlpt-n5",
                  "japanese": "はい",
                  "kana": "はい",
                  "meaning": "是",
                  "meaningEn": "yes",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hai"
                  ]
            },
            {
                  "id": "n5-0491",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜はい",
                  "kana": "〜はい",
                  "meaning": "～杯",
                  "meaningEn": "cups of ~",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~hai"
                  ]
            },
            {
                  "id": "n5-0492",
                  "lexiconId": "jlpt-n5",
                  "japanese": "灰皿",
                  "kana": "はいざら",
                  "meaning": "烟灰缸",
                  "meaningEn": "ashtray",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "haizara"
                  ]
            },
            {
                  "id": "n5-0493",
                  "lexiconId": "jlpt-n5",
                  "japanese": "入る",
                  "kana": "はいる",
                  "meaning": "进入",
                  "meaningEn": "to enter",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hairu"
                  ]
            },
            {
                  "id": "n5-0494",
                  "lexiconId": "jlpt-n5",
                  "japanese": "葉書",
                  "kana": "はがき",
                  "meaning": "明信片",
                  "meaningEn": "postcard",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hagaki"
                  ]
            },
            {
                  "id": "n5-0495",
                  "lexiconId": "jlpt-n5",
                  "japanese": "履く",
                  "kana": "はく",
                  "meaning": "穿鞋",
                  "meaningEn": "to put on shoes",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "haku"
                  ]
            },
            {
                  "id": "n5-0496",
                  "lexiconId": "jlpt-n5",
                  "japanese": "箱",
                  "kana": "はこ",
                  "meaning": "箱子；盒子",
                  "meaningEn": "box",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hako"
                  ]
            },
            {
                  "id": "n5-0497",
                  "lexiconId": "jlpt-n5",
                  "japanese": "橋",
                  "kana": "はし",
                  "meaning": "桥",
                  "meaningEn": "bridge",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hashi"
                  ]
            },
            {
                  "id": "n5-0498",
                  "lexiconId": "jlpt-n5",
                  "japanese": "箸",
                  "kana": "はし",
                  "meaning": "筷子",
                  "meaningEn": "chopsticks",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hashi"
                  ]
            },
            {
                  "id": "n5-0499",
                  "lexiconId": "jlpt-n5",
                  "japanese": "始まる",
                  "kana": "はじまる",
                  "meaning": "开始",
                  "meaningEn": "to begin, to start",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hajimaru"
                  ]
            },
            {
                  "id": "n5-0500",
                  "lexiconId": "jlpt-n5",
                  "japanese": "始め",
                  "kana": "はじめ",
                  "meaning": "开始；开头",
                  "meaningEn": "start, the beginning",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hajime"
                  ]
            },
            {
                  "id": "n5-0501",
                  "lexiconId": "jlpt-n5",
                  "japanese": "初めて",
                  "kana": "はじめて",
                  "meaning": "第一次",
                  "meaningEn": "for the first time",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hajimete"
                  ]
            },
            {
                  "id": "n5-0502",
                  "lexiconId": "jlpt-n5",
                  "japanese": "走る",
                  "kana": "はしる",
                  "meaning": "跑",
                  "meaningEn": "to run",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hashiru"
                  ]
            },
            {
                  "id": "n5-0503",
                  "lexiconId": "jlpt-n5",
                  "japanese": "バス",
                  "kana": "バス",
                  "meaning": "公共汽车",
                  "meaningEn": "bus",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "basu"
                  ]
            },
            {
                  "id": "n5-0504",
                  "lexiconId": "jlpt-n5",
                  "japanese": "バター",
                  "kana": "バター",
                  "meaning": "黄油",
                  "meaningEn": "butter",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "bataa"
                  ]
            },
            {
                  "id": "n5-0505",
                  "lexiconId": "jlpt-n5",
                  "japanese": "二十歳",
                  "kana": "はたち",
                  "meaning": "二十岁",
                  "meaningEn": "20 years old",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hatachi"
                  ]
            },
            {
                  "id": "n5-0506",
                  "lexiconId": "jlpt-n5",
                  "japanese": "働く",
                  "kana": "はたらく",
                  "meaning": "工作",
                  "meaningEn": "to work",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hataraku"
                  ]
            },
            {
                  "id": "n5-0507",
                  "lexiconId": "jlpt-n5",
                  "japanese": "八",
                  "kana": "はち",
                  "meaning": "八",
                  "meaningEn": "eight",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hachi"
                  ]
            },
            {
                  "id": "n5-0508",
                  "lexiconId": "jlpt-n5",
                  "japanese": "二十日",
                  "kana": "はつか",
                  "meaning": "每月二十日；二十天",
                  "meaningEn": "the 20th of the month, 20 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hatsuka"
                  ]
            },
            {
                  "id": "n5-0509",
                  "lexiconId": "jlpt-n5",
                  "japanese": "花",
                  "kana": "はな",
                  "meaning": "花",
                  "meaningEn": "flower",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hana"
                  ]
            },
            {
                  "id": "n5-0510",
                  "lexiconId": "jlpt-n5",
                  "japanese": "鼻",
                  "kana": "はな",
                  "meaning": "鼻子",
                  "meaningEn": "nose",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hana"
                  ]
            },
            {
                  "id": "n5-0511",
                  "lexiconId": "jlpt-n5",
                  "japanese": "話",
                  "kana": "はなし",
                  "meaning": "谈话；故事",
                  "meaningEn": "conversation, tale",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hanashi"
                  ]
            },
            {
                  "id": "n5-0512",
                  "lexiconId": "jlpt-n5",
                  "japanese": "話す",
                  "kana": "はなす",
                  "meaning": "说话；告诉",
                  "meaningEn": "to talk, to speak, to tell",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hanasu"
                  ]
            },
            {
                  "id": "n5-0513",
                  "lexiconId": "jlpt-n5",
                  "japanese": "母",
                  "kana": "はは",
                  "meaning": "我的母亲",
                  "meaningEn": "my mother",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "haha"
                  ]
            },
            {
                  "id": "n5-0514",
                  "lexiconId": "jlpt-n5",
                  "japanese": "早い",
                  "kana": "はやい",
                  "meaning": "早的",
                  "meaningEn": "early",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hayai"
                  ]
            },
            {
                  "id": "n5-0515",
                  "lexiconId": "jlpt-n5",
                  "japanese": "速い",
                  "kana": "はやい",
                  "meaning": "快的；迅速的",
                  "meaningEn": "fast, quick",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hayai"
                  ]
            },
            {
                  "id": "n5-0516",
                  "lexiconId": "jlpt-n5",
                  "japanese": "春",
                  "kana": "はる",
                  "meaning": "春天",
                  "meaningEn": "spring",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "haru"
                  ]
            },
            {
                  "id": "n5-0517",
                  "lexiconId": "jlpt-n5",
                  "japanese": "張る",
                  "kana": "はる",
                  "meaning": "贴上；粘贴",
                  "meaningEn": "to put something on, to stick",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "haru"
                  ]
            },
            {
                  "id": "n5-0518",
                  "lexiconId": "jlpt-n5",
                  "japanese": "晴れる",
                  "kana": "はれる",
                  "meaning": "放晴",
                  "meaningEn": "to clear up",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hareru"
                  ]
            },
            {
                  "id": "n5-0519",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜半",
                  "kana": "〜はん",
                  "meaning": "一半；半～",
                  "meaningEn": "Half~",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~han"
                  ]
            },
            {
                  "id": "n5-0520",
                  "lexiconId": "jlpt-n5",
                  "japanese": "晩",
                  "kana": "ばん",
                  "meaning": "晚上",
                  "meaningEn": "evening",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ban"
                  ]
            },
            {
                  "id": "n5-0521",
                  "lexiconId": "jlpt-n5",
                  "japanese": "~番",
                  "kana": "〜ばん",
                  "meaning": "第～号；第～名",
                  "meaningEn": "No.~, ranking",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~ban"
                  ]
            },
            {
                  "id": "n5-0522",
                  "lexiconId": "jlpt-n5",
                  "japanese": "パン",
                  "kana": "パン",
                  "meaning": "面包",
                  "meaningEn": "bread",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "pan"
                  ]
            },
            {
                  "id": "n5-0523",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ハンカチ",
                  "kana": "ハンカチ",
                  "meaning": "手帕",
                  "meaningEn": "handkerchief",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hankachi"
                  ]
            },
            {
                  "id": "n5-0524",
                  "lexiconId": "jlpt-n5",
                  "japanese": "番号",
                  "kana": "ばんごう",
                  "meaning": "号码；数字",
                  "meaningEn": "number",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "bangou"
                  ]
            },
            {
                  "id": "n5-0525",
                  "lexiconId": "jlpt-n5",
                  "japanese": "晩ご飯",
                  "kana": "ばんごはん",
                  "meaning": "晚饭",
                  "meaningEn": "dinner",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "bangohan"
                  ]
            },
            {
                  "id": "n5-0526",
                  "lexiconId": "jlpt-n5",
                  "japanese": "半分",
                  "kana": "はんぶん",
                  "meaning": "一半",
                  "meaningEn": "half",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hanbun"
                  ]
            },
            {
                  "id": "n5-0527",
                  "lexiconId": "jlpt-n5",
                  "japanese": "東",
                  "kana": "ひがし",
                  "meaning": "东",
                  "meaningEn": "east",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "higashi"
                  ]
            },
            {
                  "id": "n5-0528",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜匹",
                  "kana": "〜ひき",
                  "meaning": "动物的量词",
                  "meaningEn": "counter for animals",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~hiki"
                  ]
            },
            {
                  "id": "n5-0529",
                  "lexiconId": "jlpt-n5",
                  "japanese": "引く",
                  "kana": "ひく",
                  "meaning": "拉",
                  "meaningEn": "to pull",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hiku"
                  ]
            },
            {
                  "id": "n5-0530",
                  "lexiconId": "jlpt-n5",
                  "japanese": "弾く",
                  "kana": "ひく",
                  "meaning": "演奏乐器",
                  "meaningEn": "to play (an instrument)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hiku"
                  ]
            },
            {
                  "id": "n5-0531",
                  "lexiconId": "jlpt-n5",
                  "japanese": "低い",
                  "kana": "ひくい",
                  "meaning": "低的",
                  "meaningEn": "low",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hikui"
                  ]
            },
            {
                  "id": "n5-0532",
                  "lexiconId": "jlpt-n5",
                  "japanese": "飛行機",
                  "kana": "ひこうき",
                  "meaning": "飞机",
                  "meaningEn": "plane",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hikouki"
                  ]
            },
            {
                  "id": "n5-0533",
                  "lexiconId": "jlpt-n5",
                  "japanese": "左",
                  "kana": "ひだり",
                  "meaning": "左边",
                  "meaningEn": "left",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hidari"
                  ]
            },
            {
                  "id": "n5-0534",
                  "lexiconId": "jlpt-n5",
                  "japanese": "人",
                  "kana": "ひと",
                  "meaning": "人",
                  "meaningEn": "person",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hito"
                  ]
            },
            {
                  "id": "n5-0535",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一つ",
                  "kana": "ひとつ",
                  "meaning": "一",
                  "meaningEn": "one",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hitotsu"
                  ]
            },
            {
                  "id": "n5-0536",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一月",
                  "kana": "ひとつき",
                  "meaning": "一个月",
                  "meaningEn": "one month",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hitotsuki"
                  ]
            },
            {
                  "id": "n5-0537",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一人",
                  "kana": "ひとり",
                  "meaning": "一个人",
                  "meaningEn": "one person",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hitori"
                  ]
            },
            {
                  "id": "n5-0538",
                  "lexiconId": "jlpt-n5",
                  "japanese": "暇",
                  "kana": "ひま",
                  "meaning": "空闲；闲暇",
                  "meaningEn": "free time, leisure",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hima"
                  ]
            },
            {
                  "id": "n5-0539",
                  "lexiconId": "jlpt-n5",
                  "japanese": "百",
                  "kana": "ひゃく",
                  "meaning": "百",
                  "meaningEn": "hundred",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hyaku"
                  ]
            },
            {
                  "id": "n5-0540",
                  "lexiconId": "jlpt-n5",
                  "japanese": "病院",
                  "kana": "びょういん",
                  "meaning": "医院",
                  "meaningEn": "hospital",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "byouin"
                  ]
            },
            {
                  "id": "n5-0541",
                  "lexiconId": "jlpt-n5",
                  "japanese": "病気",
                  "kana": "びょうき",
                  "meaning": "生病的",
                  "meaningEn": "ill, sick",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "byouki"
                  ]
            },
            {
                  "id": "n5-0542",
                  "lexiconId": "jlpt-n5",
                  "japanese": "平仮名",
                  "kana": "ひらがな",
                  "meaning": "平假名",
                  "meaningEn": "hiragana characters",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hiragana"
                  ]
            },
            {
                  "id": "n5-0543",
                  "lexiconId": "jlpt-n5",
                  "japanese": "昼",
                  "kana": "ひる",
                  "meaning": "中午",
                  "meaningEn": "noon",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hiru"
                  ]
            },
            {
                  "id": "n5-0544",
                  "lexiconId": "jlpt-n5",
                  "japanese": "昼ご飯",
                  "kana": "ひるごはん",
                  "meaning": "午饭",
                  "meaningEn": "lunch",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hirugohan"
                  ]
            },
            {
                  "id": "n5-0545",
                  "lexiconId": "jlpt-n5",
                  "japanese": "広い",
                  "kana": "ひろい",
                  "meaning": "宽的；宽敞的",
                  "meaningEn": "wide, spacious",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hiroi"
                  ]
            },
            {
                  "id": "n5-0546",
                  "lexiconId": "jlpt-n5",
                  "japanese": "フィルム",
                  "kana": "フィルム",
                  "meaning": "胶卷；薄膜",
                  "meaningEn": "film",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "firumu"
                  ]
            },
            {
                  "id": "n5-0547",
                  "lexiconId": "jlpt-n5",
                  "japanese": "封筒",
                  "kana": "ふうとう",
                  "meaning": "信封",
                  "meaningEn": "envelope",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "fuutou"
                  ]
            },
            {
                  "id": "n5-0548",
                  "lexiconId": "jlpt-n5",
                  "japanese": "プール",
                  "kana": "プール",
                  "meaning": "游泳池",
                  "meaningEn": "pool",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "puuru"
                  ]
            },
            {
                  "id": "n5-0549",
                  "lexiconId": "jlpt-n5",
                  "japanese": "フォーク",
                  "kana": "フォーク",
                  "meaning": "叉子",
                  "meaningEn": "fork",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "fooku"
                  ]
            },
            {
                  "id": "n5-0550",
                  "lexiconId": "jlpt-n5",
                  "japanese": "吹く",
                  "kana": "ふく",
                  "meaning": "吹（风）",
                  "meaningEn": "to blow (wind)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "fuku"
                  ]
            },
            {
                  "id": "n5-0551",
                  "lexiconId": "jlpt-n5",
                  "japanese": "服",
                  "kana": "ふく",
                  "meaning": "衣服",
                  "meaningEn": "clothes",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "fuku"
                  ]
            },
            {
                  "id": "n5-0552",
                  "lexiconId": "jlpt-n5",
                  "japanese": "二つ",
                  "kana": "ふたつ",
                  "meaning": "二",
                  "meaningEn": "two",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "futatsu"
                  ]
            },
            {
                  "id": "n5-0553",
                  "lexiconId": "jlpt-n5",
                  "japanese": "豚肉",
                  "kana": "ぶたにく",
                  "meaning": "猪肉",
                  "meaningEn": "pork",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "butaniku"
                  ]
            },
            {
                  "id": "n5-0554",
                  "lexiconId": "jlpt-n5",
                  "japanese": "二人",
                  "kana": "ふたり",
                  "meaning": "两个人",
                  "meaningEn": "two people",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "futari"
                  ]
            },
            {
                  "id": "n5-0555",
                  "lexiconId": "jlpt-n5",
                  "japanese": "二日",
                  "kana": "ふつか",
                  "meaning": "每月2日；2天",
                  "meaningEn": "2nd day of the month, 2 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "futsuka"
                  ]
            },
            {
                  "id": "n5-0556",
                  "lexiconId": "jlpt-n5",
                  "japanese": "太い",
                  "kana": "ふとい",
                  "meaning": "粗的；胖的",
                  "meaningEn": "thick, fat",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "futoi"
                  ]
            },
            {
                  "id": "n5-0557",
                  "lexiconId": "jlpt-n5",
                  "japanese": "降る",
                  "kana": "ふる",
                  "meaning": "下（雨、雪）",
                  "meaningEn": "to fall (rain, snow)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "furu"
                  ]
            },
            {
                  "id": "n5-0558",
                  "lexiconId": "jlpt-n5",
                  "japanese": "古い",
                  "kana": "ふるい",
                  "meaning": "旧的；老的",
                  "meaningEn": "old",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "furui"
                  ]
            },
            {
                  "id": "n5-0559",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お風呂",
                  "kana": "おふろ",
                  "meaning": "洗澡；浴室",
                  "meaningEn": "bath",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ofuro"
                  ]
            },
            {
                  "id": "n5-0560",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜分",
                  "kana": "〜ふん",
                  "meaning": "～分钟",
                  "meaningEn": "~minutes",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~fun"
                  ]
            },
            {
                  "id": "n5-0561",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ページ",
                  "kana": "ページ",
                  "meaning": "页",
                  "meaningEn": "page",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "peeji"
                  ]
            },
            {
                  "id": "n5-0562",
                  "lexiconId": "jlpt-n5",
                  "japanese": "下手",
                  "kana": "へた",
                  "meaning": "不擅长",
                  "meaningEn": "not good at something",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "heta"
                  ]
            },
            {
                  "id": "n5-0563",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ベッド",
                  "kana": "ベッド",
                  "meaning": "床",
                  "meaningEn": "bed",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "beddo"
                  ]
            },
            {
                  "id": "n5-0564",
                  "lexiconId": "jlpt-n5",
                  "japanese": "部屋",
                  "kana": "へや",
                  "meaning": "房间",
                  "meaningEn": "room",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "heya"
                  ]
            },
            {
                  "id": "n5-0565",
                  "lexiconId": "jlpt-n5",
                  "japanese": "辺",
                  "kana": "へん",
                  "meaning": "附近；一带；部分",
                  "meaningEn": "side, part, area",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hen"
                  ]
            },
            {
                  "id": "n5-0566",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ペン",
                  "kana": "ぺん",
                  "meaning": "钢笔；笔",
                  "meaningEn": "pen",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "pen"
                  ]
            },
            {
                  "id": "n5-0567",
                  "lexiconId": "jlpt-n5",
                  "japanese": "勉強",
                  "kana": "べんきょう",
                  "meaning": "学习",
                  "meaningEn": "to study",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "benkyou"
                  ]
            },
            {
                  "id": "n5-0568",
                  "lexiconId": "jlpt-n5",
                  "japanese": "便利",
                  "kana": "べんり",
                  "meaning": "方便的",
                  "meaningEn": "convenient",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "benri"
                  ]
            },
            {
                  "id": "n5-0569",
                  "lexiconId": "jlpt-n5",
                  "japanese": "方",
                  "kana": "ほう",
                  "meaning": "~より〜のほうが〜",
                  "meaningEn": "~より〜のほうが〜",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hou"
                  ]
            },
            {
                  "id": "n5-0570",
                  "lexiconId": "jlpt-n5",
                  "japanese": "帽子",
                  "kana": "ぼうし",
                  "meaning": "帽子",
                  "meaningEn": "hat",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "boushi"
                  ]
            },
            {
                  "id": "n5-0571",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ボールペン",
                  "kana": "ボールペン",
                  "meaning": "圆珠笔",
                  "meaningEn": "ballpen",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "boorupen"
                  ]
            },
            {
                  "id": "n5-0572",
                  "lexiconId": "jlpt-n5",
                  "japanese": "他",
                  "kana": "ほか",
                  "meaning": "其他；另外",
                  "meaningEn": "another, other",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hoka"
                  ]
            },
            {
                  "id": "n5-0573",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ポケット",
                  "kana": "ポケット",
                  "meaning": "口袋",
                  "meaningEn": "pocket",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "poketto"
                  ]
            },
            {
                  "id": "n5-0574",
                  "lexiconId": "jlpt-n5",
                  "japanese": "欲しい",
                  "kana": "ほしい",
                  "meaning": "想要某物",
                  "meaningEn": "to want something",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hoshii"
                  ]
            },
            {
                  "id": "n5-0575",
                  "lexiconId": "jlpt-n5",
                  "japanese": "細い",
                  "kana": "ほそい",
                  "meaning": "细的",
                  "meaningEn": "thin, fine",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hosoi"
                  ]
            },
            {
                  "id": "n5-0576",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ボタン",
                  "kana": "ボタン",
                  "meaning": "按钮；纽扣",
                  "meaningEn": "button",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "botan"
                  ]
            },
            {
                  "id": "n5-0577",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ホテル",
                  "kana": "ホテル",
                  "meaning": "酒店；旅馆",
                  "meaningEn": "hotel",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hoteru"
                  ]
            },
            {
                  "id": "n5-0578",
                  "lexiconId": "jlpt-n5",
                  "japanese": "本",
                  "kana": "ほん",
                  "meaning": "书",
                  "meaningEn": "book",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hon"
                  ]
            },
            {
                  "id": "n5-0579",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜本",
                  "kana": "~ほん",
                  "meaning": "细长物品的量词",
                  "meaningEn": "counter for long objects",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~hon"
                  ]
            },
            {
                  "id": "n5-0580",
                  "lexiconId": "jlpt-n5",
                  "japanese": "本棚",
                  "kana": "ほんだな",
                  "meaning": "书架",
                  "meaningEn": "bookshelf",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hondana"
                  ]
            },
            {
                  "id": "n5-0581",
                  "lexiconId": "jlpt-n5",
                  "japanese": "本当に",
                  "kana": "ほんとうに",
                  "meaning": "真的",
                  "meaningEn": "really",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "hontouni"
                  ]
            },
            {
                  "id": "n5-0582",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜枚",
                  "kana": "〜まい",
                  "meaning": "薄片物品的量词",
                  "meaningEn": "counter for thin objects",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~mai"
                  ]
            },
            {
                  "id": "n5-0583",
                  "lexiconId": "jlpt-n5",
                  "japanese": "毎朝",
                  "kana": "まいあさ",
                  "meaning": "每天早上",
                  "meaningEn": "every morning",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "maiasa"
                  ]
            },
            {
                  "id": "n5-0584",
                  "lexiconId": "jlpt-n5",
                  "japanese": "毎月",
                  "kana": "まいつき",
                  "meaning": "每月",
                  "meaningEn": "every month",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "maitsuki/maigetsu"
                  ]
            },
            {
                  "id": "n5-0585",
                  "lexiconId": "jlpt-n5",
                  "japanese": "毎週",
                  "kana": "まいしゅう",
                  "meaning": "每周",
                  "meaningEn": "every week",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "maishuu"
                  ]
            },
            {
                  "id": "n5-0586",
                  "lexiconId": "jlpt-n5",
                  "japanese": "毎日",
                  "kana": "まいにち",
                  "meaning": "每天",
                  "meaningEn": "every day",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mainichi"
                  ]
            },
            {
                  "id": "n5-0587",
                  "lexiconId": "jlpt-n5",
                  "japanese": "毎年",
                  "kana": "まいとし",
                  "meaning": "每年",
                  "meaningEn": "every year",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "maitoshi/mainen"
                  ]
            },
            {
                  "id": "n5-0588",
                  "lexiconId": "jlpt-n5",
                  "japanese": "毎晩",
                  "kana": "まいばん",
                  "meaning": "每晚",
                  "meaningEn": "every evening",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "maiban"
                  ]
            },
            {
                  "id": "n5-0589",
                  "lexiconId": "jlpt-n5",
                  "japanese": "前",
                  "kana": "まえ",
                  "meaning": "前面",
                  "meaningEn": "front",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mae"
                  ]
            },
            {
                  "id": "n5-0590",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜前",
                  "kana": "〜まえ",
                  "meaning": "之前；前面",
                  "meaningEn": "before, in front of",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~mae"
                  ]
            },
            {
                  "id": "n5-0591",
                  "lexiconId": "jlpt-n5",
                  "japanese": "曲がる",
                  "kana": "まがる",
                  "meaning": "转弯",
                  "meaningEn": "to turn",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "magaru"
                  ]
            },
            {
                  "id": "n5-0592",
                  "lexiconId": "jlpt-n5",
                  "japanese": "不味い",
                  "kana": "まずい",
                  "meaning": "难吃",
                  "meaningEn": "bad tasting",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mazui"
                  ]
            },
            {
                  "id": "n5-0593",
                  "lexiconId": "jlpt-n5",
                  "japanese": "また",
                  "kana": "また",
                  "meaning": "也；再一次",
                  "meaningEn": "also, again",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mata"
                  ]
            },
            {
                  "id": "n5-0594",
                  "lexiconId": "jlpt-n5",
                  "japanese": "まだ",
                  "kana": "まだ",
                  "meaning": "还没有",
                  "meaningEn": "not yet",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mada"
                  ]
            },
            {
                  "id": "n5-0595",
                  "lexiconId": "jlpt-n5",
                  "japanese": "町",
                  "kana": "まち",
                  "meaning": "城市；城镇",
                  "meaningEn": "city, town",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "machi"
                  ]
            },
            {
                  "id": "n5-0596",
                  "lexiconId": "jlpt-n5",
                  "japanese": "待つ",
                  "kana": "まつ",
                  "meaning": "等待",
                  "meaningEn": "to wait",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "matsu"
                  ]
            },
            {
                  "id": "n5-0597",
                  "lexiconId": "jlpt-n5",
                  "japanese": "真直ぐに",
                  "kana": "まっすぐに",
                  "meaning": "一直；笔直",
                  "meaningEn": "straight ahead",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "massugu ni"
                  ]
            },
            {
                  "id": "n5-0598",
                  "lexiconId": "jlpt-n5",
                  "japanese": "マッチ",
                  "kana": "マッチ",
                  "meaning": "火柴",
                  "meaningEn": "matches",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "machi"
                  ]
            },
            {
                  "id": "n5-0599",
                  "lexiconId": "jlpt-n5",
                  "japanese": "窓",
                  "kana": "まど",
                  "meaning": "窗户",
                  "meaningEn": "window",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mado"
                  ]
            },
            {
                  "id": "n5-0600",
                  "lexiconId": "jlpt-n5",
                  "japanese": "丸い",
                  "kana": "まるい",
                  "meaning": "圆的",
                  "meaningEn": "round",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "marui"
                  ]
            },
            {
                  "id": "n5-0601",
                  "lexiconId": "jlpt-n5",
                  "japanese": "万",
                  "kana": "まん",
                  "meaning": "一万",
                  "meaningEn": "ten thousand",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "man"
                  ]
            },
            {
                  "id": "n5-0602",
                  "lexiconId": "jlpt-n5",
                  "japanese": "万年筆",
                  "kana": "まんねんひつ",
                  "meaning": "钢笔；自来水笔",
                  "meaningEn": "fountain pen",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mannenhitsu"
                  ]
            },
            {
                  "id": "n5-0603",
                  "lexiconId": "jlpt-n5",
                  "japanese": "磨く",
                  "kana": "みがく",
                  "meaning": "擦亮；刷",
                  "meaningEn": "to polish, to brush",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "migaku"
                  ]
            },
            {
                  "id": "n5-0604",
                  "lexiconId": "jlpt-n5",
                  "japanese": "右",
                  "kana": "みぎ",
                  "meaning": "右边",
                  "meaningEn": "right",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "migi"
                  ]
            },
            {
                  "id": "n5-0605",
                  "lexiconId": "jlpt-n5",
                  "japanese": "短い",
                  "kana": "みじかい",
                  "meaning": "短的",
                  "meaningEn": "short",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mijikai"
                  ]
            },
            {
                  "id": "n5-0606",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お水",
                  "kana": "おみず",
                  "meaning": "水",
                  "meaningEn": "water",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "omizu"
                  ]
            },
            {
                  "id": "n5-0607",
                  "lexiconId": "jlpt-n5",
                  "japanese": "店",
                  "kana": "みせ",
                  "meaning": "店；商店",
                  "meaningEn": "shop",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mise"
                  ]
            },
            {
                  "id": "n5-0608",
                  "lexiconId": "jlpt-n5",
                  "japanese": "見せる",
                  "kana": "みせる",
                  "meaning": "看；观看",
                  "meaningEn": "to look, to watch",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "miseru"
                  ]
            },
            {
                  "id": "n5-0609",
                  "lexiconId": "jlpt-n5",
                  "japanese": "道",
                  "kana": "みち",
                  "meaning": "道路",
                  "meaningEn": "road",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "michi"
                  ]
            },
            {
                  "id": "n5-0610",
                  "lexiconId": "jlpt-n5",
                  "japanese": "三日",
                  "kana": "みっか",
                  "meaning": "每月3日；3天",
                  "meaningEn": "3rd day of a month, 3 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mikka"
                  ]
            },
            {
                  "id": "n5-0611",
                  "lexiconId": "jlpt-n5",
                  "japanese": "三つ",
                  "kana": "みっつ",
                  "meaning": "三",
                  "meaningEn": "three",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mittsu"
                  ]
            },
            {
                  "id": "n5-0612",
                  "lexiconId": "jlpt-n5",
                  "japanese": "皆さん",
                  "kana": "みなさん",
                  "meaning": "大家；每个人",
                  "meaningEn": "everyone",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "minsan"
                  ]
            },
            {
                  "id": "n5-0613",
                  "lexiconId": "jlpt-n5",
                  "japanese": "南",
                  "kana": "みなみ",
                  "meaning": "南",
                  "meaningEn": "south",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "minami"
                  ]
            },
            {
                  "id": "n5-0614",
                  "lexiconId": "jlpt-n5",
                  "japanese": "耳",
                  "kana": "みみ",
                  "meaning": "耳朵",
                  "meaningEn": "ear",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mimi"
                  ]
            },
            {
                  "id": "n5-0615",
                  "lexiconId": "jlpt-n5",
                  "japanese": "見る",
                  "kana": "みる",
                  "meaning": "看见；观看",
                  "meaningEn": "to see, to watch",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "miru"
                  ]
            },
            {
                  "id": "n5-0616",
                  "lexiconId": "jlpt-n5",
                  "japanese": "皆",
                  "kana": "みんな",
                  "meaning": "大家；全部",
                  "meaningEn": "all, everyone",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "minna"
                  ]
            },
            {
                  "id": "n5-0617",
                  "lexiconId": "jlpt-n5",
                  "japanese": "六日",
                  "kana": "むいか",
                  "meaning": "每月6日；6天",
                  "meaningEn": "the 6th day of a month, 6 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "muika"
                  ]
            },
            {
                  "id": "n5-0618",
                  "lexiconId": "jlpt-n5",
                  "japanese": "向こう",
                  "kana": "むこう",
                  "meaning": "那边",
                  "meaningEn": "over there",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mukou"
                  ]
            },
            {
                  "id": "n5-0619",
                  "lexiconId": "jlpt-n5",
                  "japanese": "難しい",
                  "kana": "むずかしい",
                  "meaning": "难的",
                  "meaningEn": "difficult",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "muzukashii"
                  ]
            },
            {
                  "id": "n5-0620",
                  "lexiconId": "jlpt-n5",
                  "japanese": "六つ",
                  "kana": "むっつ",
                  "meaning": "六",
                  "meaningEn": "six",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "muttsu"
                  ]
            },
            {
                  "id": "n5-0621",
                  "lexiconId": "jlpt-n5",
                  "japanese": "目",
                  "kana": "め",
                  "meaning": "眼睛",
                  "meaningEn": "eye",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "me"
                  ]
            },
            {
                  "id": "n5-0622",
                  "lexiconId": "jlpt-n5",
                  "japanese": "メートル",
                  "kana": "メートル",
                  "meaning": "米",
                  "meaningEn": "meter",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "meetoru"
                  ]
            },
            {
                  "id": "n5-0623",
                  "lexiconId": "jlpt-n5",
                  "japanese": "めがね",
                  "kana": "めがね",
                  "meaning": "眼镜",
                  "meaningEn": "a pair of glasses",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "megane"
                  ]
            },
            {
                  "id": "n5-0624",
                  "lexiconId": "jlpt-n5",
                  "japanese": "もう",
                  "kana": "もう",
                  "meaning": "已经；还",
                  "meaningEn": "already, yet",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mou"
                  ]
            },
            {
                  "id": "n5-0625",
                  "lexiconId": "jlpt-n5",
                  "japanese": "もう",
                  "kana": "もう",
                  "meaning": "再一个",
                  "meaningEn": "(one) more",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mou"
                  ]
            },
            {
                  "id": "n5-0626",
                  "lexiconId": "jlpt-n5",
                  "japanese": "木曜日",
                  "kana": "もくようび",
                  "meaning": "星期四",
                  "meaningEn": "Thursday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mokuyoubi"
                  ]
            },
            {
                  "id": "n5-0627",
                  "lexiconId": "jlpt-n5",
                  "japanese": "もしもし",
                  "kana": "もしもし",
                  "meaning": "喂；电话用语",
                  "meaningEn": "hello on the phone",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "moshimoshi"
                  ]
            },
            {
                  "id": "n5-0628",
                  "lexiconId": "jlpt-n5",
                  "japanese": "勿論",
                  "kana": "もちろん",
                  "meaning": "当然",
                  "meaningEn": "of course",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mochiron"
                  ]
            },
            {
                  "id": "n5-0629",
                  "lexiconId": "jlpt-n5",
                  "japanese": "持つ",
                  "kana": "もつ",
                  "meaning": "拥有；持有",
                  "meaningEn": "to have, to own",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "motsu"
                  ]
            },
            {
                  "id": "n5-0630",
                  "lexiconId": "jlpt-n5",
                  "japanese": "もっと",
                  "kana": "もっと",
                  "meaning": "更多",
                  "meaningEn": "more",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "motto"
                  ]
            },
            {
                  "id": "n5-0631",
                  "lexiconId": "jlpt-n5",
                  "japanese": "物",
                  "kana": "もの",
                  "meaning": "东西；物品",
                  "meaningEn": "thing",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mono"
                  ]
            },
            {
                  "id": "n5-0632",
                  "lexiconId": "jlpt-n5",
                  "japanese": "門",
                  "kana": "もん",
                  "meaning": "门；大门",
                  "meaningEn": "gate",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mon"
                  ]
            },
            {
                  "id": "n5-0633",
                  "lexiconId": "jlpt-n5",
                  "japanese": "問題",
                  "kana": "もんだい",
                  "meaning": "问题",
                  "meaningEn": "problem, question",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "mondai"
                  ]
            },
            {
                  "id": "n5-0634",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜屋",
                  "kana": "〜や",
                  "meaning": "商店",
                  "meaningEn": "shop. store",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "~ya"
                  ]
            },
            {
                  "id": "n5-0635",
                  "lexiconId": "jlpt-n5",
                  "japanese": "八百屋",
                  "kana": "やおや",
                  "meaning": "蔬菜店",
                  "meaningEn": "vegetable shop",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yaoya"
                  ]
            },
            {
                  "id": "n5-0636",
                  "lexiconId": "jlpt-n5",
                  "japanese": "野菜",
                  "kana": "やさい",
                  "meaning": "蔬菜",
                  "meaningEn": "vegetable",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yasai"
                  ]
            },
            {
                  "id": "n5-0637",
                  "lexiconId": "jlpt-n5",
                  "japanese": "優しい",
                  "kana": "やさしい",
                  "meaning": "温柔的；亲切的",
                  "meaningEn": "gentle",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yasashii"
                  ]
            },
            {
                  "id": "n5-0638",
                  "lexiconId": "jlpt-n5",
                  "japanese": "安い",
                  "kana": "やすい",
                  "meaning": "便宜的",
                  "meaningEn": "cheap, inexpensive",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yasui"
                  ]
            },
            {
                  "id": "n5-0639",
                  "lexiconId": "jlpt-n5",
                  "japanese": "休み",
                  "kana": "やすみ",
                  "meaning": "休假；假期",
                  "meaningEn": "holiday, vacation",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yasumi"
                  ]
            },
            {
                  "id": "n5-0640",
                  "lexiconId": "jlpt-n5",
                  "japanese": "休む",
                  "kana": "やすむ",
                  "meaning": "休息",
                  "meaningEn": "to rest",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yasumu"
                  ]
            },
            {
                  "id": "n5-0641",
                  "lexiconId": "jlpt-n5",
                  "japanese": "八つ",
                  "kana": "やっつ",
                  "meaning": "八",
                  "meaningEn": "eight",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yattsu"
                  ]
            },
            {
                  "id": "n5-0642",
                  "lexiconId": "jlpt-n5",
                  "japanese": "山",
                  "kana": "やま",
                  "meaning": "山",
                  "meaningEn": "mountain",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yama"
                  ]
            },
            {
                  "id": "n5-0643",
                  "lexiconId": "jlpt-n5",
                  "japanese": "やる",
                  "kana": "やる",
                  "meaning": "做",
                  "meaningEn": "to do",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yaru"
                  ]
            },
            {
                  "id": "n5-0644",
                  "lexiconId": "jlpt-n5",
                  "japanese": "八日",
                  "kana": "ようか",
                  "meaning": "每月8日；8天",
                  "meaningEn": "8th day of the month, 8 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "youka"
                  ]
            },
            {
                  "id": "n5-0645",
                  "lexiconId": "jlpt-n5",
                  "japanese": "洋服",
                  "kana": "ようふく",
                  "meaning": "西式服装",
                  "meaningEn": "western style clothing",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "youfuku"
                  ]
            },
            {
                  "id": "n5-0646",
                  "lexiconId": "jlpt-n5",
                  "japanese": "よく",
                  "kana": "よく",
                  "meaning": "经常",
                  "meaningEn": "often",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yoku"
                  ]
            },
            {
                  "id": "n5-0647",
                  "lexiconId": "jlpt-n5",
                  "japanese": "横",
                  "kana": "よこ",
                  "meaning": "横向",
                  "meaningEn": "horizontal",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yoko"
                  ]
            },
            {
                  "id": "n5-0648",
                  "lexiconId": "jlpt-n5",
                  "japanese": "四日",
                  "kana": "よっか",
                  "meaning": "每月4日；4天",
                  "meaningEn": "4th day of the month, 4 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yokka"
                  ]
            },
            {
                  "id": "n5-0649",
                  "lexiconId": "jlpt-n5",
                  "japanese": "四つ",
                  "kana": "よっつ",
                  "meaning": "四",
                  "meaningEn": "four",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yottsu"
                  ]
            },
            {
                  "id": "n5-0650",
                  "lexiconId": "jlpt-n5",
                  "japanese": "呼ぶ",
                  "kana": "よぶ",
                  "meaning": "叫；呼叫",
                  "meaningEn": "to call",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yobu"
                  ]
            },
            {
                  "id": "n5-0651",
                  "lexiconId": "jlpt-n5",
                  "japanese": "読む",
                  "kana": "よむ",
                  "meaning": "读",
                  "meaningEn": "to read",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yomu"
                  ]
            },
            {
                  "id": "n5-0652",
                  "lexiconId": "jlpt-n5",
                  "japanese": "夜",
                  "kana": "よる",
                  "meaning": "夜晚",
                  "meaningEn": "night",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "yoru"
                  ]
            },
            {
                  "id": "n5-0653",
                  "lexiconId": "jlpt-n5",
                  "japanese": "来月",
                  "kana": "らいげつ",
                  "meaning": "下个月",
                  "meaningEn": "next month",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "raigetsu"
                  ]
            },
            {
                  "id": "n5-0654",
                  "lexiconId": "jlpt-n5",
                  "japanese": "来週",
                  "kana": "らいしゅう",
                  "meaning": "下周",
                  "meaningEn": "next week",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "raishuu"
                  ]
            },
            {
                  "id": "n5-0655",
                  "lexiconId": "jlpt-n5",
                  "japanese": "来年",
                  "kana": "らいねん",
                  "meaning": "明年",
                  "meaningEn": "next year",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "rainen"
                  ]
            },
            {
                  "id": "n5-0656",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ラジオ",
                  "kana": "ラジオ",
                  "meaning": "收音机",
                  "meaningEn": "radio",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "rajio"
                  ]
            },
            {
                  "id": "n5-0657",
                  "lexiconId": "jlpt-n5",
                  "japanese": "立派",
                  "kana": "りっぱ",
                  "meaning": "优秀的；气派的",
                  "meaningEn": "splendid",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "rippa"
                  ]
            },
            {
                  "id": "n5-0658",
                  "lexiconId": "jlpt-n5",
                  "japanese": "留学生",
                  "kana": "りゅうがくせい",
                  "meaning": "留学生",
                  "meaningEn": "foreign student",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ryuugakusei"
                  ]
            },
            {
                  "id": "n5-0659",
                  "lexiconId": "jlpt-n5",
                  "japanese": "両親",
                  "kana": "りょうしん",
                  "meaning": "父母",
                  "meaningEn": "parents",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ryoushin"
                  ]
            },
            {
                  "id": "n5-0660",
                  "lexiconId": "jlpt-n5",
                  "japanese": "料理",
                  "kana": "りょうり",
                  "meaning": "料理；烹饪",
                  "meaningEn": "cooking",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ryouri"
                  ]
            },
            {
                  "id": "n5-0661",
                  "lexiconId": "jlpt-n5",
                  "japanese": "旅行",
                  "kana": "りょこう",
                  "meaning": "旅行",
                  "meaningEn": "travel",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "ryokou"
                  ]
            },
            {
                  "id": "n5-0662",
                  "lexiconId": "jlpt-n5",
                  "japanese": "れい",
                  "kana": "れい",
                  "meaning": "零",
                  "meaningEn": "zero",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "rei"
                  ]
            },
            {
                  "id": "n5-0663",
                  "lexiconId": "jlpt-n5",
                  "japanese": "冷蔵庫",
                  "kana": "れいぞうこ",
                  "meaning": "冰箱",
                  "meaningEn": "refrigerator",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "reizouko"
                  ]
            },
            {
                  "id": "n5-0664",
                  "lexiconId": "jlpt-n5",
                  "japanese": "レコード",
                  "kana": "レコード",
                  "meaning": "唱片；记录",
                  "meaningEn": "record",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "rekoodo"
                  ]
            },
            {
                  "id": "n5-0665",
                  "lexiconId": "jlpt-n5",
                  "japanese": "レストラン",
                  "kana": "レストラン",
                  "meaning": "餐厅",
                  "meaningEn": "restaurant",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "resutoran"
                  ]
            },
            {
                  "id": "n5-0666",
                  "lexiconId": "jlpt-n5",
                  "japanese": "練習",
                  "kana": "れんしゅう",
                  "meaning": "练习",
                  "meaningEn": "practice",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "renshuu"
                  ]
            },
            {
                  "id": "n5-0667",
                  "lexiconId": "jlpt-n5",
                  "japanese": "六",
                  "kana": "ろく",
                  "meaning": "六",
                  "meaningEn": "six",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "roku"
                  ]
            },
            {
                  "id": "n5-0668",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ワイシャツ",
                  "kana": "ワイシャツ",
                  "meaning": "白衬衫",
                  "meaningEn": "white shirt",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "waishatsu"
                  ]
            },
            {
                  "id": "n5-0669",
                  "lexiconId": "jlpt-n5",
                  "japanese": "若い",
                  "kana": "わかい",
                  "meaning": "年轻的",
                  "meaningEn": "young",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "wakai"
                  ]
            },
            {
                  "id": "n5-0670",
                  "lexiconId": "jlpt-n5",
                  "japanese": "分かる",
                  "kana": "わかる",
                  "meaning": "知道；理解",
                  "meaningEn": "to know, to understand",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "wakaru"
                  ]
            },
            {
                  "id": "n5-0671",
                  "lexiconId": "jlpt-n5",
                  "japanese": "忘れる",
                  "kana": "わすれる",
                  "meaning": "忘记",
                  "meaningEn": "to forget",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "wasureru"
                  ]
            },
            {
                  "id": "n5-0672",
                  "lexiconId": "jlpt-n5",
                  "japanese": "私",
                  "kana": "わたし",
                  "meaning": "我",
                  "meaningEn": "me, I",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "watashi"
                  ]
            },
            {
                  "id": "n5-0673",
                  "lexiconId": "jlpt-n5",
                  "japanese": "渡す",
                  "kana": "わたす",
                  "meaning": "递交",
                  "meaningEn": "to hand over",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "watasu"
                  ]
            },
            {
                  "id": "n5-0674",
                  "lexiconId": "jlpt-n5",
                  "japanese": "渡る",
                  "kana": "わたる",
                  "meaning": "渡过；穿过",
                  "meaningEn": "to cross",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "wataru"
                  ]
            },
            {
                  "id": "n5-0675",
                  "lexiconId": "jlpt-n5",
                  "japanese": "悪い",
                  "kana": "わるい",
                  "meaning": "坏的；不好",
                  "meaningEn": "bad",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "自动中文释义",
                        "warui"
                  ]
            }
      ]
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
