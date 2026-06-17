export type AccessLevel = "free" | "paid";

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
    words: [
            {
                  "id": "n5-0001",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ああ",
                  "kana": "ああ",
                  "meaning": "Ah!",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ah"
                  ]
            },
            {
                  "id": "n5-0002",
                  "lexiconId": "jlpt-n5",
                  "japanese": "会う",
                  "kana": "あう",
                  "meaning": "to meet",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "au"
                  ]
            },
            {
                  "id": "n5-0003",
                  "lexiconId": "jlpt-n5",
                  "japanese": "青い",
                  "kana": "あおい",
                  "meaning": "blue",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "aoi"
                  ]
            },
            {
                  "id": "n5-0004",
                  "lexiconId": "jlpt-n5",
                  "japanese": "赤い",
                  "kana": "あかい",
                  "meaning": "red",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "akai"
                  ]
            },
            {
                  "id": "n5-0005",
                  "lexiconId": "jlpt-n5",
                  "japanese": "明るい",
                  "kana": "あかるい",
                  "meaning": "light, bright",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "akarui"
                  ]
            },
            {
                  "id": "n5-0006",
                  "lexiconId": "jlpt-n5",
                  "japanese": "秋",
                  "kana": "あき",
                  "meaning": "autumn, fall",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "aki"
                  ]
            },
            {
                  "id": "n5-0007",
                  "lexiconId": "jlpt-n5",
                  "japanese": "開く",
                  "kana": "あく",
                  "meaning": "open",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "aku"
                  ]
            },
            {
                  "id": "n5-0008",
                  "lexiconId": "jlpt-n5",
                  "japanese": "開ける",
                  "kana": "あける",
                  "meaning": "to open",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "akeru"
                  ]
            },
            {
                  "id": "n5-0009",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あげる",
                  "kana": "あげる",
                  "meaning": "to give",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ageru"
                  ]
            },
            {
                  "id": "n5-0010",
                  "lexiconId": "jlpt-n5",
                  "japanese": "朝",
                  "kana": "あさ",
                  "meaning": "morning",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "asa"
                  ]
            },
            {
                  "id": "n5-0011",
                  "lexiconId": "jlpt-n5",
                  "japanese": "朝ご飯",
                  "kana": "あさごはん",
                  "meaning": "breakfast",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "asagohan"
                  ]
            },
            {
                  "id": "n5-0012",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あさって",
                  "kana": "あさって",
                  "meaning": "the day after tomorrow",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "asatte"
                  ]
            },
            {
                  "id": "n5-0013",
                  "lexiconId": "jlpt-n5",
                  "japanese": "足",
                  "kana": "あし",
                  "meaning": "leg, foot",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ashi"
                  ]
            },
            {
                  "id": "n5-0014",
                  "lexiconId": "jlpt-n5",
                  "japanese": "明日",
                  "kana": "あした",
                  "meaning": "tomorrow",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ashita"
                  ]
            },
            {
                  "id": "n5-0015",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あそこ",
                  "kana": "あそこ",
                  "meaning": "over there",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "asoko"
                  ]
            },
            {
                  "id": "n5-0016",
                  "lexiconId": "jlpt-n5",
                  "japanese": "遊ぶ",
                  "kana": "あそぶ",
                  "meaning": "to play",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "asobu"
                  ]
            },
            {
                  "id": "n5-0017",
                  "lexiconId": "jlpt-n5",
                  "japanese": "温かい",
                  "kana": "あたたかい",
                  "meaning": "warm",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "atatakai"
                  ]
            },
            {
                  "id": "n5-0018",
                  "lexiconId": "jlpt-n5",
                  "japanese": "頭",
                  "kana": "あたま",
                  "meaning": "head",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "atama"
                  ]
            },
            {
                  "id": "n5-0019",
                  "lexiconId": "jlpt-n5",
                  "japanese": "新しい",
                  "kana": "あたらしい",
                  "meaning": "new",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "atarashii"
                  ]
            },
            {
                  "id": "n5-0020",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あちら",
                  "kana": "あちら",
                  "meaning": "over there (polite)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "achira"
                  ]
            },
            {
                  "id": "n5-0021",
                  "lexiconId": "jlpt-n5",
                  "japanese": "暑い",
                  "kana": "あつい",
                  "meaning": "hot (air)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "atsui"
                  ]
            },
            {
                  "id": "n5-0022",
                  "lexiconId": "jlpt-n5",
                  "japanese": "厚い",
                  "kana": "あつい",
                  "meaning": "thick",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "atsui"
                  ]
            },
            {
                  "id": "n5-0023",
                  "lexiconId": "jlpt-n5",
                  "japanese": "後",
                  "kana": "あと",
                  "meaning": "later, after",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ato"
                  ]
            },
            {
                  "id": "n5-0024",
                  "lexiconId": "jlpt-n5",
                  "japanese": "貴方",
                  "kana": "あなた",
                  "meaning": "you",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "anata"
                  ]
            },
            {
                  "id": "n5-0025",
                  "lexiconId": "jlpt-n5",
                  "japanese": "兄",
                  "kana": "あに",
                  "meaning": "older brother",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ani"
                  ]
            },
            {
                  "id": "n5-0026",
                  "lexiconId": "jlpt-n5",
                  "japanese": "姉",
                  "kana": "あね",
                  "meaning": "older sister",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ane"
                  ]
            },
            {
                  "id": "n5-0027",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あの",
                  "kana": "あの",
                  "meaning": "that (over there)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ano"
                  ]
            },
            {
                  "id": "n5-0028",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あの",
                  "kana": "あの",
                  "meaning": "well, then",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ano"
                  ]
            },
            {
                  "id": "n5-0029",
                  "lexiconId": "jlpt-n5",
                  "japanese": "アパート",
                  "kana": "アパート",
                  "meaning": "apartment",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "apaato"
                  ]
            },
            {
                  "id": "n5-0030",
                  "lexiconId": "jlpt-n5",
                  "japanese": "浴びる",
                  "kana": "あびる",
                  "meaning": "to take a shower",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "abiru"
                  ]
            },
            {
                  "id": "n5-0031",
                  "lexiconId": "jlpt-n5",
                  "japanese": "危ない",
                  "kana": "あぶない",
                  "meaning": "dangerous",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "abunai"
                  ]
            },
            {
                  "id": "n5-0032",
                  "lexiconId": "jlpt-n5",
                  "japanese": "甘い",
                  "kana": "あまい",
                  "meaning": "sweet",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "amai"
                  ]
            },
            {
                  "id": "n5-0033",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あまり",
                  "kana": "あまり",
                  "meaning": "not so",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "amari"
                  ]
            },
            {
                  "id": "n5-0034",
                  "lexiconId": "jlpt-n5",
                  "japanese": "雨",
                  "kana": "あめ",
                  "meaning": "rain",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ame"
                  ]
            },
            {
                  "id": "n5-0035",
                  "lexiconId": "jlpt-n5",
                  "japanese": "洗う",
                  "kana": "あらう",
                  "meaning": "to wash",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "arau"
                  ]
            },
            {
                  "id": "n5-0036",
                  "lexiconId": "jlpt-n5",
                  "japanese": "有る",
                  "kana": "ある",
                  "meaning": "to be, to exist",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "aru"
                  ]
            },
            {
                  "id": "n5-0037",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ある",
                  "kana": "ある",
                  "meaning": "to possess",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "aru"
                  ]
            },
            {
                  "id": "n5-0038",
                  "lexiconId": "jlpt-n5",
                  "japanese": "歩く",
                  "kana": "あるく",
                  "meaning": "to walk",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "aruku"
                  ]
            },
            {
                  "id": "n5-0039",
                  "lexiconId": "jlpt-n5",
                  "japanese": "あれ",
                  "kana": "あれ",
                  "meaning": "that one",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "are"
                  ]
            },
            {
                  "id": "n5-0040",
                  "lexiconId": "jlpt-n5",
                  "japanese": "良い",
                  "kana": "いい",
                  "meaning": "good",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ii, yoi"
                  ]
            },
            {
                  "id": "n5-0041",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いいえ",
                  "kana": "いいえ",
                  "meaning": "no",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "iie"
                  ]
            },
            {
                  "id": "n5-0042",
                  "lexiconId": "jlpt-n5",
                  "japanese": "言う",
                  "kana": "いう",
                  "meaning": "to say, to tell",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "iu"
                  ]
            },
            {
                  "id": "n5-0043",
                  "lexiconId": "jlpt-n5",
                  "japanese": "家",
                  "kana": "いえ",
                  "meaning": "house, home",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ie"
                  ]
            },
            {
                  "id": "n5-0044",
                  "lexiconId": "jlpt-n5",
                  "japanese": "行く",
                  "kana": "いく",
                  "meaning": "to go",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "iku"
                  ]
            },
            {
                  "id": "n5-0045",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いくつ",
                  "kana": "いくつ",
                  "meaning": "how many, how old",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ikutsu"
                  ]
            },
            {
                  "id": "n5-0046",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いくら",
                  "kana": "いくら",
                  "meaning": "how much",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ikura"
                  ]
            },
            {
                  "id": "n5-0047",
                  "lexiconId": "jlpt-n5",
                  "japanese": "池",
                  "kana": "いけ",
                  "meaning": "pond",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ike"
                  ]
            },
            {
                  "id": "n5-0048",
                  "lexiconId": "jlpt-n5",
                  "japanese": "医者",
                  "kana": "いしゃ",
                  "meaning": "doctor",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "isha"
                  ]
            },
            {
                  "id": "n5-0049",
                  "lexiconId": "jlpt-n5",
                  "japanese": "椅子",
                  "kana": "いす",
                  "meaning": "chair",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "isu"
                  ]
            },
            {
                  "id": "n5-0050",
                  "lexiconId": "jlpt-n5",
                  "japanese": "忙しい",
                  "kana": "いそがしい",
                  "meaning": "to be busy",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "isogashii"
                  ]
            },
            {
                  "id": "n5-0051",
                  "lexiconId": "jlpt-n5",
                  "japanese": "痛い",
                  "kana": "いたい",
                  "meaning": "to be painful",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "itai"
                  ]
            },
            {
                  "id": "n5-0052",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一",
                  "kana": "いち",
                  "meaning": "one",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ichi"
                  ]
            },
            {
                  "id": "n5-0053",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一日",
                  "kana": "いちにち",
                  "meaning": "one day",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ichinichi"
                  ]
            },
            {
                  "id": "n5-0054",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一番",
                  "kana": "いちばん",
                  "meaning": "No. 1, the best, the first",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ichiban"
                  ]
            },
            {
                  "id": "n5-0055",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いつ",
                  "kana": "いつ",
                  "meaning": "when",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "itsu"
                  ]
            },
            {
                  "id": "n5-0056",
                  "lexiconId": "jlpt-n5",
                  "japanese": "五日",
                  "kana": "いつか",
                  "meaning": "the 5th day of the month, 5 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "itsuka"
                  ]
            },
            {
                  "id": "n5-0057",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一緒",
                  "kana": "いっしょ",
                  "meaning": "together",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "issho"
                  ]
            },
            {
                  "id": "n5-0058",
                  "lexiconId": "jlpt-n5",
                  "japanese": "五つ",
                  "kana": "いつつ",
                  "meaning": "five",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "itsutsu"
                  ]
            },
            {
                  "id": "n5-0059",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いつも",
                  "kana": "いつも",
                  "meaning": "always",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "itsumo"
                  ]
            },
            {
                  "id": "n5-0060",
                  "lexiconId": "jlpt-n5",
                  "japanese": "今",
                  "kana": "いま",
                  "meaning": "now",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ima"
                  ]
            },
            {
                  "id": "n5-0061",
                  "lexiconId": "jlpt-n5",
                  "japanese": "意味",
                  "kana": "いみ",
                  "meaning": "meaning",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "imi"
                  ]
            },
            {
                  "id": "n5-0062",
                  "lexiconId": "jlpt-n5",
                  "japanese": "妹",
                  "kana": "いもうと",
                  "meaning": "someone’s younger sister",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "imouto"
                  ]
            },
            {
                  "id": "n5-0063",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いや",
                  "kana": "いや",
                  "meaning": "not likable, unpleasant",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "iya"
                  ]
            },
            {
                  "id": "n5-0064",
                  "lexiconId": "jlpt-n5",
                  "japanese": "入口",
                  "kana": "いりぐち",
                  "meaning": "entrance",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "iriguchi"
                  ]
            },
            {
                  "id": "n5-0065",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いる",
                  "kana": "いる",
                  "meaning": "need, must have, be required",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "iru"
                  ]
            },
            {
                  "id": "n5-0066",
                  "lexiconId": "jlpt-n5",
                  "japanese": "いる",
                  "kana": "いる",
                  "meaning": "to exist",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "iru"
                  ]
            },
            {
                  "id": "n5-0067",
                  "lexiconId": "jlpt-n5",
                  "japanese": "入れる",
                  "kana": "いれる",
                  "meaning": "to insert, to put in",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ireru"
                  ]
            },
            {
                  "id": "n5-0068",
                  "lexiconId": "jlpt-n5",
                  "japanese": "色",
                  "kana": "いろ",
                  "meaning": "color",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "iro"
                  ]
            },
            {
                  "id": "n5-0069",
                  "lexiconId": "jlpt-n5",
                  "japanese": "色々",
                  "kana": "いろいろ",
                  "meaning": "various",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "iroiro"
                  ]
            },
            {
                  "id": "n5-0070",
                  "lexiconId": "jlpt-n5",
                  "japanese": "上",
                  "kana": "うえ",
                  "meaning": "top, on, above",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ue"
                  ]
            },
            {
                  "id": "n5-0071",
                  "lexiconId": "jlpt-n5",
                  "japanese": "後ろ",
                  "kana": "うしろ",
                  "meaning": "back, rear, behind",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ushiro"
                  ]
            },
            {
                  "id": "n5-0072",
                  "lexiconId": "jlpt-n5",
                  "japanese": "薄い",
                  "kana": "うすい",
                  "meaning": "thin",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "usui"
                  ]
            },
            {
                  "id": "n5-0073",
                  "lexiconId": "jlpt-n5",
                  "japanese": "歌",
                  "kana": "うた",
                  "meaning": "song",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "uta"
                  ]
            },
            {
                  "id": "n5-0074",
                  "lexiconId": "jlpt-n5",
                  "japanese": "歌う",
                  "kana": "うたう",
                  "meaning": "to sing",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "utau"
                  ]
            },
            {
                  "id": "n5-0075",
                  "lexiconId": "jlpt-n5",
                  "japanese": "内",
                  "kana": "うち",
                  "meaning": "home",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "uchi"
                  ]
            },
            {
                  "id": "n5-0076",
                  "lexiconId": "jlpt-n5",
                  "japanese": "生まれる",
                  "kana": "うまれる",
                  "meaning": "to be born",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "umareru"
                  ]
            },
            {
                  "id": "n5-0077",
                  "lexiconId": "jlpt-n5",
                  "japanese": "海",
                  "kana": "うみ",
                  "meaning": "sea",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "umi"
                  ]
            },
            {
                  "id": "n5-0078",
                  "lexiconId": "jlpt-n5",
                  "japanese": "売る",
                  "kana": "うる",
                  "meaning": "to sell",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "uru"
                  ]
            },
            {
                  "id": "n5-0079",
                  "lexiconId": "jlpt-n5",
                  "japanese": "上着",
                  "kana": "うわぎ",
                  "meaning": "coat, jacket",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "uwagi"
                  ]
            },
            {
                  "id": "n5-0080",
                  "lexiconId": "jlpt-n5",
                  "japanese": "絵",
                  "kana": "え",
                  "meaning": "picture",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "e"
                  ]
            },
            {
                  "id": "n5-0081",
                  "lexiconId": "jlpt-n5",
                  "japanese": "映画",
                  "kana": "えいが",
                  "meaning": "movie",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "eiga"
                  ]
            },
            {
                  "id": "n5-0082",
                  "lexiconId": "jlpt-n5",
                  "japanese": "映画館",
                  "kana": "えいがかん",
                  "meaning": "cinema",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "eigakan"
                  ]
            },
            {
                  "id": "n5-0083",
                  "lexiconId": "jlpt-n5",
                  "japanese": "英語",
                  "kana": "えいご",
                  "meaning": "English language",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "eigo"
                  ]
            },
            {
                  "id": "n5-0084",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ええ",
                  "kana": "ええ",
                  "meaning": "Yes, I see",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ee"
                  ]
            },
            {
                  "id": "n5-0085",
                  "lexiconId": "jlpt-n5",
                  "japanese": "駅",
                  "kana": "えき",
                  "meaning": "station",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "eki"
                  ]
            },
            {
                  "id": "n5-0086",
                  "lexiconId": "jlpt-n5",
                  "japanese": "エレベータ",
                  "kana": "エレベータ",
                  "meaning": "elevator",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "erebeeta"
                  ]
            },
            {
                  "id": "n5-0087",
                  "lexiconId": "jlpt-n5",
                  "japanese": "円",
                  "kana": "えん",
                  "meaning": "Yen",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "en"
                  ]
            },
            {
                  "id": "n5-0088",
                  "lexiconId": "jlpt-n5",
                  "japanese": "鉛筆",
                  "kana": "えんぴつ",
                  "meaning": "pencil",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "enpitsu"
                  ]
            },
            {
                  "id": "n5-0089",
                  "lexiconId": "jlpt-n5",
                  "japanese": "御",
                  "kana": "お",
                  "meaning": "honorific prefix",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "o"
                  ]
            },
            {
                  "id": "n5-0090",
                  "lexiconId": "jlpt-n5",
                  "japanese": "美味しい",
                  "kana": "おいしい",
                  "meaning": "tasty, delicious",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "oishii"
                  ]
            },
            {
                  "id": "n5-0091",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大きい",
                  "kana": "おおきい",
                  "meaning": "big",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ookii"
                  ]
            },
            {
                  "id": "n5-0092",
                  "lexiconId": "jlpt-n5",
                  "japanese": "おおぜい",
                  "kana": "おおぜい",
                  "meaning": "many people",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "oozei"
                  ]
            },
            {
                  "id": "n5-0093",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お母さん",
                  "kana": "おかあさん",
                  "meaning": "my own mother",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "okaasan"
                  ]
            },
            {
                  "id": "n5-0094",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お菓子",
                  "kana": "おかし",
                  "meaning": "confectionary, cake",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "okashi"
                  ]
            },
            {
                  "id": "n5-0095",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お金",
                  "kana": "おかね",
                  "meaning": "money",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "okane"
                  ]
            },
            {
                  "id": "n5-0096",
                  "lexiconId": "jlpt-n5",
                  "japanese": "起きる",
                  "kana": "おきる",
                  "meaning": "to get up, to stand up",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "okiru"
                  ]
            },
            {
                  "id": "n5-0097",
                  "lexiconId": "jlpt-n5",
                  "japanese": "置く",
                  "kana": "おく",
                  "meaning": "to put, to place",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "oku"
                  ]
            },
            {
                  "id": "n5-0098",
                  "lexiconId": "jlpt-n5",
                  "japanese": "奥さん",
                  "kana": "おくさん",
                  "meaning": "someone’s wife",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "okusan"
                  ]
            },
            {
                  "id": "n5-0099",
                  "lexiconId": "jlpt-n5",
                  "japanese": "送る",
                  "kana": "おくる",
                  "meaning": "to send",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "okuru"
                  ]
            },
            {
                  "id": "n5-0100",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お酒",
                  "kana": "おさけ",
                  "meaning": "alcohol, sake",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "osake"
                  ]
            },
            {
                  "id": "n5-0101",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お皿",
                  "kana": "おさら",
                  "meaning": "plate",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "osara"
                  ]
            },
            {
                  "id": "n5-0102",
                  "lexiconId": "jlpt-n5",
                  "japanese": "伯父さん",
                  "kana": "おじさん",
                  "meaning": "uncle",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ojisan"
                  ]
            },
            {
                  "id": "n5-0103",
                  "lexiconId": "jlpt-n5",
                  "japanese": "おじいさん",
                  "kana": "おじいさん",
                  "meaning": "grand father",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ojiisan"
                  ]
            },
            {
                  "id": "n5-0104",
                  "lexiconId": "jlpt-n5",
                  "japanese": "押す",
                  "kana": "おす",
                  "meaning": "to push",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "osu"
                  ]
            },
            {
                  "id": "n5-0105",
                  "lexiconId": "jlpt-n5",
                  "japanese": "遅い",
                  "kana": "おそい",
                  "meaning": "late, slow",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "osoi"
                  ]
            },
            {
                  "id": "n5-0106",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お茶",
                  "kana": "おちゃ",
                  "meaning": "tea",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ocha"
                  ]
            },
            {
                  "id": "n5-0107",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お手洗い",
                  "kana": "おてあらい",
                  "meaning": "toilet, lavatory",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "otearai"
                  ]
            },
            {
                  "id": "n5-0108",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お父さん",
                  "kana": "おとうさん",
                  "meaning": "father",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "otousan"
                  ]
            },
            {
                  "id": "n5-0109",
                  "lexiconId": "jlpt-n5",
                  "japanese": "弟",
                  "kana": "おとうと",
                  "meaning": "someone’s younger brother",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "otouto"
                  ]
            },
            {
                  "id": "n5-0110",
                  "lexiconId": "jlpt-n5",
                  "japanese": "男",
                  "kana": "おとこ",
                  "meaning": "man",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "otoko"
                  ]
            },
            {
                  "id": "n5-0111",
                  "lexiconId": "jlpt-n5",
                  "japanese": "男の子",
                  "kana": "おとこのこ",
                  "meaning": "boy",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "otokonoko"
                  ]
            },
            {
                  "id": "n5-0112",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一昨日",
                  "kana": "おととい",
                  "meaning": "the day before yesterday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ototoi"
                  ]
            },
            {
                  "id": "n5-0113",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一昨年",
                  "kana": "おととし",
                  "meaning": "the year before last",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ototoshi"
                  ]
            },
            {
                  "id": "n5-0114",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大人",
                  "kana": "おとな",
                  "meaning": "adult",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "otona"
                  ]
            },
            {
                  "id": "n5-0115",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お腹",
                  "kana": "おなか",
                  "meaning": "stomach",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "onaka"
                  ]
            },
            {
                  "id": "n5-0116",
                  "lexiconId": "jlpt-n5",
                  "japanese": "同じ",
                  "kana": "おなじ",
                  "meaning": "same",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "onaji"
                  ]
            },
            {
                  "id": "n5-0117",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お兄さん",
                  "kana": "おにいさん",
                  "meaning": "someone’s elder brother",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "oniisan"
                  ]
            },
            {
                  "id": "n5-0118",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お姉さん",
                  "kana": "おねえさん",
                  "meaning": "someone’s elder sister",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "oneesan"
                  ]
            },
            {
                  "id": "n5-0119",
                  "lexiconId": "jlpt-n5",
                  "japanese": "伯母さん",
                  "kana": "おばさん",
                  "meaning": "aunt",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "obasan"
                  ]
            },
            {
                  "id": "n5-0120",
                  "lexiconId": "jlpt-n5",
                  "japanese": "おばあさん",
                  "kana": "おばあさん",
                  "meaning": "grandmother",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "obaasan"
                  ]
            },
            {
                  "id": "n5-0121",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お弁当",
                  "kana": "おべんとう",
                  "meaning": "lunchbox",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "obentou"
                  ]
            },
            {
                  "id": "n5-0122",
                  "lexiconId": "jlpt-n5",
                  "japanese": "覚える",
                  "kana": "おぼえる",
                  "meaning": "to memorize, to remember",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "oboeru"
                  ]
            },
            {
                  "id": "n5-0123",
                  "lexiconId": "jlpt-n5",
                  "japanese": "重い",
                  "kana": "おもい",
                  "meaning": "heavy",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "omoi"
                  ]
            },
            {
                  "id": "n5-0124",
                  "lexiconId": "jlpt-n5",
                  "japanese": "面白い",
                  "kana": "おもしろい",
                  "meaning": "interesting, funny",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "omoshiroi"
                  ]
            },
            {
                  "id": "n5-0125",
                  "lexiconId": "jlpt-n5",
                  "japanese": "泳ぐ",
                  "kana": "およぐ",
                  "meaning": "to swim",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "oyogu"
                  ]
            },
            {
                  "id": "n5-0126",
                  "lexiconId": "jlpt-n5",
                  "japanese": "降りる",
                  "kana": "おりる",
                  "meaning": "to get off",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "oriru"
                  ]
            },
            {
                  "id": "n5-0127",
                  "lexiconId": "jlpt-n5",
                  "japanese": "終わる",
                  "kana": "おわる",
                  "meaning": "to end",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "owaru"
                  ]
            },
            {
                  "id": "n5-0128",
                  "lexiconId": "jlpt-n5",
                  "japanese": "音楽",
                  "kana": "おんがく",
                  "meaning": "music",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ongaku"
                  ]
            },
            {
                  "id": "n5-0129",
                  "lexiconId": "jlpt-n5",
                  "japanese": "女",
                  "kana": "おんな",
                  "meaning": "woman",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "onna"
                  ]
            },
            {
                  "id": "n5-0130",
                  "lexiconId": "jlpt-n5",
                  "japanese": "女の子",
                  "kana": "おんなのこ",
                  "meaning": "girl",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "onnanoko"
                  ]
            },
            {
                  "id": "n5-0131",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜回",
                  "kana": "〜かい",
                  "meaning": "~times",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~kai"
                  ]
            },
            {
                  "id": "n5-0132",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜階",
                  "kana": "〜かい",
                  "meaning": "~floor",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~kai"
                  ]
            },
            {
                  "id": "n5-0133",
                  "lexiconId": "jlpt-n5",
                  "japanese": "外国",
                  "kana": "がいこく",
                  "meaning": "foreign country",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "gaikoku"
                  ]
            },
            {
                  "id": "n5-0134",
                  "lexiconId": "jlpt-n5",
                  "japanese": "外国人",
                  "kana": "がいこくじん",
                  "meaning": "foreigner",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "gaikokujin"
                  ]
            },
            {
                  "id": "n5-0135",
                  "lexiconId": "jlpt-n5",
                  "japanese": "会社",
                  "kana": "かいしゃ",
                  "meaning": "company, enterprise",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kaisha"
                  ]
            },
            {
                  "id": "n5-0136",
                  "lexiconId": "jlpt-n5",
                  "japanese": "階段",
                  "kana": "かいだん",
                  "meaning": "stairs",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kaidan"
                  ]
            },
            {
                  "id": "n5-0137",
                  "lexiconId": "jlpt-n5",
                  "japanese": "買物",
                  "kana": "かいもの",
                  "meaning": "shopping",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kaimono"
                  ]
            },
            {
                  "id": "n5-0138",
                  "lexiconId": "jlpt-n5",
                  "japanese": "買う",
                  "kana": "かう",
                  "meaning": "to buy",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kau"
                  ]
            },
            {
                  "id": "n5-0139",
                  "lexiconId": "jlpt-n5",
                  "japanese": "返す",
                  "kana": "かえす",
                  "meaning": "to return an object",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kaesu"
                  ]
            },
            {
                  "id": "n5-0140",
                  "lexiconId": "jlpt-n5",
                  "japanese": "帰る",
                  "kana": "かえる",
                  "meaning": "to return home",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kaeru"
                  ]
            },
            {
                  "id": "n5-0141",
                  "lexiconId": "jlpt-n5",
                  "japanese": "顔",
                  "kana": "かお",
                  "meaning": "face",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kao"
                  ]
            },
            {
                  "id": "n5-0142",
                  "lexiconId": "jlpt-n5",
                  "japanese": "かかる",
                  "kana": "かかる",
                  "meaning": "to take time, money",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kakaru"
                  ]
            },
            {
                  "id": "n5-0143",
                  "lexiconId": "jlpt-n5",
                  "japanese": "鍵",
                  "kana": "かぎ",
                  "meaning": "key",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kagi"
                  ]
            },
            {
                  "id": "n5-0144",
                  "lexiconId": "jlpt-n5",
                  "japanese": "書く",
                  "kana": "かく",
                  "meaning": "to write",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kaku"
                  ]
            },
            {
                  "id": "n5-0145",
                  "lexiconId": "jlpt-n5",
                  "japanese": "学生",
                  "kana": "がくせい",
                  "meaning": "student",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "gakusei"
                  ]
            },
            {
                  "id": "n5-0146",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜か月",
                  "kana": "〜かげつ",
                  "meaning": "~ number of months",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~kagetsu"
                  ]
            },
            {
                  "id": "n5-0147",
                  "lexiconId": "jlpt-n5",
                  "japanese": "かける",
                  "kana": "かける",
                  "meaning": "to wear",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kakeru"
                  ]
            },
            {
                  "id": "n5-0148",
                  "lexiconId": "jlpt-n5",
                  "japanese": "かける",
                  "kana": "かける",
                  "meaning": "to make a phone call",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kakeru"
                  ]
            },
            {
                  "id": "n5-0149",
                  "lexiconId": "jlpt-n5",
                  "japanese": "傘",
                  "kana": "かさ",
                  "meaning": "umbrella",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kasa"
                  ]
            },
            {
                  "id": "n5-0150",
                  "lexiconId": "jlpt-n5",
                  "japanese": "貸す",
                  "kana": "かす",
                  "meaning": "to lend",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kasu"
                  ]
            },
            {
                  "id": "n5-0151",
                  "lexiconId": "jlpt-n5",
                  "japanese": "風",
                  "kana": "かぜ",
                  "meaning": "wind",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kaze"
                  ]
            },
            {
                  "id": "n5-0152",
                  "lexiconId": "jlpt-n5",
                  "japanese": "風邪",
                  "kana": "かぜ",
                  "meaning": "a cold",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kaze"
                  ]
            },
            {
                  "id": "n5-0153",
                  "lexiconId": "jlpt-n5",
                  "japanese": "家族",
                  "kana": "かぞく",
                  "meaning": "family",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kazoku"
                  ]
            },
            {
                  "id": "n5-0154",
                  "lexiconId": "jlpt-n5",
                  "japanese": "方",
                  "kana": "かた",
                  "meaning": "person (polite)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kata"
                  ]
            },
            {
                  "id": "n5-0155",
                  "lexiconId": "jlpt-n5",
                  "japanese": "片仮名",
                  "kana": "かたかな",
                  "meaning": "Katakana",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "katakana"
                  ]
            },
            {
                  "id": "n5-0156",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一月",
                  "kana": "いちがつ",
                  "meaning": "January",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ichigatsu"
                  ]
            },
            {
                  "id": "n5-0157",
                  "lexiconId": "jlpt-n5",
                  "japanese": "二月",
                  "kana": "にがつ",
                  "meaning": "February",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nigatsu"
                  ]
            },
            {
                  "id": "n5-0158",
                  "lexiconId": "jlpt-n5",
                  "japanese": "三月",
                  "kana": "さんがつ",
                  "meaning": "March",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sangatsu"
                  ]
            },
            {
                  "id": "n5-0159",
                  "lexiconId": "jlpt-n5",
                  "japanese": "四月",
                  "kana": "しがつ",
                  "meaning": "April",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shigatsu"
                  ]
            },
            {
                  "id": "n5-0160",
                  "lexiconId": "jlpt-n5",
                  "japanese": "五月",
                  "kana": "ごがつ",
                  "meaning": "May",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "gogatsu"
                  ]
            },
            {
                  "id": "n5-0161",
                  "lexiconId": "jlpt-n5",
                  "japanese": "六月",
                  "kana": "ろくがつ",
                  "meaning": "June",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "rokugatsu"
                  ]
            },
            {
                  "id": "n5-0162",
                  "lexiconId": "jlpt-n5",
                  "japanese": "七月",
                  "kana": "しちがつ",
                  "meaning": "July",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shichigatsu"
                  ]
            },
            {
                  "id": "n5-0163",
                  "lexiconId": "jlpt-n5",
                  "japanese": "八月",
                  "kana": "はちがつ",
                  "meaning": "August",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hachigatsu"
                  ]
            },
            {
                  "id": "n5-0164",
                  "lexiconId": "jlpt-n5",
                  "japanese": "九月",
                  "kana": "くがつ",
                  "meaning": "September",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kugatsu"
                  ]
            },
            {
                  "id": "n5-0165",
                  "lexiconId": "jlpt-n5",
                  "japanese": "十月",
                  "kana": "じゅうがつ",
                  "meaning": "October",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "juugatsu"
                  ]
            },
            {
                  "id": "n5-0166",
                  "lexiconId": "jlpt-n5",
                  "japanese": "十一月",
                  "kana": "じゅういちがつ",
                  "meaning": "November",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "juuichigatsu"
                  ]
            },
            {
                  "id": "n5-0167",
                  "lexiconId": "jlpt-n5",
                  "japanese": "十二月",
                  "kana": "じゅうにがつ",
                  "meaning": "December",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "juunigatsu"
                  ]
            },
            {
                  "id": "n5-0168",
                  "lexiconId": "jlpt-n5",
                  "japanese": "学校",
                  "kana": "がっこう",
                  "meaning": "school",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "gakkou"
                  ]
            },
            {
                  "id": "n5-0169",
                  "lexiconId": "jlpt-n5",
                  "japanese": "角",
                  "kana": "かど",
                  "meaning": "corner",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kado"
                  ]
            },
            {
                  "id": "n5-0170",
                  "lexiconId": "jlpt-n5",
                  "japanese": "家内",
                  "kana": "かない",
                  "meaning": "my wife",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kanai"
                  ]
            },
            {
                  "id": "n5-0171",
                  "lexiconId": "jlpt-n5",
                  "japanese": "鞄",
                  "kana": "かばん",
                  "meaning": "bag",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kaban"
                  ]
            },
            {
                  "id": "n5-0172",
                  "lexiconId": "jlpt-n5",
                  "japanese": "花瓶",
                  "kana": "かびん",
                  "meaning": "vase",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kabin"
                  ]
            },
            {
                  "id": "n5-0173",
                  "lexiconId": "jlpt-n5",
                  "japanese": "冠る",
                  "kana": "かぶる",
                  "meaning": "to put on a hat",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kaburu"
                  ]
            },
            {
                  "id": "n5-0174",
                  "lexiconId": "jlpt-n5",
                  "japanese": "紙",
                  "kana": "かみ",
                  "meaning": "paper",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kami"
                  ]
            },
            {
                  "id": "n5-0175",
                  "lexiconId": "jlpt-n5",
                  "japanese": "カメラ",
                  "kana": "かめら",
                  "meaning": "camera",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kamera"
                  ]
            },
            {
                  "id": "n5-0176",
                  "lexiconId": "jlpt-n5",
                  "japanese": "火曜日",
                  "kana": "かようび",
                  "meaning": "Tuesday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kayoubi"
                  ]
            },
            {
                  "id": "n5-0177",
                  "lexiconId": "jlpt-n5",
                  "japanese": "辛い",
                  "kana": "からい",
                  "meaning": "hot, spicy",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "karai"
                  ]
            },
            {
                  "id": "n5-0178",
                  "lexiconId": "jlpt-n5",
                  "japanese": "体",
                  "kana": "からだ",
                  "meaning": "body",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "karada"
                  ]
            },
            {
                  "id": "n5-0179",
                  "lexiconId": "jlpt-n5",
                  "japanese": "借りる",
                  "kana": "かりる",
                  "meaning": "to borrow",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kariru"
                  ]
            },
            {
                  "id": "n5-0180",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜がります",
                  "kana": "〜がります",
                  "meaning": "3rd person wants to",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~garimasu"
                  ]
            },
            {
                  "id": "n5-0181",
                  "lexiconId": "jlpt-n5",
                  "japanese": "軽い",
                  "kana": "かるい",
                  "meaning": "light (not heavy)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "karui"
                  ]
            },
            {
                  "id": "n5-0182",
                  "lexiconId": "jlpt-n5",
                  "japanese": "カレンダー",
                  "kana": "カレンダー",
                  "meaning": "calendar",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "karendaa"
                  ]
            },
            {
                  "id": "n5-0183",
                  "lexiconId": "jlpt-n5",
                  "japanese": "川",
                  "kana": "かわ",
                  "meaning": "river",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kawa"
                  ]
            },
            {
                  "id": "n5-0184",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜側",
                  "kana": "~がわ",
                  "meaning": "~side",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~gawa"
                  ]
            },
            {
                  "id": "n5-0185",
                  "lexiconId": "jlpt-n5",
                  "japanese": "可愛い",
                  "kana": "かわいい",
                  "meaning": "cute, pretty",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kawaii"
                  ]
            },
            {
                  "id": "n5-0186",
                  "lexiconId": "jlpt-n5",
                  "japanese": "漢字",
                  "kana": "かんじ",
                  "meaning": "Kanji character",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kanji"
                  ]
            },
            {
                  "id": "n5-0187",
                  "lexiconId": "jlpt-n5",
                  "japanese": "木",
                  "kana": "き",
                  "meaning": "tree",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ki"
                  ]
            },
            {
                  "id": "n5-0188",
                  "lexiconId": "jlpt-n5",
                  "japanese": "黄色い",
                  "kana": "きいろい",
                  "meaning": "yellow",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kiiroi"
                  ]
            },
            {
                  "id": "n5-0189",
                  "lexiconId": "jlpt-n5",
                  "japanese": "消える",
                  "kana": "きえる",
                  "meaning": "to go out, to vanish",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kieru"
                  ]
            },
            {
                  "id": "n5-0190",
                  "lexiconId": "jlpt-n5",
                  "japanese": "聞く",
                  "kana": "きく",
                  "meaning": "to hear, to listen, to ask",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kiku"
                  ]
            },
            {
                  "id": "n5-0191",
                  "lexiconId": "jlpt-n5",
                  "japanese": "北",
                  "kana": "きた",
                  "meaning": "north",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kita"
                  ]
            },
            {
                  "id": "n5-0192",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ギター",
                  "kana": "ギター",
                  "meaning": "guitar",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "gitaa"
                  ]
            },
            {
                  "id": "n5-0193",
                  "lexiconId": "jlpt-n5",
                  "japanese": "汚い",
                  "kana": "きたない",
                  "meaning": "dirty",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kitanai"
                  ]
            },
            {
                  "id": "n5-0194",
                  "lexiconId": "jlpt-n5",
                  "japanese": "喫茶店",
                  "kana": "きっさてん",
                  "meaning": "coffee shop",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kissaten"
                  ]
            },
            {
                  "id": "n5-0195",
                  "lexiconId": "jlpt-n5",
                  "japanese": "切手",
                  "kana": "きって",
                  "meaning": "stamp",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kitte"
                  ]
            },
            {
                  "id": "n5-0196",
                  "lexiconId": "jlpt-n5",
                  "japanese": "切符",
                  "kana": "きっぷ",
                  "meaning": "ticket",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kippu"
                  ]
            },
            {
                  "id": "n5-0197",
                  "lexiconId": "jlpt-n5",
                  "japanese": "昨日",
                  "kana": "きのう",
                  "meaning": "yesterday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kinou"
                  ]
            },
            {
                  "id": "n5-0198",
                  "lexiconId": "jlpt-n5",
                  "japanese": "九",
                  "kana": "きゅう",
                  "meaning": "nine",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kyuu"
                  ]
            },
            {
                  "id": "n5-0199",
                  "lexiconId": "jlpt-n5",
                  "japanese": "牛肉",
                  "kana": "ぎゅうにく",
                  "meaning": "beef",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "gyuuniku"
                  ]
            },
            {
                  "id": "n5-0200",
                  "lexiconId": "jlpt-n5",
                  "japanese": "牛乳",
                  "kana": "ぎゅうにゅう",
                  "meaning": "milk",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "gyuunyuu"
                  ]
            },
            {
                  "id": "n5-0201",
                  "lexiconId": "jlpt-n5",
                  "japanese": "今日",
                  "kana": "きょう",
                  "meaning": "today",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kyou"
                  ]
            },
            {
                  "id": "n5-0202",
                  "lexiconId": "jlpt-n5",
                  "japanese": "教室",
                  "kana": "きょうしつ",
                  "meaning": "class room",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kyoushitsu"
                  ]
            },
            {
                  "id": "n5-0203",
                  "lexiconId": "jlpt-n5",
                  "japanese": "兄弟",
                  "kana": "きょうだい",
                  "meaning": "siblings",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kyoudai"
                  ]
            },
            {
                  "id": "n5-0204",
                  "lexiconId": "jlpt-n5",
                  "japanese": "去年",
                  "kana": "きょねん",
                  "meaning": "last year",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kyonen"
                  ]
            },
            {
                  "id": "n5-0205",
                  "lexiconId": "jlpt-n5",
                  "japanese": "嫌い",
                  "kana": "きらい",
                  "meaning": "unpleasant, not likable",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kirai"
                  ]
            },
            {
                  "id": "n5-0206",
                  "lexiconId": "jlpt-n5",
                  "japanese": "切る",
                  "kana": "きる",
                  "meaning": "to cut",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kiru"
                  ]
            },
            {
                  "id": "n5-0207",
                  "lexiconId": "jlpt-n5",
                  "japanese": "着る",
                  "kana": "きる",
                  "meaning": "to wear, to put on",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kiru"
                  ]
            },
            {
                  "id": "n5-0208",
                  "lexiconId": "jlpt-n5",
                  "japanese": "来る",
                  "kana": "くる",
                  "meaning": "to come",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kuru"
                  ]
            },
            {
                  "id": "n5-0209",
                  "lexiconId": "jlpt-n5",
                  "japanese": "きれい",
                  "kana": "きれい",
                  "meaning": "beautiful, clean",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kirei"
                  ]
            },
            {
                  "id": "n5-0210",
                  "lexiconId": "jlpt-n5",
                  "japanese": "キロ",
                  "kana": "キロ",
                  "meaning": "kg",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kiro"
                  ]
            },
            {
                  "id": "n5-0211",
                  "lexiconId": "jlpt-n5",
                  "japanese": "キロ",
                  "kana": "キロ",
                  "meaning": "km",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kiro"
                  ]
            },
            {
                  "id": "n5-0212",
                  "lexiconId": "jlpt-n5",
                  "japanese": "銀行",
                  "kana": "ぎんこう",
                  "meaning": "bank",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ginkou"
                  ]
            },
            {
                  "id": "n5-0213",
                  "lexiconId": "jlpt-n5",
                  "japanese": "金曜日",
                  "kana": "きんようび",
                  "meaning": "Friday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kinyoubi"
                  ]
            },
            {
                  "id": "n5-0214",
                  "lexiconId": "jlpt-n5",
                  "japanese": "九",
                  "kana": "く",
                  "meaning": "nine",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ku"
                  ]
            },
            {
                  "id": "n5-0215",
                  "lexiconId": "jlpt-n5",
                  "japanese": "薬",
                  "kana": "くすり",
                  "meaning": "medicine",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kusuri"
                  ]
            },
            {
                  "id": "n5-0216",
                  "lexiconId": "jlpt-n5",
                  "japanese": "下さい",
                  "kana": "ください",
                  "meaning": "give me…",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kudasai"
                  ]
            },
            {
                  "id": "n5-0217",
                  "lexiconId": "jlpt-n5",
                  "japanese": "果物",
                  "kana": "くだもの",
                  "meaning": "fruit",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kudamono"
                  ]
            },
            {
                  "id": "n5-0218",
                  "lexiconId": "jlpt-n5",
                  "japanese": "口",
                  "kana": "くち",
                  "meaning": "mouth",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kuchi"
                  ]
            },
            {
                  "id": "n5-0219",
                  "lexiconId": "jlpt-n5",
                  "japanese": "靴",
                  "kana": "くつ",
                  "meaning": "shoe",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kutsu"
                  ]
            },
            {
                  "id": "n5-0220",
                  "lexiconId": "jlpt-n5",
                  "japanese": "靴下",
                  "kana": "くつした",
                  "meaning": "socks",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kutsushita"
                  ]
            },
            {
                  "id": "n5-0221",
                  "lexiconId": "jlpt-n5",
                  "japanese": "国",
                  "kana": "くに",
                  "meaning": "country",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kuni"
                  ]
            },
            {
                  "id": "n5-0222",
                  "lexiconId": "jlpt-n5",
                  "japanese": "曇り",
                  "kana": "くもり",
                  "meaning": "cloudy weather",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kumori"
                  ]
            },
            {
                  "id": "n5-0223",
                  "lexiconId": "jlpt-n5",
                  "japanese": "暗い",
                  "kana": "くらい",
                  "meaning": "dark",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kurai"
                  ]
            },
            {
                  "id": "n5-0224",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ぐらい",
                  "kana": "ぐらい",
                  "meaning": "about",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "gurai"
                  ]
            },
            {
                  "id": "n5-0225",
                  "lexiconId": "jlpt-n5",
                  "japanese": "クラス",
                  "kana": "クラス",
                  "meaning": "class",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kurasu"
                  ]
            },
            {
                  "id": "n5-0226",
                  "lexiconId": "jlpt-n5",
                  "japanese": "グラム",
                  "kana": "グラム",
                  "meaning": "gram",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "guramu"
                  ]
            },
            {
                  "id": "n5-0227",
                  "lexiconId": "jlpt-n5",
                  "japanese": "車",
                  "kana": "くるま",
                  "meaning": "car",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kuruma"
                  ]
            },
            {
                  "id": "n5-0228",
                  "lexiconId": "jlpt-n5",
                  "japanese": "黒い",
                  "kana": "くろい",
                  "meaning": "black",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kuroi"
                  ]
            },
            {
                  "id": "n5-0229",
                  "lexiconId": "jlpt-n5",
                  "japanese": "今朝",
                  "kana": "けさ",
                  "meaning": "this morning",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kesa"
                  ]
            },
            {
                  "id": "n5-0230",
                  "lexiconId": "jlpt-n5",
                  "japanese": "消す",
                  "kana": "けす",
                  "meaning": "to turn off, switch off",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kesu"
                  ]
            },
            {
                  "id": "n5-0231",
                  "lexiconId": "jlpt-n5",
                  "japanese": "けっこう",
                  "kana": "けっこう",
                  "meaning": "fine, all right",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kekkou"
                  ]
            },
            {
                  "id": "n5-0232",
                  "lexiconId": "jlpt-n5",
                  "japanese": "結婚",
                  "kana": "けっこん",
                  "meaning": "marriage",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kekkon"
                  ]
            },
            {
                  "id": "n5-0233",
                  "lexiconId": "jlpt-n5",
                  "japanese": "月曜日",
                  "kana": "げつようび",
                  "meaning": "Monday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "getsuyoubi"
                  ]
            },
            {
                  "id": "n5-0234",
                  "lexiconId": "jlpt-n5",
                  "japanese": "玄関",
                  "kana": "げんかん",
                  "meaning": "entrance of a house",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "genkan"
                  ]
            },
            {
                  "id": "n5-0235",
                  "lexiconId": "jlpt-n5",
                  "japanese": "元気",
                  "kana": "げんき",
                  "meaning": "vigor, health, vitality",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "genki"
                  ]
            },
            {
                  "id": "n5-0236",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜個",
                  "kana": "〜こ",
                  "meaning": "counter for small objects",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~ko"
                  ]
            },
            {
                  "id": "n5-0237",
                  "lexiconId": "jlpt-n5",
                  "japanese": "五",
                  "kana": "ご",
                  "meaning": "five",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "go"
                  ]
            },
            {
                  "id": "n5-0238",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜語",
                  "kana": "〜ご",
                  "meaning": "~ language",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~go"
                  ]
            },
            {
                  "id": "n5-0239",
                  "lexiconId": "jlpt-n5",
                  "japanese": "公園",
                  "kana": "こうえん",
                  "meaning": "park, large garden",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kouen"
                  ]
            },
            {
                  "id": "n5-0240",
                  "lexiconId": "jlpt-n5",
                  "japanese": "交番",
                  "kana": "こうばん",
                  "meaning": "police box",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kouban"
                  ]
            },
            {
                  "id": "n5-0241",
                  "lexiconId": "jlpt-n5",
                  "japanese": "声",
                  "kana": "こえ",
                  "meaning": "voice",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "koe"
                  ]
            },
            {
                  "id": "n5-0242",
                  "lexiconId": "jlpt-n5",
                  "japanese": "コート",
                  "kana": "コート",
                  "meaning": "coat",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kooto"
                  ]
            },
            {
                  "id": "n5-0243",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ここ",
                  "kana": "ここ",
                  "meaning": "here",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "koko"
                  ]
            },
            {
                  "id": "n5-0244",
                  "lexiconId": "jlpt-n5",
                  "japanese": "午後",
                  "kana": "ごご",
                  "meaning": "afternoon",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "gogo"
                  ]
            },
            {
                  "id": "n5-0245",
                  "lexiconId": "jlpt-n5",
                  "japanese": "九日",
                  "kana": "ここのか",
                  "meaning": "9th day of a month, 9 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kokonoka"
                  ]
            },
            {
                  "id": "n5-0246",
                  "lexiconId": "jlpt-n5",
                  "japanese": "九つ",
                  "kana": "ここのつ",
                  "meaning": "nine",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kokonotsu"
                  ]
            },
            {
                  "id": "n5-0247",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ご主人",
                  "kana": "ごしゅじん",
                  "meaning": "someone else’s husband",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "goshujin"
                  ]
            },
            {
                  "id": "n5-0248",
                  "lexiconId": "jlpt-n5",
                  "japanese": "午前",
                  "kana": "ごぜん",
                  "meaning": "morning, a.m.",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "gozen"
                  ]
            },
            {
                  "id": "n5-0249",
                  "lexiconId": "jlpt-n5",
                  "japanese": "答える",
                  "kana": "こたえる",
                  "meaning": "to answer",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kotaeru"
                  ]
            },
            {
                  "id": "n5-0250",
                  "lexiconId": "jlpt-n5",
                  "japanese": "こちら",
                  "kana": "こちら",
                  "meaning": "this side, this place",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kochira"
                  ]
            },
            {
                  "id": "n5-0251",
                  "lexiconId": "jlpt-n5",
                  "japanese": "コップ",
                  "kana": "コップ",
                  "meaning": "cup, glass",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "koppu"
                  ]
            },
            {
                  "id": "n5-0252",
                  "lexiconId": "jlpt-n5",
                  "japanese": "今年",
                  "kana": "ことし",
                  "meaning": "this year",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kotoshi"
                  ]
            },
            {
                  "id": "n5-0253",
                  "lexiconId": "jlpt-n5",
                  "japanese": "言葉",
                  "kana": "ことば",
                  "meaning": "phrase, language",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kotoba"
                  ]
            },
            {
                  "id": "n5-0254",
                  "lexiconId": "jlpt-n5",
                  "japanese": "子供",
                  "kana": "こども",
                  "meaning": "child",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kodomo"
                  ]
            },
            {
                  "id": "n5-0255",
                  "lexiconId": "jlpt-n5",
                  "japanese": "この",
                  "kana": "この",
                  "meaning": "this…",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kono"
                  ]
            },
            {
                  "id": "n5-0256",
                  "lexiconId": "jlpt-n5",
                  "japanese": "御飯",
                  "kana": "ごはん",
                  "meaning": "meal, cooked rice",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "gohan"
                  ]
            },
            {
                  "id": "n5-0257",
                  "lexiconId": "jlpt-n5",
                  "japanese": "困る",
                  "kana": "こまる",
                  "meaning": "to be in trouble",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "komaru"
                  ]
            },
            {
                  "id": "n5-0258",
                  "lexiconId": "jlpt-n5",
                  "japanese": "これ",
                  "kana": "これ",
                  "meaning": "this",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kore"
                  ]
            },
            {
                  "id": "n5-0259",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ごろ",
                  "kana": "ごろ",
                  "meaning": "around…",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "goro"
                  ]
            },
            {
                  "id": "n5-0260",
                  "lexiconId": "jlpt-n5",
                  "japanese": "今月",
                  "kana": "こんげつ",
                  "meaning": "this month",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "kongetsu"
                  ]
            },
            {
                  "id": "n5-0261",
                  "lexiconId": "jlpt-n5",
                  "japanese": "今週",
                  "kana": "こんしゅう",
                  "meaning": "this week",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "konshuu"
                  ]
            },
            {
                  "id": "n5-0262",
                  "lexiconId": "jlpt-n5",
                  "japanese": "こんな",
                  "kana": "こんな",
                  "meaning": "this sort of, this kind of",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "konna"
                  ]
            },
            {
                  "id": "n5-0263",
                  "lexiconId": "jlpt-n5",
                  "japanese": "今晩",
                  "kana": "こんばん",
                  "meaning": "this evening",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "konban"
                  ]
            },
            {
                  "id": "n5-0264",
                  "lexiconId": "jlpt-n5",
                  "japanese": "さあ",
                  "kana": "さあ",
                  "meaning": "well…",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "saa"
                  ]
            },
            {
                  "id": "n5-0265",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜歳",
                  "kana": "〜さい",
                  "meaning": "years old",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~sai"
                  ]
            },
            {
                  "id": "n5-0266",
                  "lexiconId": "jlpt-n5",
                  "japanese": "魚",
                  "kana": "さかな",
                  "meaning": "fish",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sakana"
                  ]
            },
            {
                  "id": "n5-0267",
                  "lexiconId": "jlpt-n5",
                  "japanese": "先",
                  "kana": "さき",
                  "meaning": "earlier, former",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "saki"
                  ]
            },
            {
                  "id": "n5-0268",
                  "lexiconId": "jlpt-n5",
                  "japanese": "咲く",
                  "kana": "さく",
                  "meaning": "to blossom",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "saku"
                  ]
            },
            {
                  "id": "n5-0269",
                  "lexiconId": "jlpt-n5",
                  "japanese": "作文",
                  "kana": "さくぶん",
                  "meaning": "composition",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sakubun"
                  ]
            },
            {
                  "id": "n5-0270",
                  "lexiconId": "jlpt-n5",
                  "japanese": "さす",
                  "kana": "さす",
                  "meaning": "to open an umbrella",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sasu"
                  ]
            },
            {
                  "id": "n5-0271",
                  "lexiconId": "jlpt-n5",
                  "japanese": "冊",
                  "kana": "〜さつ",
                  "meaning": "counter for books",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~satsu"
                  ]
            },
            {
                  "id": "n5-0272",
                  "lexiconId": "jlpt-n5",
                  "japanese": "雑誌",
                  "kana": "ざっし",
                  "meaning": "magazine",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "zasshi"
                  ]
            },
            {
                  "id": "n5-0273",
                  "lexiconId": "jlpt-n5",
                  "japanese": "砂糖",
                  "kana": "さとう",
                  "meaning": "sugar",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "satou"
                  ]
            },
            {
                  "id": "n5-0274",
                  "lexiconId": "jlpt-n5",
                  "japanese": "寒い",
                  "kana": "さむい",
                  "meaning": "cold",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "samui"
                  ]
            },
            {
                  "id": "n5-0275",
                  "lexiconId": "jlpt-n5",
                  "japanese": "再来年",
                  "kana": "さらいねん",
                  "meaning": "the year after next year",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sarainen"
                  ]
            },
            {
                  "id": "n5-0276",
                  "lexiconId": "jlpt-n5",
                  "japanese": "三",
                  "kana": "さん",
                  "meaning": "three",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "san"
                  ]
            },
            {
                  "id": "n5-0277",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜さん",
                  "kana": "〜さん",
                  "meaning": "Mr., Mrs.",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~san"
                  ]
            },
            {
                  "id": "n5-0278",
                  "lexiconId": "jlpt-n5",
                  "japanese": "散歩",
                  "kana": "さんぽ",
                  "meaning": "to take a walk",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sanpo"
                  ]
            },
            {
                  "id": "n5-0279",
                  "lexiconId": "jlpt-n5",
                  "japanese": "四",
                  "kana": "し",
                  "meaning": "four",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shi"
                  ]
            },
            {
                  "id": "n5-0280",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜時",
                  "kana": "〜じ",
                  "meaning": "o’clock",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~ji"
                  ]
            },
            {
                  "id": "n5-0281",
                  "lexiconId": "jlpt-n5",
                  "japanese": "塩",
                  "kana": "しお",
                  "meaning": "salt",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shio"
                  ]
            },
            {
                  "id": "n5-0282",
                  "lexiconId": "jlpt-n5",
                  "japanese": "しかし",
                  "kana": "しかし",
                  "meaning": "however, but",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shikashi"
                  ]
            },
            {
                  "id": "n5-0283",
                  "lexiconId": "jlpt-n5",
                  "japanese": "時間",
                  "kana": "じかん",
                  "meaning": "time",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "jikan"
                  ]
            },
            {
                  "id": "n5-0284",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜時間",
                  "kana": "〜じかん",
                  "meaning": "~hours (classificator)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~jikan"
                  ]
            },
            {
                  "id": "n5-0285",
                  "lexiconId": "jlpt-n5",
                  "japanese": "仕事",
                  "kana": "しごと",
                  "meaning": "work",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shigoto"
                  ]
            },
            {
                  "id": "n5-0286",
                  "lexiconId": "jlpt-n5",
                  "japanese": "辞書",
                  "kana": "じしょ",
                  "meaning": "dictionary",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "jisho"
                  ]
            },
            {
                  "id": "n5-0287",
                  "lexiconId": "jlpt-n5",
                  "japanese": "静か",
                  "kana": "しずか",
                  "meaning": "quiet",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shizuka"
                  ]
            },
            {
                  "id": "n5-0288",
                  "lexiconId": "jlpt-n5",
                  "japanese": "下",
                  "kana": "した",
                  "meaning": "under, below",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shita"
                  ]
            },
            {
                  "id": "n5-0289",
                  "lexiconId": "jlpt-n5",
                  "japanese": "質問",
                  "kana": "しつもん",
                  "meaning": "question",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shitsumon"
                  ]
            },
            {
                  "id": "n5-0290",
                  "lexiconId": "jlpt-n5",
                  "japanese": "自転車",
                  "kana": "じてんしゃ",
                  "meaning": "bicycle",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "jitensha"
                  ]
            },
            {
                  "id": "n5-0291",
                  "lexiconId": "jlpt-n5",
                  "japanese": "自動車",
                  "kana": "じどうしゃ",
                  "meaning": "car, vehicle",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "jidousha"
                  ]
            },
            {
                  "id": "n5-0292",
                  "lexiconId": "jlpt-n5",
                  "japanese": "死ぬ",
                  "kana": "しぬ",
                  "meaning": "to die, to pas away",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shinu"
                  ]
            },
            {
                  "id": "n5-0293",
                  "lexiconId": "jlpt-n5",
                  "japanese": "字引",
                  "kana": "じびき",
                  "meaning": "dictionary",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "jibiki"
                  ]
            },
            {
                  "id": "n5-0294",
                  "lexiconId": "jlpt-n5",
                  "japanese": "自分",
                  "kana": "じぶん",
                  "meaning": "oneself",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "jibun"
                  ]
            },
            {
                  "id": "n5-0295",
                  "lexiconId": "jlpt-n5",
                  "japanese": "閉まる",
                  "kana": "しまる",
                  "meaning": "to close",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shimaru"
                  ]
            },
            {
                  "id": "n5-0296",
                  "lexiconId": "jlpt-n5",
                  "japanese": "閉める",
                  "kana": "しめる",
                  "meaning": "to close",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shimeru"
                  ]
            },
            {
                  "id": "n5-0297",
                  "lexiconId": "jlpt-n5",
                  "japanese": "締める",
                  "kana": "しめる",
                  "meaning": "to fasten a seatbelt",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shimeru"
                  ]
            },
            {
                  "id": "n5-0298",
                  "lexiconId": "jlpt-n5",
                  "japanese": "じゃ",
                  "kana": "じゃ",
                  "meaning": "well, then",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ja"
                  ]
            },
            {
                  "id": "n5-0299",
                  "lexiconId": "jlpt-n5",
                  "japanese": "写真",
                  "kana": "しゃしん",
                  "meaning": "photo",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shashin"
                  ]
            },
            {
                  "id": "n5-0300",
                  "lexiconId": "jlpt-n5",
                  "japanese": "シャツ",
                  "kana": "シャツ",
                  "meaning": "shirt",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shatsu"
                  ]
            },
            {
                  "id": "n5-0301",
                  "lexiconId": "jlpt-n5",
                  "japanese": "十",
                  "kana": "じゅう",
                  "meaning": "ten",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "juu"
                  ]
            },
            {
                  "id": "n5-0302",
                  "lexiconId": "jlpt-n5",
                  "japanese": "~週間",
                  "kana": "〜しゅうかん",
                  "meaning": "… weeks",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~shuukan"
                  ]
            },
            {
                  "id": "n5-0303",
                  "lexiconId": "jlpt-n5",
                  "japanese": "授業",
                  "kana": "じゅぎょう",
                  "meaning": "lesson, class",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "jugyou"
                  ]
            },
            {
                  "id": "n5-0304",
                  "lexiconId": "jlpt-n5",
                  "japanese": "宿題",
                  "kana": "しゅくだい",
                  "meaning": "homework",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shukudai"
                  ]
            },
            {
                  "id": "n5-0305",
                  "lexiconId": "jlpt-n5",
                  "japanese": "上手",
                  "kana": "じょうず",
                  "meaning": "to be good at something",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "jouzu"
                  ]
            },
            {
                  "id": "n5-0306",
                  "lexiconId": "jlpt-n5",
                  "japanese": "丈夫",
                  "kana": "じょうぶ",
                  "meaning": "to be strong, durable",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "joubu"
                  ]
            },
            {
                  "id": "n5-0307",
                  "lexiconId": "jlpt-n5",
                  "japanese": "醤油",
                  "kana": "しょうゆ",
                  "meaning": "soy sauce",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shouyu"
                  ]
            },
            {
                  "id": "n5-0308",
                  "lexiconId": "jlpt-n5",
                  "japanese": "食堂",
                  "kana": "しょくどう",
                  "meaning": "dining room, canteen",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shokudou"
                  ]
            },
            {
                  "id": "n5-0309",
                  "lexiconId": "jlpt-n5",
                  "japanese": "知る",
                  "kana": "しる",
                  "meaning": "to know",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shiru"
                  ]
            },
            {
                  "id": "n5-0310",
                  "lexiconId": "jlpt-n5",
                  "japanese": "白い",
                  "kana": "しろい",
                  "meaning": "white",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shiroi"
                  ]
            },
            {
                  "id": "n5-0311",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜人",
                  "kana": "〜じん",
                  "meaning": "~an, ~ese (nationality)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~jin"
                  ]
            },
            {
                  "id": "n5-0312",
                  "lexiconId": "jlpt-n5",
                  "japanese": "新聞",
                  "kana": "しんぶん",
                  "meaning": "newspaper",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "shinbun"
                  ]
            },
            {
                  "id": "n5-0313",
                  "lexiconId": "jlpt-n5",
                  "japanese": "水曜日",
                  "kana": "すいようび",
                  "meaning": "Wednesday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "suiyoubi"
                  ]
            },
            {
                  "id": "n5-0314",
                  "lexiconId": "jlpt-n5",
                  "japanese": "吸う",
                  "kana": "すう",
                  "meaning": "to breathe, to smoke",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "suu"
                  ]
            },
            {
                  "id": "n5-0315",
                  "lexiconId": "jlpt-n5",
                  "japanese": "スカート",
                  "kana": "スカート",
                  "meaning": "skirt",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sukaato"
                  ]
            },
            {
                  "id": "n5-0316",
                  "lexiconId": "jlpt-n5",
                  "japanese": "好き",
                  "kana": "すき",
                  "meaning": "to like",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "suki"
                  ]
            },
            {
                  "id": "n5-0317",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜過ぎ",
                  "kana": "〜すぎ",
                  "meaning": "past, over",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~sugi"
                  ]
            },
            {
                  "id": "n5-0318",
                  "lexiconId": "jlpt-n5",
                  "japanese": "すぐに",
                  "kana": "すぐに",
                  "meaning": "at once",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sugu ni"
                  ]
            },
            {
                  "id": "n5-0319",
                  "lexiconId": "jlpt-n5",
                  "japanese": "少し",
                  "kana": "すこし",
                  "meaning": "a little",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sukoshi"
                  ]
            },
            {
                  "id": "n5-0320",
                  "lexiconId": "jlpt-n5",
                  "japanese": "涼しい",
                  "kana": "すずしい",
                  "meaning": "cool",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "suzushii"
                  ]
            },
            {
                  "id": "n5-0321",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜ずつ",
                  "kana": "〜ずつ",
                  "meaning": "each",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~zutsu"
                  ]
            },
            {
                  "id": "n5-0322",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ストーブ",
                  "kana": "ストーブ",
                  "meaning": "stove, heater",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sutoobu"
                  ]
            },
            {
                  "id": "n5-0323",
                  "lexiconId": "jlpt-n5",
                  "japanese": "スプーン",
                  "kana": "スプーン",
                  "meaning": "spoon",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "supuun"
                  ]
            },
            {
                  "id": "n5-0324",
                  "lexiconId": "jlpt-n5",
                  "japanese": "スポーツ",
                  "kana": "スポーツ",
                  "meaning": "sports",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "supootsu"
                  ]
            },
            {
                  "id": "n5-0325",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ズボン",
                  "kana": "ズボン",
                  "meaning": "trousers",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "zubon"
                  ]
            },
            {
                  "id": "n5-0326",
                  "lexiconId": "jlpt-n5",
                  "japanese": "住む",
                  "kana": "すむ",
                  "meaning": "to live, to reside somewhere",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sumu"
                  ]
            },
            {
                  "id": "n5-0327",
                  "lexiconId": "jlpt-n5",
                  "japanese": "スリッパ",
                  "kana": "スリッパ",
                  "meaning": "slipper",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "surippa"
                  ]
            },
            {
                  "id": "n5-0328",
                  "lexiconId": "jlpt-n5",
                  "japanese": "する",
                  "kana": "する",
                  "meaning": "to do",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "suru"
                  ]
            },
            {
                  "id": "n5-0329",
                  "lexiconId": "jlpt-n5",
                  "japanese": "座る",
                  "kana": "すわる",
                  "meaning": "to sit",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "suwaru"
                  ]
            },
            {
                  "id": "n5-0330",
                  "lexiconId": "jlpt-n5",
                  "japanese": "背",
                  "kana": "せい",
                  "meaning": "height",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sei"
                  ]
            },
            {
                  "id": "n5-0331",
                  "lexiconId": "jlpt-n5",
                  "japanese": "生徒",
                  "kana": "せいと",
                  "meaning": "student",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "seito"
                  ]
            },
            {
                  "id": "n5-0332",
                  "lexiconId": "jlpt-n5",
                  "japanese": "セーター",
                  "kana": "セーター",
                  "meaning": "sweater",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "seetaa"
                  ]
            },
            {
                  "id": "n5-0333",
                  "lexiconId": "jlpt-n5",
                  "japanese": "石鹸",
                  "kana": "せっけん",
                  "meaning": "soap",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sekken"
                  ]
            },
            {
                  "id": "n5-0334",
                  "lexiconId": "jlpt-n5",
                  "japanese": "背広",
                  "kana": "せびろ",
                  "meaning": "jacket, suit",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sebiro"
                  ]
            },
            {
                  "id": "n5-0335",
                  "lexiconId": "jlpt-n5",
                  "japanese": "狭い",
                  "kana": "せまい",
                  "meaning": "narrow",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "semai"
                  ]
            },
            {
                  "id": "n5-0336",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ゼロ",
                  "kana": "ゼロ",
                  "meaning": "zero",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "zero"
                  ]
            },
            {
                  "id": "n5-0337",
                  "lexiconId": "jlpt-n5",
                  "japanese": "千",
                  "kana": "せん",
                  "meaning": "1,000, thousand",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sen"
                  ]
            },
            {
                  "id": "n5-0338",
                  "lexiconId": "jlpt-n5",
                  "japanese": "先月",
                  "kana": "せんげつ",
                  "meaning": "last month",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sengetsu"
                  ]
            },
            {
                  "id": "n5-0339",
                  "lexiconId": "jlpt-n5",
                  "japanese": "先週",
                  "kana": "せんしゅう",
                  "meaning": "last week",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "senshuu"
                  ]
            },
            {
                  "id": "n5-0340",
                  "lexiconId": "jlpt-n5",
                  "japanese": "先生",
                  "kana": "せんせい",
                  "meaning": "teacher",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sensei"
                  ]
            },
            {
                  "id": "n5-0341",
                  "lexiconId": "jlpt-n5",
                  "japanese": "洗濯",
                  "kana": "せんたく",
                  "meaning": "washing, to wash",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sentaku"
                  ]
            },
            {
                  "id": "n5-0342",
                  "lexiconId": "jlpt-n5",
                  "japanese": "全部",
                  "kana": "ぜんぶ",
                  "meaning": "all",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "zenbu"
                  ]
            },
            {
                  "id": "n5-0343",
                  "lexiconId": "jlpt-n5",
                  "japanese": "そう",
                  "kana": "そう",
                  "meaning": "so",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sou"
                  ]
            },
            {
                  "id": "n5-0344",
                  "lexiconId": "jlpt-n5",
                  "japanese": "掃除",
                  "kana": "そうじ",
                  "meaning": "to clean",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "souji"
                  ]
            },
            {
                  "id": "n5-0345",
                  "lexiconId": "jlpt-n5",
                  "japanese": "そうして",
                  "kana": "そうして",
                  "meaning": "and then",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "soushite"
                  ]
            },
            {
                  "id": "n5-0346",
                  "lexiconId": "jlpt-n5",
                  "japanese": "そこ",
                  "kana": "そこ",
                  "meaning": "there",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "soko"
                  ]
            },
            {
                  "id": "n5-0347",
                  "lexiconId": "jlpt-n5",
                  "japanese": "そちら",
                  "kana": "そちら",
                  "meaning": "there (polite)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sochira"
                  ]
            },
            {
                  "id": "n5-0348",
                  "lexiconId": "jlpt-n5",
                  "japanese": "外",
                  "kana": "そと",
                  "meaning": "outside",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "soto"
                  ]
            },
            {
                  "id": "n5-0349",
                  "lexiconId": "jlpt-n5",
                  "japanese": "その",
                  "kana": "その",
                  "meaning": "that…",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sono"
                  ]
            },
            {
                  "id": "n5-0350",
                  "lexiconId": "jlpt-n5",
                  "japanese": "そば",
                  "kana": "そば",
                  "meaning": "next to",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "soba"
                  ]
            },
            {
                  "id": "n5-0351",
                  "lexiconId": "jlpt-n5",
                  "japanese": "空",
                  "kana": "そら",
                  "meaning": "sky",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sora"
                  ]
            },
            {
                  "id": "n5-0352",
                  "lexiconId": "jlpt-n5",
                  "japanese": "それ",
                  "kana": "それ",
                  "meaning": "that",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sore"
                  ]
            },
            {
                  "id": "n5-0353",
                  "lexiconId": "jlpt-n5",
                  "japanese": "それから",
                  "kana": "それから",
                  "meaning": "after that",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "sorekara"
                  ]
            },
            {
                  "id": "n5-0354",
                  "lexiconId": "jlpt-n5",
                  "japanese": "それでは",
                  "kana": "それでは",
                  "meaning": "then, well",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "soredewa"
                  ]
            },
            {
                  "id": "n5-0355",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜台",
                  "kana": "〜だい",
                  "meaning": "counter for machines",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~dai"
                  ]
            },
            {
                  "id": "n5-0356",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大学",
                  "kana": "だいがく",
                  "meaning": "university",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "daigaku"
                  ]
            },
            {
                  "id": "n5-0357",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大使館",
                  "kana": "たいしかん",
                  "meaning": "embassy",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "taishikan"
                  ]
            },
            {
                  "id": "n5-0358",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大丈夫",
                  "kana": "だいじょうぶ",
                  "meaning": "OK",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "daijoubu"
                  ]
            },
            {
                  "id": "n5-0359",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大好き",
                  "kana": "だいすき",
                  "meaning": "to be very fond of",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "daisuki"
                  ]
            },
            {
                  "id": "n5-0360",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大切",
                  "kana": "たいせつ",
                  "meaning": "very important",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "taisetsu"
                  ]
            },
            {
                  "id": "n5-0361",
                  "lexiconId": "jlpt-n5",
                  "japanese": "たいてい",
                  "kana": "たいてい",
                  "meaning": "mostly, usually",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "taitei"
                  ]
            },
            {
                  "id": "n5-0362",
                  "lexiconId": "jlpt-n5",
                  "japanese": "台所",
                  "kana": "だいどころ",
                  "meaning": "kitchen",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "daidokoro"
                  ]
            },
            {
                  "id": "n5-0363",
                  "lexiconId": "jlpt-n5",
                  "japanese": "大変",
                  "kana": "たいへん",
                  "meaning": "very, serious",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "taihen"
                  ]
            },
            {
                  "id": "n5-0364",
                  "lexiconId": "jlpt-n5",
                  "japanese": "高い",
                  "kana": "たかい",
                  "meaning": "high, expensive",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "takai"
                  ]
            },
            {
                  "id": "n5-0365",
                  "lexiconId": "jlpt-n5",
                  "japanese": "沢山",
                  "kana": "たくさん",
                  "meaning": "many, much",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "takusan"
                  ]
            },
            {
                  "id": "n5-0366",
                  "lexiconId": "jlpt-n5",
                  "japanese": "タクシー",
                  "kana": "タクシー",
                  "meaning": "taxi",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "takushii"
                  ]
            },
            {
                  "id": "n5-0367",
                  "lexiconId": "jlpt-n5",
                  "japanese": "出す",
                  "kana": "だす",
                  "meaning": "to take out, hand in",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "dasu"
                  ]
            },
            {
                  "id": "n5-0368",
                  "lexiconId": "jlpt-n5",
                  "japanese": "~達",
                  "kana": "〜たち",
                  "meaning": "more than one, and others",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~tachi"
                  ]
            },
            {
                  "id": "n5-0369",
                  "lexiconId": "jlpt-n5",
                  "japanese": "立つ",
                  "kana": "たつ",
                  "meaning": "to stand",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tatsu"
                  ]
            },
            {
                  "id": "n5-0370",
                  "lexiconId": "jlpt-n5",
                  "japanese": "建物",
                  "kana": "たてもの",
                  "meaning": "building",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tatemono"
                  ]
            },
            {
                  "id": "n5-0371",
                  "lexiconId": "jlpt-n5",
                  "japanese": "楽しい",
                  "kana": "たのしい",
                  "meaning": "pleasant, enjoyable",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tanoshii"
                  ]
            },
            {
                  "id": "n5-0372",
                  "lexiconId": "jlpt-n5",
                  "japanese": "頼む",
                  "kana": "たのむ",
                  "meaning": "to ask, to request",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tanomu"
                  ]
            },
            {
                  "id": "n5-0373",
                  "lexiconId": "jlpt-n5",
                  "japanese": "たばこ",
                  "kana": "たばこ",
                  "meaning": "cigarette",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tabako"
                  ]
            },
            {
                  "id": "n5-0374",
                  "lexiconId": "jlpt-n5",
                  "japanese": "多分",
                  "kana": "たぶん",
                  "meaning": "perhaps, probably",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tabun"
                  ]
            },
            {
                  "id": "n5-0375",
                  "lexiconId": "jlpt-n5",
                  "japanese": "食べ物",
                  "kana": "たべもの",
                  "meaning": "food",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tabemono"
                  ]
            },
            {
                  "id": "n5-0376",
                  "lexiconId": "jlpt-n5",
                  "japanese": "食べる",
                  "kana": "たべる",
                  "meaning": "to eat",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "taberu"
                  ]
            },
            {
                  "id": "n5-0377",
                  "lexiconId": "jlpt-n5",
                  "japanese": "卵",
                  "kana": "たまご",
                  "meaning": "egg",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tamago"
                  ]
            },
            {
                  "id": "n5-0378",
                  "lexiconId": "jlpt-n5",
                  "japanese": "誰",
                  "kana": "だれ",
                  "meaning": "who?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "dare"
                  ]
            },
            {
                  "id": "n5-0379",
                  "lexiconId": "jlpt-n5",
                  "japanese": "誕生日",
                  "kana": "たんじょうび",
                  "meaning": "birthday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tanjoubi"
                  ]
            },
            {
                  "id": "n5-0380",
                  "lexiconId": "jlpt-n5",
                  "japanese": "だんだん",
                  "kana": "だんだん",
                  "meaning": "gradually",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "dandan"
                  ]
            },
            {
                  "id": "n5-0381",
                  "lexiconId": "jlpt-n5",
                  "japanese": "小さい",
                  "kana": "ちいさい",
                  "meaning": "small",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "chiisai"
                  ]
            },
            {
                  "id": "n5-0382",
                  "lexiconId": "jlpt-n5",
                  "japanese": "近い",
                  "kana": "ちかい",
                  "meaning": "near, close",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "chikai"
                  ]
            },
            {
                  "id": "n5-0383",
                  "lexiconId": "jlpt-n5",
                  "japanese": "違う",
                  "kana": "ちがう",
                  "meaning": "different",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "chigau"
                  ]
            },
            {
                  "id": "n5-0384",
                  "lexiconId": "jlpt-n5",
                  "japanese": "地下鉄",
                  "kana": "ちかてつ",
                  "meaning": "subway",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "chikatetsu"
                  ]
            },
            {
                  "id": "n5-0385",
                  "lexiconId": "jlpt-n5",
                  "japanese": "地図",
                  "kana": "ちず",
                  "meaning": "map",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "chizu"
                  ]
            },
            {
                  "id": "n5-0386",
                  "lexiconId": "jlpt-n5",
                  "japanese": "父",
                  "kana": "ちち",
                  "meaning": "my father",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "chichi"
                  ]
            },
            {
                  "id": "n5-0387",
                  "lexiconId": "jlpt-n5",
                  "japanese": "茶色",
                  "kana": "ちゃいろ",
                  "meaning": "brown",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "chairo"
                  ]
            },
            {
                  "id": "n5-0388",
                  "lexiconId": "jlpt-n5",
                  "japanese": "茶碗",
                  "kana": "ちゃわん",
                  "meaning": "rice bowl",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "chawan"
                  ]
            },
            {
                  "id": "n5-0389",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜中",
                  "kana": "〜ちゅう",
                  "meaning": "in the middle of",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~chuu"
                  ]
            },
            {
                  "id": "n5-0390",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ちょうど",
                  "kana": "ちょうど",
                  "meaning": "just",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "choudo"
                  ]
            },
            {
                  "id": "n5-0391",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ちょっと",
                  "kana": "ちょっと",
                  "meaning": "a little",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "chotto"
                  ]
            },
            {
                  "id": "n5-0392",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一日",
                  "kana": "ついたち",
                  "meaning": "the 1st day of a month",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tsuitachi"
                  ]
            },
            {
                  "id": "n5-0393",
                  "lexiconId": "jlpt-n5",
                  "japanese": "使う",
                  "kana": "つかう",
                  "meaning": "to use",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tsukau"
                  ]
            },
            {
                  "id": "n5-0394",
                  "lexiconId": "jlpt-n5",
                  "japanese": "疲れる",
                  "kana": "つかれる",
                  "meaning": "to get tired",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tsukareru"
                  ]
            },
            {
                  "id": "n5-0395",
                  "lexiconId": "jlpt-n5",
                  "japanese": "次",
                  "kana": "つぎ",
                  "meaning": "next",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tsugi"
                  ]
            },
            {
                  "id": "n5-0396",
                  "lexiconId": "jlpt-n5",
                  "japanese": "着く",
                  "kana": "つく",
                  "meaning": "to arrive",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tsuku"
                  ]
            },
            {
                  "id": "n5-0397",
                  "lexiconId": "jlpt-n5",
                  "japanese": "机",
                  "kana": "つくえ",
                  "meaning": "table",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tsukue"
                  ]
            },
            {
                  "id": "n5-0398",
                  "lexiconId": "jlpt-n5",
                  "japanese": "作る",
                  "kana": "つくる",
                  "meaning": "to make, to produce",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tsukuru"
                  ]
            },
            {
                  "id": "n5-0399",
                  "lexiconId": "jlpt-n5",
                  "japanese": "点ける",
                  "kana": "つける",
                  "meaning": "to turn on",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tsukeru"
                  ]
            },
            {
                  "id": "n5-0400",
                  "lexiconId": "jlpt-n5",
                  "japanese": "勤める",
                  "kana": "つとめる",
                  "meaning": "to work for someone",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tsutomeru"
                  ]
            },
            {
                  "id": "n5-0401",
                  "lexiconId": "jlpt-n5",
                  "japanese": "詰らない",
                  "kana": "つまらない",
                  "meaning": "uninteresting",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tsumaranai"
                  ]
            },
            {
                  "id": "n5-0402",
                  "lexiconId": "jlpt-n5",
                  "japanese": "冷たい",
                  "kana": "つめたい",
                  "meaning": "cold",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tsumetai"
                  ]
            },
            {
                  "id": "n5-0403",
                  "lexiconId": "jlpt-n5",
                  "japanese": "強い",
                  "kana": "つよい",
                  "meaning": "strong",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tsuyoi"
                  ]
            },
            {
                  "id": "n5-0404",
                  "lexiconId": "jlpt-n5",
                  "japanese": "手",
                  "kana": "て",
                  "meaning": "hand",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "te"
                  ]
            },
            {
                  "id": "n5-0405",
                  "lexiconId": "jlpt-n5",
                  "japanese": "テープ",
                  "kana": "テープ",
                  "meaning": "tape",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "teepu"
                  ]
            },
            {
                  "id": "n5-0406",
                  "lexiconId": "jlpt-n5",
                  "japanese": "テープレコーダー",
                  "kana": "テープレコーダー",
                  "meaning": "tape recorder",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "teepu rekoodaa"
                  ]
            },
            {
                  "id": "n5-0407",
                  "lexiconId": "jlpt-n5",
                  "japanese": "テーブル",
                  "kana": "テーブル",
                  "meaning": "table",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "teeburu"
                  ]
            },
            {
                  "id": "n5-0408",
                  "lexiconId": "jlpt-n5",
                  "japanese": "出かける",
                  "kana": "でかける",
                  "meaning": "to go out",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "dekakeru"
                  ]
            },
            {
                  "id": "n5-0409",
                  "lexiconId": "jlpt-n5",
                  "japanese": "手紙",
                  "kana": "てがみ",
                  "meaning": "letter",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tegami"
                  ]
            },
            {
                  "id": "n5-0410",
                  "lexiconId": "jlpt-n5",
                  "japanese": "出来る",
                  "kana": "できる",
                  "meaning": "can",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "dekiru"
                  ]
            },
            {
                  "id": "n5-0411",
                  "lexiconId": "jlpt-n5",
                  "japanese": "出口",
                  "kana": "でぐち",
                  "meaning": "exit",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "deguchi"
                  ]
            },
            {
                  "id": "n5-0412",
                  "lexiconId": "jlpt-n5",
                  "japanese": "テスト",
                  "kana": "テスト",
                  "meaning": "test",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tesuto"
                  ]
            },
            {
                  "id": "n5-0413",
                  "lexiconId": "jlpt-n5",
                  "japanese": "では",
                  "kana": "では",
                  "meaning": "then, well",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "dewa"
                  ]
            },
            {
                  "id": "n5-0414",
                  "lexiconId": "jlpt-n5",
                  "japanese": "デパート",
                  "kana": "デパート",
                  "meaning": "department store",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "depaato"
                  ]
            },
            {
                  "id": "n5-0415",
                  "lexiconId": "jlpt-n5",
                  "japanese": "でも",
                  "kana": "でも",
                  "meaning": "but",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "demo"
                  ]
            },
            {
                  "id": "n5-0416",
                  "lexiconId": "jlpt-n5",
                  "japanese": "出ます",
                  "kana": "でます",
                  "meaning": "to leave",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "demasu"
                  ]
            },
            {
                  "id": "n5-0417",
                  "lexiconId": "jlpt-n5",
                  "japanese": "テレビ",
                  "kana": "テレビ",
                  "meaning": "TV",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "terebi"
                  ]
            },
            {
                  "id": "n5-0418",
                  "lexiconId": "jlpt-n5",
                  "japanese": "天気",
                  "kana": "てんき",
                  "meaning": "weather",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tenki"
                  ]
            },
            {
                  "id": "n5-0419",
                  "lexiconId": "jlpt-n5",
                  "japanese": "電気",
                  "kana": "でんき",
                  "meaning": "electricity",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "denki"
                  ]
            },
            {
                  "id": "n5-0420",
                  "lexiconId": "jlpt-n5",
                  "japanese": "電車",
                  "kana": "でんしゃ",
                  "meaning": "train",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "densha"
                  ]
            },
            {
                  "id": "n5-0421",
                  "lexiconId": "jlpt-n5",
                  "japanese": "電話",
                  "kana": "でんわ",
                  "meaning": "phone",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "denwa"
                  ]
            },
            {
                  "id": "n5-0422",
                  "lexiconId": "jlpt-n5",
                  "japanese": "戸",
                  "kana": "と",
                  "meaning": "door",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "to"
                  ]
            },
            {
                  "id": "n5-0423",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜度",
                  "kana": "〜ど",
                  "meaning": "~times, ~degree",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~do"
                  ]
            },
            {
                  "id": "n5-0424",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ドア",
                  "kana": "ドア",
                  "meaning": "door",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "doa"
                  ]
            },
            {
                  "id": "n5-0425",
                  "lexiconId": "jlpt-n5",
                  "japanese": "トイレ",
                  "kana": "トイレ",
                  "meaning": "toilet, lavatory",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "toire"
                  ]
            },
            {
                  "id": "n5-0426",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どう",
                  "kana": "どう",
                  "meaning": "how?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "dou"
                  ]
            },
            {
                  "id": "n5-0427",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どうして",
                  "kana": "どうして",
                  "meaning": "why?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "doushite"
                  ]
            },
            {
                  "id": "n5-0428",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どうぞ",
                  "kana": "どうぞ",
                  "meaning": "please, here you are",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "douzo"
                  ]
            },
            {
                  "id": "n5-0429",
                  "lexiconId": "jlpt-n5",
                  "japanese": "動物",
                  "kana": "どうぶつ",
                  "meaning": "animal",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "doubutsu"
                  ]
            },
            {
                  "id": "n5-0430",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どうも",
                  "kana": "どうも",
                  "meaning": "thanks",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "doumo"
                  ]
            },
            {
                  "id": "n5-0431",
                  "lexiconId": "jlpt-n5",
                  "japanese": "十",
                  "kana": "とお",
                  "meaning": "ten",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "too"
                  ]
            },
            {
                  "id": "n5-0432",
                  "lexiconId": "jlpt-n5",
                  "japanese": "遠い",
                  "kana": "とおい",
                  "meaning": "far",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tooi"
                  ]
            },
            {
                  "id": "n5-0433",
                  "lexiconId": "jlpt-n5",
                  "japanese": "十日",
                  "kana": "とおか",
                  "meaning": "the 10th day of a month, 10 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tooka"
                  ]
            },
            {
                  "id": "n5-0434",
                  "lexiconId": "jlpt-n5",
                  "japanese": "時々",
                  "kana": "ときどき",
                  "meaning": "sometimes",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tokidoki"
                  ]
            },
            {
                  "id": "n5-0435",
                  "lexiconId": "jlpt-n5",
                  "japanese": "時計",
                  "kana": "とけい",
                  "meaning": "watch, clock",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tokei"
                  ]
            },
            {
                  "id": "n5-0436",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どこ",
                  "kana": "どこ",
                  "meaning": "where?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "doko"
                  ]
            },
            {
                  "id": "n5-0437",
                  "lexiconId": "jlpt-n5",
                  "japanese": "所",
                  "kana": "ところ",
                  "meaning": "place",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tokoro"
                  ]
            },
            {
                  "id": "n5-0438",
                  "lexiconId": "jlpt-n5",
                  "japanese": "図書館",
                  "kana": "としょかん",
                  "meaning": "library",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "toshokan"
                  ]
            },
            {
                  "id": "n5-0439",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どちら",
                  "kana": "どちら",
                  "meaning": "which, where (polite)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "dochira"
                  ]
            },
            {
                  "id": "n5-0440",
                  "lexiconId": "jlpt-n5",
                  "japanese": "とても",
                  "kana": "とても",
                  "meaning": "very much, quiet",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "totemo"
                  ]
            },
            {
                  "id": "n5-0441",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どなた",
                  "kana": "どなた",
                  "meaning": "who (polite)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "donata"
                  ]
            },
            {
                  "id": "n5-0442",
                  "lexiconId": "jlpt-n5",
                  "japanese": "隣り",
                  "kana": "となり",
                  "meaning": "next to",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tonari"
                  ]
            },
            {
                  "id": "n5-0443",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どの",
                  "kana": "どの",
                  "meaning": "which?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "dono"
                  ]
            },
            {
                  "id": "n5-0444",
                  "lexiconId": "jlpt-n5",
                  "japanese": "飛ぶ",
                  "kana": "とぶ",
                  "meaning": "to fly",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tobu"
                  ]
            },
            {
                  "id": "n5-0445",
                  "lexiconId": "jlpt-n5",
                  "japanese": "止まる",
                  "kana": "とまる",
                  "meaning": "to stop",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tomaru"
                  ]
            },
            {
                  "id": "n5-0446",
                  "lexiconId": "jlpt-n5",
                  "japanese": "友達",
                  "kana": "ともだち",
                  "meaning": "friend",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tomodachi"
                  ]
            },
            {
                  "id": "n5-0447",
                  "lexiconId": "jlpt-n5",
                  "japanese": "土曜日",
                  "kana": "どようび",
                  "meaning": "Saturday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "doyoubi"
                  ]
            },
            {
                  "id": "n5-0448",
                  "lexiconId": "jlpt-n5",
                  "japanese": "鳥",
                  "kana": "とり",
                  "meaning": "bird",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "tori"
                  ]
            },
            {
                  "id": "n5-0449",
                  "lexiconId": "jlpt-n5",
                  "japanese": "鶏肉",
                  "kana": "とりにく",
                  "meaning": "chicken meat",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "toriniku"
                  ]
            },
            {
                  "id": "n5-0450",
                  "lexiconId": "jlpt-n5",
                  "japanese": "取る",
                  "kana": "とる",
                  "meaning": "to take",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "toru"
                  ]
            },
            {
                  "id": "n5-0451",
                  "lexiconId": "jlpt-n5",
                  "japanese": "撮る",
                  "kana": "とる",
                  "meaning": "to take a photo",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "toru"
                  ]
            },
            {
                  "id": "n5-0452",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どれ",
                  "kana": "どれ",
                  "meaning": "which?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "dore"
                  ]
            },
            {
                  "id": "n5-0453",
                  "lexiconId": "jlpt-n5",
                  "japanese": "どんな",
                  "kana": "どんな",
                  "meaning": "what kind of?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "donna"
                  ]
            },
            {
                  "id": "n5-0454",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ナイフ",
                  "kana": "ナイフ",
                  "meaning": "knife",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "naifu"
                  ]
            },
            {
                  "id": "n5-0455",
                  "lexiconId": "jlpt-n5",
                  "japanese": "中",
                  "kana": "なか",
                  "meaning": "inside",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "naka"
                  ]
            },
            {
                  "id": "n5-0456",
                  "lexiconId": "jlpt-n5",
                  "japanese": "長い",
                  "kana": "ながい",
                  "meaning": "long",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nagai"
                  ]
            },
            {
                  "id": "n5-0457",
                  "lexiconId": "jlpt-n5",
                  "japanese": "鳴く",
                  "kana": "なく",
                  "meaning": "to sing, mew, moo",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "naku"
                  ]
            },
            {
                  "id": "n5-0458",
                  "lexiconId": "jlpt-n5",
                  "japanese": "夏",
                  "kana": "なつ",
                  "meaning": "summer",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "natsu"
                  ]
            },
            {
                  "id": "n5-0459",
                  "lexiconId": "jlpt-n5",
                  "japanese": "夏休み",
                  "kana": "なつやすみ",
                  "meaning": "summer vacation",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "natsuyasumi"
                  ]
            },
            {
                  "id": "n5-0460",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜など",
                  "kana": "〜など",
                  "meaning": "and so on",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~nado"
                  ]
            },
            {
                  "id": "n5-0461",
                  "lexiconId": "jlpt-n5",
                  "japanese": "七つ",
                  "kana": "ななつ",
                  "meaning": "seven",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nanatsu"
                  ]
            },
            {
                  "id": "n5-0462",
                  "lexiconId": "jlpt-n5",
                  "japanese": "何",
                  "kana": "なに",
                  "meaning": "what?",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nani"
                  ]
            },
            {
                  "id": "n5-0463",
                  "lexiconId": "jlpt-n5",
                  "japanese": "七日",
                  "kana": "なのか",
                  "meaning": "the 7th of a month, 7 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nanoka"
                  ]
            },
            {
                  "id": "n5-0464",
                  "lexiconId": "jlpt-n5",
                  "japanese": "名前",
                  "kana": "なまえ",
                  "meaning": "name",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "namae"
                  ]
            },
            {
                  "id": "n5-0465",
                  "lexiconId": "jlpt-n5",
                  "japanese": "習う",
                  "kana": "ならう",
                  "meaning": "to learn",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "narau"
                  ]
            },
            {
                  "id": "n5-0466",
                  "lexiconId": "jlpt-n5",
                  "japanese": "並ぶ",
                  "kana": "ならぶ",
                  "meaning": "to form a line",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "narabu"
                  ]
            },
            {
                  "id": "n5-0467",
                  "lexiconId": "jlpt-n5",
                  "japanese": "並べる",
                  "kana": "ならべる",
                  "meaning": "to line up",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "naraberu"
                  ]
            },
            {
                  "id": "n5-0468",
                  "lexiconId": "jlpt-n5",
                  "japanese": "なる",
                  "kana": "なる",
                  "meaning": "to become",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "naru"
                  ]
            },
            {
                  "id": "n5-0469",
                  "lexiconId": "jlpt-n5",
                  "japanese": "二",
                  "kana": "に",
                  "meaning": "two",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ni"
                  ]
            },
            {
                  "id": "n5-0470",
                  "lexiconId": "jlpt-n5",
                  "japanese": "賑やか",
                  "kana": "にぎやか",
                  "meaning": "lively",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nigiyaka"
                  ]
            },
            {
                  "id": "n5-0471",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お肉",
                  "kana": "おにく",
                  "meaning": "meat",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "oniku"
                  ]
            },
            {
                  "id": "n5-0472",
                  "lexiconId": "jlpt-n5",
                  "japanese": "西",
                  "kana": "にし",
                  "meaning": "west",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nishi"
                  ]
            },
            {
                  "id": "n5-0473",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜日",
                  "kana": "〜にち",
                  "meaning": "…st, ..nd, ..th",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~nichi"
                  ]
            },
            {
                  "id": "n5-0474",
                  "lexiconId": "jlpt-n5",
                  "japanese": "日曜日",
                  "kana": "にちようび",
                  "meaning": "Sunday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nichiyoubi"
                  ]
            },
            {
                  "id": "n5-0475",
                  "lexiconId": "jlpt-n5",
                  "japanese": "荷物",
                  "kana": "にもつ",
                  "meaning": "luggage",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nimotsu"
                  ]
            },
            {
                  "id": "n5-0476",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ニュース",
                  "kana": "ニュース",
                  "meaning": "news",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nyuusu"
                  ]
            },
            {
                  "id": "n5-0477",
                  "lexiconId": "jlpt-n5",
                  "japanese": "庭",
                  "kana": "にわ",
                  "meaning": "garden",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "niwa"
                  ]
            },
            {
                  "id": "n5-0478",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜人",
                  "kana": "~にん",
                  "meaning": "… people",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~nin"
                  ]
            },
            {
                  "id": "n5-0479",
                  "lexiconId": "jlpt-n5",
                  "japanese": "脱ぐ",
                  "kana": "ぬぐ",
                  "meaning": "to take off clothes",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nugu"
                  ]
            },
            {
                  "id": "n5-0480",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ネクタイ",
                  "kana": "ネクタイ",
                  "meaning": "necktie",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nekutai"
                  ]
            },
            {
                  "id": "n5-0481",
                  "lexiconId": "jlpt-n5",
                  "japanese": "寝る",
                  "kana": "ねる",
                  "meaning": "to go to bed",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "neru"
                  ]
            },
            {
                  "id": "n5-0482",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜年",
                  "kana": "〜ねん",
                  "meaning": "~years",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~nen"
                  ]
            },
            {
                  "id": "n5-0483",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ノート",
                  "kana": "ノート",
                  "meaning": "notebook",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nooto"
                  ]
            },
            {
                  "id": "n5-0484",
                  "lexiconId": "jlpt-n5",
                  "japanese": "登る",
                  "kana": "のぼる",
                  "meaning": "to climb up",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "noboru"
                  ]
            },
            {
                  "id": "n5-0485",
                  "lexiconId": "jlpt-n5",
                  "japanese": "飲物",
                  "kana": "のみもの",
                  "meaning": "drinks",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nomimono"
                  ]
            },
            {
                  "id": "n5-0486",
                  "lexiconId": "jlpt-n5",
                  "japanese": "飲む",
                  "kana": "のむ",
                  "meaning": "to drink",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "nomu"
                  ]
            },
            {
                  "id": "n5-0487",
                  "lexiconId": "jlpt-n5",
                  "japanese": "乗る",
                  "kana": "のる",
                  "meaning": "to take, to ride",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "noru"
                  ]
            },
            {
                  "id": "n5-0488",
                  "lexiconId": "jlpt-n5",
                  "japanese": "歯",
                  "kana": "は",
                  "meaning": "teeth",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ha"
                  ]
            },
            {
                  "id": "n5-0489",
                  "lexiconId": "jlpt-n5",
                  "japanese": "パーテイー",
                  "kana": "パーテイー",
                  "meaning": "party",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "paateii"
                  ]
            },
            {
                  "id": "n5-0490",
                  "lexiconId": "jlpt-n5",
                  "japanese": "はい",
                  "kana": "はい",
                  "meaning": "yes",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hai"
                  ]
            },
            {
                  "id": "n5-0491",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜はい",
                  "kana": "〜はい",
                  "meaning": "cups of ~",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~hai"
                  ]
            },
            {
                  "id": "n5-0492",
                  "lexiconId": "jlpt-n5",
                  "japanese": "灰皿",
                  "kana": "はいざら",
                  "meaning": "ashtray",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "haizara"
                  ]
            },
            {
                  "id": "n5-0493",
                  "lexiconId": "jlpt-n5",
                  "japanese": "入る",
                  "kana": "はいる",
                  "meaning": "to enter",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hairu"
                  ]
            },
            {
                  "id": "n5-0494",
                  "lexiconId": "jlpt-n5",
                  "japanese": "葉書",
                  "kana": "はがき",
                  "meaning": "postcard",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hagaki"
                  ]
            },
            {
                  "id": "n5-0495",
                  "lexiconId": "jlpt-n5",
                  "japanese": "履く",
                  "kana": "はく",
                  "meaning": "to put on shoes",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "haku"
                  ]
            },
            {
                  "id": "n5-0496",
                  "lexiconId": "jlpt-n5",
                  "japanese": "箱",
                  "kana": "はこ",
                  "meaning": "box",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hako"
                  ]
            },
            {
                  "id": "n5-0497",
                  "lexiconId": "jlpt-n5",
                  "japanese": "橋",
                  "kana": "はし",
                  "meaning": "bridge",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hashi"
                  ]
            },
            {
                  "id": "n5-0498",
                  "lexiconId": "jlpt-n5",
                  "japanese": "箸",
                  "kana": "はし",
                  "meaning": "chopsticks",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hashi"
                  ]
            },
            {
                  "id": "n5-0499",
                  "lexiconId": "jlpt-n5",
                  "japanese": "始まる",
                  "kana": "はじまる",
                  "meaning": "to begin, to start",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hajimaru"
                  ]
            },
            {
                  "id": "n5-0500",
                  "lexiconId": "jlpt-n5",
                  "japanese": "始め",
                  "kana": "はじめ",
                  "meaning": "start, the beginning",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hajime"
                  ]
            },
            {
                  "id": "n5-0501",
                  "lexiconId": "jlpt-n5",
                  "japanese": "初めて",
                  "kana": "はじめて",
                  "meaning": "for the first time",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hajimete"
                  ]
            },
            {
                  "id": "n5-0502",
                  "lexiconId": "jlpt-n5",
                  "japanese": "走る",
                  "kana": "はしる",
                  "meaning": "to run",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hashiru"
                  ]
            },
            {
                  "id": "n5-0503",
                  "lexiconId": "jlpt-n5",
                  "japanese": "バス",
                  "kana": "バス",
                  "meaning": "bus",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "basu"
                  ]
            },
            {
                  "id": "n5-0504",
                  "lexiconId": "jlpt-n5",
                  "japanese": "バター",
                  "kana": "バター",
                  "meaning": "butter",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "bataa"
                  ]
            },
            {
                  "id": "n5-0505",
                  "lexiconId": "jlpt-n5",
                  "japanese": "二十歳",
                  "kana": "はたち",
                  "meaning": "20 years old",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hatachi"
                  ]
            },
            {
                  "id": "n5-0506",
                  "lexiconId": "jlpt-n5",
                  "japanese": "働く",
                  "kana": "はたらく",
                  "meaning": "to work",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hataraku"
                  ]
            },
            {
                  "id": "n5-0507",
                  "lexiconId": "jlpt-n5",
                  "japanese": "八",
                  "kana": "はち",
                  "meaning": "eight",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hachi"
                  ]
            },
            {
                  "id": "n5-0508",
                  "lexiconId": "jlpt-n5",
                  "japanese": "二十日",
                  "kana": "はつか",
                  "meaning": "the 20th of the month, 20 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hatsuka"
                  ]
            },
            {
                  "id": "n5-0509",
                  "lexiconId": "jlpt-n5",
                  "japanese": "花",
                  "kana": "はな",
                  "meaning": "flower",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hana"
                  ]
            },
            {
                  "id": "n5-0510",
                  "lexiconId": "jlpt-n5",
                  "japanese": "鼻",
                  "kana": "はな",
                  "meaning": "nose",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hana"
                  ]
            },
            {
                  "id": "n5-0511",
                  "lexiconId": "jlpt-n5",
                  "japanese": "話",
                  "kana": "はなし",
                  "meaning": "conversation, tale",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hanashi"
                  ]
            },
            {
                  "id": "n5-0512",
                  "lexiconId": "jlpt-n5",
                  "japanese": "話す",
                  "kana": "はなす",
                  "meaning": "to talk, to speak, to tell",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hanasu"
                  ]
            },
            {
                  "id": "n5-0513",
                  "lexiconId": "jlpt-n5",
                  "japanese": "母",
                  "kana": "はは",
                  "meaning": "my mother",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "haha"
                  ]
            },
            {
                  "id": "n5-0514",
                  "lexiconId": "jlpt-n5",
                  "japanese": "早い",
                  "kana": "はやい",
                  "meaning": "early",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hayai"
                  ]
            },
            {
                  "id": "n5-0515",
                  "lexiconId": "jlpt-n5",
                  "japanese": "速い",
                  "kana": "はやい",
                  "meaning": "fast, quick",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hayai"
                  ]
            },
            {
                  "id": "n5-0516",
                  "lexiconId": "jlpt-n5",
                  "japanese": "春",
                  "kana": "はる",
                  "meaning": "spring",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "haru"
                  ]
            },
            {
                  "id": "n5-0517",
                  "lexiconId": "jlpt-n5",
                  "japanese": "張る",
                  "kana": "はる",
                  "meaning": "to put something on, to stick",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "haru"
                  ]
            },
            {
                  "id": "n5-0518",
                  "lexiconId": "jlpt-n5",
                  "japanese": "晴れる",
                  "kana": "はれる",
                  "meaning": "to clear up",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hareru"
                  ]
            },
            {
                  "id": "n5-0519",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜半",
                  "kana": "〜はん",
                  "meaning": "Half~",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~han"
                  ]
            },
            {
                  "id": "n5-0520",
                  "lexiconId": "jlpt-n5",
                  "japanese": "晩",
                  "kana": "ばん",
                  "meaning": "evening",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ban"
                  ]
            },
            {
                  "id": "n5-0521",
                  "lexiconId": "jlpt-n5",
                  "japanese": "~番",
                  "kana": "〜ばん",
                  "meaning": "No.~, ranking",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~ban"
                  ]
            },
            {
                  "id": "n5-0522",
                  "lexiconId": "jlpt-n5",
                  "japanese": "パン",
                  "kana": "パン",
                  "meaning": "bread",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "pan"
                  ]
            },
            {
                  "id": "n5-0523",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ハンカチ",
                  "kana": "ハンカチ",
                  "meaning": "handkerchief",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hankachi"
                  ]
            },
            {
                  "id": "n5-0524",
                  "lexiconId": "jlpt-n5",
                  "japanese": "番号",
                  "kana": "ばんごう",
                  "meaning": "number",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "bangou"
                  ]
            },
            {
                  "id": "n5-0525",
                  "lexiconId": "jlpt-n5",
                  "japanese": "晩ご飯",
                  "kana": "ばんごはん",
                  "meaning": "dinner",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "bangohan"
                  ]
            },
            {
                  "id": "n5-0526",
                  "lexiconId": "jlpt-n5",
                  "japanese": "半分",
                  "kana": "はんぶん",
                  "meaning": "half",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hanbun"
                  ]
            },
            {
                  "id": "n5-0527",
                  "lexiconId": "jlpt-n5",
                  "japanese": "東",
                  "kana": "ひがし",
                  "meaning": "east",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "higashi"
                  ]
            },
            {
                  "id": "n5-0528",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜匹",
                  "kana": "〜ひき",
                  "meaning": "counter for animals",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~hiki"
                  ]
            },
            {
                  "id": "n5-0529",
                  "lexiconId": "jlpt-n5",
                  "japanese": "引く",
                  "kana": "ひく",
                  "meaning": "to pull",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hiku"
                  ]
            },
            {
                  "id": "n5-0530",
                  "lexiconId": "jlpt-n5",
                  "japanese": "弾く",
                  "kana": "ひく",
                  "meaning": "to play (an instrument)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hiku"
                  ]
            },
            {
                  "id": "n5-0531",
                  "lexiconId": "jlpt-n5",
                  "japanese": "低い",
                  "kana": "ひくい",
                  "meaning": "low",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hikui"
                  ]
            },
            {
                  "id": "n5-0532",
                  "lexiconId": "jlpt-n5",
                  "japanese": "飛行機",
                  "kana": "ひこうき",
                  "meaning": "plane",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hikouki"
                  ]
            },
            {
                  "id": "n5-0533",
                  "lexiconId": "jlpt-n5",
                  "japanese": "左",
                  "kana": "ひだり",
                  "meaning": "left",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hidari"
                  ]
            },
            {
                  "id": "n5-0534",
                  "lexiconId": "jlpt-n5",
                  "japanese": "人",
                  "kana": "ひと",
                  "meaning": "person",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hito"
                  ]
            },
            {
                  "id": "n5-0535",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一つ",
                  "kana": "ひとつ",
                  "meaning": "one",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hitotsu"
                  ]
            },
            {
                  "id": "n5-0536",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一月",
                  "kana": "ひとつき",
                  "meaning": "one month",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hitotsuki"
                  ]
            },
            {
                  "id": "n5-0537",
                  "lexiconId": "jlpt-n5",
                  "japanese": "一人",
                  "kana": "ひとり",
                  "meaning": "one person",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hitori"
                  ]
            },
            {
                  "id": "n5-0538",
                  "lexiconId": "jlpt-n5",
                  "japanese": "暇",
                  "kana": "ひま",
                  "meaning": "free time, leisure",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hima"
                  ]
            },
            {
                  "id": "n5-0539",
                  "lexiconId": "jlpt-n5",
                  "japanese": "百",
                  "kana": "ひゃく",
                  "meaning": "hundred",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hyaku"
                  ]
            },
            {
                  "id": "n5-0540",
                  "lexiconId": "jlpt-n5",
                  "japanese": "病院",
                  "kana": "びょういん",
                  "meaning": "hospital",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "byouin"
                  ]
            },
            {
                  "id": "n5-0541",
                  "lexiconId": "jlpt-n5",
                  "japanese": "病気",
                  "kana": "びょうき",
                  "meaning": "ill, sick",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "byouki"
                  ]
            },
            {
                  "id": "n5-0542",
                  "lexiconId": "jlpt-n5",
                  "japanese": "平仮名",
                  "kana": "ひらがな",
                  "meaning": "hiragana characters",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hiragana"
                  ]
            },
            {
                  "id": "n5-0543",
                  "lexiconId": "jlpt-n5",
                  "japanese": "昼",
                  "kana": "ひる",
                  "meaning": "noon",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hiru"
                  ]
            },
            {
                  "id": "n5-0544",
                  "lexiconId": "jlpt-n5",
                  "japanese": "昼ご飯",
                  "kana": "ひるごはん",
                  "meaning": "lunch",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hirugohan"
                  ]
            },
            {
                  "id": "n5-0545",
                  "lexiconId": "jlpt-n5",
                  "japanese": "広い",
                  "kana": "ひろい",
                  "meaning": "wide, spacious",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hiroi"
                  ]
            },
            {
                  "id": "n5-0546",
                  "lexiconId": "jlpt-n5",
                  "japanese": "フィルム",
                  "kana": "フィルム",
                  "meaning": "film",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "firumu"
                  ]
            },
            {
                  "id": "n5-0547",
                  "lexiconId": "jlpt-n5",
                  "japanese": "封筒",
                  "kana": "ふうとう",
                  "meaning": "envelope",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "fuutou"
                  ]
            },
            {
                  "id": "n5-0548",
                  "lexiconId": "jlpt-n5",
                  "japanese": "プール",
                  "kana": "プール",
                  "meaning": "pool",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "puuru"
                  ]
            },
            {
                  "id": "n5-0549",
                  "lexiconId": "jlpt-n5",
                  "japanese": "フォーク",
                  "kana": "フォーク",
                  "meaning": "fork",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "fooku"
                  ]
            },
            {
                  "id": "n5-0550",
                  "lexiconId": "jlpt-n5",
                  "japanese": "吹く",
                  "kana": "ふく",
                  "meaning": "to blow (wind)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "fuku"
                  ]
            },
            {
                  "id": "n5-0551",
                  "lexiconId": "jlpt-n5",
                  "japanese": "服",
                  "kana": "ふく",
                  "meaning": "clothes",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "fuku"
                  ]
            },
            {
                  "id": "n5-0552",
                  "lexiconId": "jlpt-n5",
                  "japanese": "二つ",
                  "kana": "ふたつ",
                  "meaning": "two",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "futatsu"
                  ]
            },
            {
                  "id": "n5-0553",
                  "lexiconId": "jlpt-n5",
                  "japanese": "豚肉",
                  "kana": "ぶたにく",
                  "meaning": "pork",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "butaniku"
                  ]
            },
            {
                  "id": "n5-0554",
                  "lexiconId": "jlpt-n5",
                  "japanese": "二人",
                  "kana": "ふたり",
                  "meaning": "two people",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "futari"
                  ]
            },
            {
                  "id": "n5-0555",
                  "lexiconId": "jlpt-n5",
                  "japanese": "二日",
                  "kana": "ふつか",
                  "meaning": "2nd day of the month, 2 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "futsuka"
                  ]
            },
            {
                  "id": "n5-0556",
                  "lexiconId": "jlpt-n5",
                  "japanese": "太い",
                  "kana": "ふとい",
                  "meaning": "thick, fat",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "futoi"
                  ]
            },
            {
                  "id": "n5-0557",
                  "lexiconId": "jlpt-n5",
                  "japanese": "降る",
                  "kana": "ふる",
                  "meaning": "to fall (rain, snow)",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "furu"
                  ]
            },
            {
                  "id": "n5-0558",
                  "lexiconId": "jlpt-n5",
                  "japanese": "古い",
                  "kana": "ふるい",
                  "meaning": "old",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "furui"
                  ]
            },
            {
                  "id": "n5-0559",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お風呂",
                  "kana": "おふろ",
                  "meaning": "bath",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ofuro"
                  ]
            },
            {
                  "id": "n5-0560",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜分",
                  "kana": "〜ふん",
                  "meaning": "~minutes",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~fun"
                  ]
            },
            {
                  "id": "n5-0561",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ページ",
                  "kana": "ページ",
                  "meaning": "page",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "peeji"
                  ]
            },
            {
                  "id": "n5-0562",
                  "lexiconId": "jlpt-n5",
                  "japanese": "下手",
                  "kana": "へた",
                  "meaning": "not good at something",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "heta"
                  ]
            },
            {
                  "id": "n5-0563",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ベッド",
                  "kana": "ベッド",
                  "meaning": "bed",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "beddo"
                  ]
            },
            {
                  "id": "n5-0564",
                  "lexiconId": "jlpt-n5",
                  "japanese": "部屋",
                  "kana": "へや",
                  "meaning": "room",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "heya"
                  ]
            },
            {
                  "id": "n5-0565",
                  "lexiconId": "jlpt-n5",
                  "japanese": "辺",
                  "kana": "へん",
                  "meaning": "side, part, area",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hen"
                  ]
            },
            {
                  "id": "n5-0566",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ペン",
                  "kana": "ぺん",
                  "meaning": "pen",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "pen"
                  ]
            },
            {
                  "id": "n5-0567",
                  "lexiconId": "jlpt-n5",
                  "japanese": "勉強",
                  "kana": "べんきょう",
                  "meaning": "to study",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "benkyou"
                  ]
            },
            {
                  "id": "n5-0568",
                  "lexiconId": "jlpt-n5",
                  "japanese": "便利",
                  "kana": "べんり",
                  "meaning": "convenient",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "benri"
                  ]
            },
            {
                  "id": "n5-0569",
                  "lexiconId": "jlpt-n5",
                  "japanese": "方",
                  "kana": "ほう",
                  "meaning": "~より〜のほうが〜",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hou"
                  ]
            },
            {
                  "id": "n5-0570",
                  "lexiconId": "jlpt-n5",
                  "japanese": "帽子",
                  "kana": "ぼうし",
                  "meaning": "hat",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "boushi"
                  ]
            },
            {
                  "id": "n5-0571",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ボールペン",
                  "kana": "ボールペン",
                  "meaning": "ballpen",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "boorupen"
                  ]
            },
            {
                  "id": "n5-0572",
                  "lexiconId": "jlpt-n5",
                  "japanese": "他",
                  "kana": "ほか",
                  "meaning": "another, other",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hoka"
                  ]
            },
            {
                  "id": "n5-0573",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ポケット",
                  "kana": "ポケット",
                  "meaning": "pocket",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "poketto"
                  ]
            },
            {
                  "id": "n5-0574",
                  "lexiconId": "jlpt-n5",
                  "japanese": "欲しい",
                  "kana": "ほしい",
                  "meaning": "to want something",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hoshii"
                  ]
            },
            {
                  "id": "n5-0575",
                  "lexiconId": "jlpt-n5",
                  "japanese": "細い",
                  "kana": "ほそい",
                  "meaning": "thin, fine",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hosoi"
                  ]
            },
            {
                  "id": "n5-0576",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ボタン",
                  "kana": "ボタン",
                  "meaning": "button",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "botan"
                  ]
            },
            {
                  "id": "n5-0577",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ホテル",
                  "kana": "ホテル",
                  "meaning": "hotel",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hoteru"
                  ]
            },
            {
                  "id": "n5-0578",
                  "lexiconId": "jlpt-n5",
                  "japanese": "本",
                  "kana": "ほん",
                  "meaning": "book",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hon"
                  ]
            },
            {
                  "id": "n5-0579",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜本",
                  "kana": "~ほん",
                  "meaning": "counter for long objects",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~hon"
                  ]
            },
            {
                  "id": "n5-0580",
                  "lexiconId": "jlpt-n5",
                  "japanese": "本棚",
                  "kana": "ほんだな",
                  "meaning": "bookshelf",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hondana"
                  ]
            },
            {
                  "id": "n5-0581",
                  "lexiconId": "jlpt-n5",
                  "japanese": "本当に",
                  "kana": "ほんとうに",
                  "meaning": "really",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "hontouni"
                  ]
            },
            {
                  "id": "n5-0582",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜枚",
                  "kana": "〜まい",
                  "meaning": "counter for thin objects",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~mai"
                  ]
            },
            {
                  "id": "n5-0583",
                  "lexiconId": "jlpt-n5",
                  "japanese": "毎朝",
                  "kana": "まいあさ",
                  "meaning": "every morning",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "maiasa"
                  ]
            },
            {
                  "id": "n5-0584",
                  "lexiconId": "jlpt-n5",
                  "japanese": "毎月",
                  "kana": "まいつき",
                  "meaning": "every month",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "maitsuki/maigetsu"
                  ]
            },
            {
                  "id": "n5-0585",
                  "lexiconId": "jlpt-n5",
                  "japanese": "毎週",
                  "kana": "まいしゅう",
                  "meaning": "every week",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "maishuu"
                  ]
            },
            {
                  "id": "n5-0586",
                  "lexiconId": "jlpt-n5",
                  "japanese": "毎日",
                  "kana": "まいにち",
                  "meaning": "every day",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mainichi"
                  ]
            },
            {
                  "id": "n5-0587",
                  "lexiconId": "jlpt-n5",
                  "japanese": "毎年",
                  "kana": "まいとし",
                  "meaning": "every year",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "maitoshi/mainen"
                  ]
            },
            {
                  "id": "n5-0588",
                  "lexiconId": "jlpt-n5",
                  "japanese": "毎晩",
                  "kana": "まいばん",
                  "meaning": "every evening",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "maiban"
                  ]
            },
            {
                  "id": "n5-0589",
                  "lexiconId": "jlpt-n5",
                  "japanese": "前",
                  "kana": "まえ",
                  "meaning": "front",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mae"
                  ]
            },
            {
                  "id": "n5-0590",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜前",
                  "kana": "〜まえ",
                  "meaning": "before, in front of",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~mae"
                  ]
            },
            {
                  "id": "n5-0591",
                  "lexiconId": "jlpt-n5",
                  "japanese": "曲がる",
                  "kana": "まがる",
                  "meaning": "to turn",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "magaru"
                  ]
            },
            {
                  "id": "n5-0592",
                  "lexiconId": "jlpt-n5",
                  "japanese": "不味い",
                  "kana": "まずい",
                  "meaning": "bad tasting",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mazui"
                  ]
            },
            {
                  "id": "n5-0593",
                  "lexiconId": "jlpt-n5",
                  "japanese": "また",
                  "kana": "また",
                  "meaning": "also, again",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mata"
                  ]
            },
            {
                  "id": "n5-0594",
                  "lexiconId": "jlpt-n5",
                  "japanese": "まだ",
                  "kana": "まだ",
                  "meaning": "not yet",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mada"
                  ]
            },
            {
                  "id": "n5-0595",
                  "lexiconId": "jlpt-n5",
                  "japanese": "町",
                  "kana": "まち",
                  "meaning": "city, town",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "machi"
                  ]
            },
            {
                  "id": "n5-0596",
                  "lexiconId": "jlpt-n5",
                  "japanese": "待つ",
                  "kana": "まつ",
                  "meaning": "to wait",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "matsu"
                  ]
            },
            {
                  "id": "n5-0597",
                  "lexiconId": "jlpt-n5",
                  "japanese": "真直ぐに",
                  "kana": "まっすぐに",
                  "meaning": "straight ahead",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "massugu ni"
                  ]
            },
            {
                  "id": "n5-0598",
                  "lexiconId": "jlpt-n5",
                  "japanese": "マッチ",
                  "kana": "マッチ",
                  "meaning": "matches",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "machi"
                  ]
            },
            {
                  "id": "n5-0599",
                  "lexiconId": "jlpt-n5",
                  "japanese": "窓",
                  "kana": "まど",
                  "meaning": "window",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mado"
                  ]
            },
            {
                  "id": "n5-0600",
                  "lexiconId": "jlpt-n5",
                  "japanese": "丸い",
                  "kana": "まるい",
                  "meaning": "round",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "marui"
                  ]
            },
            {
                  "id": "n5-0601",
                  "lexiconId": "jlpt-n5",
                  "japanese": "万",
                  "kana": "まん",
                  "meaning": "ten thousand",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "man"
                  ]
            },
            {
                  "id": "n5-0602",
                  "lexiconId": "jlpt-n5",
                  "japanese": "万年筆",
                  "kana": "まんねんひつ",
                  "meaning": "fountain pen",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mannenhitsu"
                  ]
            },
            {
                  "id": "n5-0603",
                  "lexiconId": "jlpt-n5",
                  "japanese": "磨く",
                  "kana": "みがく",
                  "meaning": "to polish, to brush",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "migaku"
                  ]
            },
            {
                  "id": "n5-0604",
                  "lexiconId": "jlpt-n5",
                  "japanese": "右",
                  "kana": "みぎ",
                  "meaning": "right",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "migi"
                  ]
            },
            {
                  "id": "n5-0605",
                  "lexiconId": "jlpt-n5",
                  "japanese": "短い",
                  "kana": "みじかい",
                  "meaning": "short",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mijikai"
                  ]
            },
            {
                  "id": "n5-0606",
                  "lexiconId": "jlpt-n5",
                  "japanese": "お水",
                  "kana": "おみず",
                  "meaning": "water",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "omizu"
                  ]
            },
            {
                  "id": "n5-0607",
                  "lexiconId": "jlpt-n5",
                  "japanese": "店",
                  "kana": "みせ",
                  "meaning": "shop",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mise"
                  ]
            },
            {
                  "id": "n5-0608",
                  "lexiconId": "jlpt-n5",
                  "japanese": "見せる",
                  "kana": "みせる",
                  "meaning": "to look, to watch",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "miseru"
                  ]
            },
            {
                  "id": "n5-0609",
                  "lexiconId": "jlpt-n5",
                  "japanese": "道",
                  "kana": "みち",
                  "meaning": "road",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "michi"
                  ]
            },
            {
                  "id": "n5-0610",
                  "lexiconId": "jlpt-n5",
                  "japanese": "三日",
                  "kana": "みっか",
                  "meaning": "3rd day of a month, 3 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mikka"
                  ]
            },
            {
                  "id": "n5-0611",
                  "lexiconId": "jlpt-n5",
                  "japanese": "三つ",
                  "kana": "みっつ",
                  "meaning": "three",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mittsu"
                  ]
            },
            {
                  "id": "n5-0612",
                  "lexiconId": "jlpt-n5",
                  "japanese": "皆さん",
                  "kana": "みなさん",
                  "meaning": "everyone",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "minsan"
                  ]
            },
            {
                  "id": "n5-0613",
                  "lexiconId": "jlpt-n5",
                  "japanese": "南",
                  "kana": "みなみ",
                  "meaning": "south",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "minami"
                  ]
            },
            {
                  "id": "n5-0614",
                  "lexiconId": "jlpt-n5",
                  "japanese": "耳",
                  "kana": "みみ",
                  "meaning": "ear",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mimi"
                  ]
            },
            {
                  "id": "n5-0615",
                  "lexiconId": "jlpt-n5",
                  "japanese": "見る",
                  "kana": "みる",
                  "meaning": "to see, to watch",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "miru"
                  ]
            },
            {
                  "id": "n5-0616",
                  "lexiconId": "jlpt-n5",
                  "japanese": "皆",
                  "kana": "みんな",
                  "meaning": "all, everyone",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "minna"
                  ]
            },
            {
                  "id": "n5-0617",
                  "lexiconId": "jlpt-n5",
                  "japanese": "六日",
                  "kana": "むいか",
                  "meaning": "the 6th day of a month, 6 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "muika"
                  ]
            },
            {
                  "id": "n5-0618",
                  "lexiconId": "jlpt-n5",
                  "japanese": "向こう",
                  "kana": "むこう",
                  "meaning": "over there",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mukou"
                  ]
            },
            {
                  "id": "n5-0619",
                  "lexiconId": "jlpt-n5",
                  "japanese": "難しい",
                  "kana": "むずかしい",
                  "meaning": "difficult",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "muzukashii"
                  ]
            },
            {
                  "id": "n5-0620",
                  "lexiconId": "jlpt-n5",
                  "japanese": "六つ",
                  "kana": "むっつ",
                  "meaning": "six",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "muttsu"
                  ]
            },
            {
                  "id": "n5-0621",
                  "lexiconId": "jlpt-n5",
                  "japanese": "目",
                  "kana": "め",
                  "meaning": "eye",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "me"
                  ]
            },
            {
                  "id": "n5-0622",
                  "lexiconId": "jlpt-n5",
                  "japanese": "メートル",
                  "kana": "メートル",
                  "meaning": "meter",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "meetoru"
                  ]
            },
            {
                  "id": "n5-0623",
                  "lexiconId": "jlpt-n5",
                  "japanese": "めがね",
                  "kana": "めがね",
                  "meaning": "a pair of glasses",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "megane"
                  ]
            },
            {
                  "id": "n5-0624",
                  "lexiconId": "jlpt-n5",
                  "japanese": "もう",
                  "kana": "もう",
                  "meaning": "already, yet",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mou"
                  ]
            },
            {
                  "id": "n5-0625",
                  "lexiconId": "jlpt-n5",
                  "japanese": "もう",
                  "kana": "もう",
                  "meaning": "(one) more",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mou"
                  ]
            },
            {
                  "id": "n5-0626",
                  "lexiconId": "jlpt-n5",
                  "japanese": "木曜日",
                  "kana": "もくようび",
                  "meaning": "Thursday",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mokuyoubi"
                  ]
            },
            {
                  "id": "n5-0627",
                  "lexiconId": "jlpt-n5",
                  "japanese": "もしもし",
                  "kana": "もしもし",
                  "meaning": "hello on the phone",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "moshimoshi"
                  ]
            },
            {
                  "id": "n5-0628",
                  "lexiconId": "jlpt-n5",
                  "japanese": "勿論",
                  "kana": "もちろん",
                  "meaning": "of course",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mochiron"
                  ]
            },
            {
                  "id": "n5-0629",
                  "lexiconId": "jlpt-n5",
                  "japanese": "持つ",
                  "kana": "もつ",
                  "meaning": "to have, to own",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "motsu"
                  ]
            },
            {
                  "id": "n5-0630",
                  "lexiconId": "jlpt-n5",
                  "japanese": "もっと",
                  "kana": "もっと",
                  "meaning": "more",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "motto"
                  ]
            },
            {
                  "id": "n5-0631",
                  "lexiconId": "jlpt-n5",
                  "japanese": "物",
                  "kana": "もの",
                  "meaning": "thing",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mono"
                  ]
            },
            {
                  "id": "n5-0632",
                  "lexiconId": "jlpt-n5",
                  "japanese": "門",
                  "kana": "もん",
                  "meaning": "gate",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mon"
                  ]
            },
            {
                  "id": "n5-0633",
                  "lexiconId": "jlpt-n5",
                  "japanese": "問題",
                  "kana": "もんだい",
                  "meaning": "problem, question",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "mondai"
                  ]
            },
            {
                  "id": "n5-0634",
                  "lexiconId": "jlpt-n5",
                  "japanese": "〜屋",
                  "kana": "〜や",
                  "meaning": "shop. store",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "~ya"
                  ]
            },
            {
                  "id": "n5-0635",
                  "lexiconId": "jlpt-n5",
                  "japanese": "八百屋",
                  "kana": "やおや",
                  "meaning": "vegetable shop",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yaoya"
                  ]
            },
            {
                  "id": "n5-0636",
                  "lexiconId": "jlpt-n5",
                  "japanese": "野菜",
                  "kana": "やさい",
                  "meaning": "vegetable",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yasai"
                  ]
            },
            {
                  "id": "n5-0637",
                  "lexiconId": "jlpt-n5",
                  "japanese": "優しい",
                  "kana": "やさしい",
                  "meaning": "gentle",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yasashii"
                  ]
            },
            {
                  "id": "n5-0638",
                  "lexiconId": "jlpt-n5",
                  "japanese": "安い",
                  "kana": "やすい",
                  "meaning": "cheap, inexpensive",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yasui"
                  ]
            },
            {
                  "id": "n5-0639",
                  "lexiconId": "jlpt-n5",
                  "japanese": "休み",
                  "kana": "やすみ",
                  "meaning": "holiday, vacation",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yasumi"
                  ]
            },
            {
                  "id": "n5-0640",
                  "lexiconId": "jlpt-n5",
                  "japanese": "休む",
                  "kana": "やすむ",
                  "meaning": "to rest",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yasumu"
                  ]
            },
            {
                  "id": "n5-0641",
                  "lexiconId": "jlpt-n5",
                  "japanese": "八つ",
                  "kana": "やっつ",
                  "meaning": "eight",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yattsu"
                  ]
            },
            {
                  "id": "n5-0642",
                  "lexiconId": "jlpt-n5",
                  "japanese": "山",
                  "kana": "やま",
                  "meaning": "mountain",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yama"
                  ]
            },
            {
                  "id": "n5-0643",
                  "lexiconId": "jlpt-n5",
                  "japanese": "やる",
                  "kana": "やる",
                  "meaning": "to do",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yaru"
                  ]
            },
            {
                  "id": "n5-0644",
                  "lexiconId": "jlpt-n5",
                  "japanese": "八日",
                  "kana": "ようか",
                  "meaning": "8th day of the month, 8 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "youka"
                  ]
            },
            {
                  "id": "n5-0645",
                  "lexiconId": "jlpt-n5",
                  "japanese": "洋服",
                  "kana": "ようふく",
                  "meaning": "western style clothing",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "youfuku"
                  ]
            },
            {
                  "id": "n5-0646",
                  "lexiconId": "jlpt-n5",
                  "japanese": "よく",
                  "kana": "よく",
                  "meaning": "often",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yoku"
                  ]
            },
            {
                  "id": "n5-0647",
                  "lexiconId": "jlpt-n5",
                  "japanese": "横",
                  "kana": "よこ",
                  "meaning": "horizontal",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yoko"
                  ]
            },
            {
                  "id": "n5-0648",
                  "lexiconId": "jlpt-n5",
                  "japanese": "四日",
                  "kana": "よっか",
                  "meaning": "4th day of the month, 4 days",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yokka"
                  ]
            },
            {
                  "id": "n5-0649",
                  "lexiconId": "jlpt-n5",
                  "japanese": "四つ",
                  "kana": "よっつ",
                  "meaning": "four",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yottsu"
                  ]
            },
            {
                  "id": "n5-0650",
                  "lexiconId": "jlpt-n5",
                  "japanese": "呼ぶ",
                  "kana": "よぶ",
                  "meaning": "to call",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yobu"
                  ]
            },
            {
                  "id": "n5-0651",
                  "lexiconId": "jlpt-n5",
                  "japanese": "読む",
                  "kana": "よむ",
                  "meaning": "to read",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yomu"
                  ]
            },
            {
                  "id": "n5-0652",
                  "lexiconId": "jlpt-n5",
                  "japanese": "夜",
                  "kana": "よる",
                  "meaning": "night",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "yoru"
                  ]
            },
            {
                  "id": "n5-0653",
                  "lexiconId": "jlpt-n5",
                  "japanese": "来月",
                  "kana": "らいげつ",
                  "meaning": "next month",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "raigetsu"
                  ]
            },
            {
                  "id": "n5-0654",
                  "lexiconId": "jlpt-n5",
                  "japanese": "来週",
                  "kana": "らいしゅう",
                  "meaning": "next week",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "raishuu"
                  ]
            },
            {
                  "id": "n5-0655",
                  "lexiconId": "jlpt-n5",
                  "japanese": "来年",
                  "kana": "らいねん",
                  "meaning": "next year",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "rainen"
                  ]
            },
            {
                  "id": "n5-0656",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ラジオ",
                  "kana": "ラジオ",
                  "meaning": "radio",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "rajio"
                  ]
            },
            {
                  "id": "n5-0657",
                  "lexiconId": "jlpt-n5",
                  "japanese": "立派",
                  "kana": "りっぱ",
                  "meaning": "splendid",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "rippa"
                  ]
            },
            {
                  "id": "n5-0658",
                  "lexiconId": "jlpt-n5",
                  "japanese": "留学生",
                  "kana": "りゅうがくせい",
                  "meaning": "foreign student",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ryuugakusei"
                  ]
            },
            {
                  "id": "n5-0659",
                  "lexiconId": "jlpt-n5",
                  "japanese": "両親",
                  "kana": "りょうしん",
                  "meaning": "parents",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ryoushin"
                  ]
            },
            {
                  "id": "n5-0660",
                  "lexiconId": "jlpt-n5",
                  "japanese": "料理",
                  "kana": "りょうり",
                  "meaning": "cooking",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ryouri"
                  ]
            },
            {
                  "id": "n5-0661",
                  "lexiconId": "jlpt-n5",
                  "japanese": "旅行",
                  "kana": "りょこう",
                  "meaning": "travel",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "ryokou"
                  ]
            },
            {
                  "id": "n5-0662",
                  "lexiconId": "jlpt-n5",
                  "japanese": "れい",
                  "kana": "れい",
                  "meaning": "zero",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "rei"
                  ]
            },
            {
                  "id": "n5-0663",
                  "lexiconId": "jlpt-n5",
                  "japanese": "冷蔵庫",
                  "kana": "れいぞうこ",
                  "meaning": "refrigerator",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "reizouko"
                  ]
            },
            {
                  "id": "n5-0664",
                  "lexiconId": "jlpt-n5",
                  "japanese": "レコード",
                  "kana": "レコード",
                  "meaning": "record",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "rekoodo"
                  ]
            },
            {
                  "id": "n5-0665",
                  "lexiconId": "jlpt-n5",
                  "japanese": "レストラン",
                  "kana": "レストラン",
                  "meaning": "restaurant",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "resutoran"
                  ]
            },
            {
                  "id": "n5-0666",
                  "lexiconId": "jlpt-n5",
                  "japanese": "練習",
                  "kana": "れんしゅう",
                  "meaning": "practice",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "renshuu"
                  ]
            },
            {
                  "id": "n5-0667",
                  "lexiconId": "jlpt-n5",
                  "japanese": "六",
                  "kana": "ろく",
                  "meaning": "six",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "roku"
                  ]
            },
            {
                  "id": "n5-0668",
                  "lexiconId": "jlpt-n5",
                  "japanese": "ワイシャツ",
                  "kana": "ワイシャツ",
                  "meaning": "white shirt",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "waishatsu"
                  ]
            },
            {
                  "id": "n5-0669",
                  "lexiconId": "jlpt-n5",
                  "japanese": "若い",
                  "kana": "わかい",
                  "meaning": "young",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "wakai"
                  ]
            },
            {
                  "id": "n5-0670",
                  "lexiconId": "jlpt-n5",
                  "japanese": "分かる",
                  "kana": "わかる",
                  "meaning": "to know, to understand",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "wakaru"
                  ]
            },
            {
                  "id": "n5-0671",
                  "lexiconId": "jlpt-n5",
                  "japanese": "忘れる",
                  "kana": "わすれる",
                  "meaning": "to forget",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "wasureru"
                  ]
            },
            {
                  "id": "n5-0672",
                  "lexiconId": "jlpt-n5",
                  "japanese": "私",
                  "kana": "わたし",
                  "meaning": "me, I",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "watashi"
                  ]
            },
            {
                  "id": "n5-0673",
                  "lexiconId": "jlpt-n5",
                  "japanese": "渡す",
                  "kana": "わたす",
                  "meaning": "to hand over",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "watasu"
                  ]
            },
            {
                  "id": "n5-0674",
                  "lexiconId": "jlpt-n5",
                  "japanese": "渡る",
                  "kana": "わたる",
                  "meaning": "to cross",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
                        "wataru"
                  ]
            },
            {
                  "id": "n5-0675",
                  "lexiconId": "jlpt-n5",
                  "japanese": "悪い",
                  "kana": "わるい",
                  "meaning": "bad",
                  "part": "词汇",
                  "level": "N5",
                  "example": "",
                  "translation": "",
                  "tags": [
                        "JLPT",
                        "N5",
                        "MIT数据",
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
