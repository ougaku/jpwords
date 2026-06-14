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
    id: "jlpt-n5-starter",
    title: "JLPT N5 基础词库",
    level: "N5",
    access: "free",
    version: 1,
    words: [
      {
        id: "n5-0001",
        lexiconId: "jlpt-n5-starter",
        japanese: "学校",
        kana: "がっこう",
        meaning: "学校",
        part: "名词",
        level: "N5",
        example: "毎朝、学校へ行きます。",
        translation: "每天早上去学校。",
        tags: ["基础", "场所"]
      },
      {
        id: "n5-0002",
        lexiconId: "jlpt-n5-starter",
        japanese: "水",
        kana: "みず",
        meaning: "水",
        part: "名词",
        level: "N5",
        example: "水を飲みます。",
        translation: "喝水。",
        tags: ["基础", "生活"]
      },
      {
        id: "n5-0003",
        lexiconId: "jlpt-n5-starter",
        japanese: "行く",
        kana: "いく",
        meaning: "去",
        part: "动词",
        level: "N5",
        example: "駅へ行きます。",
        translation: "去车站。",
        tags: ["基础", "移动"]
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
        meaning: "兼职，打工",
        part: "名词/する动词",
        level: "N4",
        example: "週末にアルバイトをしています。",
        translation: "周末在打工。",
        tags: ["外来语", "生活"]
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
        part: "名词/する动词",
        level: "N3",
        example: "ビザを申請しました。",
        translation: "申请了签证。",
        tags: ["商务", "手续"]
      }
    ]
  }
];

