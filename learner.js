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
let pressFeedbackBound = false;

state.learnerView = state.learnerView === "library" ? "study" : state.learnerView || "study";
state.studyMode = state.studyMode === "review" ? "challenge" : state.studyMode || "challenge";
state.vocabBook = state.vocabBook || {};
state.favoriteBook = state.favoriteBook || {};
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
state.tapReadIndex = state.tapReadIndex || 0;
state.tapReadInput = state.tapReadInput || "";
state.tapReadStep = state.tapReadStep || 0;
state.tapReadClearedKeys = state.tapReadClearedKeys || [];
state.tapReadWrongKey = state.tapReadWrongKey ?? null;
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
              <div class="subtitle">学习端 App 原型</div>
            </div>
          </div>
          <button class="pill ${state.isPaid ? "active" : ""}" data-action="toggle-paid">${state.isPaid ? "付费版" : "免费版"}</button>
        </header>
        <main class="screen">
          ${renderLearnerView()}
        </main>
        <nav class="tabs">
          ${appTab("study", "今日学习")}
          ${appTab("mistakes", "生词")}
          ${appTab("favorites", "收藏")}
          ${appTab("stats", "统计")}
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

function appTab(id, label) {
  return `<button class="tab ${state.learnerView === id ? "active" : ""}" data-learner-view="${id}">${label}</button>`;
}

function renderLearnerSidebar() {
  const items = [
    ["study", "今日学习", "今"],
    ["mistakes", "生词本", "生"],
    ["favorites", "收藏词库", "★"],
    ["stats", "统计", "図"],
  ];
  return `
    <aside class="sidebar learner-sidebar">
      <div class="brand">
        <img class="brand-mark brand-mark-img" src="./mobile/assets/icon.png" alt="JpWords" />
        <div>
          <div class="brand-title">JpWords</div>
          <div class="brand-subtitle">日语背词 App</div>
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
    study: ["今日学习", "选择词库章节后，用自动播放或假名挑战完成今日学习"],
    mistakes: ["生词本", "记录没记住、模糊、记错的单词"],
    favorites: ["收藏词库", "保存手动收藏的重点单词"],
    stats: ["学习统计", "查看连续学习、掌握词数和复习表现"],
  };
  const [title, subtitle] = titles[state.learnerView];
  return `
    <header class="topbar">
      <div>
        <h1 class="page-title">${title}</h1>
        <p class="page-subtitle">${subtitle}</p>
      </div>
      <div class="top-actions">
        <span class="badge published">连续 ${state.learner.streak} 天</span>
        <span class="badge member">${state.learner.xp} XP</span>
        <button class="btn" data-action="toggle-paid">${state.isPaid ? "付费预览" : "免费版"}</button>
        <a class="btn link-btn" href="./admin.html">后台管理</a>
      </div>
    </header>
  `;
}

function renderLearnerView() {
  if (state.learnerView === "mistakes") return renderMistakes();
  if (state.learnerView === "favorites") return renderFavorites();
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
        <button class="${state.studyMode === "autoplay" ? "active" : ""}" data-action="study-mode" data-mode-value="autoplay">自动播放</button>
        <button class="${state.studyMode === "tapread" ? "active" : ""}" data-action="study-mode" data-mode-value="tapread">点读记忆</button>
        <button class="${state.studyMode === "challenge" ? "active" : ""}" data-action="study-mode" data-mode-value="challenge">假名挑战</button>
      </div>
    </div>
    ${state.studyMode === "autoplay" ? renderAutoplayStudy() : state.studyMode === "tapread" ? renderTapReadMemory() : renderKanaChallenge()}
    ${tapReadSummary}
    ${challengeSummary}
    ${renderChapterPickerModal()}
  `;
}

function renderStudySessionHeader() {
  const course = state.courses.find((item) => item.id === state.activeCourseId);
  const chapter = activeChapter();
  const sessionWords = state.studyMode === "autoplay" ? autoplayWords() : studyWords();
  const exampleSource = sessionWords.find((word) => word && word.exampleSource)?.exampleSource;
  const sentenceSourceLabel = exampleSource === "tatoeba" ? "Tatoeba CC BY 2.0 FR" : "官方来源";
  const hasSentenceSource = !!exampleSource;
  return `
    <div class="panel session-header">
      <div>
        <div class="session-title-row">
          <div class="panel-title">${course?.title || "今日学习"}</div>
          <span class="badge ${course?.access === "member" ? "member" : "published"}">${course?.access === "member" ? "会员词" : "免费词"}</span>
        </div>
        <div class="muted">${chapter ? `${chapter.label} · ${chapter.count} 词` : "请选择章节"}</div>
        ${hasSentenceSource ? `<div class="muted source-note">例句来源：${escapeHtml(sentenceSourceLabel)}；读音：系统TTS</div>` : ""}
      </div>
      <button class="btn" data-action="open-current-chapter-picker">选择章节</button>
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

function renderFavoriteButton(wordId, extraClass = "") {
  const active = !!state.favoriteBook[wordId];
  return `<button class="btn favorite-button ${extraClass} ${active ? "active" : ""}" data-action="favorite-word" data-word="${wordId}" aria-label="收藏单词" title="收藏单词">${active ? "★" : "☆"}</button>`;
}

function renderAutoplayStudy() {
  const queue = autoplayWords();
  const current = queue[state.autoplayIndex % Math.max(queue.length, 1)];
  if (!current) return renderStudyEmpty("暂无可学习单词", "当前权限下没有可学习词库，可以切换付费预览查看会员词库。");
  const progress = state.progress[current.id] || defaultProgress();
  const completed = queue.length ? (state.autoplayIndex % queue.length) + 1 : 0;
  const total = queue.length;
  const autoplayProgress = total ? Math.round((completed / total) * 100) : 0;
  const chapter = activeChapter();
  const playLabel = state.autoplayPlaying ? `${remainingAutoplaySeconds()}` : "▶";
  const answerVisible = isAutoplayAnswerVisible();
  const autoplayMeaningText = (current.meaning || current.meaningEn || "").trim();
  return `
    <div class="study-layout">
      <div class="study-card panel">
        <div class="study-card-top">
          <span class="muted">${chapter ? `${chapter.label} · ` : ""}${current.level}</span>
          ${renderTtsButton(current.japanese)}
        </div>
        <div class="study-word-wrap">
          <div class="study-word">${current.japanese}</div>
          <span class="word-part-tag">${escapeHtml(current.part || "未设置")}</span>
        </div>
        <div class="study-kana fade-piece fade-kana ${answerVisible ? "" : "autoplay-hidden-content"}">${answerVisible ? current.kana : "&nbsp;"}</div>
        <div class="answer-panel revealed autoplay-answer">
          <div class="autoplay-progress-line">${completed}/${total}</div>
          <div class="meaning fade-piece fade-meaning ${answerVisible ? "" : "autoplay-hidden-content"}">${autoplayMeaningText || current.meaning}</div>
          <div class="fade-piece fade-example ${answerVisible ? "" : "autoplay-hidden-content"}"><div class="example">${current.example}</div><div class="muted">${current.translation}</div></div>
        </div>
        <div class="inline-progress">
          <div class="progress progress-inline"><span style="width:${Math.min(100, autoplayProgress)}%"></span></div>
        </div>
        <div class="study-actions autoplay-actions">
          <button class="btn danger" data-review="wrong">没记住</button>
          ${renderFavoriteButton(current.id)}
          <button class="btn" data-review="hard">模糊</button>
          <button class="btn autoplay-nav-btn" data-action="autoplay-prev" aria-label="上一词" title="上一词">←</button>
          <button class="btn autoplay-play-btn" data-action="autoplay-toggle">${playLabel}</button>
          <button class="btn autoplay-nav-btn" data-review="correct" aria-label="下一词" title="下一词">→</button>
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
            <span>播完后自动进入下一章节</span>
          </label>
          <label class="check-line">
            <input type="checkbox" data-action="toggle-autoplay-delay" ${state.autoplayDelayReveal ? "checked" : ""}>
            <span>延迟显示读音和词意例句</span>
          </label>
          <label class="check-line">
            <input type="checkbox" data-action="toggle-autoplay-speak" ${state.autoplayAutoSpeak ? "checked" : ""}>
            <span>自动读音</span>
          </label>
          <div class="notice">播放浏览不会写入进度；只有点击“没记住 / 模糊 / 记得”才更新记忆盒、正确率和生词本。</div>
        </div>
      </div>
    </div>
  `;
}

function renderTapReadMemory() {
  const queue = tapReadWords();
  const current = queue[state.tapReadIndex % Math.max(queue.length, 1)];
  if (!current) return renderStudyEmpty("暂无点读单词", "当前章节没有可点读的单词。");
  if (state.tapReadCompletedAt) return "";
  const chapter = activeChapter();
  const chars = Array.from(current.kana || "");
  const cleared = new Set(state.tapReadClearedKeys || []);
  const meaningText = (current.meaning || current.meaningEn || "").trim();
  const tapReadProgress = queue.length ? Math.round(((state.tapReadIndex + 1) / queue.length) * 100) : 0;
  return `
    <div class="study-layout tapread-layout">
      <div class="study-card panel challenge-card tapread-card">
        <div class="study-card-top">
          <span class="muted">${chapter ? `${chapter.label} · ` : ""}${current.level}</span>
          ${renderTtsButton(current.japanese)}
        </div>
        <div class="study-word-wrap">
          <div class="study-word">${current.japanese}</div>
          <span class="word-part-tag">${escapeHtml(current.part || "未设置")}</span>
        </div>
        <div class="study-kana">${current.kana}</div>
        <div class="answer-panel revealed challenge-answer">
          <div class="autoplay-progress-line">${state.tapReadIndex + 1}/${queue.length}</div>
          <div class="meaning">${meaningText}</div>
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
            <span>自动读音</span>
          </label>
          <div class="notice">按提示顺序点读假名。按对后按钮会消失；按错只提示，不扣血、不写入生词本。</div>
          <button class="btn" data-action="restart-tapread">重新开始点读</button>
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
  if (!queue.length) return renderStudyEmpty("暂无挑战单词", "今日没有到期词，可以从词库加入单词，或切到自动播放熟悉内容。");
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
  const challengeMeaningText = (current.meaning || current.meaningEn || "").trim();
  const challengeProgressText = `${state.challengeIndex + 1}/${queue.length}`;
  const challengeProgress = queue.length ? Math.round(((state.challengeIndex + 1) / queue.length) * 100) : 0;
  return `
    <div class="study-layout challenge-layout">
      <div class="study-card panel challenge-card">
        <div class="study-card-top">
          <span class="muted">${chapter ? `${chapter.label} · ` : ""}${current.level}</span>
        </div>
        <div class="life-row" aria-label="剩余生命">${Array.from({ length: 5 }, (_, index) => `<span class="${index < state.challengeLives ? "alive" : ""}">♥</span>`).join("")}</div>
        <div class="study-word-wrap">
          <div class="study-word">${current.japanese}</div>
          <span class="word-part-tag">${escapeHtml(current.part || "未设置")}</span>
        </div>
        <div class="study-kana challenge-kana-spacer" aria-hidden="true">&nbsp;</div>
        <div class="answer-panel revealed challenge-answer">
          <div class="autoplay-progress-line">${challengeProgressText}</div>
          <div class="meaning">${challengeMeaningText}</div>
          <div class="fade-example"><div class="example">${current.example}</div><div class="muted">${current.translation}</div></div>
        </div>
        <div class="inline-progress">
          <div class="progress progress-inline"><span style="width:${Math.min(100, challengeProgress)}%"></span></div>
        </div>
        <div class="challenge-input ${inputStateClass}">
          <span class="challenge-input-text">${state.challengeResult === "wrong" && state.challengeRetryInput ? escapeHtml(state.challengeRetryInput) : state.challengeInput ? escapeHtml(state.challengeInput) : '<span class="challenge-input-placeholder">点击假名输入读音</span>'}</span>
          <span class="challenge-result-icon" aria-hidden="true">${challengeResultIcon}</span>
        </div>
        <div class="kana-pad ${shouldHintKana ? "challenge-kana-hint" : ""}">
          ${choices.map((kana) => `<button class="kana-key ${hintKana && hintKana.has(kana) ? "hint" : ""}" data-kana="${escapeHtml(kana)}">${escapeHtml(kana)}</button>`).join("")}
          ${renderFavoriteButton(current.id, "kana-key challenge-favorite-key")}
          <button class="kana-key challenge-reveal-key" data-action="challenge-reveal-answer">不会</button>
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
            <span>自动读音</span>
          </label>
          <div class="notice">输入长度达到正确假名长度后会自动判定。错 5 次挑战失败；完成全部题目则通关。点击“不会”按钮时，单词会被自动标记为“没记住”。</div>
          <button class="btn" data-action="restart-challenge">重新开始挑战</button>
        </div>
      </div>
    </div>
  `;
}

function renderStudyEmpty(title, copy) {
  return `
    <div class="panel study-empty">
      <div class="panel-body stack">
        <div class="complete-mark">✓</div>
        <h2>${title}</h2>
        <p class="muted">${copy}</p>
        <div class="row-actions">
          <button class="btn primary" data-learner-view="study">返回今日学习</button>
          <button class="btn" data-learner-view="mistakes">看生词</button>
        </div>
      </div>
    </div>
  `;
}

function renderChallengeSummaryModal(total) {
  const summary = challengeSummary(total);
  const passed = state.challengeStatus === "passed";
  const nextChapter = passed ? nextChapterForCurrentCourse() : null;
  const challengeStars = passed ? challengeStarsForLives(state.challengeLives) : 0;
  return `
    <div class="modal-backdrop challenge-summary-backdrop">
      <div class="panel study-empty challenge-summary challenge-summary-modal">
        <div class="panel-body stack">
          <div class="complete-mark">${state.challengeStatus === "failed" ? "!" : "✓"}</div>
          <h2>${state.challengeStatus === "failed" ? "挑战失败" : "挑战通关"}</h2>
          <div class="stats">
            ${stat("正确率", `${summary.accuracy}%`)}
            ${stat("得分", summary.score)}
            ${stat("用时", summary.duration)}
            ${stat("剩余生命", state.challengeLives)}
            ${passed ? stat("章节星级", `${challengeStars}星`) : ""}
          </div>
          <p class="muted">正确 ${state.challengeCorrect} / 错误 ${state.challengeWrong} / 总题 ${summary.total}</p>
          <div class="row-actions">
            ${nextChapter ? '<button class="btn primary" data-action="continue-next-chapter" data-next-mode="challenge">继续下一章节</button>' : ""}
            <button class="btn primary" data-action="restart-challenge">重新开始挑战</button>
            <button class="btn" data-action="study-mode" data-mode-value="autoplay">返回自动播放</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTapReadSummaryModal() {
  const nextChapter = nextChapterForCurrentCourse();
  const total = studyWords().length;
  return `
    <div class="modal-backdrop challenge-summary-backdrop">
      <div class="panel study-empty challenge-summary challenge-summary-modal">
        <div class="panel-body stack">
          <div class="complete-mark">✓</div>
          <h2>点读完成</h2>
          <div class="stats">
            ${stat("章节星级", "2星")}
            ${stat("完成词数", total)}
            ${stat("最高星级", `${Math.max(0, Number(state.chapterProgress[state.activeChapterId]?.bestStars || 0))}星`)}
            ${stat("模式", "点读")}
          </div>
          <p class="muted">本章节点读记忆已完成，章节学习状况已记录。</p>
          <div class="row-actions">
            ${nextChapter ? '<button class="btn primary" data-action="continue-next-chapter" data-next-mode="tapread">继续下一章节</button>' : ""}
            <button class="btn primary" data-action="restart-tapread">重新开始点读</button>
            <button class="btn" data-action="study-mode" data-mode-value="challenge">进入假名挑战</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTodayCourses() {
  const vocabBookBundles = getVocabBookBundles();
  const favorites = getFavoriteWords();
  const latestFavoriteAt = favorites[0] ? Number((state.favoriteBook || {})[favorites[0].id]?.addedAt || 0) : 0;
  return `
    <div class="panel">
      <div class="panel-header"><div class="panel-title">学习课程</div></div>
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
              ${locked ? '<span class="badge review">可试学</span>' : ""}
              ${course.featured ? '<span class="badge review">推荐</span>' : ""}
            </div>
            <div class="course-meta today-course-notes"><span>${course.category}</span><span>${course.chapters} 章</span><span>${course.words} 词</span>${chapter ? `<span>当前 ${chapter.label}</span>` : ""}</div>
            <div class="progress"><span style="width:${course.access === "free" ? 42 : 18}%"></span></div>
            <div class="course-actions">
              <button class="btn" data-action="open-chapter-picker" data-course="${course.id}" ${locked ? "disabled" : ""}>选择章节</button>
              <button class="btn primary" data-action="start-course" data-course="${course.id}" ${locked ? "disabled" : ""}>${locked ? "解锁后学习" : "开始课程"}</button>
            </div>
          </div>
        `}).join("")}
      </div>
    </div>
    ${vocabBookBundles.length ? `
      <div class="panel">
        <div class="panel-header"><div class="panel-title">生词本</div></div>
        <div class="panel-body course-list compact-courses">
          ${vocabBookBundles.map((bundle) => `
            <div class="course-item">
              <div class="row-actions">
                <strong>${bundle.label}</strong>
                <span class="badge review">记住了 ${bundle.rememberedCount || 0} / ${bundle.totalCount}</span>
              </div>
              <div class="course-meta today-course-notes">
                <span>${bundle.rangeText || "收藏时间未标注"}</span>
              </div>
              <div class="course-actions">
                <button class="btn" data-action="open-vocab-book" data-bundle="${bundle.id}">查看</button>
                ${bundle.pendingCount ? `<button class="btn primary" data-action="start-vocab-book" data-bundle="${bundle.id}">开始学习</button>` : `<button class="btn primary" data-action="delete-vocab-book-bundle" data-bundle="${bundle.id}">删除词库</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    ` : `<div class="panel"><div class="panel-body muted today-course-notes">目前没有可学习的生词本。</div></div>`}
    <div class="panel">
      <div class="panel-header"><div class="panel-title">收藏词库</div></div>
      <div class="panel-body course-list compact-courses">
        <div class="course-item">
          <div class="row-actions">
            <strong>收藏词库</strong>
            <span class="badge review">${favorites.length} 词</span>
          </div>
          <div class="course-meta today-course-notes"><span>${favorites.length ? `最近收藏 ${formatDateYMD(latestFavoriteAt)}` : "尚未收藏任何单词"}</span></div>
          <div class="course-actions">
            <button class="btn" data-action="open-favorites">查看</button>
            <button class="btn primary" data-action="practice-favorites" ${favorites.length ? "" : "disabled"}>练习收藏</button>
          </div>
        </div>
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
          <button class="btn ghost" data-action="close-chapter-picker">关闭</button>
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

function renderMistakes() {
  const vocabBookBundles = getVocabBookBundles();
  const validBundleIds = new Set(vocabBookBundles.map((bundle) => bundle.id));
  const selectedBundleId = validBundleIds.has(state.vocabBookListBundleId) ? state.vocabBookListBundleId : (vocabBookBundles[0]?.id || "");
  const selectedBundle = vocabBookBundles.find((bundle) => bundle.id === selectedBundleId) || null;
  const vocabBook = state.vocabBook || {};
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
          <div class="panel-title">生词本</div>
          <div class="muted today-course-notes">
            ${selectedBundle
            ? `${selectedBundle.label} · 已记住 ${selectedBundle.rememberedCount}/${selectedBundle.totalCount} · ${selectedBundle.rangeText || "收藏时间未标注"}`
            : "暂无生词本"}
          </div>
        </div>
        ${selectedBundle
          ? `<button class="btn primary" data-action="${selectedBundle.pendingCount ? "start-vocab-book" : "delete-vocab-book-bundle"}" data-bundle="${selectedBundleId}" >${selectedBundle.pendingCount ? "开始学习" : "删除词库"}</button>`
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
              <col class="vocab-action-col">
            </colgroup>
            <thead><tr><th>单词</th><th>释义</th><th>没记住</th><th>模糊</th><th>记错</th><th>操作</th></tr></thead>
            <tbody>
              ${mistakes.map((word) => {
                const item = vocabBook[word.id] || {};
                const forgottenTotal = Number(item.forgottenCount || 0) + Number(item.revealCount || 0);
                return `
                <tr>
                  <td><div class="jp">${word.japanese} <span class="vocab-part-badge">${escapeHtml(word.part || "未设置")}</span></div><div class="kana">${word.kana}</div></td>
                  <td>${word.meaning}</td>
                  <td>${forgottenTotal}</td>
                  <td>${item.fuzzyCount || 0}</td>
                  <td>${item.typoCount || 0}</td>
                  <td>${item.remembered ? `<span class="vocab-book-remembered-tag">记住了</span>` : `<button class="btn vocab-book-remember-btn" data-action="remember-vocab-word" data-word="${word.id}">记住了</button>`}</td>
                </tr>
               `}).join("") || '<tr><td colspan="6" class="muted">目前没有待记住生词。</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
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
  return window.confirm("该生词本内所有词已记住，是否确认删除该词库？") && deleteVocabBookBundle(bundleId, { silentConfirm: true });
}

function deleteVocabBookBundle(bundleId, options = {}) {
  if (!bundleId) return false;
  const bundle = getVocabBookBundle(bundleId);
  if (!bundle) return false;
  const shouldConfirm = options.silentConfirm ? false : true;
  if (shouldConfirm) {
    const confirmed = window.confirm(`该词库有 ${bundle.rememberedCount} / ${bundle.totalCount} 已记住，确定删除该词库吗？删除后该词库内单词将从生词本移除。`);
    if (!confirmed) return false;
  }
  const bundleEntries = Object.entries(state.vocabBook || {}).filter(([, item]) => item?.bundleId === bundleId);
  bundleEntries.forEach(([wordId]) => delete state.vocabBook[wordId]);
  if (state.vocabBookListBundleId === bundleId) state.vocabBookListBundleId = "";
  if (state.vocabBookSessionBundleId === bundleId) {
    state.vocabBookSessionBundleId = "";
    state.learnerView = "mistakes";
  }
  showToast(`已删除词库 ${bundle.label}`);
  return true;
}

function ensureVocabBundleAssignments() {
  const vocabBook = state.vocabBook || {};
  if (!vocabBook || typeof vocabBook !== "object") return false;
  let changed = false;
  const bundleCounts = new Map();
  let maxBundleIndex = -1;
  const pending = [];
  Object.entries(vocabBook).forEach(([wordId, raw]) => {
    const item = normalizeVocabBookEntry(raw);
    const normalized = normalizeVocabBookEntry(vocabBook[wordId]);
    if (JSON.stringify(item) !== JSON.stringify(raw)) {
      vocabBook[wordId] = normalized;
      changed = true;
    }
    const match = /^vocab-book-(\d+)$/.exec(normalized.bundleId);
    if (!match) {
      normalized.bundleId = "";
      if (vocabBook[wordId] !== normalized) {
        vocabBook[wordId] = normalized;
      }
      pending.push({ wordId: Number(wordId), item: normalized });
      changed = true;
      return;
    }
    const bundleIndex = Number(match[1]);
    if (!Number.isFinite(bundleIndex)) {
      normalized.bundleId = "";
      if (vocabBook[wordId] !== normalized) {
        vocabBook[wordId] = normalized;
      }
      pending.push({ wordId: Number(wordId), item: normalized });
      changed = true;
      return;
    }
    const nextCount = (bundleCounts.get(bundleIndex) || 0) + 1;
    bundleCounts.set(bundleIndex, nextCount);
    maxBundleIndex = Math.max(maxBundleIndex, bundleIndex);
  });
  if (!pending.length) return changed;

  let currentBundleIndex = maxBundleIndex >= 0 ? maxBundleIndex : 0;
  let currentBundleCount = bundleCounts.get(currentBundleIndex) || 0;
  if (currentBundleCount >= VOCAB_BOOK_BUNDLE_SIZE) {
    currentBundleIndex += 1;
    currentBundleCount = 0;
  }

  pending.sort((a, b) => Number(b.item.lastAddedAt || 0) - Number(a.item.lastAddedAt || 0) || Number(a.wordId) - Number(b.wordId));
  pending.forEach((entry) => {
    if (currentBundleCount >= VOCAB_BOOK_BUNDLE_SIZE) {
      currentBundleIndex += 1;
      currentBundleCount = 0;
    }
    const bundleId = `vocab-book-${currentBundleIndex}`;
    if (entry.item.bundleId !== bundleId) {
      entry.item.bundleId = bundleId;
      vocabBook[entry.wordId] = entry.item;
      changed = true;
    }
    currentBundleCount += 1;
    bundleCounts.set(currentBundleIndex, currentBundleCount);
  });
  return changed;
}

function vocabBookScore(item = {}) {
  return Number(item.forgottenCount || 0) + Number(item.fuzzyCount || 0) + Number(item.revealCount || 0) + Number(item.typoCount || 0);
}

function getFavoriteWords() {
  const favoriteBook = state.favoriteBook || {};
  return state.words
    .filter((word) => favoriteBook[word.id] && word.status === "published" && (state.isPaid || word.access === "free"))
    .sort((a, b) => Number(favoriteBook[b.id]?.addedAt || 0) - Number(favoriteBook[a.id]?.addedAt || 0));
}
function renderFavorites() {
  const favoriteBook = state.favoriteBook || {};
  const favorites = getFavoriteWords();
  const latestFavoriteAt = favorites.length && favoriteBook[favorites[0].id]?.addedAt ? formatDateYMD(favoriteBook[favorites[0].id].addedAt) : "";
  return `
    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">收藏词库</div>
        <div class="row-actions">
          <span class="badge review">共 ${favorites.length} 词</span>
          <button class="btn primary" data-action="practice-favorites" ${favorites.length ? "" : "disabled"}>练习收藏</button>
        </div>
      </div>
      <div class="panel-body">
        <div class="vocab-book-summary muted today-course-notes">最近收藏：${latestFavoriteAt || "暂无收藏记录"}</div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>单词</th><th>释义</th><th>例句</th><th>词性</th><th>收藏时间</th><th>操作</th></tr></thead>
            <tbody>
              ${favorites.map((word) => `
                <tr>
                  <td><div class="jp">${word.japanese}</div><div class="kana">${word.kana}</div></td>
                  <td>${word.meaning}</td>
                  <td>${word.example}<div class="muted">${word.translation}</div></td>
                  <td><span class="badge published">${escapeHtml(word.part || "未设置")}</span></td>
                  <td><span class="muted">${formatDateYMD(favoriteBook[word.id]?.addedAt || 0) || "未记录"}</span></td>
                  <td><button class="btn" data-action="mark-due" data-word="${word.id}">加入今日</button><button class="btn" data-action="remove-favorite" data-word="${word.id}">取消收藏</button></td>
                </tr>
              `).join("") || '<tr><td colspan="6" class="muted">目前没有收藏单词。</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
function learnerWordTable(words) {
  return `
    <table>
      <thead><tr><th>单词</th><th>释义</th><th>等级/词性</th><th>例句</th><th>状态</th><th>练习</th></tr></thead>
      <tbody>
        ${words.map((word) => `
          <tr>
            <td><div class="jp">${word.japanese}</div><div class="kana">${word.kana}</div></td>
            <td>${word.meaning}<div class="muted">${word.tags.join(" / ")}</div></td>
            <td>${word.level}<br><span class="muted">${word.part}</span></td>
            <td>${word.example}<div class="muted">${word.translation}</div></td>
            <td><span class="badge ${word.status}">${statusLabels[word.status]}</span><div class="muted">v${word.version} · ${word.access === "member" ? "会员" : "免费"}</div></td>
            <td><button class="btn primary" data-word="${word.id}" data-action="mark-due">加入今日</button></td>
          </tr>
        `).join("") || '<tr><td colspan="6" class="muted">没有匹配的单词。</td></tr>'}
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
      const current = queue[state.autoplayIndex % Math.max(queue.length, 1)];
      if (current && actionType === "wrong") recordVocabBook(current.id, "forgotten");
      if (current && actionType === "hard") recordVocabBook(current.id, "fuzzy");
      gradeStudyWord(actionType, "autoplay");
      if (actionType === "correct") {
        moveAutoplay(1);
        resetAutoplayCountdown();
      } else {
        keepAutoplayAnswerVisible();
      }
      saveState(state);
      render();
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
  if (action === "toggle-paid") {
    state.isPaid = !state.isPaid;
    state.autoplayIndex = 0;
    saveState(state);
    showToast(state.isPaid ? "已切换到付费预览，会员词库可用" : "已切换到免费版，仅显示基础词库");
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
    saveState(state);
  }
  if (action === "start-vocab-book") startVocabBookBundle(bundleId);
  if (action === "delete-vocab-book-bundle") deleteVocabBookBundle(bundleId);
  if (action === "practice-mistakes" || action === "practice-vocab-book") practiceVocabBook();
  if (action === "practice-favorites") practiceFavorites();
  if (action === "mark-due") markDue(wordId);
  if (action === "remember-vocab-word") rememberVocabWord(wordId);
  saveState(state);
  render();
}

function gradeStudyWord(result, source) {
  const queue = source === "challenge" ? challengeWords() : autoplayWords();
  const index = source === "challenge" ? state.challengeIndex : state.autoplayIndex;
  const current = queue[index % Math.max(queue.length, 1)];
  if (!current) return;
  const progress = state.progress[current.id] || defaultProgress();
  if (result === "correct") {
    progress.correct += 1;
    progress.box = Math.min(4, progress.box + 1);
    progress.due = false;
    state.learner.mastered += progress.box >= 3 ? 1 : 0;
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
}

function recordVocabBook(wordId, reason) {
  if (!wordId) return;
  const current = normalizeVocabBookEntry(state.vocabBook[wordId]);
  if (reason === "forgotten" || reason === "reveal") current.forgottenCount += 1;
  if (reason === "fuzzy") current.fuzzyCount += 1;
  if (reason === "typo") current.typoCount += 1;
  current.lastReason = reason === "reveal" ? "forgotten" : reason;
  current.lastAddedAt = Date.now();
  state.vocabBook[wordId] = current;
  ensureVocabBundleAssignments();
}

function favoriteWord(wordId) {
  const word = state.words.find((item) => item.id === wordId);
  if (!word || (word.access === "member" && !state.isPaid)) return;
  state.favoriteBook[wordId] = {
    addedAt: Date.now(),
  };
  showToast(`${word.japanese} 已加入收藏词库`);
}

function removeFavoriteWord(wordId) {
  const word = state.words.find((item) => item.id === wordId);
  delete state.favoriteBook[wordId];
  if (word) showToast(`${word.japanese} 已取消收藏`);
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
  if (state.tapReadIndex + 1 >= words.length) {
    state.tapReadCompletedAt = Date.now();
    recordChapterStars(2);
  } else {
    state.tapReadIndex += 1;
    state.tapReadInput = "";
    state.tapReadStep = 0;
    state.tapReadClearedKeys = [];
    state.tapReadWrongKey = null;
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
  showToast("答案已经提示");
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
  const chapterId = state.activeChapterId;
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

function renderChapterStars(chapterId) {
  const bestStars = Math.max(0, Math.min(5, Number(state.chapterProgress[chapterId]?.bestStars || 0)));
  const earned = "★".repeat(bestStars);
  const empty = "☆".repeat(5 - bestStars);
  return `<span class="chapter-stars" aria-label="掌握指数 ${bestStars} / 5"><span class="chapter-stars-label">掌握指数</span><span class="chapter-stars-value">${earned}<span>${empty}</span></span></span>`;
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
  if (isVocabBookSession()) {
  return state.challengeWordIds
    .map((id) => state.words.find((word) => word.id === id))
    .filter((word) => {
      if (!word || word.status !== "published" || !ids.has(word.id)) return false;
      if (!state.isPaid && word.access !== "free") return false;
      const entry = state.vocabBook[word.id];
      return entry ? !entry.remembered : true;
    });
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
  const sessionScope = isVocabBookSession() ? `vocab:${state.vocabBookSessionBundleId}` : `${state.activeCourseId}:${state.activeChapterId}`;
  return `${mode}:${sessionScope}:${words.map((word) => word.id).join(",")}`;
}

function resetTapReadWordOrder() {
  state.tapReadWordIds = [];
  state.tapReadOrderKey = "";
}

function resetChallengeWordOrder() {
  state.challengeOrderKey = "";
}

const baseKanaPool = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゃゅょぁぃぅぇぉっー".split("");

const kanaConfusionGroups = [
  ["か", "が"], ["き", "ぎ"], ["く", "ぐ"], ["け", "げ"], ["こ", "ご"],
  ["さ", "ざ"], ["し", "じ"], ["す", "ず"], ["せ", "ぜ"], ["そ", "ぞ"],
  ["た", "だ"], ["ち", "ぢ"], ["つ", "づ"], ["て", "で"], ["と", "ど"],
  ["は", "ば", "ぱ"], ["ひ", "び", "ぴ"], ["ふ", "ぶ", "ぷ"], ["へ", "べ", "ぺ"], ["ほ", "ぼ", "ぽ"],
  ["や", "ゃ"], ["ゆ", "ゅ"], ["よ", "ょ"], ["あ", "ぁ"], ["い", "ぃ"], ["う", "ぅ"], ["え", "ぇ"], ["お", "ぉ"],
  ["う", "お", "ー"], ["い", "え", "ー"], ["つ", "っ"],
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
  if (kana.includes("ん")) confusingPool.push("あ", "い", "う", "な", "に", "ぬ", "ん");
  if (kana.includes("っ")) confusingPool.push("つ", "く", "こ", "と", "っ");
  if (/[うおー]/.test(kana)) confusingPool.push("う", "お", "ー", "こ", "ご", "と", "ど");
  if (/[いえ]/.test(kana)) confusingPool.push("い", "え", "せ", "ぜ", "け", "げ");

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
  if (isVocabBookSession()) {
    return getVocabBookBundleWords(state.vocabBookSessionBundleId);
  }
  const chapter = activeChapter();
  return chapter ? chapter.words : accessibleWords();
}

function todayCompleted() {
  return Object.values(state.progress).filter((item) => item.lastResult).length;
}

function addSampleDue() {
  const next = state.words.find((word) => word.status === "published" && !state.progress[word.id]?.due);
  if (!next) return showToast("暂无可加入的新词");
  state.progress[next.id] = { ...(state.progress[next.id] || defaultProgress()), due: true };
  saveState(state);
  showToast(`${next.japanese} 已加入今日练习`);
}

function startCourse(id) {
  state.vocabBookSessionBundleId = "";
  const course = state.courses.find((item) => item.id === id);
  if (course?.access === "member" && !state.isPaid) return showToast("付费词库需要解锁后学习");
  const chapter = courseChapters(course)[0];
  if (!chapter) return showToast("暂无可学习章节");
  startChapter(id, chapter.id);
}

function startChapter(courseId, chapterId) {
  state.vocabBookSessionBundleId = "";
  const course = state.courses.find((item) => item.id === courseId);
  if (course?.access === "member" && !state.isPaid) return showToast("付费词库需要解锁后学习");
  const chapter = courseChapters(course).find((item) => item.id === chapterId);
  if (!chapter) return showToast("暂无可学习章节");
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
  showToast(`已开始：${course?.title || "词库"} / ${chapter.label}`);
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
  showToast("生词已加入今日复习");
}

function practiceFavorites() {
  state.words.forEach((word) => {
    if (state.favoriteBook[word.id] && word.status === "published" && (state.isPaid || word.access === "free")) {
      state.progress[word.id] = { ...(state.progress[word.id] || defaultProgress()), due: true };
    }
  });
  state.learnerView = "study";
  saveState(state);
  showToast("收藏词已加入今日复习");
}

function markDue(id) {
  const word = state.words.find((item) => item.id === id);
  if (!word) return;
  if (word.access === "member" && !state.isPaid) return showToast("付费词库需要解锁后学习");
  state.progress[id] = { ...(state.progress[id] || defaultProgress()), due: true };
  saveState(state);
  showToast(`${word.japanese} 已加入今日复习`);
}

function rememberVocabWord(wordId) {
  ensureVocabBundleAssignments();
  const word = state.words.find((item) => item.id === wordId);
  const entry = state.vocabBook[wordId];
  const wordLabel = word ? word.japanese : `ID ${wordId}`;
  if (!entry) {
    if (word) return showToast(`${wordLabel} 已经从生词本里被删除`);
    return showToast("词条不存在");
  }
  const normalized = normalizeVocabBookEntry(entry);
  if (normalized.remembered) {
    showToast(`${wordLabel} 已经记住`);
    return;
  }
  normalized.remembered = true;
  normalized.rememberedAt = Date.now();
  state.vocabBook[wordId] = normalized;
  const removed = maybeFinalizeVocabBundle(normalized.bundleId);
  if (removed) {
    showToast("该词库已全部记住，已从生词本移除");
  } else {
    showToast(`${wordLabel} 已标记为已记住`);
  }
}
function continueNextChapter(mode = state.studyMode) {
  const nextChapter = nextChapterForCurrentCourse();
  if (!nextChapter) return;
  state.studyMode = mode === "challenge" ? "challenge" : "tapread";
  startChapter(state.activeCourseId, nextChapter.id);
}

function nextChapterForCurrentCourse() {
  const course = state.courses.find((item) => item.id === state.activeCourseId);
  const chapters = courseChapters(course);
  const currentIndex = chapters.findIndex((chapter) => chapter.id === state.activeChapterId);
  return currentIndex >= 0 ? chapters[currentIndex + 1] : null;
}

function moveAutoplay(offset) {
  const words = autoplayWords();
  if (!words.length) return;
  const nextIndex = state.autoplayIndex + offset;
  if (offset > 0 && nextIndex >= words.length && state.autoplayAutoNextChapter && moveToAdjacentChapter(1)) {
    return;
  }
  state.autoplayIndex = (nextIndex + words.length) % words.length;
  if (offset > 0 && state.autoplayIndex === words.length - 1) recordChapterStars(1);
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
  return `${isVocabBookSession() ? `vocab:${state.vocabBookSessionBundleId}` : state.activeCourseId}:${isVocabBookSession() ? "" : state.activeChapterId}:${words.map((word) => word.id).join(",")}`;
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
  if (course.id === 2) return words.filter((word) => word.access === "member" && (word.level === "N3" || word.tags.includes("商务")));
  if (course.id === 3) return words.filter((word) => word.access === "member" && word.tags.includes("外来语"));
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
    .replace(/[ァ-ン]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0x60))
    .replace(/[〜~]/g, "")
    .trim();
}

function chapterLabel(index, words) {
  const first = words[0]?.kana || "";
  const last = words[words.length - 1]?.kana || "";
  const range = first && last ? `${kanaHead(first)}-${kanaHead(last)}` : "";
  return `第${index + 1}章${range ? ` ${range}` : ""}`;
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
  button.textContent = state.autoplayPlaying ? `${remainingAutoplaySeconds()}` : "▶";
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
    if (!quiet) showToast("当前浏览器不支持系统读音");
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
    label: `词库 ${index}`,
    index,
    pendingCount,
    totalCount: entries.length,
    updatedAt: entries.reduce((latest, entry) => Math.max(latest, Number(entry.item.lastAddedAt || 0)), 0),
    words: entries.filter((entry) => !entry.item.remembered).map((entry) => entry.word),
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
      label: `词库 ${index}`,
      pendingCount: pending.length,
      rememberedCount,
      totalCount: items.length,
      updatedAt: updatedAt || Date.now(),
      rangeText: formattedRangeStart && formattedRangeEnd
        ? `收藏时间${formattedRangeStart}～${formattedRangeEnd}`
        : "收藏时间未标注",
    };
  }).sort((left, right) => left.index - right.index);
  return entries.filter((bundle) => bundle.totalCount > 0);
}

function renderStudySessionHeader() {
  if (isVocabBookSession()) {
    const bundle = getVocabBookBundle(state.vocabBookSessionBundleId);
    const total = bundle ? bundle.totalCount : 0;
    const pending = bundle ? bundle.pendingCount : 0;
    return `
      <div class="panel session-header">
        <div>
      <div class="session-title-row">
            <div class="panel-title">生词本</div>
            <span class="badge published">生词本</span>
          </div>
          <div class="muted">${bundle ? `${bundle.label} · ${pending}/${total} 词待学习` : "暂无可学习词汇"}</div>
        </div>
        <button class="btn" data-action="back-to-courses">返回今日学习</button>
      </div>
    `;
  }
  const course = state.courses.find((item) => item.id === state.activeCourseId);
  const chapter = activeChapter();
  const sessionWords = state.studyMode === "autoplay" ? autoplayWords() : studyWords();
  const exampleSource = sessionWords.find((word) => word && word.exampleSource)?.exampleSource;
  const sentenceSourceLabel = exampleSource === "tatoeba" ? "Tatoeba CC BY 2.0 FR" : "默认例句源";
  const hasSentenceSource = !!exampleSource;
  return `
    <div class="panel session-header">
      <div>
        <div class="session-title-row">
          <div class="panel-title">${course?.title || "今日学习"}</div>
          <span class="badge ${course?.access === "member" ? "member" : "published"}">${course?.access === "member" ? "会员" : "公开"}</span>
        </div>
        <div class="muted">${chapter ? `${chapter.label} · ${chapter.count} 词` : "课程"}</div>
        ${hasSentenceSource ? `<div class="muted source-note">句源：${escapeHtml(sentenceSourceLabel)} / TTS</div>` : ""}
      </div>
      <button class="btn" data-action="open-current-chapter-picker">选择章节</button>
    </div>
  `;
}

function renderChallengeSummaryModal(total) {
  const summary = challengeSummary(total);
  const passed = state.challengeStatus === "passed";
  const nextChapter = isVocabBookSession() ? null : passed ? nextChapterForCurrentCourse() : null;
  const challengeStars = passed ? challengeStarsForLives(state.challengeLives) : 0;
  return `
    <div class="modal-backdrop challenge-summary-backdrop">
      <div class="panel study-empty challenge-summary challenge-summary-modal">
        <div class="panel-body stack">
          <div class="complete-mark">${state.challengeStatus === "failed" ? "!" : "✓"}</div>
          <h2>${state.challengeStatus === "failed" ? "挑战失败" : "挑战完成"}</h2>
          <div class="stats">
            ${stat("准确率", `${summary.accuracy}%`)}
            ${stat("得分", summary.score)}
            ${stat("用时", summary.duration)}
            ${stat("生命", state.challengeLives)}
            ${passed ? stat("星级", `${challengeStars}★`) : ""}
          </div>
          <p class="muted">对 ${state.challengeCorrect} · 错 ${state.challengeWrong} · 共 ${summary.total}</p>
          <div class="row-actions">
            ${nextChapter ? '<button class="btn primary" data-action="continue-next-chapter" data-next-mode="challenge">继续下一章</button>' : ""}
            <button class="btn primary" data-action="restart-challenge">重新挑战</button>
            <button class="btn" data-action="study-mode" data-mode-value="autoplay">切换自动播放</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTapReadSummaryModal() {
  const nextChapter = isVocabBookSession() ? null : nextChapterForCurrentCourse();
  const total = studyWords().length;
  return `
    <div class="modal-backdrop challenge-summary-backdrop">
      <div class="panel study-empty challenge-summary challenge-summary-modal">
        <div class="panel-body stack">
          <div class="complete-mark">✓</div>
          <h2>点读完成</h2>
          <div class="stats">
            ${stat("正确", "2/2")}
            ${stat("词数", total)}
            ${stat("用时", `${Math.max(0, Number(state.chapterProgress[state.activeChapterId]?.bestStars || 0))}分钟`)}
            ${stat("操作", "点读")}
          </div>
          <p class="muted">点读完成，继续下一步可选择挑战或切换其他模式。</p>
          <div class="row-actions">
            ${nextChapter ? '<button class="btn primary" data-action="continue-next-chapter" data-next-mode="tapread">继续下一章</button>' : ""}
            <button class="btn primary" data-action="restart-tapread">再练一次</button>
            <button class="btn" data-action="study-mode" data-mode-value="challenge">切换挑战</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTodayCourses() {
  const vocabBookBundles = getVocabBookBundles();
  const favorites = getFavoriteWords();
  const latestFavoriteAt = favorites[0] ? Number((state.favoriteBook || {})[favorites[0].id]?.addedAt || 0) : 0;
  return `
    <div class="panel">
      <div class="panel-header"><div class="panel-title">学习课程</div></div>
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
              ${locked ? '<span class="badge review">可试学</span>' : ""}
              ${course.featured ? '<span class="badge review">推荐</span>' : ""}
            </div>
            <div class="course-meta today-course-notes"><span>${course.category}</span><span>${course.chapters} 章</span><span>${course.words} 词</span>${chapter ? `<span>当前 ${chapter.label}</span>` : ""}</div>
            <div class="progress"><span style="width:${course.access === "free" ? 42 : 18}%"></span></div>
            <div class="course-actions">
              <button class="btn" data-action="open-chapter-picker" data-course="${course.id}" ${locked ? "disabled" : ""}>选择章节</button>
              <button class="btn primary" data-action="start-course" data-course="${course.id}" ${locked ? "disabled" : ""}>${locked ? "解锁后学习" : "开始课程"}</button>
            </div>
          </div>
        `}).join("")}
      </div>
    </div>
    ${vocabBookBundles.length ? `
      <div class="panel">
        <div class="panel-header"><div class="panel-title">生词本</div></div>
        <div class="panel-body course-list compact-courses">
          ${vocabBookBundles.map((bundle) => `
            <div class="course-item">
              <div class="row-actions">
                <strong>${bundle.label}</strong>
                <span class="badge review">记住了 ${bundle.rememberedCount || 0} / ${bundle.totalCount}</span>
              </div>
              <div class="course-meta today-course-notes">
                <span>${bundle.rangeText || "收藏时间未标注"}</span>
              </div>
              <div class="course-actions">
                <button class="btn" data-action="open-vocab-book" data-bundle="${bundle.id}">查看</button>
                ${bundle.pendingCount ? `<button class="btn primary" data-action="start-vocab-book" data-bundle="${bundle.id}">开始学习</button>` : `<button class="btn primary" data-action="delete-vocab-book-bundle" data-bundle="${bundle.id}">删除词库</button>`}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    ` : `<div class="panel"><div class="panel-body muted today-course-notes">目前没有可学习的生词本。</div></div>`}
    <div class="panel">
      <div class="panel-header"><div class="panel-title">收藏词库</div></div>
      <div class="panel-body course-list compact-courses">
        <div class="course-item">
          <div class="row-actions">
            <strong>收藏词库</strong>
            <span class="badge review">${favorites.length} 词</span>
          </div>
          <div class="course-meta today-course-notes"><span>${favorites.length ? `最近收藏 ${formatDateYMD(latestFavoriteAt)}` : "尚未收藏任何单词"}</span></div>
          <div class="course-actions">
            <button class="btn" data-action="open-favorites">查看</button>
            <button class="btn primary" data-action="practice-favorites" ${favorites.length ? "" : "disabled"}>练习收藏</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
function startVocabBookBundle(bundleId) {
  const bundle = getVocabBookBundle(bundleId);
  if (!bundle || !bundle.words.length) {
    showToast(bundle ? "该词库暂无可学习词汇" : "词库不存在");
    state.vocabBookSessionBundleId = "";
    return;
  }
  ensureVocabBundleAssignments();
  state.vocabBookSessionBundleId = bundleId;
  state.inStudySession = true;
  state.learnerView = "study";
  state.activeChapterId = "";
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
  stopAutoplayPlayback();
  clearTapReadTimers();
  window.clearTimeout(challengeTimer);
  resetAutoplayWordOrder();
  resetChallenge();
  resetTapRead();
  bundle.words.forEach((word) => {
    state.progress[word.id] = { ...(state.progress[word.id] || defaultProgress()), due: true };
  });
  if (!["autoplay", "tapread", "challenge"].includes(state.studyMode)) {
    state.studyMode = "autoplay";
  }
  saveState(state);
  showToast(`开始 ${bundle.label}`);
}

render();
