const { statusLabels, loadState, saveState, escapeHtml, stat, defaultProgress } = JpWords;
const app = document.querySelector("#app");
const params = new URLSearchParams(window.location.search);
const layout = params.get("layout") === "phone" ? "phone" : "desktop";
const state = loadState();
let autoplayTimer = null;
let autoplayCountdownTimer = null;
let autoplayRevealTimer = null;
let challengeTimer = null;
let tapReadTimers = [];
let autoSpeakLastKey = "";
let shouldPersistInitialState = false;
const AUTOPLAY_REVEAL_DELAY = 1000;
const TAPREAD_DOUBLE_TAP_GUARD_MS = 90;
const VOCAB_BOOK_BUNDLE_SIZE = 30;
const FAVORITE_DEFAULT_COLLECTION_ID = "today";
const FAVORITE_MAX_CUSTOM_COLLECTIONS = 3;
const FAVORITE_SELF_BUILT_PREFIX = "collection";
const LEARNER_DAILY_RECORDS_LIMIT = 30;
let pressFeedbackBound = false;

state.learnerView = state.learnerView === "library" ? "study" : state.learnerView || "study";
state.studyMode = state.studyMode === "review" ? "challenge" : state.studyMode || "challenge";
state.vocabBook = state.vocabBook || {};
state.vocabBookBundles = state.vocabBookBundles && typeof state.vocabBookBundles === "object" ? state.vocabBookBundles : {};
state.vocabBookBundleMenuId = state.vocabBookBundleMenuId || "";
state.favoriteBook = state.favoriteBook || {};
state.favoriteCollections = Array.isArray(state.favoriteCollections) ? state.favoriteCollections : [];
state.favoriteSessionCollectionId = state.favoriteSessionCollectionId || "";
state.favoriteListCollectionId = state.favoriteListCollectionId || FAVORITE_DEFAULT_COLLECTION_ID;
state.favoriteMoveWordId = state.favoriteMoveWordId || 0;
state.favoriteCollectionMenuId = state.favoriteCollectionMenuId || "";
state.favoriteCreateMenuOpen = Boolean(state.favoriteCreateMenuOpen);
state.favoriteSessionPickerOpen = Boolean(state.favoriteSessionPickerOpen);
state.favoriteWordFormCollectionId = state.favoriteWordFormCollectionId || FAVORITE_DEFAULT_COLLECTION_ID;
state.favoriteWordFormMode = state.favoriteWordFormMode || "create";
state.favoriteWordFormWordId = Number(state.favoriteWordFormWordId || 0);
state.favoriteWordForm = state.favoriteWordForm && typeof state.favoriteWordForm === "object" ? state.favoriteWordForm : defaultFavoriteWordForm();
state.autoplayIndex = state.autoplayIndex || 0;
state.autoplayPlaying = state.autoplayPlaying || false;
state.autoplaySpeed = state.autoplaySpeed || 5000;
state.autoplayNextAt = state.autoplayNextAt || 0;
state.autoplayCountdown = state.autoplayCountdown || Math.ceil(state.autoplaySpeed / 1000);
state.autoplayOrder = state.autoplayOrder || "sequential";
state.autoplayAutoNextChapter = state.autoplayAutoNextChapter || false;
state.autoplayWordIds = state.autoplayWordIds || [];
state.autoplayOrderKey = state.autoplayOrderKey || "";
state.autoplayDelayReveal = state.autoplayDelayReveal || false;
state.autoplayRevealAt = state.autoplayRevealAt || 0;
state.autoplayAutoSpeak = state.autoplayAutoSpeak || false;
state.isPaid = state.isPaid || false;
state.activeCourseId = state.activeCourseId || 1;
state.activeChapterId = state.activeChapterId || "";
state.vocabBookSessionBundleId = state.vocabBookSessionBundleId || "";
state.vocabBookSessionPickerOpen = Boolean(state.vocabBookSessionPickerOpen);
state.chapterPickerCourseId = state.chapterPickerCourseId || null;
state.inStudySession = state.inStudySession || false;
state.vocabBookListBundleId = state.vocabBookListBundleId || "";
state.challengeInput = state.challengeInput || "";
state.challengeRetryInput = state.challengeRetryInput || "";
state.challengeRetryTyping = state.challengeRetryTyping || false;
state.challengeResult = state.challengeResult || "";
state.challengeRevealAttempt = state.challengeRevealAttempt || false;
state.challengeAutoSpeak = state.challengeAutoSpeak || false;
state.challengeLives = state.challengeLives ?? 5;
state.challengeIndex = state.challengeIndex || 0;
state.challengeCorrect = state.challengeCorrect || 0;
state.challengeWrong = state.challengeWrong || 0;
state.challengeStartedAt = state.challengeStartedAt || 0;
state.challengeEndedAt = state.challengeEndedAt || 0;
state.challengeStatus = state.challengeStatus || "active";
state.challengeWordIds = state.challengeWordIds || [];
state.challengeSeed = state.challengeSeed || randomChallengeSeed();
state.challengeOrder = state.challengeOrder || "sequential";
state.challengeOrderKey = state.challengeOrderKey || "";
state.chapterProgress = state.chapterProgress || {};
state.learner = state.learner || {};
state.learner.lastActiveDate = typeof state.learner.lastActiveDate === "string" ? state.learner.lastActiveDate : "";
state.learner.streak = Number(state.learner.streak) || 0;
state.learner.mastered = Number(state.learner.mastered) || 0;
state.learner.dailyRecords = state.learner.dailyRecords && typeof state.learner.dailyRecords === "object" ? state.learner.dailyRecords : {};
state.learner.todayReviewed = Number(state.learner.todayReviewed) || 0;
state.tapReadIndex = state.tapReadIndex || 0;
state.tapReadInput = state.tapReadInput || "";
state.tapReadStep = state.tapReadStep || 0;
state.tapReadClearedKeys = state.tapReadClearedKeys || [];
state.tapReadWrongKey = state.tapReadWrongKey ?? null;
state.tapReadCurrentWordWrong = Boolean(state.tapReadCurrentWordWrong);
state.tapReadCorrect = Number(state.tapReadCorrect) || 0;
state.tapReadTotal = Number(state.tapReadTotal) || 0;
state.tapReadLastTapAt = state.tapReadLastTapAt || 0;
state.tapReadOrder = state.tapReadOrder || "sequential";
state.tapReadWordIds = state.tapReadWordIds || [];
state.tapReadOrderKey = state.tapReadOrderKey || "";
state.tapReadAutoSpeak = state.tapReadAutoSpeak || false;
state.tapReadCompletedAt = state.tapReadCompletedAt || 0;
if ((state.autoSpeakDefaultsVersion || 0) < 1) {
  state.autoplayAutoSpeak = false;
  state.tapReadAutoSpeak = false;
  state.challengeAutoSpeak = false;
  state.autoSpeakDefaultsVersion = 1;
  shouldPersistInitialState = true;
}
if (state.studyMode === "challenge" && !state.challengeStartedAt) {
  state.challengeStartedAt = Date.now();
  state.challengeWordIds = dueWords().map((word) => word.id);
}
if (ensureVocabBundleAssignments()) shouldPersistInitialState = true;
if (shouldPersistInitialState) saveState(state);

function getScrollState() {
  const content = document.querySelector(".content");
  return {
    window: {
      x: window.scrollX,
      y: window.scrollY,
    },
    contentScrollTop: content ? content.scrollTop : null,
  };
}

function restoreScrollState(scrollState = {}) {
  const content = document.querySelector(".content");
  if (content && Number.isFinite(scrollState.contentScrollTop)) content.scrollTop = scrollState.contentScrollTop;
  if (
    scrollState.window &&
    Number.isFinite(scrollState.window.x) &&
    Number.isFinite(scrollState.window.y)
  ) {
    window.scrollTo(scrollState.window.x, scrollState.window.y);
  }
}

function render() {
  const scrollState = getScrollState();
  if (layout === "phone") return renderAppShell();
  app.innerHTML = `
    <div class="shell learner-shell">
      ${renderLearnerSidebar()}
      <main class="main">
        ${renderLearnerTopbar()}
        <section class="content">${renderLearnerView()}</section>
      </main>
    </div>
    <div class="toast ${state.toast ? "show" : ""}">${state.toast}</div>
  `;
  bindEvents();
  syncAutoplayTimer();
  syncAutoSpeak();
  restoreScrollState(scrollState);
}

function renderAppShell() {
  const scrollState = getScrollState();
  app.innerHTML = `
    <div class="app-page">
      <div class="phone">
        <div class="status"></div>
        <header class="header">
          <div class="brand">
            <div class="mark">日</div>
            <div>
              <div class="title">JpWords</div>
              <div class="subtitle">学习词库 App 原型</div>
            </div>
          </div>
          <button class="pill ${state.isPaid ? "active" : ""}" data-action="toggle-paid">${state.isPaid ? withButtonIcon("付费版", "💎") : withButtonIcon("免费版", "🆓")}</button>
        </header>
        <main class="screen">
          ${renderLearnerView()}
        </main>
        <nav class="tabs">
          ${appTab("study", "今日学习", "📚")}
          ${appTab("mistakes", "生词本", "📝")}
          ${appTab("favorites", "收藏本", "⭐")}
          ${appTab("stats", "统计", "📊")}
        </nav>
      </div>
    </div>
    <div class="toast ${state.toast ? "show" : ""}">${state.toast}</div>
  `;
  bindEvents();
  syncAutoplayTimer();
  syncAutoSpeak();
  restoreScrollState(scrollState);
}

function appTab(id, label, icon) {
  return `<button class="tab ${state.learnerView === id ? "active" : ""}" data-learner-view="${id}">${withButtonIcon(label, icon || "•")}</button>`;
}

function renderLearnerSidebar() {
  const items = [
    ["study", "今日学习", "📚"],
    ["mistakes", "生词本", "📝"],
    ["favorites", "收藏本", "⭐"],
    ["stats", "统计", "📊"],
  ];
  return `
    <aside class="sidebar learner-sidebar">
      <div class="brand">
        <img class="brand-mark brand-mark-img" src="./mobile/assets/icon.png" alt="JpWords" />
        <div>
          <div class="brand-title">JpWords</div>
          <div class="brand-subtitle">JpWords App</div>
        </div>
      </div>
      <nav class="nav">
        ${items.map(([id, label, icon]) => `<button data-learner-view="${id}" class="${state.learnerView === id ? "active" : ""}"><span class="nav-icon">${icon}</span>${label}</button>`).join("")}
      </nav>
      <div class="sidebar-footer">
        <div class="muted">今日目标</div>
        <div class="goal-ring">${todayCompleted()}/${state.learner.dailyGoal}</div>
        <a class="btn primary link-btn" href="./admin.html">进入后台</a>
      </div>
    </aside>
  `;
}

function renderLearnerTopbar() {
  const titles = {
    study: ["今日学习", "通过词库与课程开始学习，持续打卡进步"],
    mistakes: ["生词本", "复盘生词，查缺补漏"],
    favorites: ["收藏本", "管理收藏本，支持三种学习模式"],
    "favorite-word-form": ["新词", "录入并补全收藏本中的自建词条"],
    stats: ["统计", "查看进度、连续打卡与学习数据"],
  };
  const [title, subtitle] = titles[state.learnerView] || titles.study;
  const subtitleClass = ["favorites", "favorite-word-form"].includes(state.learnerView) ? "page-subtitle favorite-note" : "page-subtitle";
  return `
    <header class="topbar">
      <div>
        <h1 class="page-title">${title}</h1>
        <p class="${subtitleClass}">${subtitle}</p>
      </div>
        <div class="top-actions">
          <span class="badge published">连续 ${state.learner.streak} 天</span>
          <span class="badge member">${state.learner.xp} XP</span>
          <button class="btn" data-action="toggle-paid">${state.isPaid ? withButtonIcon("付费版", "💎") : withButtonIcon("免费版", "🆓")}</button>
        <a class="btn link-btn" href="./admin.html">后台管理</a>
      </div>
    </header>
  `;
}

function renderLearnerView() {
  if (state.learnerView === "mistakes") return renderMistakes();
  if (state.learnerView === "favorites") return renderFavorites();
  if (state.learnerView === "favorite-word-form") return renderFavoriteWordForm();
  if (state.learnerView === "stats") return renderLearnerStats();
  return renderStudy();
}

function renderStudy() {
  if (!state.inStudySession) {
    return `
      ${renderTodayCourses()}
      ${renderChapterPickerModal()}
    `;
  }
  const challengeSummary = state.studyMode === "challenge" && state.challengeStatus !== "active" && state.challengeStartedAt && challengeWords().length
    ? renderChallengeSummaryModal(challengeWords().length)
    : "";
  const tapReadSummary = state.studyMode === "tapread" && state.tapReadCompletedAt
    ? renderTapReadSummaryModal()
    : "";
  return `
    ${renderStudySessionHeader()}
      <div class="study-mode-bar panel">
      <div class="segmented">
        <button class="${state.studyMode === "autoplay" ? "active" : ""}" data-action="study-mode" data-mode-value="autoplay">${withButtonIcon("自动播放", "▶")}</button>
        <button class="${state.studyMode === "tapread" ? "active" : ""}" data-action="study-mode" data-mode-value="tapread">${withButtonIcon("点读记忆", "🖱")}</button>
        <button class="${state.studyMode === "challenge" ? "active" : ""}" data-action="study-mode" data-mode-value="challenge">${withButtonIcon("假名挑战", "🧠")}</button>
      </div>
    </div>
    ${state.studyMode === "autoplay" ? renderAutoplayStudy() : state.studyMode === "tapread" ? renderTapReadMemory() : renderKanaChallenge()}
    ${tapReadSummary}
    ${challengeSummary}
    ${renderChapterPickerModal()}
    ${renderFavoriteSessionPickerModal()}
    ${renderVocabBookSessionPickerModal()}
  `;
}

function renderStudySessionHeader() {
  const sessionWords = state.studyMode === "autoplay" ? autoplayWords() : studyWords();
  const exampleSource = sessionWords.find((word) => word && word.exampleSource)?.exampleSource;
  const sentenceSourceLabel = exampleSource === "tatoeba" ? "Tatoeba CC BY 2.0 FR" : "";
  const hasSentenceSource = !!exampleSource;

  if (isFavoriteSession()) {
    const collection = getFavoriteCollection(state.favoriteSessionCollectionId);
    const count = getFavoriteCollectionCount(collection?.id);
    return `
      <div class="panel session-header">
        <div>
          <div class="session-title-row">
            <div class="panel-title">收藏本</div>
            <span class="badge review">${count} 词</span>
          </div>
          <div class="session-note">${escapeHtml(collection?.name || "收藏本")}</div>
          ${hasSentenceSource ? `<div class="muted source-note">Source: ${escapeHtml(sentenceSourceLabel)} / TTS</div>` : ""}
        </div>
        <button class="btn" data-action="open-favorite-session-picker">${withButtonIcon("切换章节", "📖")}</button>
      </div>
    `;
  }

  if (isVocabBookSession()) {
    const bundle = getVocabBookBundle(state.vocabBookSessionBundleId);
    const total = bundle ? bundle.totalCount : 0;
    const pending = bundle ? bundle.pendingCount : 0;
    const remembered = Math.max(0, total - pending);
    return `
      <div class="panel session-header">
        <div>
          <div class="session-title-row">
            <div class="panel-title">生词本</div>
            <span class="badge review">已掌握 ${remembered}/${total}</span>
          </div>
          <div class="session-note">${escapeHtml(bundle?.label || "当前无生词本记录")}</div>
          ${hasSentenceSource ? `<div class="muted source-note">Source: ${escapeHtml(sentenceSourceLabel)} / TTS</div>` : ""}
        </div>
        <button class="btn" data-action="open-vocab-book-session-picker">${withButtonIcon("切换章节", "📖")}</button>
      </div>
    `;
  }

  const course = state.courses.find((item) => item.id === state.activeCourseId);
  const chapter = activeChapter();
  return `
    <div class="panel session-header">
      <div>
        <div class="session-title-row">
          <div class="panel-title">${course?.title || "课程"}</div>
          <span class="badge ${course?.access === "member" ? "member" : "published"}">${course?.access === "member" ? "会员" : "公开"}</span>
        </div>
        <div class="session-note">${chapter ? `${chapter.label} / ${chapter.count} 词` : ""}</div>
        ${hasSentenceSource ? `<div class="muted source-note">Source: ${escapeHtml(sentenceSourceLabel)} / TTS</div>` : ""}
      </div>
      <button class="btn" data-action="open-current-chapter-picker">${withButtonIcon("切换章节", "📖")}</button>
    </div>
  `;
}

function renderTtsButton(text) {
  return `
    <button class="btn tts-button" data-speak="${escapeHtml(text)}" aria-label="播放读音" title="播放读音">
      <svg class="tts-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 9v6h4l5 4V5L8 9H4Z"></path>
        <path d="M16 8.5a5 5 0 0 1 0 7"></path>
        <path d="M18.5 6a8 8 0 0 1 0 12"></path>
      </svg>
    </button>
  `;
}

function withButtonIcon(label, icon) {
  return `<span class="btn-icon" aria-hidden="true">${icon}</span><span>${label}</span>`;
}

function favoriteCollectionIcon(collectionId) {
  return collectionId === FAVORITE_DEFAULT_COLLECTION_ID ? "⭐" : "📚";
}

function eyeIconSvg() {
  return `
    <svg class="icon-svg view-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `;
}

function moveIconSvg() {
  return `
    <svg class="icon-svg move-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 12h14"></path>
      <path d="M13 6l6 6-6 6"></path>
    </svg>
  `;
}

function trashIconSvg() {
  return `
    <svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 6h18"></path>
      <path d="M8 6V4h8v2"></path>
      <path d="M6 6l1 15h10l1-15"></path>
      <path d="M10 11v6"></path>
      <path d="M14 11v6"></path>
    </svg>
  `;
}

function renderFavoriteButton(wordId, extraClass = "") {
  const active = !!getFavoriteEntry(wordId);
  return `<button class="btn favorite-button ${extraClass} ${active ? "active" : ""}" data-action="favorite-word" data-word="${wordId}" aria-label="收藏" title="收藏">${withButtonIcon("收藏", active ? "★" : "☆")}</button>`;
}

function renderMeaningWithPart(meaning, part) {
  const text = escapeHtml(meaning || "");
  const tag = part ? `<span class="meaning-part-tag">${escapeHtml(part)}</span>` : "";
  return `${text}${tag}`;
}

function normalizeFavoriteCollectionId(raw) {
  const candidate = String(raw || "").trim();
  const normalizedCollections = getFavoriteCollections();
  return normalizedCollections.some((item) => item.id === candidate) ? candidate : FAVORITE_DEFAULT_COLLECTION_ID;
}

function normalizeFavoriteEntry(raw, fallbackWordId = null) {
  if (!raw) return null;
  if (raw === true) return { addedAt: Date.now(), collectionId: FAVORITE_DEFAULT_COLLECTION_ID, createdByUser: false, favoriteCount: 1 };
  if (typeof raw === "number") return { addedAt: Number(raw) || Date.now(), collectionId: FAVORITE_DEFAULT_COLLECTION_ID, createdByUser: false, favoriteCount: 1 };
  if (typeof raw !== "object") return null;
  return {
    addedAt: Number(raw.addedAt || 0) || Date.now(),
    collectionId: normalizeFavoriteCollectionId(raw.collectionId || FAVORITE_DEFAULT_COLLECTION_ID),
    createdByUser: Boolean(raw.createdByUser),
    favoriteCount: Math.max(1, Number(raw.favoriteCount || raw.count || 1)),
  };
}

function getFavoriteEntry(wordId) {
  const raw = state.favoriteBook?.[wordId];
  return normalizeFavoriteEntry(raw, wordId);
}

function getFavoriteWordCollectionId(wordId) {
  const entry = getFavoriteEntry(wordId);
  return entry?.collectionId || FAVORITE_DEFAULT_COLLECTION_ID;
}

function getFavoriteCollections() {
  const collections = Array.isArray(state.favoriteCollections) ? state.favoriteCollections : [];
  const normalized = [];
  const used = new Set();
  collections.forEach((item) => {
    if (!item || typeof item !== "object") return;
    const id = String(item.id || "").trim();
    if (!id || used.has(id)) return;
    if (id !== FAVORITE_DEFAULT_COLLECTION_ID && !/^collection-/.test(id)) return;
    used.add(id);
    normalized.push({
      id,
      name: String(item.name || "").trim() || "收藏本",
      createdAt: Number(item.createdAt || 0) || Date.now(),
      editable: id === FAVORITE_DEFAULT_COLLECTION_ID ? false : true,
    });
  });
  if (!normalized.some((item) => item.id === FAVORITE_DEFAULT_COLLECTION_ID)) {
    normalized.unshift({
      id: FAVORITE_DEFAULT_COLLECTION_ID,
      name: "最新收藏",
      editable: false,
    });
  }
  const todayItem = normalized.find((item) => item.id === FAVORITE_DEFAULT_COLLECTION_ID);
  const customItems = normalized.filter((item) => item.id !== FAVORITE_DEFAULT_COLLECTION_ID);
  const keptCustomItems = customItems
    .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0))
    .slice(0, FAVORITE_MAX_CUSTOM_COLLECTIONS);
  keptCustomItems.forEach((item) => {
    item.editable = true;
  });
  todayItem.editable = false;
  todayItem.name = "最新收藏";
  return [todayItem, ...keptCustomItems];
}

function getFavoriteCollection(collectionId) {
  const raw = String(collectionId || FAVORITE_DEFAULT_COLLECTION_ID).trim() || FAVORITE_DEFAULT_COLLECTION_ID;
  return getFavoriteCollections().find((item) => item.id === raw) || getFavoriteCollections()[0];
}

function getFavoriteCollectionWords(collectionId, options = {}) {
  const target = getFavoriteCollection(collectionId);
  const includeRemembered = options.includeRemembered || false;
  const byWordId = new Map(state.words.map((word) => [word.id, word]));
  return Object.entries(state.favoriteBook || {})
    .map(([id, raw]) => {
      const entry = normalizeFavoriteEntry(raw);
      if (!entry || entry.collectionId !== target.id) return null;
      const word = byWordId.get(Number(id));
      if (!word || !word.status || (word.status !== "published")) return null;
      if (!state.isPaid && word.access !== "free") return null;
      if (!includeRemembered && state.progress[id]?.lastResult === "remembered") return null;
      return word;
    })
    .filter(Boolean)
    .sort((left, right) => Number(normalizeFavoriteEntry(state.favoriteBook?.[right.id], right.id)?.addedAt || 0) - Number(normalizeFavoriteEntry(state.favoriteBook?.[left.id], left.id)?.addedAt || 0));
}

function getFavoriteCollectionCount(collectionId) {
  const target = getFavoriteCollection(collectionId);
  return Object.entries(state.favoriteBook || {}).filter(([, raw]) => {
    const entry = normalizeFavoriteEntry(raw);
    return entry && entry.collectionId === target.id;
  }).length;
}

function getFavoriteCollectionStats() {
  const collections = getFavoriteCollections();
  return collections.map((collection) => {
    const rows = Object.entries(state.favoriteBook || {})
      .map(([wordId, raw]) => {
        const entry = normalizeFavoriteEntry(raw);
        if (!entry || entry.collectionId !== collection.id) return null;
        const id = Number(wordId);
        const word = state.words.find((item) => item.id === id);
        if (!word) return null;
        return { wordId: id, word, entry };
      })
      .filter(Boolean)
      .sort((a, b) => Number(b.entry.addedAt || 0) - Number(a.entry.addedAt || 0));
    const latestAt = rows.length ? Number(rows[0].entry.addedAt || 0) : 0;
    return {
      ...collection,
      words: rows.map((row) => row.word),
      wordCount: rows.length,
      latestAt,
      latestLabel: formatDateYMD(latestAt),
    };
  });
}

function getFavoriteSelectedCollectionId() {
  const candidate = String(state.favoriteListCollectionId || "").trim() || FAVORITE_DEFAULT_COLLECTION_ID;
  const collection = getFavoriteCollection(candidate);
  return collection?.id || FAVORITE_DEFAULT_COLLECTION_ID;
}

function setFavoriteSelectedCollectionId(collectionId) {
  state.favoriteListCollectionId = getFavoriteCollection(collectionId).id;
}

function ensureFavoriteDefaults() {
  const normalized = getFavoriteCollections();
  state.favoriteCollections = normalized;
  if (!state.favoriteListCollectionId || !getFavoriteCollection(state.favoriteListCollectionId)) {
    state.favoriteListCollectionId = FAVORITE_DEFAULT_COLLECTION_ID;
  }
  if (!state.favoriteBook) state.favoriteBook = {};
  if (!state.favoriteSessionCollectionId) {
    state.favoriteSessionCollectionId = "";
  }
}

function isFavoriteSession() {
  return Boolean(state.favoriteSessionCollectionId);
}

function studyScopeLabel(chapter = activeChapter()) {
  if (isFavoriteSession()) return getFavoriteCollection(state.favoriteSessionCollectionId).name;
  if (isVocabBookSession()) return getVocabBookBundle(state.vocabBookSessionBundleId)?.label || "生词本";
  return chapter ? chapter.label : "";
}

function renderAutoplayStudy() {
  const queue = autoplayWords();
  const current = queue[state.autoplayIndex % Math.max(queue.length, 1)];
  if (!current) return renderStudyEmpty("自动播放暂无可学习词", "请先在主页选择课程后再开始，或先收藏并学习收藏本。");
  const progress = state.progress[current.id] || defaultProgress();
  const completed = queue.length ? (state.autoplayIndex % queue.length) + 1 : 0;
  const total = queue.length;
  const autoplayProgress = total ? Math.round((completed / total) * 100) : 0;
  const chapter = activeChapter();
  const scopeLabel = studyScopeLabel(chapter);
  const playLabel = state.autoplayPlaying ? `${remainingAutoplaySeconds()}` : "开始";
  const answerVisible = isAutoplayAnswerVisible();
  const autoplayMeaningText = (current.meaning || current.meaningEn || "").trim();
  return `
    <div class="study-layout">
      <div class="study-card panel">
        <div class="study-card-top">
          <span class="muted">${scopeLabel ? `${escapeHtml(scopeLabel)} · ` : ""}${current.level}</span>
          ${renderTtsButton(current.japanese)}
        </div>
        <div class="study-word-wrap">
          <div class="study-word">${current.japanese}</div>
        </div>
        <div class="study-kana fade-piece fade-kana ${answerVisible ? "" : "autoplay-hidden-content"}">${answerVisible ? current.kana : "&nbsp;"}</div>
        <div class="answer-panel revealed autoplay-answer">
          <div class="autoplay-progress-line">${completed}/${total}</div>
          <div class="meaning fade-piece fade-meaning ${answerVisible ? "" : "autoplay-hidden-content"}">${renderMeaningWithPart(autoplayMeaningText || current.meaning, current.part)}</div>
          <div class="fade-piece fade-example ${answerVisible ? "" : "autoplay-hidden-content"}"><div class="example">${current.example}</div><div class="muted">${current.translation}</div></div>
        </div>
        <div class="inline-progress">
          <div class="progress progress-inline"><span style="width:${Math.min(100, autoplayProgress)}%"></span></div>
        </div>
        <div class="study-actions autoplay-actions">
          <button class="btn danger" data-review="wrong" data-word="${current.id}">${withButtonIcon("没记住", "↺")}</button>
          ${renderFavoriteButton(current.id)}
          <button class="btn" data-review="hard" data-word="${current.id}">${withButtonIcon("模糊", "◑")}</button>
          <button class="btn autoplay-nav-btn" data-action="autoplay-prev" aria-label="上一词" title="上一词"><span class="btn-icon" aria-hidden="true">‹</span></button>
          <button class="btn autoplay-play-btn" data-action="autoplay-toggle" aria-label="${state.autoplayPlaying ? "暂停" : "播放"}" title="${state.autoplayPlaying ? "暂停" : "播放"}"><span class="btn-icon" aria-hidden="true">${state.autoplayPlaying ? "⏸" : "▶"}</span></button>
          <button class="btn autoplay-nav-btn" data-action="autoplay-next" aria-label="下一词" title="下一词"><span class="btn-icon" aria-hidden="true">›</span></button>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-title">自动播放设置</div></div>
        <div class="panel-body stack">
          <div class="speed-row">
            ${[3000, 5000, 8000].map((speed) => `<button class="btn ${state.autoplaySpeed === speed ? "primary" : ""}" data-action="autoplay-speed" data-speed="${speed}">${speed / 1000}秒</button>`).join("")}
          </div>
          <div class="setting-group">
            <div class="setting-label">播放顺序</div>
            <div class="speed-row">
              <button class="btn ${state.autoplayOrder === "sequential" ? "primary" : ""}" data-action="autoplay-order" data-order="sequential">顺序</button>
              <button class="btn ${state.autoplayOrder === "random" ? "primary" : ""}" data-action="autoplay-order" data-order="random">随机</button>
            </div>
          </div>
          <label class="check-line">
            <input type="checkbox" data-action="toggle-autoplay-next-chapter" ${state.autoplayAutoNextChapter ? "checked" : ""}>
            <span>播放完后自动切换到下一章</span>
          </label>
          <label class="check-line">
            <input type="checkbox" data-action="toggle-autoplay-delay" ${state.autoplayDelayReveal ? "checked" : ""}>
            <span>延迟显示假名读音和例句</span>
          </label>
          <label class="check-line">
            <input type="checkbox" data-action="toggle-autoplay-speak" ${state.autoplayAutoSpeak ? "checked" : ""}>
            <span>自动播放读音</span>
          </label>
          <div class="notice">自动播放只用于浏览；点击“没记住 / 模糊”会记录到生词本并更新SRS，点击“›”只进入下一词。</div>
        </div>
      </div>
    </div>
  `;
}

function renderTapReadMemory() {
  const queue = tapReadWords();
  const current = queue[state.tapReadIndex % Math.max(queue.length, 1)];
  if (!current) return renderStudyEmpty("点读记忆暂无可学习词", "当前词库中没有可学习词，先返回主页收藏或添加词条。");
  if (state.tapReadCompletedAt) return "";
  const chapter = activeChapter();
  const scopeLabel = studyScopeLabel(chapter);
  const chars = Array.from(current.kana || "");
  const cleared = new Set(state.tapReadClearedKeys || []);
  const meaningText = (current.meaning || current.meaningEn || "").trim();
  const tapReadProgress = queue.length ? Math.round(((state.tapReadIndex + 1) / queue.length) * 100) : 0;
  return `
    <div class="study-layout tapread-layout">
      <div class="study-card panel challenge-card tapread-card">
        <div class="study-card-top">
          <span class="muted">${scopeLabel ? `${escapeHtml(scopeLabel)} · ` : ""}${current.level}</span>
          ${renderTtsButton(current.japanese)}
        </div>
        <div class="study-word-wrap">
          <div class="study-word">${current.japanese}</div>
        </div>
        <div class="study-kana">${current.kana}</div>
        <div class="answer-panel revealed challenge-answer">
          <div class="autoplay-progress-line">${state.tapReadIndex + 1}/${queue.length}</div>
          <div class="meaning">${renderMeaningWithPart(meaningText, current.part)}</div>
          <div class="fade-example"><div class="example">${current.example}</div><div class="muted">${current.translation}</div></div>
        </div>
        <div class="inline-progress">
          <div class="progress progress-inline"><span style="width:${Math.min(100, tapReadProgress)}%"></span></div>
        </div>
        <div class="challenge-input tapread-input">
          <span class="challenge-input-text tapread-prompt">${renderTapReadPrompt(chars)}</span>
        </div>
        <div class="kana-pad tapread-pad">
          ${chars.map((kana, index) => `<button class="kana-key tapread-key ${cleared.has(index) ? "cleared" : ""} ${state.tapReadWrongKey === index ? "wrong" : ""}" data-tapread-index="${index}" data-tapread-kana="${escapeHtml(kana)}">${escapeHtml(kana)}</button>`).join("")}
          ${renderFavoriteButton(current.id, "kana-key tapread-favorite-key")}
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-title">点读设置</div></div>
        <div class="panel-body stack">
          <div class="setting-label">点读顺序</div>
          <div class="speed-row">
            <button class="btn ${state.tapReadOrder === "sequential" ? "primary" : ""}" data-action="tapread-order" data-order="sequential">顺序</button>
            <button class="btn ${state.tapReadOrder === "random" ? "primary" : ""}" data-action="tapread-order" data-order="random">随机</button>
          </div>
          <label class="check-line">
            <input type="checkbox" data-action="toggle-tapread-speak" ${state.tapReadAutoSpeak ? "checked" : ""}>
            <span>自动播放读音</span>
          </label>
          <div class="notice">按照提示顺序点读假名，点对后按钮立即消失。</div>
          <button class="btn" data-action="restart-tapread">${withButtonIcon("重新点读", "↺")}</button>
        </div>
      </div>
    </div>
  `;
}

function renderTapReadPrompt(chars) {
  return chars.map((char, index) => {
    const status = index < state.tapReadStep ? "done" : index === state.tapReadStep ? "current" : "pending";
    return `<span class="tapread-prompt-char ${status}">${escapeHtml(char)}</span>`;
  }).join("");
}

function renderKanaChallenge() {
  const queue = challengeWords();
  if (!queue.length) return renderStudyEmpty("假名挑战暂无可学习词", "请先在课程/收藏本中配置可学习词后再开始挑战。");
  if (!state.challengeStartedAt || state.challengeStatus !== "active") {
    return "";
  }
  const current = queue[state.challengeIndex % Math.max(queue.length, 1)];
  if (!current) return "";
  const choices = buildKanaChoices(current.kana, current.japanese);
  const isWrongRetrying = state.challengeResult === "wrong" && state.challengeRetryTyping;
  const mixedKanaWord = isKanaMixedWord(current.japanese);
  const kanaOnlyWord = isKanaOnlyWord(current.japanese);
  const visibleKanaHint = new Set(Array.from(current.japanese || "").filter((char) => isKanaCharacter(char)));
  const shouldHintKana = state.challengeResult === "wrong" || mixedKanaWord || kanaOnlyWord;
  const kanaHintSet = shouldHintKana
    ? state.challengeResult === "wrong"
      ? new Set(Array.from(current.kana).filter((char) => isKanaCharacter(char)))
      : visibleKanaHint
    : null;
  const inputStateClass = state.challengeResult === "correct"
    ? "correct"
    : isWrongRetrying
      ? "retrying"
      : state.challengeResult === "wrong"
        ? "wrong"
        : mixedKanaWord || kanaOnlyWord
          ? "mixed-hint"
          : "";
  const hintKana = kanaHintSet;
  const challengeResultIcon = state.challengeResult === "correct"
    ? "\u2713"
    : isWrongRetrying || (state.challengeResult === "wrong" && state.challengeRevealAttempt)
      ? ""
      : state.challengeResult === "wrong"
        ? "\u2717"
        : "";
  const chapter = activeChapter();
  const scopeLabel = studyScopeLabel(chapter);
  const challengeMeaningText = (current.meaning || current.meaningEn || "").trim();
  const challengeProgressText = `${state.challengeIndex + 1}/${queue.length}`;
  const challengeProgress = queue.length ? Math.round(((state.challengeIndex + 1) / queue.length) * 100) : 0;
  return `
    <div class="study-layout challenge-layout">
      <div class="study-card panel challenge-card">
        <div class="study-card-top">
          <span class="muted">${scopeLabel ? `${escapeHtml(scopeLabel)} · ` : ""}${current.level}</span>
        </div>
        <div class="life-row" aria-label="生命">${Array.from({ length: 5 }, (_, index) => `<span class="${index < state.challengeLives ? "alive" : ""}">❤</span>`).join("")}</div>
        <div class="study-word-wrap">
          <div class="study-word">${current.japanese}</div>
        </div>
        <div class="study-kana challenge-kana-spacer" aria-hidden="true">&nbsp;</div>
        <div class="answer-panel revealed challenge-answer">
          <div class="autoplay-progress-line">${challengeProgressText}</div>
          <div class="meaning">${renderMeaningWithPart(challengeMeaningText, current.part)}</div>
          <div class="fade-example"><div class="example">${current.example}</div><div class="muted">${current.translation}</div></div>
        </div>
        <div class="inline-progress">
          <div class="progress progress-inline"><span style="width:${Math.min(100, challengeProgress)}%"></span></div>
        </div>
        <div class="challenge-input ${inputStateClass}">
          <span class="challenge-input-text">${state.challengeResult === "wrong" && state.challengeRetryInput ? escapeHtml(state.challengeRetryInput) : state.challengeInput ? escapeHtml(state.challengeInput) : '<span class="challenge-input-placeholder">请输入日语假名</span>'}</span>
          <span class="challenge-result-icon" aria-hidden="true">${challengeResultIcon}</span>
        </div>
        <div class="kana-pad ${shouldHintKana ? "challenge-kana-hint" : ""}">
          ${choices.map((kana) => `<button class="kana-key ${hintKana && hintKana.has(kana) ? "hint" : ""}" data-kana="${escapeHtml(kana)}">${escapeHtml(kana)}</button>`).join("")}
          ${renderFavoriteButton(current.id, "kana-key challenge-favorite-key")}
          <button class="kana-key challenge-reveal-key" data-action="challenge-reveal-answer">${withButtonIcon("答案", "💡")}</button>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-title">挑战设置</div></div>
        <div class="panel-body stack">
          <div class="setting-label">挑战顺序</div>
          <div class="speed-row">
            <button class="btn ${state.challengeOrder === "sequential" ? "primary" : ""}" data-action="challenge-order" data-order="sequential">顺序</button>
            <button class="btn ${state.challengeOrder === "random" ? "primary" : ""}" data-action="challenge-order" data-order="random">随机</button>
          </div>
          <label class="check-line">
            <input type="checkbox" data-action="toggle-challenge-speak" ${state.challengeAutoSpeak ? "checked" : ""}>
            <span>答题后自动播放读音</span>
          </label>
          <div class="notice">挑战模式下保留 5 次生命，答错会扣 1 次；每次练习会根据正确率计分。</div>
            <button class="btn" data-action="restart-challenge">${withButtonIcon("重新挑战", "↺")}</button>
        </div>
      </div>
    </div>
  `;
}

function renderStudyEmpty(title, copy) {
  return `
    <div class="panel study-empty">
      <div class="panel-body stack">
        <div class="complete-mark">!</div>
        <h2>${title}</h2>
        <p class="muted">${copy}</p>
        <div class="row-actions">
          <button class="btn primary" data-learner-view="study">${withButtonIcon("返回学习", "🏠")}</button>
          <button class="btn" data-learner-view="mistakes">${withButtonIcon("查看生词本", eyeIconSvg())}</button>
        </div>
      </div>
    </div>
  `;
}

function renderChallengeSummaryModal(total) {
  const summary = challengeSummary(total);
  const passed = state.challengeStatus === "passed";
  const nextChapter = passed ? nextStudyScope() : null;
  const challengeStars = passed ? challengeStarsForLives(state.challengeLives) : 0;
  return `
    <div class="modal-backdrop challenge-summary-backdrop">
      <div class="panel study-empty challenge-summary challenge-summary-modal">
        <div class="panel-body stack">
          <div class="complete-mark">${passed ? "✓" : "!"}</div>
          <h2>${passed ? "挑战成功" : "挑战未通过"}</h2>
          <div class="stats">
            ${statWithIcon("准确率", `${summary.accuracy}%`, "✅")}
            ${statWithIcon("得分", summary.score, "🏆")}
            ${statWithIcon("剩余生命", state.challengeLives, "❤")}
            ${passed ? statWithIcon("获得星级", summaryStarValue(challengeStars), "🌟") : ""}
          </div>
          <p class="muted">正确 ${state.challengeCorrect} / 错误 ${state.challengeWrong} / 总计 ${summary.total}</p>
          <div class="row-actions">
            ${nextChapter ? '<button class="btn primary" data-action="continue-next-chapter" data-next-mode="challenge"> <span class="btn-icon" aria-hidden="true">➡</span><span>继续下一章</span></button>' : ""}
            <button class="btn primary" data-action="restart-challenge">${withButtonIcon("重新挑战", "↺")}</button>
            <button class="btn" data-action="study-mode" data-mode-value="autoplay">${withButtonIcon("返回自动播放", "▶")}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTapReadSummaryModal() {
  const nextChapter = nextStudyScope();
  const starChapterId = currentStudyScopeChapterId();
  const bestStars = Math.max(0, Number(state.chapterProgress[starChapterId]?.bestStars || 0));
  return `
    <div class="modal-backdrop challenge-summary-backdrop">
      <div class="panel study-empty challenge-summary challenge-summary-modal">
        <div class="panel-body stack">
          <div class="complete-mark">✓</div>
          <h2>点读记忆完成</h2>
          <div class="stats">
            ${statWithIcon("正确", `${Number(state.tapReadCorrect || 0)} / ${Number(state.tapReadTotal || 0)}`, "✅")}
            ${statWithIcon("题目", studyWords().length, "📖")}
            ${statWithIcon("获得星级", summaryStarValue(bestStars), "🌟")}
          </div>
          <p class="muted">你可以继续下一个章节，或返回其他学习模式。</p>
          <div class="row-actions">
            ${nextChapter ? '<button class="btn primary" data-action="continue-next-chapter" data-next-mode="tapread"> <span class="btn-icon" aria-hidden="true">➡</span><span>继续下一章</span></button>' : ""}
            <button class="btn primary" data-action="restart-tapread">${withButtonIcon("重新点读", "↺")}</button>
            <button class="btn" data-action="study-mode" data-mode-value="challenge">${withButtonIcon("切换到假名挑战", "🧠")}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTodayCourses() {
  const vocabBookBundles = getVocabBookBundles();
  const favoriteStats = getFavoriteCollectionStats();
  const favoriteCollections = getFavoriteCollections();
  const canCreateFavoriteCollection = favoriteCollections.filter((item) => item.id !== FAVORITE_DEFAULT_COLLECTION_ID).length < FAVORITE_MAX_CUSTOM_COLLECTIONS;
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <div class="panel-title">${withButtonIcon("词库与课程", "📚")}</div>
          <div class="muted today-course-notes">选择内置词库章节后，用自动播放、点读记忆或假名挑战学习。</div>
        </div>
      </div>
      <div class="panel-body course-list compact-courses">
        ${state.courses.map((course) => {
          const locked = course.access === "member" && !state.isPaid;
          const active = state.activeCourseId === course.id;
          const chapter = active ? activeChapter() : courseChapters(course)[0];
          return `
          <div class="course-item ${active ? "active" : ""}">
            <div class="row-actions">
              <strong>${course.title}</strong>
              <span class="badge ${course.access === "member" ? "member" : "published"}">${course.access === "member" ? "会员" : "免费"}</span>
              ${locked ? '<span class="badge review">未解锁</span>' : ""}
              ${course.featured ? '<span class="badge review">推荐</span>' : ""}
            </div>
            <div class="course-meta today-course-notes"><span>${course.category}</span><span>${course.chapters} 章</span><span>${course.words} 词</span>${chapter ? `<span>当前${chapter.label}</span>` : ""}</div>
            <div class="progress"><span style="width:${course.access === "free" ? 42 : 18}%"></span></div>
            <div class="course-actions">
              <button class="btn" data-action="open-chapter-picker" data-course="${course.id}" ${locked ? "disabled" : ""}>${withButtonIcon("选择章节", "📖")}</button>
              <button class="btn primary" data-action="start-course" data-course="${course.id}" ${locked ? "disabled" : ""}>${locked ? withButtonIcon("购买", "🔒") : withButtonIcon("开始学习", "▶")}</button>
            </div>
          </div>
        `}).join("")}
      </div>
    </div>
    ${vocabBookBundles.length ? `
      <div class="panel">
        <div class="panel-header">
          <div>
            <div class="panel-title">${withButtonIcon("生词本", "📘")}</div>
            <div class="muted today-course-notes">记录没记住、模糊、不会和记错的单词，每 30 词自动生成一个生词本。</div>
          </div>
        </div>
        <div class="panel-body course-list compact-courses">
          ${vocabBookBundles.map((bundle) => `
            <div class="course-item">
              <div class="row-actions">
                <strong>${bundle.label}</strong>
                <span class="badge review">已掌握 ${bundle.rememberedCount || 0}/${bundle.totalCount}</span>
              </div>
              <div class="course-meta today-course-notes">
                <span>生词记录期间 ${bundle.rangeText || "暂无更多说明"}</span>
              </div>
              <div class="course-actions">
                <button class="btn" data-action="open-vocab-book" data-bundle="${bundle.id}">${withButtonIcon("查看", eyeIconSvg())}</button>
                ${bundle.totalCount ? `<button class="btn primary" data-action="start-vocab-book" data-bundle="${bundle.id}">${withButtonIcon("开始学习", "▶")}</button>` : `<button class="btn primary danger-trash-btn" data-action="delete-vocab-book-bundle" data-bundle="${bundle.id}">${withButtonIcon("删除词库", trashIconSvg())}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    ` : `<div class="panel"><div class="panel-header"><div><div class="panel-title">${withButtonIcon("生词本", "📘")}</div><div class="muted today-course-notes">记录没记住、模糊、不会和记错的单词，每 30 词自动生成一个生词本。</div></div></div><div class="panel-body muted today-course-notes">暂无可用生词本。</div></div>`}
    <div class="panel">
      <div class="panel-header">
        <div>
          <div class="panel-title favorite-collection-title">
            <span>${withButtonIcon("收藏本", "⭐")}</span>
            <button class="icon-btn favorite-collection-edit-btn" data-action="toggle-favorite-create-menu" aria-label="收藏本设置" title="收藏本设置">${withButtonIcon("设置", "⚙")}</button>
          </div>
          ${state.favoriteCreateMenuOpen ? `
            <div class="favorite-collection-menu">
              <button class="btn" data-action="create-favorite-collection" ${canCreateFavoriteCollection ? "" : "disabled"}>${withButtonIcon("新增收藏本", "➕")}</button>
            </div>
          ` : ""}
          <div class="muted today-course-notes">支持最新收藏与自建收藏本，最大可自建 3 个收藏本</div>
        </div>
      </div>
      <div class="panel-body course-list compact-courses">
        ${favoriteCollections.map((collection) => {
          const stat = favoriteStats.find((item) => item.id === collection.id) || { wordCount: 0, latestAt: 0 };
          return `
            <div class="course-item">
              <div class="row-actions">
                <strong>${escapeHtml(collection.name)}</strong>
                <span class="badge review">${stat.wordCount} 词</span>
              </div>
              <div class="course-meta today-course-notes"><span>${collection.id === FAVORITE_DEFAULT_COLLECTION_ID ? "默认收藏本" : "自建收藏本"}</span><span>${stat.latestAt ? `最近更新 ${formatDateYMD(stat.latestAt)}` : "暂无更新"}</span></div>
              <div class="course-actions">
                <button class="btn" data-action="open-favorites" data-collection="${collection.id}">${withButtonIcon("查看", eyeIconSvg())}</button>
                <button class="btn primary" data-action="start-favorite-collection" data-collection="${collection.id}" ${stat.wordCount ? "" : "disabled"}>${withButtonIcon("开始学习", "▶")}</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderChapterPickerModal() {
  const course = state.courses.find((item) => item.id === state.chapterPickerCourseId);
  if (!course) return "";
  const locked = course.access === "member" && !state.isPaid;
  const chapters = locked ? [] : courseChapters(course);
  return `
    <div class="modal-backdrop" data-action="close-chapter-picker">
      <div class="chapter-modal panel" role="dialog" aria-modal="true" aria-label="选择章节" data-modal-stop>
        <div class="panel-header">
          <div>
            <div class="panel-title">选择章节</div>
            <div class="muted">${course.title}</div>
          </div>
          <button class="btn ghost" data-action="close-chapter-picker">${withButtonIcon("关闭", "✕")}</button>
        </div>
        <div class="panel-body">
          <div class="chapter-grid modal-chapters">
            ${chapters.map((chapter) => `
              <button class="chapter-chip ${state.activeCourseId === course.id && state.activeChapterId === chapter.id ? "active" : ""}" data-action="start-chapter" data-course="${course.id}" data-chapter="${chapter.id}">
                <span class="chapter-chip-main">
                  <strong>${chapter.label}</strong>
                  <span>${chapter.count} 词</span>
                </span>
                ${renderChapterStars(chapter.id)}
              </button>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFavoriteSessionPickerModal() {
  if (!state.favoriteSessionPickerOpen || !isFavoriteSession()) return "";
  const collections = getFavoriteCollections();
  return `
    <div class="modal-backdrop" data-action="close-favorite-session-picker">
      <div class="chapter-modal panel" role="dialog" aria-modal="true" aria-label="切换收藏本" data-modal-stop>
        <div class="panel-header">
          <div>
            <div class="panel-title">切换章节</div>
            <div class="muted favorite-note">收藏本词库：最新收藏和自建收藏本分别作为章节</div>
          </div>
          <button class="btn ghost" data-action="close-favorite-session-picker">${withButtonIcon("关闭", "✕")}</button>
        </div>
        <div class="panel-body">
          <div class="chapter-grid modal-chapters">
            ${collections.map((collection) => {
              const count = getFavoriteCollectionCount(collection.id);
              const active = state.favoriteSessionCollectionId === collection.id;
              const chapterId = favoriteCollectionChapterId(collection.id);
              return `
                <button class="chapter-chip ${active ? "active" : ""}" data-action="switch-favorite-session" data-collection="${collection.id}" ${count ? "" : "disabled"}>
                  <span class="chapter-chip-main">
                    <strong>${withButtonIcon(escapeHtml(collection.name), favoriteCollectionIcon(collection.id))}</strong>
                    <span>${count} 词</span>
                  </span>
                  ${renderChapterStars(chapterId)}
                </button>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderVocabBookSessionPickerModal() {
  if (!state.vocabBookSessionPickerOpen || !isVocabBookSession()) return "";
  const bundles = getVocabBookBundles();
  return `
    <div class="modal-backdrop" data-action="close-vocab-book-session-picker">
      <div class="chapter-modal panel" role="dialog" aria-modal="true" aria-label="切换章节" data-modal-stop>
        <div class="panel-header">
          <div>
            <div class="panel-title">切换章节</div>
            <div class="muted favorite-note">生词本词库：每 30 个生词自动生成一个章节</div>
          </div>
          <button class="btn ghost" data-action="close-vocab-book-session-picker">${withButtonIcon("关闭", "✕")}</button>
        </div>
        <div class="panel-body">
          <div class="chapter-grid modal-chapters">
            ${bundles.map((bundle) => {
              const active = state.vocabBookSessionBundleId === bundle.id;
              const chapterId = vocabBookBundleChapterId(bundle.id);
              return `
                <button class="chapter-chip ${active ? "active" : ""}" data-action="switch-vocab-book-session" data-bundle="${bundle.id}" ${bundle.totalCount ? "" : "disabled"}>
                  <span class="chapter-chip-main">
                    <strong>${withButtonIcon(escapeHtml(bundle.label), "📘")}</strong>
                    <span>已掌握 ${bundle.rememberedCount || 0}/${bundle.totalCount}</span>
                  </span>
                  ${renderChapterStars(chapterId)}
                </button>
              `;
            }).join("") || '<div class="muted">暂无可切换的生词本</div>'}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderMistakes() {
  const vocabBookBundles = getVocabBookBundles();
  const validBundleIds = new Set(vocabBookBundles.map((bundle) => bundle.id));
  const selectedBundleId = validBundleIds.has(state.vocabBookListBundleId) ? state.vocabBookListBundleId : (vocabBookBundles[0]?.id || "");
  const selectedBundle = vocabBookBundles.find((bundle) => bundle.id === selectedBundleId) || null;
  const vocabBook = state.vocabBook || {};
  const isBundleMenuOpen = selectedBundle && state.vocabBookBundleMenuId === selectedBundle.id;
  const mistakes = state.words
    .filter((word) => {
      const entry = vocabBook[word.id];
      return (
        entry &&
        entry.bundleId === selectedBundleId &&
        word.status === "published" &&
        (state.isPaid || word.access === "free")
      );
    })
    .sort((a, b) => {
      const aEntry = vocabBook[a.id];
      const bEntry = vocabBook[b.id];
      const aRemembered = Boolean(aEntry?.remembered);
      const bRemembered = Boolean(bEntry?.remembered);
      if (aRemembered !== bRemembered) return Number(aRemembered) - Number(bRemembered);
      const aScore =
        (Number(aEntry?.forgottenCount || 0) + Number(aEntry?.revealCount || 0))
        + Number(aEntry?.fuzzyCount || 0)
        + Number(aEntry?.typoCount || 0);
      const bScore =
        (Number(bEntry?.forgottenCount || 0) + Number(bEntry?.revealCount || 0))
        + Number(bEntry?.fuzzyCount || 0)
        + Number(bEntry?.typoCount || 0);
      return bScore - aScore || Number(vocabBook[b.id]?.lastAddedAt || 0) - Number(vocabBook[a.id]?.lastAddedAt || 0);
    });
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <div class="panel-title favorite-collection-title">
            <span>${escapeHtml(selectedBundle?.label || "生词本")}</span>
            ${selectedBundle ? `<button class="icon-btn favorite-collection-edit-btn" data-action="toggle-vocab-book-bundle-menu" data-bundle="${selectedBundle.id}" aria-label="生词本设置" title="生词本设置">${withButtonIcon("设置", "⚙")}</button>` : ""}
          </div>
          ${isBundleMenuOpen ? `
            <div class="favorite-collection-menu">
              <button class="btn" data-action="rename-vocab-book-bundle" data-bundle="${selectedBundle.id}">${withButtonIcon("重命名", "✏️")}</button>
              <button class="btn danger-trash-btn" data-action="delete-vocab-book-bundle" data-bundle="${selectedBundle.id}">${withButtonIcon("删除生词本", trashIconSvg())}</button>
            </div>
          ` : ""}
          <div class="muted today-course-notes">
            ${selectedBundle
            ? `已掌握 ${selectedBundle.rememberedCount}/${selectedBundle.totalCount} · 生词记录期间 ${selectedBundle.rangeText || "时间待定"}`
            : "暂无生词本"}
          </div>
        </div>
        ${selectedBundle
            ? `<button class="btn primary" data-action="start-vocab-book" data-bundle="${selectedBundleId}">${withButtonIcon("开始学习", "▶")}</button>`
           : '<button class="btn primary" disabled>开始学习</button>'
        }
      </div>
      <div class="panel-body">
        <div class="table-wrap">
          <table class="vocab-book-table">
            <colgroup>
              <col class="vocab-word-col">
              <col class="vocab-meaning-col">
              <col class="vocab-count-col">
              <col class="vocab-count-col">
              <col class="vocab-count-col">
              <col class="vocab-count-col">
              <col class="vocab-action-col">
            </colgroup>
            <thead><tr><th>日文</th><th>中文</th><th>没记住</th><th>模糊</th><th>不会</th><th>记错</th><th>操作</th></tr></thead>
            <tbody>
              ${mistakes.map((word) => {
                const item = vocabBook[word.id] || {};
                return `
                <tr>
                  <td><div class="jp">${word.japanese} <span class="vocab-part-badge">${escapeHtml(word.part || "词性")}</span></div><div class="kana">${word.kana}</div></td>
                  <td>${word.meaning}</td>
                  <td>${item.forgottenCount || 0}</td>
                  <td>${item.fuzzyCount || 0}</td>
                  <td>${item.revealCount || 0}</td>
                  <td>${item.typoCount || 0}</td>
                  <td>${item.remembered ? `<span class="vocab-book-remembered-tag">已记住</span>` : `<button class="btn vocab-book-remember-btn" data-action="remember-vocab-word" data-word="${word.id}">${withButtonIcon("记住了", "✅")}</button>`}</td>
                </tr>
               `}).join("") || '<tr><td colspan="7" class="muted">该生词本暂无词条</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderLearnerStats() {
  const progressRows = Object.entries(state.progress || {});
  const reviewedCount = progressRows.filter(([, item]) => item && item.lastResult).length;
  const dueCount = progressRows.filter(([, item]) => item && item.due).length;
  const masteredCount = progressRows.filter(([, item]) => {
    if (!item) return false;
    if (typeof item.wasMastered === "boolean") return item.wasMastered;
    return Number(item.box || 0) >= 3;
  }).length;
  const correctCount = progressRows.reduce((total, [, item]) => total + Number(item?.correct || 0), 0);
  const wrongCount = progressRows.reduce((total, [, item]) => total + Number(item?.wrong || 0), 0);
  const totalAttempts = correctCount + wrongCount;
  const accuracy = totalAttempts ? Math.round((correctCount / totalAttempts) * 100) : 0;
  const chapterRows = Object.entries(state.chapterProgress || {});
  const completedChapters = chapterRows.filter(([, item]) => Number(item?.bestStars || 0) > 0).length;
  const averageStars = completedChapters
    ? (chapterRows.reduce((total, [, item]) => total + Number(item?.bestStars || 0), 0) / completedChapters).toFixed(1)
    : "0.0";
  const vocabBundles = getVocabBookBundles();
  const vocabTotal = vocabBundles.reduce((total, bundle) => total + Number(bundle.totalCount || 0), 0);
  const vocabRemembered = vocabBundles.reduce((total, bundle) => total + Number(bundle.rememberedCount || 0), 0);
  const favoriteTotal = Object.keys(state.favoriteBook || {}).length;

  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <div class="panel-title">${withButtonIcon("学习统计", "📊")}</div>
          <div class="muted today-course-notes">统计本机当前浏览器内保存的学习记录</div>
        </div>
      </div>
      <div class="panel-body stack">
        <div class="stats">
          ${statWithIcon("连续", `${state.learner.streak || 0} 天`, "🔥")}
          ${statWithIcon("XP", state.learner.xp || 0, "⚡")}
          ${statWithIcon("今日", `${todayCompleted()}/${state.learner.dailyGoal || 0}`, "🎯")}
          ${statWithIcon("准确率", `${accuracy}%`, "✅")}
        </div>
        <div class="stats">
          ${statWithIcon("已学习", reviewedCount, "📖")}
          ${statWithIcon("待复习", dueCount, "⏰")}
          ${statWithIcon("已掌握", masteredCount, "🏆")}
          ${statWithIcon("章节", completedChapters, "🧩")}
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><div class="panel-title">${withButtonIcon("词库记录", "🗂")}</div></div>
      <div class="panel-body">
        <div class="stats">
          ${statWithIcon("生词", `${vocabRemembered}/${vocabTotal}`, "📝")}
          ${statWithIcon("生词本", vocabBundles.length, "📘")}
          ${statWithIcon("收藏", favoriteTotal, "⭐")}
          ${statWithIcon("平均星", averageStars, "🌟")}
        </div>
      </div>
    </div>
  `;
}

function statWithIcon(label, value, icon) {
  return stat(`<span class="stat-label-icon" aria-hidden="true">${icon}</span><span>${label}</span>`, value);
}

function summaryStarValue(stars) {
  const value = Math.max(0, Math.min(5, Number(stars || 0)));
  const earned = "★".repeat(value);
  const empty = "☆".repeat(5 - value);
  return `<span class="chapter-stars-value summary-stars-earned">${earned}<span>${empty}</span></span>`;
}

function defaultVocabBookBundleLabel(bundleId) {
  const match = /^vocab-book-(\d+)$/.exec(bundleId || "");
  const index = match ? Number(match[1]) + 1 : 1;
  return `生词${index}`;
}

function getVocabBookBundleMeta(bundleId) {
  const meta = state.vocabBookBundles?.[bundleId];
  return meta && typeof meta === "object" ? meta : {};
}

function getVocabBookBundleLabel(bundleId) {
  const name = String(getVocabBookBundleMeta(bundleId).name || "").trim();
  return name || defaultVocabBookBundleLabel(bundleId);
}

function normalizeVocabBookEntry(item = {}) {
  return {
    forgottenCount: Number(item.forgottenCount || 0),
    fuzzyCount: Number(item.fuzzyCount || 0),
    revealCount: Number(item.revealCount || 0),
    typoCount: Number(item.typoCount || 0),
    lastReason: item.lastReason || "",
    lastAddedAt: Number(item.lastAddedAt || 0),
    remembered: Boolean(item.remembered),
    rememberedAt: Number(item.rememberedAt || 0),
    bundleId: item.bundleId || "",
  };
}

function maybeFinalizeVocabBundle(bundleId) {
  if (!bundleId) return false;
  const bundle = getVocabBookBundle(bundleId);
  if (!bundle || bundle.pendingCount) return false;
  return window.confirm("确定删除该生词本吗？") && deleteVocabBookBundle(bundleId, { silentConfirm: true });
}

function deleteVocabBookBundle(bundleId, options = {}) {
  if (!bundleId) return false;
  const bundle = getVocabBookBundle(bundleId);
  if (!bundle) return false;
  const shouldConfirm = options.silentConfirm ? false : true;
  if (shouldConfirm) {
    const confirmed = window.confirm(`确认删除该生词本及其学习记录？已掌握: ${bundle.rememberedCount}/${bundle.totalCount}`);
    if (!confirmed) return false;
  }
  const bundleEntries = Object.entries(state.vocabBook || {}).filter(([, item]) => item?.bundleId === bundleId);
  bundleEntries.forEach(([wordId]) => delete state.vocabBook[wordId]);
  if (state.vocabBookBundles && typeof state.vocabBookBundles === "object") delete state.vocabBookBundles[bundleId];
  if (state.vocabBookBundleMenuId === bundleId) state.vocabBookBundleMenuId = "";
  if (state.vocabBookListBundleId === bundleId) state.vocabBookListBundleId = "";
  if (state.vocabBookSessionBundleId === bundleId) {
    state.vocabBookSessionBundleId = "";
    state.learnerView = "mistakes";
  }
  showToast(`已删除${bundle.label}`);
  return true;
}

function renameVocabBookBundle(bundleId) {
  const bundle = getVocabBookBundle(bundleId);
  if (!bundle) return;
  const nextName = (window.prompt("请输入新的生词本名称", bundle.label) || "").trim();
  if (!nextName) return;
  state.vocabBookBundles = state.vocabBookBundles && typeof state.vocabBookBundles === "object" ? state.vocabBookBundles : {};
  state.vocabBookBundles[bundleId] = {
    ...getVocabBookBundleMeta(bundleId),
    name: nextName,
    renamedAt: Date.now(),
  };
  state.vocabBookBundleMenuId = "";
  showToast(`生词本已重命名：${nextName}`);
}

function ensureVocabBundleAssignments() {
  const vocabBook = state.vocabBook || {};
  if (!vocabBook || typeof vocabBook !== "object") return false;
  let changed = false;
  const entries = Object.entries(vocabBook).map(([wordId, raw]) => {
    const item = normalizeVocabBookEntry(raw);
    if (JSON.stringify(item) !== JSON.stringify(raw)) {
      vocabBook[wordId] = item;
      changed = true;
    }
    return { wordId: Number(wordId), item };
  }).sort((a, b) => Number(b.item.lastAddedAt || 0) - Number(a.item.lastAddedAt || 0) || Number(a.wordId) - Number(b.wordId));

  entries.forEach((entry, index) => {
    const bundleId = `vocab-book-${Math.floor(index / VOCAB_BOOK_BUNDLE_SIZE)}`;
    if (entry.item.bundleId !== bundleId) {
      entry.item.bundleId = bundleId;
      vocabBook[entry.wordId] = entry.item;
      changed = true;
    }
  });
  return changed;
}

function vocabBookScore(item = {}) {
  return Number(item.forgottenCount || 0) + Number(item.fuzzyCount || 0) + Number(item.revealCount || 0) + Number(item.typoCount || 0);
}

function getFavoriteWords(collectionId = FAVORITE_DEFAULT_COLLECTION_ID) {
  const collection = getFavoriteCollection(collectionId);
  return state.words
    .filter((word) => {
      const entry = getFavoriteEntry(word.id);
      return entry && entry.collectionId === collection.id && word.status === "published" && (state.isPaid || word.access === "free");
    })
    .sort((a, b) => Number(getFavoriteEntry(b.id)?.addedAt || 0) - Number(getFavoriteEntry(a.id)?.addedAt || 0));
}
function renderFavorites() {
  ensureFavoriteDefaults();
  const selectedId = getFavoriteSelectedCollectionId();
  const collections = getFavoriteCollections();
  const collection = getFavoriteCollection(selectedId);
  const words = getFavoriteWords(collection.id);
  const canCreate = collections.filter((item) => item.id !== FAVORITE_DEFAULT_COLLECTION_ID).length < FAVORITE_MAX_CUSTOM_COLLECTIONS;
  const stat = getFavoriteCollectionStats().find((item) => item.id === collection.id) || { wordCount: 0, latestAt: 0 };
  const titleMeta = collection.id === FAVORITE_DEFAULT_COLLECTION_ID ? "收藏本（默认）" : `自定义收藏本：${collection.name}`;
  const isCollectionMenuOpen = collection.editable && state.favoriteCollectionMenuId === collection.id;
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <div class="panel-title favorite-collection-title">
            <span>收藏本</span>
            <button class="icon-btn favorite-collection-edit-btn" data-action="toggle-favorite-create-menu" aria-label="收藏本设置" title="收藏本设置">${withButtonIcon("设置", "⚙")}</button>
          </div>
          ${state.favoriteCreateMenuOpen ? `
            <div class="favorite-collection-menu">
              <button class="btn" data-action="create-favorite-collection" ${canCreate ? "" : "disabled"}>${withButtonIcon("新增收藏本", "➕")}</button>
            </div>
          ` : ""}
          <div class="muted favorite-note">管理默认收藏与自建收藏本，支持新增/编辑/移动词条</div>
        </div>
      </div>
      <div class="panel-body">
        <div class="row-actions">
          ${collections.map((item) => `
            <button class="btn ${selectedId === item.id ? "primary" : ""}" data-action="select-favorite-collection" data-collection="${item.id}">
              ${withButtonIcon(`${item.name} (${getFavoriteCollectionCount(item.id)})`, favoriteCollectionIcon(item.id))}
            </button>
          `).join("")}
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="favorite-collection-heading">
          <div class="panel-title favorite-collection-title">
            <span>${collection.name}</span>
            ${collection.editable ? `<button class="icon-btn favorite-collection-edit-btn" data-action="toggle-favorite-collection-menu" data-collection="${collection.id}" aria-label="编辑收藏本" title="编辑收藏本">${withButtonIcon("编辑", "⚙")}</button>` : ""}
          </div>
          ${isCollectionMenuOpen ? `
            <div class="favorite-collection-menu">
              <button class="btn" data-action="rename-favorite-collection" data-collection="${collection.id}">${withButtonIcon("重命名", "✏️")}</button>
              <button class="btn danger-trash-btn" data-action="delete-favorite-collection" data-collection="${collection.id}">${withButtonIcon("删除词库", trashIconSvg())}</button>
            </div>
          ` : ""}
          <div class="muted favorite-note">${titleMeta} · ${stat.wordCount} 词 · 最近更新 ${formatDateYMD(stat.latestAt || 0) || "暂无"}</div>
        </div>
        <div class="row-actions">
          <button class="btn" data-action="add-favorite-word" data-collection="${collection.id}">${withButtonIcon("新词", "➕")}</button>
          <button class="btn primary" data-action="start-favorite-collection" data-collection="${collection.id}" ${words.length ? "" : "disabled"}>${withButtonIcon("开始学习", "▶")}</button>
        </div>
      </div>
      <div class="panel-body">
        <div class="table-wrap">
          <table class="vocab-book-table favorite-words-table">
            <colgroup>
              <col class="vocab-word-col">
              <col class="vocab-meaning-col">
              <col class="favorite-example-col">
              <col class="vocab-action-col">
            </colgroup>
            <thead>
              <tr><th>日文</th><th>中文</th><th>例句</th><th>操作</th></tr>
            </thead>
            <tbody>
              ${words.map((word) => `
                <tr>
                  <td class="favorite-word-edit-cell" data-action="edit-favorite-word" data-word="${word.id}"><div class="jp">${word.japanese} <span class="vocab-part-badge">${escapeHtml(word.part || "词性")}</span></div><div class="kana">${word.kana}</div></td>
                  <td class="favorite-word-edit-cell" data-action="edit-favorite-word" data-word="${word.id}">${word.meaning}</td>
                  <td class="favorite-word-edit-cell" data-action="edit-favorite-word" data-word="${word.id}">${word.example}<div class="muted">${word.translation}</div></td>
                  <td>
                    <div class="favorite-word-actions">
                      <button class="btn favorite-icon-action favorite-remove-btn" data-action="remove-favorite" data-word="${word.id}" aria-label="移除" title="移除">${trashIconSvg()}</button>
                      <button class="btn favorite-icon-action" data-action="open-move-favorite-word" data-word="${word.id}" aria-label="移动" title="移动">${moveIconSvg()}</button>
                    </div>
                  </td>
                </tr>
              `).join("") || '<tr><td colspan="4" class="muted">该词库暂无词条</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    ${renderFavoriteMoveModal(collections)}
  `;
}

function renderFavoriteMoveModal(collections) {
  const wordId = Number(state.favoriteMoveWordId || 0);
  if (!wordId) return "";
  const word = state.words.find((item) => item.id === wordId);
  const entry = getFavoriteEntry(wordId);
  if (!word || !entry) return "";
  const targets = collections.filter((item) => item.id !== FAVORITE_DEFAULT_COLLECTION_ID && item.id !== entry.collectionId);
  return `
    <div class="modal-backdrop" data-action="close-move-favorite-word">
      <div class="chapter-modal panel" role="dialog" aria-modal="true" aria-label="移动收藏词条" data-modal-stop>
        <div class="panel-header">
          <div>
            <div class="panel-title">移动词条</div>
            <div class="muted favorite-note">${escapeHtml(word.japanese)} 将移动到选中的自建收藏库</div>
          </div>
        </div>
        <div class="panel-body stack">
          ${targets.length ? targets.map((target) => `
            <button class="btn" data-action="move-favorite-word" data-word="${word.id}" data-target="${target.id}">
              ${withButtonIcon(target.name, "📚")}
            </button>
          `).join("") : '<div class="muted">暂无可移动的自建词库</div>'}
          <div class="row-actions">
            <button class="btn" data-action="close-move-favorite-word">${withButtonIcon("取消", "×")}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFavoriteWordForm() {
  ensureFavoriteDefaults();
  const collection = getFavoriteCollection(state.favoriteWordFormCollectionId);
  const form = normalizeFavoriteWordForm(state.favoriteWordForm);
  state.favoriteWordForm = form;
  const isEditMode = state.favoriteWordFormMode === "edit";
  const matched = !isEditMode && form.matchedJapanese ? state.words.find((word) => word.japanese === form.matchedJapanese) : null;
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <div class="panel-title">${isEditMode ? "编辑词条" : "新词"}</div>
          <div class="muted favorite-note">${isEditMode ? "编辑" : "保存到"}：${escapeHtml(collection.name)}</div>
        </div>
        <div class="row-actions">
          <button class="btn" data-action="preview-favorite-word-form" ${form.japanese.trim() ? "" : "disabled"}>${withButtonIcon("试听", "▶")}</button>
          <button class="btn" data-action="cancel-favorite-word-form">${withButtonIcon("取消", "×")}</button>
          <button class="btn primary" data-action="save-favorite-word-form">${withButtonIcon("保存", "✓")}</button>
        </div>
      </div>
      <div class="panel-body stack">
          <div class="notice favorite-word-match-notice ${matched ? "" : "hidden"}">已从现有词库填入资料，可继续修改。</div>
        <div class="form-grid favorite-word-form-grid">
          ${favoriteWordInput("japanese", "日文", form.japanese, true)}
          ${favoriteWordInput("kana", "读音（请务必填写正确）", form.kana, true)}
          ${favoriteWordInput("meaning", "词义", form.meaning)}
          ${favoriteWordInput("part", "词性", form.part || "名词")}
          ${favoriteWordTextarea("example", "例句", form.example)}
          ${favoriteWordTextarea("translation", "例句翻译", form.translation)}
        </div>
      </div>
    </div>
  `;
}

function favoriteWordInput(field, label, value, required = false) {
  const maxLength = favoriteWordFieldMaxLength(field);
  return `
    <div class="field">
      <label>${label}${required ? " *" : ""}</label>
      <input class="input" data-favorite-word-field="${field}" value="${escapeHtml(value || "")}" maxlength="${maxLength}" ${required ? "required" : ""}>
    </div>
  `;
}

function favoriteWordTextarea(field, label, value) {
  const maxLength = favoriteWordFieldMaxLength(field);
  return `
    <div class="field full">
      <label>${label}</label>
      <textarea class="textarea" data-favorite-word-field="${field}" maxlength="${maxLength}">${escapeHtml(value || "")}</textarea>
    </div>
  `;
}

const FAVORITE_WORD_FIELD_LIMITS = {
  japanese: 15,
  kana: 30,
  meaning: 60,
  part: 10,
  example: 80,
  translation: 80,
};

function favoriteWordFieldMaxLength(field) {
  return FAVORITE_WORD_FIELD_LIMITS[field] || 80;
}

function limitFavoriteWordField(field, value) {
  return String(value || "").slice(0, favoriteWordFieldMaxLength(field));
}

function defaultFavoriteWordForm() {
  return {
    japanese: "",
    kana: "",
    meaning: "",
    part: "名词",
    example: "",
    translation: "",
    matchedJapanese: "",
  };
}

function formatDateKey(timestamp = Date.now()) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function trimDailyRecords(dailyRecords = {}) {
  if (!dailyRecords || typeof dailyRecords !== "object") return {};
  const rows = Object.entries(dailyRecords)
    .filter(([date, record]) => /^\d{4}-\d{2}-\d{2}$/.test(String(date)) && record && typeof record === "object")
    .sort((left, right) => String(right[0]).localeCompare(String(left[0])))
    .slice(0, LEARNER_DAILY_RECORDS_LIMIT);
  return Object.fromEntries(rows.map(([date, record]) => [date, {
    reviewed: Number(record.reviewed || 0),
    correct: Number(record.correct || 0),
    wrong: Number(record.wrong || 0),
  }]));
}

function getDateOffsetKey(offsetDays) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + offsetDays);
  return formatDateKey(date.getTime());
}

function touchStudyDay(isCorrect = false, isWrong = false) {
  const today = formatDateKey();
  const record = state.learner.dailyRecords?.[today] || { reviewed: 0, correct: 0, wrong: 0 };
  record.reviewed += 1;
  if (isCorrect) record.correct += 1;
  if (isWrong) record.wrong += 1;
  const lastActiveDate = state.learner.lastActiveDate || "";
  const yesterday = getDateOffsetKey(-1);
  if (!lastActiveDate) {
    state.learner.streak = 1;
  } else if (lastActiveDate === today) {
    state.learner.streak = Number(state.learner.streak) || 0;
  } else if (lastActiveDate === yesterday) {
    state.learner.streak += 1;
  } else {
    state.learner.streak = 1;
  }
  state.learner.lastActiveDate = today;
  state.learner.todayReviewed = record.reviewed;
  state.learner.dailyRecords[today] = record;
  state.learner.dailyRecords = trimDailyRecords(state.learner.dailyRecords);
}

function normalizeFavoriteWordForm(form = {}) {
  return {
    japanese: limitFavoriteWordField("japanese", form.japanese),
    kana: limitFavoriteWordField("kana", form.kana),
    meaning: limitFavoriteWordField("meaning", form.meaning),
    part: limitFavoriteWordField("part", form.part || "名词"),
    example: limitFavoriteWordField("example", form.example),
    translation: limitFavoriteWordField("translation", form.translation),
    matchedJapanese: String(form.matchedJapanese || ""),
  };
}

function findExistingWordByJapanese(japanese) {
  const value = String(japanese || "").trim();
  if (!value) return null;
  return state.words.find((word) => word && word.japanese === value && word.status === "published") || null;
}

function updateFavoriteWordFormField(field, value) {
  const form = normalizeFavoriteWordForm(state.favoriteWordForm);
  form[field] = limitFavoriteWordField(field, value);
  if (field === "japanese" && state.favoriteWordFormMode !== "edit") {
    const match = findExistingWordByJapanese(form.japanese);
    if (match) {
      form.kana = limitFavoriteWordField("kana", match.kana);
      form.meaning = limitFavoriteWordField("meaning", match.meaning);
      form.part = limitFavoriteWordField("part", match.part || "名词");
      form.example = limitFavoriteWordField("example", match.example);
      form.translation = limitFavoriteWordField("translation", match.translation);
      form.matchedJapanese = match.japanese;
    } else {
      if (form.matchedJapanese) {
        form.kana = "";
        form.meaning = "";
        form.part = "名词";
        form.example = "";
        form.translation = "";
      }
      form.matchedJapanese = "";
    }
  }
  state.favoriteWordForm = form;
}

function syncFavoriteWordFormDom() {
  const form = normalizeFavoriteWordForm(state.favoriteWordForm);
  document.querySelectorAll("[data-favorite-word-field]").forEach((field) => {
    const key = field.dataset.favoriteWordField;
    if (key && key !== "japanese" && document.activeElement !== field) field.value = form[key] || "";
  });
  const notice = document.querySelector(".favorite-word-match-notice");
  if (notice) notice.classList.toggle("hidden", !form.matchedJapanese);
}

function openFavoriteWordForm(collectionId = FAVORITE_DEFAULT_COLLECTION_ID) {
  const collection = getFavoriteCollection(collectionId);
  state.favoriteWordFormCollectionId = collection.id;
  state.favoriteWordFormMode = "create";
  state.favoriteWordFormWordId = 0;
  state.favoriteWordForm = defaultFavoriteWordForm();
  state.favoriteCreateMenuOpen = false;
  state.favoriteCollectionMenuId = "";
  state.favoriteMoveWordId = 0;
  state.learnerView = "favorite-word-form";
}

function openFavoriteWordEditForm(wordId) {
  const word = state.words.find((item) => item.id === wordId);
  const entry = getFavoriteEntry(wordId);
  if (!word || !entry) return showToast("未找到可编辑词条");
  const collection = getFavoriteCollection(entry.collectionId);
  state.favoriteWordFormCollectionId = collection.id;
  state.favoriteWordFormMode = "edit";
  state.favoriteWordFormWordId = word.id;
  state.favoriteWordForm = normalizeFavoriteWordForm({
    japanese: word.japanese,
    kana: word.kana,
    meaning: word.meaning,
    part: word.part || "名词",
    example: word.example,
    translation: word.translation,
    matchedJapanese: "",
  });
  state.favoriteCreateMenuOpen = false;
  state.favoriteCollectionMenuId = "";
  state.favoriteMoveWordId = 0;
  state.learnerView = "favorite-word-form";
}

function cancelFavoriteWordForm() {
  state.learnerView = "favorites";
  state.favoriteWordFormMode = "create";
  state.favoriteWordFormWordId = 0;
  state.favoriteWordForm = defaultFavoriteWordForm();
}

function previewFavoriteWordForm() {
  const form = normalizeFavoriteWordForm(state.favoriteWordForm);
  if (!form.japanese.trim()) {
    showToast("请先输入日文");
    return;
  }
  speakJapanese(form.japanese.trim());
}

function saveFavoriteWordForm() {
  const collection = getFavoriteCollection(state.favoriteWordFormCollectionId);
  const form = normalizeFavoriteWordForm(state.favoriteWordForm);
  state.favoriteWordForm = form;
  const japanese = form.japanese.trim();
  const kana = form.kana.trim();
  const meaning = form.meaning.trim();
  if (!japanese) {
    showToast("请填写日文");
    return;
  }
  if (!kana) {
    showToast("请填写读音，假名挑战需要");
    return;
  }
  if (state.favoriteWordFormMode === "edit") {
    saveFavoriteWordEditForm(collection, form);
    return;
  }
  const wordIds = state.words.map((item) => Number(item.id || 0)).filter((value) => Number.isFinite(value));
  const newId = (wordIds.length ? Math.max(...wordIds) : 0) + 1;
  state.words.push({
    id: newId,
    japanese,
    kana,
    meaning,
    example: form.example.trim(),
    translation: form.translation.trim(),
    part: form.part.trim() || "名词",
    level: "自建",
    tags: [],
    status: "published",
    version: 1,
    access: state.isPaid ? "member" : "free",
  });
  state.favoriteBook[newId] = {
    addedAt: Date.now(),
    collectionId: collection.id,
    createdByUser: true,
    favoriteCount: 1,
  };
  setFavoriteSelectedCollectionId(collection.id);
  state.favoriteWordFormCollectionId = collection.id;
  state.favoriteWordFormMode = "create";
  state.favoriteWordFormWordId = 0;
  state.favoriteWordForm = defaultFavoriteWordForm();
  state.learnerView = "favorites";
  showToast(`已添加词条：${japanese}`);
}

function saveFavoriteWordEditForm(collection, form) {
  const wordId = Number(state.favoriteWordFormWordId || 0);
  const word = state.words.find((item) => item.id === wordId);
  const entry = getFavoriteEntry(wordId);
  if (!word || !entry) {
    showToast("未找到可保存词条");
    return;
  }
  const nextValues = {
    japanese: form.japanese.trim(),
    kana: form.kana.trim(),
    meaning: form.meaning.trim(),
    example: form.example.trim(),
    translation: form.translation.trim(),
    part: form.part.trim() || "名词",
  };
  const isSelfBuilt = Boolean(word.createdByUser || entry.createdByUser || word.level === "自建");
  if (isSelfBuilt) {
    Object.assign(word, nextValues, { createdByUser: true });
    state.favoriteBook[wordId] = {
      ...entry,
      collectionId: collection.id,
      createdByUser: true,
      favoriteCount: Number(entry.favoriteCount || 1),
    };
  } else {
    const wordIds = state.words.map((item) => Number(item.id || 0)).filter((value) => Number.isFinite(value));
    const newId = (wordIds.length ? Math.max(...wordIds) : 0) + 1;
    state.words.push({
      id: newId,
      ...nextValues,
      level: "自建",
      tags: [],
      status: "published",
      version: 1,
      access: state.isPaid ? "member" : "free",
      createdByUser: true,
    });
    delete state.favoriteBook[wordId];
    state.favoriteBook[newId] = {
      addedAt: Number(entry.addedAt || Date.now()),
      collectionId: collection.id,
      createdByUser: true,
      favoriteCount: Number(entry.favoriteCount || 1),
    };
  }
  setFavoriteSelectedCollectionId(collection.id);
  state.favoriteWordFormCollectionId = collection.id;
  state.favoriteWordFormMode = "create";
  state.favoriteWordFormWordId = 0;
  state.favoriteWordForm = defaultFavoriteWordForm();
  state.learnerView = "favorites";
  showToast(`已保存词条：${nextValues.japanese}`);
}

function learnerWordTable(words) {
  return `
    <table>
      <thead><tr><th>日文</th><th>中文</th><th>等级</th><th>例句</th><th>会员</th><th>操作</th></tr></thead>
      <tbody>
        ${words.map((word) => `
          <tr>
            <td><div class="jp">${word.japanese}</div><div class="kana">${word.kana}</div></td>
            <td>${word.meaning}<div class="muted">${word.tags.join(" / ")}</div></td>
            <td>${word.level}<br><span class="muted">${word.part}</span></td>
            <td>${word.example}<div class="muted">${word.translation}</div></td>
            <td><span class="badge ${word.status}">${statusLabels[word.status]}</span><div class="muted">v${word.version} · ${word.access === "member" ? "会员" : "免费"}</div></td>
            <td><button class="btn primary" data-word="${word.id}" data-action="mark-due">${withButtonIcon("重新安排", "🕒")}</button></td>
          </tr>
        `).join("") || '<tr><td colspan="6" class="muted">暂无数据</td></tr>'}
      </tbody>
    </table>
  `;
}

function bindEvents() {
  if (!pressFeedbackBound && app) {
    pressFeedbackBound = true;
    app.addEventListener("pointerdown", (event) => {
      const button = event.target && event.target.closest ? event.target.closest("button") : null;
      if (!button || button.disabled || !app.contains(button)) return;
      button.classList.add("pressed");
    }, { passive: true });
    const clearPressedButtons = () => {
      app.querySelectorAll("button.pressed").forEach((button) => {
        button.classList.remove("pressed");
      });
    };
    app.addEventListener("pointerup", clearPressedButtons, { passive: true });
    app.addEventListener("pointercancel", clearPressedButtons, { passive: true });
    app.addEventListener("pointerleave", clearPressedButtons);
    app.addEventListener("pointerout", (event) => {
      const button = event.target && event.target.closest ? event.target.closest("button") : null;
      if (!button || !app.contains(button)) return;
      button.classList.remove("pressed");
    }, { passive: true });
    window.addEventListener("blur", clearPressedButtons);
  }
  document.querySelectorAll("[data-learner-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.learnerView = button.dataset.learnerView;
      if (state.learnerView === "study") {
        state.inStudySession = false;
        stopAutoplayPlayback();
        state.challengeResult = "";
        state.challengeRetryInput = "";
        state.challengeRetryTyping = false;
        window.clearTimeout(challengeTimer);
        clearTapReadTimers();
      }
      saveState(state);
      render();
    });
  });
  document.querySelectorAll("[data-review]").forEach((button) => {
    button.addEventListener("click", () => {
      const actionType = button.dataset.review;
      const queue = autoplayWords();
      const reviewWordId = Number(button.dataset.word || 0);
      const current = reviewWordId
        ? queue.find((word) => word.id === reviewWordId) || state.words.find((word) => word.id === reviewWordId)
        : queue[state.autoplayIndex % Math.max(queue.length, 1)];
      if (current && actionType === "wrong") recordVocabBook(current.id, "forgotten");
      if (current && actionType === "hard") recordVocabBook(current.id, "fuzzy");
      gradeStudyWord(actionType, "autoplay", current);
      if (actionType === "correct") {
        moveAutoplay(1);
        resetAutoplayCountdown();
        saveState(state);
        render();
        return;
      } else {
        keepAutoplayAnswerVisible();
        saveState(state);
        if (current) showToast(`${current.japanese} 已经记录到生词本`);
        return;
      }
    });
  });
  document.querySelectorAll("[data-kana]").forEach((button) => {
    button.addEventListener("click", () => appendChallengeKana(button.dataset.kana));
  });
  const tapReadContainer = document.querySelector(".study-layout");
  if (tapReadContainer) {
    tapReadContainer.addEventListener("pointerup", (event) => {
      const target = event.target;
      if (!target || !target.closest) return;
      const keyButton = target.closest("[data-tapread-index]");
      if (!keyButton) return;
      if (keyButton.disabled) return;
      const index = keyButton.dataset.tapreadIndex;
      if (!index) return;
      appendTapReadKana(Number(index));
      event.preventDefault();
    });
  }
  document.querySelectorAll("[data-speak]").forEach((button) => {
    button.addEventListener("click", () => speakJapanese(button.dataset.speak));
  });
  document.querySelectorAll("[data-favorite-word-field]").forEach((field) => {
    field.addEventListener("input", () => {
      updateFavoriteWordFormField(field.dataset.favoriteWordField, field.value);
      if (field.dataset.favoriteWordField === "japanese") syncFavoriteWordFormDom();
      saveState(state);
    });
  });
  document.querySelectorAll("[data-modal-stop]").forEach((node) => {
    node.addEventListener("click", (event) => event.stopPropagation());
  });
  document.querySelectorAll("[data-action]").forEach((node) => node.addEventListener("click", handleAction));
  clearKanaInputFocus();
}

function clearKanaInputFocus() {
  const focusedKanaButton = document.querySelector(".tapread-pad .kana-key:focus, .kana-pad .kana-key:focus");
  if (focusedKanaButton && focusedKanaButton.blur) focusedKanaButton.blur();
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  const wordId = Number(event.currentTarget.dataset.word);
  const bundleId = event.currentTarget.dataset.bundle;
  const courseId = Number(event.currentTarget.dataset.course);
  const chapterId = event.currentTarget.dataset.chapter;
  const nextMode = event.currentTarget.dataset.nextMode;
  const collectionId = event.currentTarget.dataset.collection;
  const targetCollectionId = event.currentTarget.dataset.target;
  if (action === "toggle-paid") {
    state.isPaid = !state.isPaid;
    state.autoplayIndex = 0;
    saveState(state);
    showToast(state.isPaid ? "切换到会员版" : "切换到免费版");
    return;
  }
  if (action === "study-mode") {
    state.studyMode = event.currentTarget.dataset.modeValue;
    state.reviewRevealed = false;
    if (state.studyMode !== "tapread") {
      state.tapReadCompletedAt = 0;
    }
    if (state.studyMode === "challenge") {
      stopAutoplayPlayback();
      clearTapReadTimers();
      ensureChallengeStarted();
      clearKanaInputFocus();
    } else if (state.studyMode === "tapread") {
      stopAutoplayPlayback();
      window.clearTimeout(challengeTimer);
      ensureTapReadStarted();
      clearKanaInputFocus();
    } else {
      window.clearTimeout(challengeTimer);
      clearTapReadTimers();
      state.challengeResult = "";
    }
    saveState(state);
  }
  if (action === "autoplay-toggle") {
    toggleAutoplayPlayback();
    resetAutoplayCountdown();
  }
  if (action === "autoplay-prev") {
    moveAutoplay(-1);
    resetAutoplayCountdown();
  }
  if (action === "autoplay-next") {
    moveAutoplay(1);
    resetAutoplayCountdown();
  }
  if (action === "autoplay-speed") {
    state.autoplaySpeed = Number(event.currentTarget.dataset.speed);
    resetAutoplayCountdown();
  }
  if (action === "autoplay-order") {
    state.autoplayOrder = event.currentTarget.dataset.order;
    resetAutoplayWordOrder();
    state.autoplayIndex = 0;
    resetAutoplayCountdown();
  }
  if (action === "tapread-order") {
    state.tapReadOrder = event.currentTarget.dataset.order;
    resetTapRead();
  }
  if (action === "challenge-order") {
    state.challengeOrder = event.currentTarget.dataset.order;
    resetChallenge();
  }
  if (action === "toggle-autoplay-next-chapter") {
    state.autoplayAutoNextChapter = event.currentTarget.checked;
    resetAutoplayCountdown();
  }
  if (action === "toggle-autoplay-delay") {
    state.autoplayDelayReveal = event.currentTarget.checked;
    resetAutoplayCountdown();
  }
  if (action === "toggle-autoplay-speak") {
    state.autoplayAutoSpeak = event.currentTarget.checked;
    autoSpeakLastKey = "";
  }
  if (action === "toggle-tapread-speak") {
    state.tapReadAutoSpeak = event.currentTarget.checked;
    autoSpeakLastKey = "";
  }
  if (action === "toggle-challenge-speak") {
    state.challengeAutoSpeak = event.currentTarget.checked;
  }
  if (action === "open-chapter-picker") {
    state.chapterPickerCourseId = courseId;
  }
  if (action === "open-current-chapter-picker") {
    state.chapterPickerCourseId = state.activeCourseId;
  }
  if (action === "close-chapter-picker") {
    state.chapterPickerCourseId = null;
  }
  if (action === "open-favorite-session-picker") {
    state.favoriteSessionPickerOpen = true;
  }
  if (action === "close-favorite-session-picker") {
    state.favoriteSessionPickerOpen = false;
  }
  if (action === "switch-favorite-session") {
    state.favoriteSessionPickerOpen = false;
    const targetCollection = getFavoriteCollection(collectionId);
    if (targetCollection) startFavoriteCollection(targetCollection.id, state.studyMode || "autoplay");
  }
  if (action === "open-vocab-book-session-picker") {
    state.vocabBookSessionPickerOpen = true;
  }
  if (action === "close-vocab-book-session-picker") {
    state.vocabBookSessionPickerOpen = false;
  }
  if (action === "switch-vocab-book-session") {
    state.vocabBookSessionPickerOpen = false;
    startVocabBookBundle(bundleId);
  }
  if (action === "back-to-courses") {
    state.inStudySession = false;
    stopAutoplayPlayback();
    state.challengeResult = "";
    window.clearTimeout(challengeTimer);
    clearTapReadTimers();
    state.vocabBookSessionBundleId = "";
  }
  if (action === "add-sample-due") addSampleDue();
  if (action === "restart-challenge") resetChallenge();
  if (action === "restart-tapread") resetTapRead();
  if (action === "continue-next-chapter") continueNextChapter(nextMode);
  if (action === "challenge-reveal-answer") revealChallengeAnswer();
  if (action === "favorite-word") favoriteWord(wordId);
  if (action === "remove-favorite") removeFavoriteWord(wordId);
  if (action === "open-move-favorite-word") {
    state.favoriteMoveWordId = wordId;
  }
  if (action === "close-move-favorite-word") {
    state.favoriteMoveWordId = 0;
  }
  if (action === "start-course") startCourse(courseId);
  if (action === "start-chapter") startChapter(courseId, chapterId);
  if (action === "open-vocab-book") {
    state.inStudySession = false;
    state.vocabBookSessionBundleId = "";
    const vocabBookBundles = getVocabBookBundles();
    const hasBundle = bundleId && vocabBookBundles.some((bundle) => bundle.id === bundleId);
    state.vocabBookListBundleId = hasBundle ? bundleId : (vocabBookBundles[0]?.id || "");
    stopAutoplayPlayback();
    state.challengeResult = "";
    window.clearTimeout(challengeTimer);
    clearTapReadTimers();
    state.learnerView = "mistakes";
  }
  if (action === "open-favorites") {
    state.learnerView = "favorites";
    state.inStudySession = false;
    if (collectionId) setFavoriteSelectedCollectionId(collectionId);
    state.favoriteCollectionMenuId = "";
    state.favoriteCreateMenuOpen = false;
    saveState(state);
  }
  if (action === "start-vocab-book") startVocabBookBundle(bundleId, { mode: "autoplay" });
  if (action === "toggle-vocab-book-bundle-menu") {
    state.vocabBookBundleMenuId = state.vocabBookBundleMenuId === bundleId ? "" : bundleId;
  }
  if (action === "rename-vocab-book-bundle") {
    renameVocabBookBundle(bundleId);
  }
  if (action === "delete-vocab-book-bundle") deleteVocabBookBundle(bundleId);
  if (action === "practice-mistakes" || action === "practice-vocab-book") practiceVocabBook();
  if (action === "practice-favorites") practiceFavorites(collectionId);
  if (action === "mark-due") markDue(wordId);
  if (action === "remember-vocab-word") rememberVocabWord(wordId);
  if (action === "select-favorite-collection") {
    setFavoriteSelectedCollectionId(collectionId);
    state.favoriteCollectionMenuId = "";
    state.favoriteCreateMenuOpen = false;
  }
  if (action === "toggle-favorite-create-menu") {
    state.favoriteCreateMenuOpen = !state.favoriteCreateMenuOpen;
    state.favoriteCollectionMenuId = "";
  }
  if (action === "toggle-favorite-collection-menu") {
    const collection = getFavoriteCollection(collectionId);
    state.favoriteCollectionMenuId =
      collection?.editable && state.favoriteCollectionMenuId !== collection.id ? collection.id : "";
    if (state.favoriteCollectionMenuId) state.favoriteCreateMenuOpen = false;
  }
  if (action === "close-favorite-collection-menu") {
    state.favoriteCollectionMenuId = "";
  }
  if (action === "create-favorite-collection") {
    state.favoriteCreateMenuOpen = false;
    createFavoriteCollection();
  }
  if (action === "rename-favorite-collection") {
    state.favoriteCollectionMenuId = "";
    renameFavoriteCollection(collectionId);
  }
  if (action === "delete-favorite-collection") {
    state.favoriteCollectionMenuId = "";
    deleteFavoriteCollection(collectionId);
  }
  if (action === "start-favorite-collection") {
    const mode = event.currentTarget.dataset.mode || "autoplay";
    const targetCollection = getFavoriteCollection(collectionId);
    if (targetCollection) startFavoriteCollection(targetCollection.id, mode);
  }
  if (action === "start-favorites") {
    startFavoriteCollection(FAVORITE_DEFAULT_COLLECTION_ID, "autoplay");
  }
  if (action === "practice-favorite-collection") {
    const targetCollection = getFavoriteCollection(collectionId);
    if (targetCollection) startFavoriteCollection(targetCollection.id, "autoplay");
  }
  if (action === "move-favorite-word") {
    moveFavoriteWord(wordId, targetCollectionId);
    state.favoriteMoveWordId = 0;
  }
  if (action === "add-favorite-word") {
    openFavoriteWordForm(collectionId);
  }
  if (action === "cancel-favorite-word-form") {
    cancelFavoriteWordForm();
  }
  if (action === "preview-favorite-word-form") {
    previewFavoriteWordForm();
  }
  if (action === "save-favorite-word-form") {
    saveFavoriteWordForm();
  }
  if (action === "edit-favorite-word") {
    editFavoriteWord(wordId);
  }
  saveState(state);
  render();
}

function gradeStudyWord(result, source, targetWord = null) {
  const queue = source === "challenge" ? challengeWords() : autoplayWords();
  const index = source === "challenge" ? state.challengeIndex : state.autoplayIndex;
  const current = targetWord || queue[index % Math.max(queue.length, 1)];
  if (!current) return;
  const progress = state.progress[current.id] || defaultProgress();
  const wasMastered = Boolean(progress.wasMastered);
  if (result === "correct") {
    const nextBox = Math.min(5, Number(progress.box || 0) + 1);
    progress.correct += 1;
    progress.box = nextBox;
    progress.due = false;
    if (!wasMastered && progress.box >= 3) {
      progress.wasMastered = true;
      state.learner.mastered += 1;
    } else if (typeof progress.wasMastered !== "boolean") {
      progress.wasMastered = wasMastered;
    }
    state.learner.xp += 12;
  } else if (result === "hard") {
    progress.correct += 1;
    progress.box = Math.max(1, progress.box);
    progress.due = true;
    state.learner.xp += 6;
  } else {
    progress.wrong += 1;
    progress.box = 0;
    progress.due = true;
    state.learner.xp += 2;
  }
  progress.lastResult = result === "correct" ? "correct" : "wrong";
  state.progress[current.id] = progress;
  touchStudyDay(result === "correct", result === "wrong");
}

function recordVocabBook(wordId, reason) {
  if (!wordId) return;
  const current = normalizeVocabBookEntry(state.vocabBook[wordId]);
  if (reason === "forgotten") current.forgottenCount += 1;
  if (reason === "fuzzy") current.fuzzyCount += 1;
  if (reason === "reveal") current.revealCount += 1;
  if (reason === "typo") current.typoCount += 1;
  current.lastReason = reason;
  current.lastAddedAt = Date.now();
  state.vocabBook[wordId] = current;
  ensureVocabBundleAssignments();
}

function favoriteWord(wordId) {
  const word = state.words.find((item) => item.id === wordId);
  if (!word || (word.access === "member" && !state.isPaid)) return;
  const existing = getFavoriteEntry(wordId);
  state.favoriteBook[wordId] = {
    ...(existing || {}),
    addedAt: Date.now(),
    collectionId: existing?.collectionId || FAVORITE_DEFAULT_COLLECTION_ID,
    createdByUser: Boolean(existing?.createdByUser),
    favoriteCount: Number(existing?.favoriteCount || 0) + 1,
  };
  showToast(`${word.japanese} 已收藏`);
}

function removeFavoriteWord(wordId) {
  const word = state.words.find((item) => item.id === wordId);
  if (!word || !state.favoriteBook[wordId]) return;
  delete state.favoriteBook[wordId];
  if (Number(state.favoriteMoveWordId || 0) === Number(wordId)) state.favoriteMoveWordId = 0;
  showToast(`${word.japanese} 已移除收藏`);
}

function createFavoriteCollection() {
  const collections = getFavoriteCollections();
  const customCount = collections.filter((item) => item.id !== FAVORITE_DEFAULT_COLLECTION_ID).length;
  if (customCount >= FAVORITE_MAX_CUSTOM_COLLECTIONS) {
    showToast("已达最大自建收藏上限");
    return;
  }
  const nextIndex = customCount + 1;
  const name = (window.prompt(`请输入收藏本名称`, `我的收藏本${nextIndex}`) || "").trim();
  if (!name) return;
  const id = `${FAVORITE_SELF_BUILT_PREFIX}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  state.favoriteCollections = collections.concat([{
    id,
    name,
    createdAt: Date.now(),
    editable: true,
  }]).slice(0, 1 + FAVORITE_MAX_CUSTOM_COLLECTIONS);
  ensureFavoriteDefaults();
  setFavoriteSelectedCollectionId(id);
  state.favoriteListCollectionId = id;
  state.favoriteCollectionMenuId = "";
  state.favoriteCreateMenuOpen = false;
  showToast(`已创建收藏本：${name}`);
}

function renameFavoriteCollection(collectionId) {
  const collection = getFavoriteCollection(collectionId);
  if (!collection || collection.id === FAVORITE_DEFAULT_COLLECTION_ID || !collection.editable) return;
  const nextName = (window.prompt("请输入新的收藏本名称", collection.name) || "").trim();
  if (!nextName) return;
  const nextCollections = getFavoriteCollections();
  const index = nextCollections.findIndex((item) => item.id === collection.id);
  if (index < 0) return;
  nextCollections[index] = { ...nextCollections[index], name: nextName };
  state.favoriteCollections = nextCollections;
  setFavoriteSelectedCollectionId(collection.id);
  showToast(`收藏本已重命名：${nextName}`);
}

function deleteFavoriteCollection(collectionId) {
  const collection = getFavoriteCollection(collectionId);
  if (!collection || collection.id === FAVORITE_DEFAULT_COLLECTION_ID) return;
  if (!window.confirm(`确认删除词库 ${collection.name}？`)) return;
  Object.entries(state.favoriteBook || {}).forEach(([wordId, raw]) => {
    const entry = normalizeFavoriteEntry(raw);
    if (entry && entry.collectionId === collection.id) {
      state.favoriteBook[Number(wordId)] = {
        ...entry,
        collectionId: FAVORITE_DEFAULT_COLLECTION_ID,
      };
    }
  });
  state.favoriteCollections = getFavoriteCollections().filter((item) => item.id !== collection.id);
  if (state.favoriteListCollectionId === collection.id) state.favoriteListCollectionId = FAVORITE_DEFAULT_COLLECTION_ID;
  if (state.favoriteSessionCollectionId === collection.id) state.favoriteSessionCollectionId = "";
  if (state.favoriteCollectionMenuId === collection.id) state.favoriteCollectionMenuId = "";
  showToast(`已删除词库：${collection.name}`);
}

function moveFavoriteWord(wordId, targetCollectionId) {
  const target = getFavoriteCollection(targetCollectionId);
  if (!target || !state.favoriteBook[wordId]) return;
  const currentEntry = getFavoriteEntry(wordId);
  if (!currentEntry || currentEntry.collectionId === target.id) return;
  state.favoriteBook[wordId] = {
    addedAt: Number(currentEntry.addedAt || Date.now()),
    collectionId: target.id,
    createdByUser: Boolean(currentEntry.createdByUser),
    favoriteCount: Number(currentEntry.favoriteCount || 1),
  };
  showToast("词条已移动到目标词库");
}

function addFavoriteWord(collectionId = FAVORITE_DEFAULT_COLLECTION_ID) {
  openFavoriteWordForm(collectionId);
}

function editFavoriteWord(wordId) {
  openFavoriteWordEditForm(wordId);
}

function startFavoriteCollection(collectionId, mode = "autoplay", options = {}) {
  const collection = getFavoriteCollection(collectionId);
  const words = getFavoriteCollectionWords(collection.id, { includeRemembered: true });
  if (!words.length) {
    showToast(`${collection.name} 词库为空`);
    return;
  }
  state.favoriteSessionCollectionId = collection.id;
  state.favoriteSessionPickerOpen = false;
  state.favoriteListCollectionId = collection.id;
  state.vocabBookSessionBundleId = "";
  state.inStudySession = true;
  state.learnerView = "study";
  state.studyMode = ["autoplay", "tapread", "challenge"].includes(mode) ? mode : "autoplay";
  state.activeCourseId = state.courses?.[0]?.id || 1;
  state.activeChapterId = favoriteCollectionChapterId(collection.id);
  state.chapterPickerCourseId = null;
  state.autoplayIndex = 0;
  state.challengeIndex = 0;
  state.challengeCorrect = 0;
  state.challengeWrong = 0;
  state.challengeLives = 5;
  state.challengeStartedAt = 0;
  state.challengeEndedAt = 0;
  state.challengeStatus = "active";
  state.challengeResult = "";
  state.challengeInput = "";
  state.challengeRetryInput = "";
  state.challengeRetryTyping = false;
  state.challengeRevealAttempt = false;
  state.tapReadIndex = 0;
  state.tapReadInput = "";
  state.tapReadStep = 0;
  state.tapReadClearedKeys = [];
  state.tapReadWrongKey = null;
  state.tapReadCompletedAt = 0;
  state.challengeWordIds = words.map((word) => word.id);
  state.tapReadWordIds = words.map((word) => word.id);
  state.autoplayWordIds = words.map((word) => word.id);
  state.favoriteListCollectionId = collection.id;
  words.forEach((word) => {
    state.progress[word.id] = { ...(state.progress[word.id] || defaultProgress()), due: true };
  });
  if (!options.keepPlaying) stopAutoplayPlayback();
  clearTapReadTimers();
  window.clearTimeout(challengeTimer);
  resetAutoplayWordOrder();
  resetChallenge();
  resetTapRead();
  if (options.keepPlaying && state.studyMode === "autoplay") {
    state.autoplayPlaying = true;
    resetAutoplayCountdown();
    syncAutoplayTimer();
  }
  showToast(`开始收藏学习：${collection.name}`);
}
function ensureChallengeStarted() {
  if (state.challengeStartedAt && state.challengeStatus === "active" && state.challengeWordIds.length) return;
  resetChallenge();
}

function resetChallenge() {
  resetChallengeWordOrder();
  const words = challengeSourceWords();
  state.challengeWordIds = words.map((word) => word.id);
  state.challengeInput = "";
  state.challengeResult = "";
  state.challengeRetryInput = "";
  state.challengeRetryTyping = false;
  state.challengeRevealAttempt = false;
  state.challengeLives = 5;
  state.challengeIndex = 0;
  state.challengeCorrect = 0;
  state.challengeWrong = 0;
  state.challengeStartedAt = Date.now();
  state.challengeEndedAt = 0;
  state.challengeStatus = "active";
  state.challengeSeed = randomChallengeSeed();
}

function ensureTapReadStarted() {
  if (state.tapReadCompletedAt) return;
  const words = tapReadWords();
  if (!words.length || state.tapReadIndex >= words.length) resetTapRead();
}

function resetTapRead() {
  clearTapReadTimers();
  resetTapReadWordOrder();
  state.tapReadIndex = 0;
  state.tapReadInput = "";
  state.tapReadStep = 0;
  state.tapReadClearedKeys = [];
  state.tapReadWrongKey = null;
  state.tapReadCorrect = 0;
  state.tapReadTotal = 0;
  state.tapReadCurrentWordWrong = false;
  state.tapReadLastTapAt = 0;
  state.tapReadCompletedAt = 0;
}

function clearTapReadTimers() {
  tapReadTimers.forEach((item) => {
    window.clearTimeout(item.id || item);
  });
  tapReadTimers = [];
}

function scheduleTapReadWrongClear(index, wordId) {
  let timerId;
  timerId = window.setTimeout(() => {
    tapReadTimers = tapReadTimers.filter((item) => item.id !== timerId);
    const currentWord = tapReadWords()[state.tapReadIndex];
    if (!currentWord || currentWord.id !== wordId) return;
    if (state.tapReadWrongKey === index) {
      state.tapReadWrongKey = null;
      saveState(state);
      render();
    }
  }, 360);
  tapReadTimers.push({ id: timerId, kind: "wrong", index, wordId });
}

function appendTapReadKana(index) {
  if (state.studyMode !== "tapread" || state.tapReadCompletedAt) return;
  const now = Date.now();
  if (now - state.tapReadLastTapAt < TAPREAD_DOUBLE_TAP_GUARD_MS) return;
  state.tapReadLastTapAt = now;
  const current = tapReadWords()[state.tapReadIndex];
  if (!current) return;
  const chars = Array.from(current.kana || "");
  const cleared = new Set(state.tapReadClearedKeys || []);
  cleared.add(index);
  if (index !== state.tapReadStep) {
    state.tapReadWrongKey = index;
    state.tapReadCurrentWordWrong = true;
    saveState(state);
    render();
    scheduleTapReadWrongClear(index, current.id);
    return;
  }
  state.tapReadWrongKey = null;
  state.tapReadClearedKeys = [...cleared];
  state.tapReadInput += chars[index] || "";
  state.tapReadStep += 1;
  saveState(state);
  render();
  finishTapReadKey(current.id);
}

function finishTapReadKey(wordId) {
  const current = tapReadWords()[state.tapReadIndex];
  if (!current || current.id !== wordId) return;
  const targetLength = Array.from(current?.kana || "").length;
  if (state.tapReadStep >= targetLength) {
    advanceTapReadAfterWord();
    return;
  }
  saveState(state);
  render();
}

function advanceTapReadAfterWord() {
  const words = tapReadWords();
  const isCurrentWordCorrect = !state.tapReadCurrentWordWrong;
  state.tapReadTotal += 1;
  if (isCurrentWordCorrect) state.tapReadCorrect += 1;
  touchStudyDay(isCurrentWordCorrect, !isCurrentWordCorrect);
  if (state.tapReadIndex + 1 >= words.length) {
    state.tapReadCompletedAt = Date.now();
    recordChapterStars(2);
  } else {
    state.tapReadIndex += 1;
    state.tapReadInput = "";
    state.tapReadStep = 0;
    state.tapReadClearedKeys = [];
    state.tapReadWrongKey = null;
    state.tapReadCurrentWordWrong = false;
  }
  saveState(state);
  render();
}

function appendChallengeKana(char) {
  if (state.challengeStatus !== "active") return;
  const isWrong = state.challengeResult === "wrong";
  const current = challengeWords()[state.challengeIndex];
  if (!current) return;
  state.challengeRevealAttempt = false;
  const target = current.kana.length;
  const baseInput = isWrong ? state.challengeRetryInput : state.challengeInput;
  const next = `${baseInput}${char}`.slice(0, target);
  if (isWrong) {
    state.challengeRetryTyping = true;
    state.challengeRetryInput = next;
    if (next.length >= target) resolveChallengeAnswer(next);
  } else {
    state.challengeInput = next;
    if (next.length >= target) resolveChallengeAnswer(next);
  }
  saveState(state);
  render();
}

function resolveChallengeAnswer(input) {
  const current = challengeWords()[state.challengeIndex];
  if (!current) return;
  const correct = input === current.kana;
  state.challengeResult = correct ? "correct" : "wrong";
  state.challengeInput = input;
  if (correct) {
    state.challengeCorrect += 1;
    state.challengeRetryInput = "";
    state.challengeRetryTyping = false;
    gradeStudyWord("correct", "challenge");
    if (state.challengeAutoSpeak && !state.challengeRevealAttempt) {
      speakJapanese(current.japanese, true);
    }
  } else {
    state.challengeWrong += 1;
    state.challengeInput = input;
    state.challengeRetryInput = "";
    state.challengeRetryTyping = false;
    state.challengeLives = Math.max(0, state.challengeLives - 1);
    recordVocabBook(current.id, state.challengeRevealAttempt ? "reveal" : "typo");
    gradeStudyWord("wrong", "challenge");
    if (state.challengeLives <= 0) {
      failChallenge();
    }
  }
  window.clearTimeout(challengeTimer);
  if (correct) {
    challengeTimer = window.setTimeout(advanceChallengeAfterFeedback, 800);
  } else {
    challengeTimer = null;
  }
}

function revealChallengeAnswer() {
  if (state.challengeStatus !== "active" || state.challengeResult === "correct") return;
  const current = challengeWords()[state.challengeIndex];
  if (!current) return;
  showToast("已显示答案，继续输入");
  state.challengeRevealAttempt = true;
  resolveChallengeAnswer("");
}

function advanceChallengeAfterFeedback() {
  const total = challengeWords().length;
  state.challengeInput = "";
  state.challengeRetryInput = "";
  state.challengeResult = "";
  state.challengeRetryTyping = false;
  state.challengeRevealAttempt = false;
  if (state.challengeLives <= 0) {
    failChallenge();
  } else if (state.challengeIndex + 1 >= total) {
    state.challengeStatus = "passed";
    state.challengeEndedAt = Date.now();
    recordChapterChallengeStars();
  } else {
    state.challengeIndex += 1;
  }
  saveState(state);
  render();
}

function failChallenge() {
  state.challengeStatus = "failed";
  state.challengeEndedAt = Date.now();
}

function recordChapterChallengeStars() {
  return recordChapterStars(challengeStarsForLives(state.challengeLives));
}

function challengeStarsForLives(lives) {
  if (lives >= 5) return 5;
  if (lives >= 3) return 4;
  return 3;
}

function recordChapterStars(stars) {
  const chapterId = currentStudyScopeChapterId();
  if (!chapterId) return;
  const nextStars = Math.max(1, Math.min(5, Number(stars || 0)));
  const previous = state.chapterProgress[chapterId] || {};
  state.chapterProgress[chapterId] = {
    ...previous,
    stars: nextStars,
    bestStars: Math.max(Number(previous.bestStars || 0), nextStars),
    lastCompletedAt: Date.now(),
  };
}

function currentStudyScopeChapterId() {
  if (isFavoriteSession()) return favoriteCollectionChapterId(state.favoriteSessionCollectionId);
  if (isVocabBookSession()) return vocabBookBundleChapterId(state.vocabBookSessionBundleId);
  return state.activeChapterId;
}

function renderChapterStars(chapterId) {
  const bestStars = Math.max(0, Math.min(5, Number(state.chapterProgress[chapterId]?.bestStars || 0)));
  const earned = "★".repeat(bestStars);
  const empty = "☆".repeat(5 - bestStars);
  return `<span class="chapter-stars" aria-label="掌握指数 ${bestStars} / 5 星"><span class="chapter-stars-label">掌握指数</span><span class="chapter-stars-value">${earned}<span>${empty}</span></span></span>`;
}

function renderSessionScopeStars(chapterId = currentStudyScopeChapterId()) {
  const bestStars = Math.max(0, Math.min(5, Number(state.chapterProgress[chapterId]?.bestStars || 0)));
  const earned = "★".repeat(bestStars);
  const empty = "☆".repeat(5 - bestStars);
  return `<span class="session-scope-stars" aria-label="已获得 ${bestStars} / 5 星">${earned}<span>${empty}</span></span>`;
}

function favoriteCollectionChapterId(collectionId) {
  return `favorite-collection:${collectionId || FAVORITE_DEFAULT_COLLECTION_ID}`;
}

function vocabBookBundleChapterId(bundleId) {
  return `vocab-book:${bundleId || ""}`;
}

function challengeSummary(total) {
  const answered = state.challengeCorrect + state.challengeWrong;
  const safeTotal = Math.max(total || state.challengeWordIds.length || answered, 1);
  const accuracy = Math.round((state.challengeCorrect / Math.max(answered, 1)) * 100);
  const score = Math.max(0, state.challengeCorrect * 100 - state.challengeWrong * 30 + state.challengeLives * 50);
  const end = state.challengeEndedAt || Date.now();
  const start = state.challengeStartedAt || end;
  const seconds = Math.max(0, Math.round((end - start) / 1000));
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return {
    accuracy,
    score,
    duration: `${minutes}:${String(rest).padStart(2, "0")}`,
    total: safeTotal,
  };
}

function challengeWords() {
  const ids = new Set(state.challengeWordIds);
  if (isFavoriteSession()) {
    const favoriteWords = getFavoriteCollectionWords(state.favoriteSessionCollectionId, { includeRemembered: true });
    const favoriteIds = new Set(favoriteWords.map((word) => word.id));
    const byId = new Map(favoriteWords.map((word) => [word.id, word]));
    return state.challengeWordIds
      .map((id) => byId.get(id))
      .filter((word) => word && ids.has(word.id) && favoriteIds.has(word.id) && word.status === "published");
  }
  if (isVocabBookSession()) {
    const vocabWords = getVocabBookBundleWords(state.vocabBookSessionBundleId, true);
    const vocabIds = new Set(vocabWords.map((word) => word.id));
    const byId = new Map(vocabWords.map((word) => [word.id, word]));
    return state.challengeWordIds
      .map((id) => byId.get(id))
      .filter((word) => word && ids.has(word.id) && vocabIds.has(word.id) && word.status === "published");
  }
  const byId = new Map(state.words.map((word) => [word.id, word]));
  return state.challengeWordIds
    .map((id) => byId.get(id))
    .filter((word) => word && ids.has(word.id) && word.status === "published" && (state.isPaid || word.access === "free"));
}

function challengeSourceWords() {
  const due = dueWords();
  return orderedModeWords(due.length ? due : studyWords(), state.challengeOrder, "challenge");
}

function tapReadWords() {
  return orderedModeWords(studyWords(), state.tapReadOrder, "tapRead");
}

function orderedModeWords(words, order, mode) {
  if (order !== "random") return words;
  const key = modeOrderKey(mode, words);
  const idsField = mode === "challenge" ? "challengeWordIds" : "tapReadWordIds";
  const keyField = mode === "challenge" ? "challengeOrderKey" : "tapReadOrderKey";
  if (state[keyField] !== key || state[idsField].length !== words.length) {
    const random = seededRandom(`${Date.now()}-${key}`);
    state[idsField] = randomShuffle(words.map((word) => word.id), random);
    state[keyField] = key;
  }
  const byId = new Map(words.map((word) => [word.id, word]));
  return state[idsField].map((id) => byId.get(id)).filter(Boolean);
}

function modeOrderKey(mode, words) {
  const sessionScope = isFavoriteSession()
    ? `fav:${state.favoriteSessionCollectionId}`
    : isVocabBookSession()
      ? `vocab:${state.vocabBookSessionBundleId}`
      : `${state.activeCourseId}:${state.activeChapterId}`;
  return `${mode}:${sessionScope}:${words.map((word) => word.id).join(",")}`;
}

function resetTapReadWordOrder() {
  state.tapReadWordIds = [];
  state.tapReadOrderKey = "";
}

function resetChallengeWordOrder() {
  state.challengeOrderKey = "";
}

const baseKanaPool = [
  ...Array.from("あいうえおぁぃぅぇぉかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁぃぅぇぉゃゅょー"),
  ...Array.from("っゃゅょ"),
].filter(Boolean);

const kanaConfusionGroups = [
  ["あ", "ぁ"], ["い", "ぃ"], ["う", "ぅ"], ["え", "ぇ"], ["お", "ぉ"],
  ["か", "が"], ["き", "ぎ"], ["く", "ぐ"], ["け", "げ"], ["こ", "ご"],
  ["さ", "ざ"], ["し", "じ"], ["す", "ず"], ["せ", "ぜ"], ["そ", "ぞ"],
  ["た", "だ"], ["ち", "ぢ"], ["つ", "づ"], ["て", "で"], ["と", "ど"],
  ["は", "ば", "ぱ"], ["ひ", "び", "ぴ"],
  ["ふ", "ぶ", "ぷ"], ["へ", "べ", "ぺ"], ["ほ", "ぼ", "ぽ"],
  ["や", "ゃ"], ["ゆ", "ゅ"], ["よ", "ょ"],
  ["ら", "り", "る", "れ", "ろ"], ["わ", "を", "ゎ"], ["ん"],
  ["っ", "つ"], ["ー", "〜", "-"],
];

function buildKanaChoices(kana, japanese = "") {
  const chars = Array.from(kana);
  const answerChars = Array.from(new Set(chars));
  const answerSet = new Set(answerChars);
  const isKanaOnlyChallenge = isKanaOnlyWord(japanese);
  const choices = new Set(answerSet);
  const seed = `${state.challengeSeed}:${state.challengeIndex}:${kana}`;
  const random = seededRandom(seed);
  const confusingPool = [];
  chars.forEach((char) => confusingPool.push(...confusingKanaFor(char)));
  if (/[ゃゅょ]/.test(kana)) confusingPool.push("ゃ", "ゅ", "ょ");
  if (/[っ]/.test(kana)) confusingPool.push("っ");
  if (/[ー]/.test(kana)) confusingPool.push("ー", "〜");
  if (/[゛゜]/.test(kana)) confusingPool.push("゛", "゜");

  const uniqueConfusing = Array.from(new Set(confusingPool)).filter((item) => !choices.has(item));
  const confusingCount = Math.min(uniqueConfusing.length, 4 + Math.floor(random() * 7));
  const confusingChoices = randomShuffle(uniqueConfusing, random).slice(0, confusingCount);
  confusingChoices.forEach((item) => choices.add(item));

  const targetCount = Math.max(18, chars.length + 10 + Math.floor(random() * 5));
  const filler = randomShuffle(baseKanaPool.filter((item) => !choices.has(item)), random);
  filler.forEach((item) => {
    if (choices.size < targetCount) choices.add(item);
  });

  if (!isKanaOnlyChallenge) {
    return randomShuffle(Array.from(choices), random).slice(0, targetCount);
  }

  const ordered = [...answerChars];
  for (const item of randomShuffle(Array.from(choices).filter((item) => !answerSet.has(item)), random)) {
    if (ordered.length >= targetCount) break;
    ordered.push(item);
  }
  return ordered;
}

function isKanaOnlyWord(text) {
  const value = String(text || "").trim();
  return /^[\u3040-\u309F\u30A0-\u30FF\u30FB\u30FC]+$/.test(value);
}

function isKanaCharacter(char) {
  return /[\u3040-\u309F\u30A0-\u30FF]/.test(char);
}

function isKanaMixedWord(text) {
  const value = String(text || "");
  return /[\u3040-\u309F\u30A0-\u30FF]/.test(value) && /[\u4E00-\u9FFF]/.test(value);
}

function confusingKanaFor(char) {
  const group = kanaConfusionGroups.find((items) => items.includes(char));
  return group || [];
}

function randomChallengeSeed() {
  return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
}

function seededRandom(seed) {
  let hash = 2166136261;
  Array.from(String(seed)).forEach((char) => {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  return () => {
    hash += 0x6d2b79f5;
    let value = hash;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function randomShuffle(items, random) {
  const values = [...items];
  for (let index = values.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [values[index], values[swapIndex]] = [values[swapIndex], values[index]];
  }
  return values;
}

function dueWords() {
  const words = studyWords();
  return words.filter((word) => state.progress[word.id]?.due || false);
}

function studyWords() {
  if (isFavoriteSession()) {
    const collection = getFavoriteCollection(state.favoriteSessionCollectionId);
    return getFavoriteCollectionWords(collection.id, { includeRemembered: true });
  }
  if (isVocabBookSession()) {
    return getVocabBookBundleWords(state.vocabBookSessionBundleId, true);
  }
  const chapter = activeChapter();
  return chapter ? chapter.words : accessibleWords();
}

function todayCompleted() {
  const today = formatDateKey();
  const todayRecord = state.learner.dailyRecords?.[today];
  if (todayRecord) return Number(todayRecord.reviewed || 0);
  return Object.values(state.progress || {}).filter((item) => item.lastResult).length;
}

function addSampleDue() {
  const next = state.words.find((word) => word.status === "published" && !state.progress[word.id]?.due);
  if (!next) return showToast("当前没有更多待复习词条");
  state.progress[next.id] = { ...(state.progress[next.id] || defaultProgress()), due: true };
  saveState(state);
  showToast(`已将 ${next.japanese} 加入复习队列`);
}

function startCourse(id) {
  state.favoriteSessionCollectionId = "";
  state.vocabBookSessionBundleId = "";
  const course = state.courses.find((item) => item.id === id);
  if (course?.access === "member" && !state.isPaid) return showToast("该课程为付费内容，请先开通会员");
  const chapter = courseChapters(course)[0];
  if (!chapter) return showToast("课程数据异常，请刷新后重试");
  startChapter(id, chapter.id);
}

function startChapter(courseId, chapterId) {
  state.favoriteSessionCollectionId = "";
  state.vocabBookSessionBundleId = "";
  const course = state.courses.find((item) => item.id === courseId);
  if (course?.access === "member" && !state.isPaid) return showToast("该课程为付费内容，请先开通会员");
  const chapter = courseChapters(course).find((item) => item.id === chapterId);
  if (!chapter) return showToast("课程章节不存在，请重新选择");
  state.activeCourseId = courseId;
  state.activeChapterId = chapterId;
  state.chapterPickerCourseId = null;
  state.inStudySession = true;
  state.autoplayIndex = 0;
  stopAutoplayPlayback();
  resetAutoplayWordOrder();
  chapter.words.forEach((word) => {
    state.progress[word.id] = { ...(state.progress[word.id] || defaultProgress()), due: true };
  });
  state.learnerView = "study";
  resetChallenge();
  resetTapRead();
  saveState(state);
  showToast(`已开始学习：${course?.title || "该课程"} / ${chapter.label}`);
}

function practiceVocabBook() {
  const candidates = state.words.filter((word) => {
    const entry = state.vocabBook[word.id];
    return entry && !entry.remembered && word.status === "published" && (state.isPaid || word.access === "free");
  });
  candidates.forEach((word) => {
    state.progress[word.id] = { ...(state.progress[word.id] || defaultProgress()), due: true };
  });
  state.learnerView = "study";
  saveState(state);
  showToast("已添加生词本词条到今日复习");
}

function practiceFavorites(collectionId = FAVORITE_DEFAULT_COLLECTION_ID) {
  const targetCollection = getFavoriteCollection(collectionId);
  const target = targetCollection || getFavoriteCollection(FAVORITE_DEFAULT_COLLECTION_ID);
  const words = getFavoriteCollectionWords(target.id, { includeRemembered: true });
  if (!words.length) {
    showToast(`${target.name} 暂无可练习词条`);
    return;
  }
  startFavoriteCollection(target.id, state.studyMode || "autoplay");
}

function markDue(id) {
  const word = state.words.find((item) => item.id === id);
  if (!word) return;
  if (word.access === "member" && !state.isPaid) return showToast("该课程为付费内容，请先开通会员");
  state.progress[id] = { ...(state.progress[id] || defaultProgress()), due: true };
  saveState(state);
  showToast(`${word.japanese} 已加入复习`);
}

function rememberVocabWord(wordId) {
  ensureVocabBundleAssignments();
  const word = state.words.find((item) => item.id === wordId);
  const entry = state.vocabBook[wordId];
  const wordLabel = word ? word.japanese : `ID ${wordId}`;
  if (!entry) {
    if (word) return showToast(`${wordLabel} 不在生词本中`);
    return showToast("未找到该词条记录");
  }
  const normalized = normalizeVocabBookEntry(entry);
  if (normalized.remembered) {
    showToast(`${wordLabel} 已标记完成`);
    return;
  }
  normalized.remembered = true;
  normalized.rememberedAt = Date.now();
  state.vocabBook[wordId] = normalized;
  const removed = maybeFinalizeVocabBundle(normalized.bundleId);
  if (removed) {
    showToast("该词库已完成，已自动从学习列表移除");
  } else {
    showToast(`${wordLabel} 已标记为完成`);
  }
}
function continueNextChapter(mode = state.studyMode) {
  const next = nextStudyScope();
  if (!next) return;
  state.studyMode = ["autoplay", "tapread", "challenge"].includes(mode) ? mode : state.studyMode;
  if (next.type === "favorite") {
    startFavoriteCollection(next.id, state.studyMode || "autoplay");
    return;
  }
  if (next.type === "vocab") {
    startVocabBookBundle(next.id, { mode: state.studyMode || "autoplay" });
    return;
  }
  startChapter(state.activeCourseId, next.id);
}

function nextChapterForCurrentCourse() {
  const course = state.courses.find((item) => item.id === state.activeCourseId);
  const chapters = courseChapters(course);
  const currentIndex = chapters.findIndex((chapter) => chapter.id === state.activeChapterId);
  return currentIndex >= 0 ? chapters[currentIndex + 1] : null;
}

function nextFavoriteCollectionForCurrent() {
  const collections = getFavoriteCollections().filter((collection) => getFavoriteCollectionWords(collection.id, { includeRemembered: true }).length);
  const currentIndex = collections.findIndex((collection) => collection.id === state.favoriteSessionCollectionId);
  return currentIndex >= 0 ? collections[currentIndex + 1] : null;
}

function nextVocabBookBundleForCurrent() {
  const bundles = getVocabBookBundles().filter((bundle) => bundle.totalCount > 0);
  const currentIndex = bundles.findIndex((bundle) => bundle.id === state.vocabBookSessionBundleId);
  return currentIndex >= 0 ? bundles[currentIndex + 1] : null;
}

function nextStudyScope() {
  if (isFavoriteSession()) {
    const next = nextFavoriteCollectionForCurrent();
    return next ? { type: "favorite", id: next.id } : null;
  }
  if (isVocabBookSession()) {
    const next = nextVocabBookBundleForCurrent();
    return next ? { type: "vocab", id: next.id } : null;
  }
  const next = nextChapterForCurrentCourse();
  return next ? { type: "course", id: next.id } : null;
}

function moveAutoplay(offset) {
  const words = autoplayWords();
  if (!words.length) return;
  const nextIndex = state.autoplayIndex + offset;
  if (offset > 0 && nextIndex >= words.length && state.autoplayAutoNextChapter && isFavoriteSession() && moveToAdjacentFavoriteCollection(1)) {
    return;
  }
  if (offset > 0 && nextIndex >= words.length && state.autoplayAutoNextChapter && isVocabBookSession() && moveToAdjacentVocabBookBundle(1)) {
    return;
  }
  if (offset > 0 && nextIndex >= words.length && state.autoplayAutoNextChapter && !isFavoriteSession() && !isVocabBookSession() && moveToAdjacentChapter(1)) {
    return;
  }
  state.autoplayIndex = (nextIndex + words.length) % words.length;
  if (offset > 0 && state.autoplayIndex === words.length - 1) recordChapterStars(1);
}

function moveToAdjacentFavoriteCollection(offset) {
  const collections = getFavoriteCollections().filter((collection) => getFavoriteCollectionWords(collection.id, { includeRemembered: true }).length);
  if (collections.length <= 1) return false;
  const currentIndex = collections.findIndex((collection) => collection.id === state.favoriteSessionCollectionId);
  if (currentIndex < 0) return false;
  const nextIndex = (currentIndex + offset + collections.length) % collections.length;
  const next = collections[nextIndex];
  if (!next || next.id === state.favoriteSessionCollectionId) return false;
  recordChapterStars(1);
  startFavoriteCollection(next.id, state.studyMode || "autoplay", { keepPlaying: state.studyMode === "autoplay" && state.autoplayAutoNextChapter });
  return true;
}

function moveToAdjacentVocabBookBundle(offset) {
  const bundles = getVocabBookBundles().filter((bundle) => bundle.totalCount > 0);
  if (bundles.length <= 1) return false;
  const currentIndex = bundles.findIndex((bundle) => bundle.id === state.vocabBookSessionBundleId);
  if (currentIndex < 0) return false;
  const nextIndex = currentIndex + offset;
  const next = bundles[nextIndex];
  if (!next || next.id === state.vocabBookSessionBundleId) return false;
  recordChapterStars(1);
  startVocabBookBundle(next.id, { mode: state.studyMode || "autoplay", keepPlaying: state.studyMode === "autoplay" && state.autoplayAutoNextChapter });
  return true;
}

function autoplayWords() {
  const words = studyWords();
  if (state.autoplayOrder !== "random") return words;
  const key = autoplayOrderKey(words);
  if (state.autoplayOrderKey !== key || state.autoplayWordIds.length !== words.length) {
    const random = seededRandom(`${Date.now()}-${key}`);
    state.autoplayWordIds = randomShuffle(words.map((word) => word.id), random);
    state.autoplayOrderKey = key;
  }
  const byId = new Map(words.map((word) => [word.id, word]));
  return state.autoplayWordIds.map((id) => byId.get(id)).filter(Boolean);
}

function resetAutoplayWordOrder() {
  state.autoplayWordIds = [];
  state.autoplayOrderKey = "";
}

function autoplayOrderKey(words) {
  return `${isFavoriteSession() ? `favorite:${state.favoriteSessionCollectionId}` : isVocabBookSession() ? `vocab:${state.vocabBookSessionBundleId}` : state.activeCourseId}:${isVocabBookSession() ? "" : state.activeChapterId}:${words.map((word) => word.id).join(",")}`;
}

function moveToAdjacentChapter(offset) {
  const course = state.courses.find((item) => item.id === state.activeCourseId);
  const chapters = courseChapters(course);
  const currentIndex = chapters.findIndex((chapter) => chapter.id === state.activeChapterId);
  const next = chapters[currentIndex + offset];
  if (!next) return false;
  state.activeChapterId = next.id;
  state.autoplayIndex = 0;
  resetAutoplayWordOrder();
  return true;
}

function accessibleWords() {
  return state.words.filter((word) => word.status === "published" && (state.isPaid || word.access === "free"));
}

function courseWords(course) {
  const words = accessibleWords();
  if (!course) return words;
  if (course.id === 1) return words.filter((word) => word.level === "N5" && word.access === "free");
  if (course.id === 4) return words.filter((word) => word.level === "N4" && word.access === "free" && Array.isArray(word.tags) && word.tags.includes("Jisho"));
  if (course.id === 2) return words.filter((word) => word.access === "member" && ((word.level === "N3") || (Array.isArray(word.tags) && word.tags.includes("N3"))));
  if (course.id === 3) return words.filter((word) => word.access === "member" && (word.level === "N2" || (Array.isArray(word.tags) && word.tags.includes("N2"))));
  return words;
}

function courseChapters(course) {
  if (!course) return [];
  const words = [...courseWords(course)].sort(compareKanaWords);
  const maxWordsPerChapter = course.id === 4 ? 40 : 0;
  const count = maxWordsPerChapter ? Math.ceil(words.length / maxWordsPerChapter) : Math.max(1, Number(course.chapters || 1));
  const size = maxWordsPerChapter || Math.ceil(words.length / count);
  return Array.from({ length: count }, (_, index) => {
    const chapterWords = words.slice(index * size, (index + 1) * size);
    return {
      id: `course-${course.id}-chapter-${index + 1}`,
      label: chapterLabel(index, chapterWords),
      count: chapterWords.length,
      words: chapterWords,
    };
  }).filter((chapter) => chapter.words.length);
}

function activeChapter() {
  const course = state.courses.find((item) => item.id === state.activeCourseId) || state.courses[0];
  const chapters = courseChapters(course);
  if (!chapters.length) return null;
  const current = chapters.find((chapter) => chapter.id === state.activeChapterId) || chapters[0];
  state.activeCourseId = course.id;
  state.activeChapterId = current.id;
  return current;
}

function compareKanaWords(left, right) {
  return normalizedKana(left.kana || left.japanese).localeCompare(normalizedKana(right.kana || right.japanese), "ja");
}

function normalizedKana(value) {
  return String(value || "")
    .replace(/[\u30A1-\u30F6]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0x60))
    .replace(/[\u30FC\u30FB]/g, "")
    .replace(/[・ー]/g, "")
    .trim();
}

function chapterLabel(index, words) {
  const first = words[0]?.kana || "";
  const last = words[words.length - 1]?.kana || "";
  const range = first && last ? `${kanaHead(first)}-${kanaHead(last)}` : "";
  return `第${index + 1}组${range ? ` ${range}` : ""}`;
}

function kanaHead(value) {
  return normalizedKana(value).slice(0, 1) || "-";
}

function syncAutoplayTimer() {
  if (autoplayTimer) {
    window.clearTimeout(autoplayTimer);
    autoplayTimer = null;
  }
  if (autoplayCountdownTimer) {
    window.clearInterval(autoplayCountdownTimer);
    autoplayCountdownTimer = null;
  }
  if (autoplayRevealTimer) {
    window.clearTimeout(autoplayRevealTimer);
    autoplayRevealTimer = null;
  }
  const autoplayQueueLength = autoplayWords().length;
  if (state.studyMode !== "autoplay" || !state.autoplayPlaying || !autoplayQueueLength) return;
  if (!state.autoplayNextAt || state.autoplayNextAt <= Date.now()) resetAutoplayCountdown();
  if (state.autoplayDelayReveal && !isAutoplayAnswerVisible()) {
    autoplayRevealTimer = window.setTimeout(() => {
      render();
    }, Math.max(100, state.autoplayRevealAt - Date.now()));
  }
  if (autoplayQueueLength <= 1 && !state.autoplayAutoNextChapter) {
    updateAutoplayCountdownLabel();
    return;
  }
  autoplayTimer = window.setTimeout(() => {
    moveAutoplay(1);
    resetAutoplayCountdown();
    saveState(state);
    render();
  }, Math.max(250, state.autoplayNextAt - Date.now()));
  autoplayCountdownTimer = window.setInterval(() => {
    const next = remainingAutoplaySeconds();
    if (next !== state.autoplayCountdown) {
      state.autoplayCountdown = next;
      updateAutoplayCountdownLabel();
    }
  }, 1000);
  updateAutoplayCountdownLabel();
}

function resetAutoplayCountdown() {
  const now = Date.now();
  const speed = Number(state.autoplaySpeed || 5000);
  state.autoplayRevealAt = state.autoplayDelayReveal && state.autoplayPlaying ? now + AUTOPLAY_REVEAL_DELAY : 0;
  state.autoplayNextAt = (state.autoplayRevealAt || now) + speed;
  state.autoplayCountdown = Math.ceil(Number(state.autoplaySpeed || 5000) / 1000);
}

function keepAutoplayAnswerVisible() {
  if (!state.autoplayDelayReveal) return;
  const now = Date.now();
  state.autoplayRevealAt = 0;
  if (!state.autoplayNextAt || state.autoplayNextAt <= now) {
    state.autoplayNextAt = now + Number(state.autoplaySpeed || 5000);
  }
}

function remainingAutoplaySeconds() {
  if (!state.autoplayPlaying) return Math.ceil(Number(state.autoplaySpeed || 5000) / 1000);
  if (!state.autoplayNextAt) return Math.ceil(Number(state.autoplaySpeed || 5000) / 1000);
  if (state.autoplayDelayReveal && !isAutoplayAnswerVisible()) return Math.ceil(Number(state.autoplaySpeed || 5000) / 1000);
  return Math.max(1, Math.ceil((state.autoplayNextAt - Date.now()) / 1000));
}

function updateAutoplayCountdownLabel() {
  const button = document.querySelector('[data-action="autoplay-toggle"]');
  if (!button) return;
  button.textContent = state.autoplayPlaying ? `${remainingAutoplaySeconds()}` : "开始";
}

function toggleAutoplayPlayback() {
  if (state.autoplayPlaying) {
    stopAutoplayPlayback();
    return;
  }
  state.autoplayPlaying = true;
  autoSpeakLastKey = "";
}

function stopAutoplayPlayback() {
  state.autoplayPlaying = false;
}

function syncAutoSpeak() {
  const target = autoSpeakTarget();
  if (!target) return;
  if (target.key === autoSpeakLastKey) return;
  autoSpeakLastKey = target.key;
  speakJapanese(target.text, true);
}

function autoSpeakTarget() {
  if (state.studyMode === "autoplay" && state.autoplayAutoSpeak && state.autoplayPlaying) {
    const word = autoplayWords()[state.autoplayIndex];
    return word ? { key: `autoplay:${word.id}:${state.autoplayIndex}`, text: word.japanese } : null;
  }
  if (state.studyMode === "tapread" && state.tapReadAutoSpeak && !state.tapReadCompletedAt) {
    const word = tapReadWords()[state.tapReadIndex];
    return word ? { key: `tapread:${word.id}:${state.tapReadIndex}`, text: word.japanese } : null;
  }
  return null;
}

function speakJapanese(text, quiet = false) {
  const speech = window.speechSynthesis;
  if (!speech || !window.SpeechSynthesisUtterance) {
    if (!quiet) showToast("当前浏览器不支持语音朗读");
    return;
  }
  const value = String(text || "").trim();
  if (!value) return;
  speech.cancel();
  const utterance = new SpeechSynthesisUtterance(value);
  utterance.lang = "ja-JP";
  utterance.rate = 0.92;
  utterance.pitch = 1;
  const voices = speech.getVoices ? speech.getVoices() : [];
  const japaneseVoice = voices.find((voice) => /^ja[-_]/i.test(voice.lang));
  if (japaneseVoice) utterance.voice = japaneseVoice;
  speech.speak(utterance);
}

function isAutoplayAnswerVisible() {
  if (!state.autoplayDelayReveal) return true;
  if (!state.autoplayRevealAt) return true;
  return Date.now() >= state.autoplayRevealAt;
}

function showToast(message) {
  state.toast = message;
  const toast = app.querySelector(".toast");
  if (toast) {
    toast.textContent = state.toast || "";
    toast.classList.toggle("show", Boolean(state.toast));
  }
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    state.toast = "";
    const currentToast = app.querySelector(".toast");
    if (currentToast) {
      currentToast.textContent = "";
      currentToast.classList.remove("show");
    }
  }, 1800);
}

function isVocabBookSession() {
  return !!state.vocabBookSessionBundleId;
}

function getVocabBookBundleEntries(bundleId, includeRemembered = false) {
  if (!bundleId) return [];
  const vocabBook = state.vocabBook || {};
  const byId = new Map(state.words.map((word) => [word.id, word]));
  return Object.entries(vocabBook)
    .map(([wordId, raw]) => {
      const item = normalizeVocabBookEntry(raw);
      return {
        wordId: Number(wordId),
        word: byId.get(Number(wordId)),
        item,
      };
    })
    .filter((entry) => entry.item?.bundleId === bundleId && entry.word && entry.word.status === "published" && (state.isPaid || entry.word.access === "free"))
    .filter((entry) => (includeRemembered ? true : !entry.item.remembered))
    .sort((a, b) => Number(b.item.lastAddedAt || 0) - Number(a.item.lastAddedAt || 0) || a.wordId - b.wordId);
}

function getVocabBookBundleWords(bundleId, includeRemembered = false) {
  return getVocabBookBundleEntries(bundleId, includeRemembered).map((entry) => entry.word);
}

function getVocabBookBundle(bundleId) {
  const entries = getVocabBookBundleEntries(bundleId, true);
  if (!entries.length) return null;
  const pendingCount = entries.filter((entry) => !entry.item.remembered).length;
  const match = /^vocab-book-(\d+)$/.exec(bundleId);
  const index = match ? Number(match[1]) + 1 : 1;
  return {
    id: bundleId,
    label: getVocabBookBundleLabel(bundleId),
    index,
    pendingCount,
    rememberedCount: entries.filter((entry) => entry.item.remembered).length,
    totalCount: entries.length,
    updatedAt: entries.reduce((latest, entry) => Math.max(latest, Number(entry.item.lastAddedAt || 0)), 0),
    words: entries.map((entry) => entry.word),
  };
}

function formatDateYMD(timestamp) {
  const value = Number(timestamp || 0);
  const date = new Date(value);
  if (!value || !Number.isFinite(date.getTime())) return "";
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(date);
}

function getVocabBookBundles() {
  const byId = new Map(state.words.map((word) => [word.id, word]));
  const byBundle = new Map();
  Object.entries(state.vocabBook || {}).forEach(([wordId, raw]) => {
    const item = normalizeVocabBookEntry(raw);
    const bundleId = item.bundleId || "";
    const word = byId.get(Number(wordId));
    if (!bundleId || !word) return;
    if (word.status !== "published" || (!state.isPaid && word.access !== "free")) return;
    const existing = byBundle.get(bundleId) || [];
    existing.push({ wordId: Number(wordId), item, word });
    byBundle.set(bundleId, existing);
  });
  const entries = Array.from(byBundle.entries()).map(([bundleId, items]) => {
    const pending = items.filter((entry) => !entry.item.remembered);
    const match = /^vocab-book-(\d+)$/.exec(bundleId);
    const index = match ? Number(match[1]) + 1 : 1;
    const updatedAt = items.reduce((latest, entry) => Math.max(latest, Number(entry.item.lastAddedAt || 0)), 0);
    const rememberedCount = items.filter((entry) => entry.item.remembered).length;
    const rangeValues = items
      .map((entry) => Number(entry.item.lastAddedAt || 0))
      .filter((value) => value > 0 && Number.isFinite(value));
    const dateRangeStart = rangeValues.length ? Math.min(...rangeValues) : 0;
    const dateRangeEnd = rangeValues.length ? Math.max(...rangeValues) : 0;
    const formattedRangeStart = formatDateYMD(dateRangeStart);
    const formattedRangeEnd = formatDateYMD(dateRangeEnd);
    return {
      id: bundleId,
      index,
      label: getVocabBookBundleLabel(bundleId),
      pendingCount: pending.length,
      rememberedCount,
      totalCount: items.length,
      updatedAt: updatedAt || Date.now(),
      rangeText: formattedRangeStart && formattedRangeEnd
        ? `${formattedRangeStart}～${formattedRangeEnd}`
        : "收藏时间待定",
    };
  }).sort((left, right) => left.index - right.index);
  return entries.filter((bundle) => bundle.totalCount > 0);
}
function renderStudySessionHeaderLegacy() {
  const sessionWords = state.studyMode === "autoplay" ? autoplayWords() : studyWords();
  const exampleSource = sessionWords.find((word) => word && word.exampleSource)?.exampleSource;
  const sentenceSourceLabel =
    exampleSource === "tatoeba"
      ? "Tatoeba CC BY 2.0 FR"
      : exampleSource === "ai"
      ? "AI 示例"
      : "默认例句";
  if (isFavoriteSession()) {
    const collection = getFavoriteCollection(state.favoriteSessionCollectionId);
    const count = getFavoriteCollectionCount(collection.id);
    const isDefault = collection.id === FAVORITE_DEFAULT_COLLECTION_ID;
    return `
      <div class="panel session-header">
        <div>
          <div class="session-title-row">
            <div class="panel-title">收藏本</div>
            <span class="badge published">${count}词</span>
          </div>
          <div class="muted session-note">${collection?.name || "收藏本"} ${renderSessionScopeStars()}</div>
          <div class="muted source-note session-note">例句来源：${escapeHtml(sentenceSourceLabel)} / TTS</div>
        </div>
        <button class="btn" data-action="open-favorite-session-picker">${withButtonIcon("切换收藏", "📚")}</button>
      </div>
    `;
  }
  if (isVocabBookSession()) {
    const bundle = getVocabBookBundle(state.vocabBookSessionBundleId);
    const total = bundle ? bundle.totalCount : 0;
    const pending = bundle ? bundle.pendingCount : 0;
    const remembered = Math.max(0, total - pending);
    return `
      <div class="panel session-header">
        <div>
          <div class="session-title-row">
            <div class="panel-title">生词本</div>
            <span class="badge published">已掌握 ${remembered}/${total}</span>
          </div>
          <div class="muted session-note">${bundle ? `${bundle.label} ${renderSessionScopeStars()}` : "当前无生词本记录"}</div>
        </div>
        <button class="btn" data-action="open-vocab-book-session-picker">${withButtonIcon("切换生词本", "📘")}</button>
      </div>
    `;
  }
  const course = state.courses.find((item) => item.id === state.activeCourseId);
  const chapter = activeChapter();
  return `
    <div class="panel session-header">
      <div>
        <div class="session-title-row">
          <div class="panel-title">${course?.title || "课程详情"}</div>
          <span class="badge ${course?.access === "member" ? "member" : "published"}">${course?.access === "member" ? "会员" : "免费"}</span>
        </div>
        <div class="muted session-note">${chapter ? `${chapter.label} ${renderSessionScopeStars()}（${chapter.count}词）` : "当前无章节"}</div>
        <div class="muted source-note session-note">例句来源：${escapeHtml(sentenceSourceLabel)} / TTS</div>
      </div>
        <button class="btn" data-action="open-current-chapter-picker">${withButtonIcon("切换章节", "📖")}</button>
    </div>
  `;
}

function renderChallengeSummaryModalLegacy(total) {
  const summary = challengeSummary(total);
  const passed = state.challengeStatus === "passed";
  const nextChapter = isFavoriteSession() || isVocabBookSession() ? null : passed ? nextChapterForCurrentCourse() : null;
  const challengeStars = passed ? challengeStarsForLives(state.challengeLives) : 0;
  return `
    <div class="modal-backdrop challenge-summary-backdrop">
      <div class="panel study-empty challenge-summary challenge-summary-modal">
        <div class="panel-body stack">
          <div class="complete-mark">${state.challengeStatus === "failed" ? "!" : "✓"}</div>
          <h2>${state.challengeStatus === "failed" ? "挑战未通过" : "挑战完成"}</h2>
          <div class="stats">
            ${stat("正确率", `${summary.accuracy}%`)}
            ${stat("得分", summary.score)}
            ${stat("耗时", summary.duration)}
            ${stat("生命", state.challengeLives)}
            ${passed ? stat("星数", `${challengeStars} ⭐`) : ""}
          </div>
          <p class="muted">本次：${state.challengeCorrect} 对 / ${state.challengeWrong} 错，共 ${summary.total}</p>
          <div class="row-actions">
            ${nextChapter ? '<button class="btn primary" data-action="continue-next-chapter" data-next-mode="challenge"><span class="btn-icon" aria-hidden="true">➡</span><span>继续下一课</span></button>' : ""}
            <button class="btn primary" data-action="restart-challenge">${withButtonIcon("重来挑战", "↺")}</button>
            <button class="btn" data-action="study-mode" data-mode-value="autoplay">${withButtonIcon("切到自动播放", "▶")}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTapReadSummaryModalLegacy() {
  const nextChapter = isFavoriteSession() || isVocabBookSession() ? null : nextChapterForCurrentCourse();
  const total = studyWords().length;
  const starChapterId = currentStudyScopeChapterId();
  return `
    <div class="modal-backdrop challenge-summary-backdrop">
      <div class="panel study-empty challenge-summary challenge-summary-modal">
        <div class="panel-body stack">
          <div class="complete-mark">✓</div>
          <h2>点读记忆完成</h2>
          <div class="stats">
            ${stat("正确率", `${Number(state.tapReadCorrect || 0)} / ${Number(state.tapReadTotal || 0)}`)}
            ${stat("题目", total)}
            ${stat("星数", `${Math.max(0, Number(state.chapterProgress[starChapterId]?.bestStars || 0))} ⭐`)}
            ${stat("模式", "点读记忆")}
          </div>
          <p class="muted">点读记忆已完成，点击继续下一课可直接进入下一课，成绩会被记录。</p>
          <div class="row-actions">
            ${nextChapter ? '<button class="btn primary" data-action="continue-next-chapter" data-next-mode="tapread"><span class="btn-icon" aria-hidden="true">➡</span><span>继续下一课</span></button>' : ""}
            <button class="btn primary" data-action="restart-tapread">${withButtonIcon("重新点读", "↺")}</button>
            <button class="btn" data-action="study-mode" data-mode-value="challenge">${withButtonIcon("切到挑战", "🧠")}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTodayCoursesLegacy() {
  const vocabBookBundles = getVocabBookBundles();
  const collectionStats = getFavoriteCollectionStats();
  const statsById = new Map(collectionStats.map((item) => [item.id, item]));
  const favoriteCollections = getFavoriteCollections();
  const customCollections = favoriteCollections.filter((item) => item.id !== FAVORITE_DEFAULT_COLLECTION_ID);
  const canCreate = customCollections.length < FAVORITE_MAX_CUSTOM_COLLECTIONS;
  const orderedCollections = [
    getFavoriteCollection(FAVORITE_DEFAULT_COLLECTION_ID),
    ...customCollections,
    ];
  return `
    <div class="panel">
      <div class="panel-header">
        <div>
          <div class="panel-title">${withButtonIcon("词库课程", "📚")}</div>
          <div class="muted favorite-note">按课程章节学习内置词库，支持选择章节和三种学习模式</div>
        </div>
      </div>
      <div class="panel-body course-list compact-courses">
        ${state.courses.map((course) => {
          const locked = course.access === "member" && !state.isPaid;
          const active = state.activeCourseId === course.id;
          const chapter = active ? activeChapter() : courseChapters(course)[0];
          return `
          <div class="course-item ${active ? "active" : ""}">
            <div class="row-actions">
              <strong>${course.title}</strong>
              <span class="badge ${course.access === "member" ? "member" : "published"}">${course.access === "member" ? "会员" : "免费"}</span>
              ${locked ? '<span class="badge review">锁定</span>' : ""}
              ${course.featured ? '<span class="badge review">推荐</span>' : ""}
            </div>
            <div class="course-meta today-course-notes"><span>${course.category}</span><span>${course.chapters} 章</span><span>${course.words} 词</span>${chapter ? `<span>进度 ${chapter.label}</span>` : ""}</div>
            <div class="progress"><span style="width:${course.access === "free" ? 42 : 18}%"></span></div>
            <div class="course-actions">
              <button class="btn" data-action="open-chapter-picker" data-course="${course.id}" ${locked ? "disabled" : ""}>${withButtonIcon("选择章节", "📖")}</button>
              <button class="btn primary" data-action="start-course" data-course="${course.id}" ${locked ? "disabled" : ""}>${locked ? withButtonIcon("购买", "🔒") : withButtonIcon("开始学习", "▶")}</button>
            </div>
          </div>
        `}).join("")}
      </div>
    </div>
    ${vocabBookBundles.length ? `
      <div class="panel">
        <div class="panel-header">
          <div>
            <div class="panel-title">${withButtonIcon("生词本", "📘")}</div>
            <div class="muted favorite-note">自动收集未掌握词条，按词库分组继续复习</div>
          </div>
        </div>
        <div class="panel-body course-list compact-courses">
          ${vocabBookBundles.map((bundle) => `
            <div class="course-item">
              <div class="row-actions">
                <strong>${bundle.label}</strong>
                <span class="badge review">已掌握 ${bundle.rememberedCount || 0} / ${bundle.totalCount}</span>
              </div>
              <div class="course-meta today-course-notes">
                <span>${bundle.rangeText || "创建时间待定"}</span>
              </div>
              <div class="course-actions">
                <button class="btn" data-action="open-vocab-book" data-bundle="${bundle.id}">${withButtonIcon("查看", eyeIconSvg())}</button>
                ${bundle.pendingCount ? `<button class="btn primary" data-action="start-vocab-book" data-bundle="${bundle.id}">${withButtonIcon("开始复习", "▶")}</button>` : `<button class="btn danger-trash-btn" data-action="delete-vocab-book-bundle" data-bundle="${bundle.id}">${withButtonIcon("删除词库", trashIconSvg())}</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    ` : `<div class="panel"><div class="panel-body muted today-course-notes">暂无生词本</div></div>`}
    <div class="panel">
      <div class="panel-header">
        <div>
          <div class="panel-title favorite-collection-title">
            ${withButtonIcon("收藏本", "⭐")}
            <button class="icon-btn favorite-collection-edit-btn" data-action="toggle-favorite-create-menu" aria-label="收藏本设置" title="收藏本设置">${withButtonIcon("设置", "⚙")}</button>
          </div>
          ${state.favoriteCreateMenuOpen ? `
            <div class="favorite-collection-menu">
              <button class="btn" data-action="create-favorite-collection" ${canCreate ? "" : "disabled"}>${withButtonIcon("新增收藏本", "➕")}</button>
            </div>
          ` : ""}
          <div class="muted favorite-note">支持最新收藏与自建收藏本，最大可自建 3 个收藏本</div>
        </div>
      </div>
      <div class="panel-body course-list compact-courses">
        ${orderedCollections.map((collection) => {
          const stats = statsById.get(collection.id) || { wordCount: 0, latestAt: 0 };
          return `
            <div class="course-item">
              <div class="row-actions">
                <strong>${collection.name}</strong>
                <span class="badge review">${stats.wordCount} 词</span>
              </div>
              <div class="course-meta today-course-notes">
                <span>${collection.id === FAVORITE_DEFAULT_COLLECTION_ID ? "默认收藏本" : "自建收藏本"}</span>
                <span>${stats.latestAt ? `最近更新 ${formatDateYMD(stats.latestAt)}` : "暂无更新"}</span>
              </div>
              <div class="course-actions">
                <button class="btn" data-action="open-favorites" data-collection="${collection.id}">${withButtonIcon("查看", eyeIconSvg())}</button>
                <button class="btn primary" data-action="start-favorite-collection" data-collection="${collection.id}" data-mode="autoplay" ${stats.wordCount ? "" : "disabled"}>${withButtonIcon("开始学习", "▶")}</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function startVocabBookBundle(bundleId, options = {}) {
  state.favoriteSessionCollectionId = "";
  state.vocabBookSessionPickerOpen = false;
  const bundle = getVocabBookBundle(bundleId);
  if (!bundle || !bundle.words.length) {
    showToast(bundle ? "生词本为空" : "找不到该生词本");
    state.vocabBookSessionBundleId = "";
    return;
  }
  ensureVocabBundleAssignments();
  state.vocabBookSessionBundleId = bundleId;
  state.inStudySession = true;
  state.learnerView = "study";
  state.activeChapterId = vocabBookBundleChapterId(bundleId);
  state.chapterPickerCourseId = null;
  state.autoplayIndex = 0;
  state.challengeIndex = 0;
  state.challengeCorrect = 0;
  state.challengeWrong = 0;
  state.challengeLives = 5;
  state.challengeStartedAt = 0;
  state.challengeEndedAt = 0;
  state.challengeStatus = "active";
  state.challengeResult = "";
  state.challengeInput = "";
  state.challengeRetryInput = "";
  state.challengeRetryTyping = false;
  state.challengeRevealAttempt = false;
  state.tapReadIndex = 0;
  state.tapReadInput = "";
  state.tapReadStep = 0;
  state.tapReadClearedKeys = [];
  state.tapReadWrongKey = null;
  state.tapReadCompletedAt = 0;
  if (!options.keepPlaying) stopAutoplayPlayback();
  clearTapReadTimers();
  window.clearTimeout(challengeTimer);
  resetAutoplayWordOrder();
  resetChallenge();
  resetTapRead();
  bundle.words.forEach((word) => {
    state.progress[word.id] = { ...(state.progress[word.id] || defaultProgress()), due: true };
  });
  const targetMode = options.mode || state.studyMode;
  state.studyMode = ["autoplay", "tapread", "challenge"].includes(targetMode) ? targetMode : "autoplay";
  if (options.keepPlaying && state.studyMode === "autoplay") {
    state.autoplayPlaying = true;
    resetAutoplayCountdown();
    syncAutoplayTimer();
  }
  saveState(state);
  showToast(`已进入 ${bundle.label}`);
}

render();




