const JpWords = (() => {
  const importedN5Words = window.JpWordsData?.n5Words || [];

  const statusLabels = {
    draft: "草稿",
    review: "待审核",
    published: "已发布",
    archived: "已下架",
  };

  const roles = {
    admin: {
      label: "超级管理员",
      permissions: ["内容编辑", "发布/下架", "会员维护", "运营配置", "词库管理", "只读查看"],
    },
    editor: {
      label: "内容编辑",
      permissions: ["内容编辑", "导入词库", "提交审核", "只读查看"],
    },
    support: {
      label: "客服运营",
      permissions: ["会员维护", "运营配置", "只读查看"],
    },
    viewer: {
      label: "只读查看员",
      permissions: ["只读查看"],
    },
  };

  const sampleWords = [
    {
      id: 2,
      japanese: "申請",
      kana: "しんせい",
      meaning: "申请",
      part: "名词・する动词",
      level: "N3",
      example: "ビザを申請しました。",
      translation: "申请了签证。",
      tags: ["商务", "手续"],
      status: "review",
      version: 1,
      access: "member",
    },
    {
      id: 3,
      japanese: "素早い",
      kana: "すばやい",
      meaning: "迅速的；敏捷的",
      part: "形容词",
      level: "N2",
      example: "素早い対応に感謝します。",
      translation: "感谢迅速处理。",
      tags: ["商务", "形容词"],
      status: "draft",
      version: 1,
      access: "member",
    },
    {
      id: 4,
      japanese: "アルバイト",
      kana: "あるばいと",
      meaning: "兼职；打工",
      part: "名词・する动词",
      level: "N4",
      example: "週末にアルバイトをしています。",
      translation: "周末在打工。",
      tags: ["日常", "生活"],
      status: "published",
      version: 1,
      access: "free",
    },
  ];

  const initialWords = [...importedN5Words, ...sampleWords];

  const initialState = {
    view: "dashboard",
    learnerView: "study",
    role: "admin",
    importSummary: importedN5Words.length ? `已导入 ${importedN5Words.length} 个 JLPT N5 单词。` : "等待导入词库。",
    currentReviewIndex: 0,
    reviewRevealed: false,
    learner: {
      name: "小明",
      dailyGoal: 10,
      streak: 12,
      mastered: 238,
      xp: 1480,
    },
    progress: {},
    chapterProgress: {},
    filters: {
      q: "",
      level: "all",
      status: "all",
      access: "all",
    },
    editingWordId: null,
    toast: "",
    words: initialWords,
    courses: [
      {
        id: 1,
        title: "JLPT N5 基础词库",
        category: "JLPT",
        chapters: 12,
        words: importedN5Words.length,
        status: "published",
        access: "free",
        featured: true,
        dailyGoal: 10,
      },
      {
        id: 2,
        title: "商务日语高频表达",
        category: "商务日语",
        chapters: 8,
        words: 420,
        status: "review",
        access: "member",
        featured: true,
        dailyGoal: 8,
      },
      {
        id: 3,
        title: "外来语专项突破",
        category: "外来语",
        chapters: 6,
        words: 260,
        status: "draft",
        access: "member",
        featured: false,
        dailyGoal: 12,
      },
    ],
    members: [
      { id: 1001, name: "王小明", email: "ming@example.com", plan: "免费", status: "active", registered: "2026-05-01", expires: "-", streak: 12, mastered: 238 },
      { id: 1002, name: "Lina Chen", email: "lina@example.com", plan: "月度会员", status: "subscribed", registered: "2026-04-18", expires: "2026-07-18", streak: 28, mastered: 612 },
      { id: 1003, name: "佐藤美咲", email: "misaki@example.com", plan: "年度会员", status: "subscribed", registered: "2026-02-09", expires: "2027-02-09", streak: 44, mastered: 1030 },
      { id: 1004, name: "客服测试账号", email: "support@example.com", plan: "月度会员", status: "frozen", registered: "2026-05-20", expires: "2026-06-20", streak: 3, mastered: 91 },
    ],
    entitlements: [
      { key: "高级词库", enabled: true },
      { key: "学习统计", enabled: true },
      { key: "离线强化", enabled: true },
      { key: "例句音频", enabled: false },
      { key: "AI助教", enabled: false },
    ],
    operations: {
      dailyNewWords: 10,
      freeLevels: "N5,N4",
      memberContent: "商务日语,N3,N2,N1,外来语专项",
      announcement: "N5 基础词库已导入，免费版可直接学习。",
      banner: "单机版 App 原型持续更新中",
    },
  };

  const storageKey = "jpwords.prototype.state";

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function mergeById(baseItems, savedItems, options = {}) {
    const map = new Map();
    baseItems.forEach((item) => map.set(item.id, clone(item)));
    (savedItems || []).forEach((item) => {
      const base = map.get(item.id);
      map.set(item.id, base ? { ...base, ...item } : item);
    });
    (options.forceBaseFields || []).forEach((field) => {
      baseItems.forEach((item) => {
        if (!map.has(item.id)) return;
        map.get(item.id)[field] = item[field];
      });
    });
    return Array.from(map.values());
  }

  function loadState() {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) return clone(initialState);

      const parsed = JSON.parse(saved);
      const base = clone(initialState);
      const savedWords = (parsed.words || []).filter((word) => ![1, 2, 3, 4].includes(Number(word.id)));
      const merged = { ...base, ...parsed };
      const mergedWords = mergeById(base.words, savedWords, {
        forceBaseFields: [
          "japanese",
          "kana",
          "meaning",
          "meaningEn",
          "part",
          "level",
          "example",
          "translation",
          "exampleSource",
          "translationSource",
          "tags",
          "status",
          "version",
          "access",
        ],
      });
      merged.words = mergedWords.map((word) => ({
        ...word,
        part: String(word.part || "名词").trim() || "名词",
        tags: Array.isArray(word.tags) ? word.tags : [],
      }));
      merged.courses = mergeById(base.courses, parsed.courses, { forceBaseFields: ["title", "words"] });
      merged.progress = parsed.progress || base.progress;
      merged.chapterProgress = parsed.chapterProgress || base.chapterProgress;
      merged.importSummary = base.importSummary;
      return merged;
    } catch {
      return clone(initialState);
    }
  }

  function saveState(state) {
    const next = clone(state);
    next.toast = "";
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[char]));
  }

  function stat(label, value) {
    return `<div class="stat"><div class="stat-label">${label}</div><div class="stat-value">${value}</div></div>`;
  }

  function select(name, options, value, labels = {}, disabled = false) {
    return `<select class="select" name="${name}" id="${name}" ${disabled ? "disabled" : ""}>${options.map((option) => `<option value="${option}" ${value === option ? "selected" : ""}>${labels[option] || option}</option>`).join("")}</select>`;
  }

  function field(name, label, value = "", type = "text") {
    return `<div class="field"><label>${label}</label><input class="input" type="${type}" name="${name}" value="${escapeHtml(String(value))}"></div>`;
  }

  function defaultProgress() {
    return { box: 0, due: true, correct: 0, wrong: 0, lastResult: "" };
  }

  return {
    statusLabels,
    roles,
    loadState,
    saveState,
    escapeHtml,
    stat,
    select,
    field,
    defaultProgress,
  };
})();
