const { statusLabels, loadState, saveState, escapeHtml, stat, defaultProgress } = JpWords;
const app = document.querySelector("#app");
const params = new URLSearchParams(window.location.search);
const layout = params.get("layout") === "phone" ? "phone" : "desktop";
const state = loadState();
let autoplayTimer = null;
let autoplayCountdownTimer = null;
let autoplayRevealTimer = null;
let challengeTimer = null;
const AUTOPLAY_REVEAL_DELAY = 1000;

state.learnerView = state.learnerView === "library" ? "study" : state.learnerView || "study";
state.studyMode = state.studyMode === "review" ? "challenge" : state.studyMode || "challenge";
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
state.isPaid = state.isPaid || false;
state.activeCourseId = state.activeCourseId || 1;
state.activeChapterId = state.activeChapterId || "";
state.chapterPickerCourseId = state.chapterPickerCourseId || null;
state.inStudySession = state.inStudySession || false;
state.challengeInput = state.challengeInput || "";
state.challengeRetryInput = state.challengeRetryInput || "";
state.challengeRetryTyping = state.challengeRetryTyping || false;
state.challengeResult = state.challengeResult || "";
state.challengeRevealAttempt = state.challengeRevealAttempt || false;
state.challengeLives = state.challengeLives ?? 5;
state.challengeIndex = state.challengeIndex || 0;
state.challengeCorrect = state.challengeCorrect || 0;
state.challengeWrong = state.challengeWrong || 0;
state.challengeStartedAt = state.challengeStartedAt || 0;
state.challengeEndedAt = state.challengeEndedAt || 0;
state.challengeStatus = state.challengeStatus || "active";
state.challengeWordIds = state.challengeWordIds || [];
state.challengeSeed = state.challengeSeed || randomChallengeSeed();
state.chapterProgress = state.chapterProgress || {};
if (state.studyMode === "challenge" && !state.challengeStartedAt) {
  state.challengeStartedAt = Date.now();
  state.challengeWordIds = dueWords().map((word) => word.id);
}

function render() {
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
}

function renderAppShell() {
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
          ${appTab("mistakes", "错词")}
          ${appTab("stats", "统计")}
        </nav>
      </div>
    </div>
    <div class="toast ${state.toast ? "show" : ""}">${state.toast}</div>
  `;
  bindEvents();
  syncAutoplayTimer();
}

function appTab(id, label) {
  return `<button class="tab ${state.learnerView === id ? "active" : ""}" data-learner-view="${id}">${label}</button>`;
}

function renderLearnerSidebar() {
  const items = [
    ["study", "今日学习", "今"],
    ["mistakes", "错词本", "错"],
    ["stats", "统计", "図"],
  ];
  return `
    <aside class="sidebar learner-sidebar">
      <div class="brand">
        <div class="brand-mark">日</div>
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
    mistakes: ["错词本", "集中处理答错次数高、容易混淆的单词"],
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
  return `
    ${renderStudySessionHeader()}
    <div class="study-mode-bar panel">
      <div class="segmented">
        <button class="${state.studyMode === "autoplay" ? "active" : ""}" data-action="study-mode" data-mode-value="autoplay">自动播放</button>
        <button class="${state.studyMode === "challenge" ? "active" : ""}" data-action="study-mode" data-mode-value="challenge">假名挑战</button>
      </div>
    </div>
    ${state.studyMode === "autoplay" ? renderAutoplayStudy() : renderKanaChallenge()}
    ${challengeSummary}
    ${renderChapterPickerModal()}
  `;
}

function renderStudySessionHeader() {
  const course = state.courses.find((item) => item.id === state.activeCourseId);
  const chapter = activeChapter();
  return `
    <div class="panel session-header">
      <div>
        <div class="session-title-row">
          <div class="panel-title">${course?.title || "今日学习"}</div>
          <span class="badge ${course?.access === "member" ? "member" : "published"}">${course?.access === "member" ? "会员词" : "免费词"}</span>
        </div>
        <div class="muted">${chapter ? `${chapter.label} · ${chapter.count} 词` : "请选择章节"}</div>
      </div>
      <button class="btn" data-action="open-current-chapter-picker">选择章节</button>
    </div>
  `;
}

function renderAutoplayStudy() {
  const queue = autoplayWords();
  const current = queue[state.autoplayIndex % Math.max(queue.length, 1)];
  if (!current) return renderStudyEmpty("暂无可学习单词", "当前权限下没有可学习词库，可以切换付费预览查看会员词库。");
  const progress = state.progress[current.id] || defaultProgress();
  const completed = queue.length ? (state.autoplayIndex % queue.length) + 1 : 0;
  const total = queue.length;
  const chapter = activeChapter();
  const playLabel = state.autoplayPlaying ? `${remainingAutoplaySeconds()}` : "▶";
  const answerVisible = isAutoplayAnswerVisible();
  const autoplayMeaningText = (current.meaning || current.meaningEn || "").trim();
  return `
    <div class="study-layout">
      <div class="study-card panel">
        <div class="study-card-top">
          <span class="muted">${chapter ? `${chapter.label} · ` : ""}${current.level}</span>
        </div>
        <div class="study-word">${current.japanese}</div>
        <div class="study-kana fade-piece fade-kana ${answerVisible ? "" : "autoplay-hidden-content"}">${answerVisible ? current.kana : "&nbsp;"}</div>
        <div class="answer-panel revealed autoplay-answer">
          <div class="autoplay-progress-line">${completed}/${total}</div>
          <div class="meaning fade-piece fade-meaning ${answerVisible ? "" : "autoplay-hidden-content"}">${autoplayMeaningText || current.meaning}</div>
          <div class="tag-row autoplay-part-tags">
            <span>${escapeHtml(current.part || "未设置")}</span>
          </div>
          <div class="fade-piece fade-example ${answerVisible ? "" : "autoplay-hidden-content"}"><div class="example">${current.example}</div><div class="muted">${current.translation}</div></div>
        </div>
        <div class="study-actions autoplay-actions">
          <button class="btn danger" data-review="wrong">没记住</button>
          <button class="btn" data-action="autoplay-prev">&lt;</button>
          <button class="btn autoplay-play-btn" data-action="autoplay-toggle">${playLabel}</button>
          <button class="btn primary" data-review="correct">&gt;</button>
          <button class="btn" data-review="hard">模糊</button>
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
              <button class="btn ${state.autoplayOrder === "sequential" ? "primary" : ""}" data-action="autoplay-order" data-order="sequential">本章顺序</button>
              <button class="btn ${state.autoplayOrder === "random" ? "primary" : ""}" data-action="autoplay-order" data-order="random">本章随机</button>
            </div>
          </div>
          <label class="check-line">
            <input type="checkbox" data-action="toggle-autoplay-next-chapter" ${state.autoplayAutoNextChapter ? "checked" : ""}>
            <span>播完后自动进入下一章节</span>
          </label>
          <label class="check-line">
            <input type="checkbox" data-action="toggle-autoplay-delay" ${state.autoplayDelayReveal ? "checked" : ""}>
            <span>延迟显示读音和解释</span>
          </label>
          <div class="notice">播放浏览不会写入进度；只有点击“不记得 / 模糊 / 记得”才更新记忆盒、正确率和错词本。</div>
        </div>
      </div>
    </div>
  `;
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
  return `
    <div class="study-layout challenge-layout">
      <div class="study-card panel challenge-card">
        <div class="study-card-top">
          <span class="muted">${chapter ? `${chapter.label} · ` : ""}${current.level}</span>
        </div>
        <div class="life-row" aria-label="剩余生命">${Array.from({ length: 5 }, (_, index) => `<span class="${index < state.challengeLives ? "alive" : ""}">♥</span>`).join("")}</div>
        <div class="study-word">${current.japanese}</div>
        <div class="answer-panel revealed challenge-answer">
          <div class="autoplay-progress-line">${challengeProgressText}</div>
          <div class="meaning">${challengeMeaningText}</div>
          <div class="tag-row">
            <span>${escapeHtml(current.part || "未设置")}</span>
          </div>
          <div class="fade-example"><div class="example">${current.example}</div><div class="muted">${current.translation}</div></div>
        </div>
        <div class="challenge-input ${inputStateClass}">
          <span class="challenge-input-text">${state.challengeResult === "wrong" && state.challengeRetryInput ? escapeHtml(state.challengeRetryInput) : state.challengeInput ? escapeHtml(state.challengeInput) : '<span class="challenge-input-placeholder">点击假名输入读音</span>'}</span>
          <span class="challenge-result-icon" aria-hidden="true">${challengeResultIcon}</span>
        </div>
        <div class="kana-pad ${shouldHintKana ? "challenge-kana-hint" : ""}">
          ${choices.map((kana) => `<button class="kana-key ${hintKana && hintKana.has(kana) ? "hint" : ""}" data-kana="${escapeHtml(kana)}">${escapeHtml(kana)}</button>`).join("")}
          <button class="kana-key challenge-reveal-key" data-action="challenge-reveal-answer">不会</button>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-title">挑战状态</div></div>
        <div class="panel-body stack">
          <div class="stats compact">
            ${stat("正确", state.challengeCorrect)}
            ${stat("错误", state.challengeWrong)}
          </div>
          <div class="progress tall"><span style="width:${Math.min(100, Math.round((state.challengeIndex / queue.length) * 100))}%"></span></div>
          <div class="notice">输入长度达到正确假名长度后会自动判定。错 5 次挑战失败；完成全部题目则通关。</div>
          <button class="btn" data-action="restart-challenge">重新开始挑战</button>
          <button class="btn ghost" data-action="study-mode" data-mode-value="autoplay">返回自动播放</button>
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
          <button class="btn" data-learner-view="mistakes">看错词</button>
        </div>
      </div>
    </div>
  `;
}

function renderChallengeSummaryModal(total) {
  const summary = challengeSummary(total);
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
          </div>
          <p class="muted">正确 ${state.challengeCorrect} / 错误 ${state.challengeWrong} / 总题 ${summary.total}</p>
          <div class="row-actions">
            <button class="btn primary" data-action="restart-challenge">重新开始挑战</button>
            <button class="btn" data-action="study-mode" data-mode-value="autoplay">返回自动播放</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTodayCourses() {
  return `
    <div class="panel">
      <div class="panel-header"><div class="panel-title">今日词库</div></div>
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
            <div class="course-meta"><span>${course.category}</span><span>${course.chapters} 章节</span><span>${course.words} 词</span>${chapter ? `<span>当前 ${chapter.label}</span>` : ""}</div>
            <div class="progress"><span style="width:${course.access === "free" ? 42 : 18}%"></span></div>
            <div class="course-actions">
              <button class="btn" data-action="open-chapter-picker" data-course="${course.id}" ${locked ? "disabled" : ""}>选择章节</button>
              <button class="btn primary" data-action="start-course" data-course="${course.id}" ${locked ? "disabled" : ""}>${locked ? "付费解锁" : "开始学习"}</button>
            </div>
          </div>
        `}).join("")}
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
  const mistakes = state.words.filter((word) => (state.progress[word.id]?.wrong || 0) > 0).sort((a, b) => (state.progress[b.id]?.wrong || 0) - (state.progress[a.id]?.wrong || 0));
  return `
    <div class="panel">
      <div class="panel-header"><div class="panel-title">高频错词</div><button class="btn primary" data-action="practice-mistakes">练习错词</button></div>
      <div class="panel-body">
        <div class="table-wrap">
          <table>
            <thead><tr><th>单词</th><th>释义</th><th>错误次数</th><th>最近结果</th><th>操作</th></tr></thead>
            <tbody>
              ${mistakes.map((word) => `
                <tr>
                  <td><div class="jp">${word.japanese}</div><div class="kana">${word.kana}</div></td>
                  <td>${word.meaning}<div class="muted">${word.example}</div></td>
                  <td>${state.progress[word.id].wrong}</td>
                  <td><span class="badge ${state.progress[word.id].lastResult === "wrong" ? "archived" : "published"}">${state.progress[word.id].lastResult || "-"}</span></td>
                  <td><button class="btn" data-action="mark-due" data-word="${word.id}">加入今日</button></td>
                </tr>
              `).join("") || '<tr><td colspan="5" class="muted">目前没有错词。</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderLearnerStats() {
  const totalCorrect = Object.values(state.progress).reduce((sum, item) => sum + item.correct, 0);
  const totalWrong = Object.values(state.progress).reduce((sum, item) => sum + item.wrong, 0);
  const accuracy = Math.round(totalCorrect / Math.max(totalCorrect + totalWrong, 1) * 100);
  return `
    <div class="stats">
      ${stat("连续学习", `${state.learner.streak}天`)}
      ${stat("掌握单词", state.learner.mastered)}
      ${stat("正确率", `${accuracy}%`)}
      ${stat("累计 XP", state.learner.xp)}
    </div>
    <div class="panel">
      <div class="panel-header"><div class="panel-title">记忆盒分布</div></div>
      <div class="panel-body memory-boxes">
        ${[0, 1, 2, 3, 4].map((box) => {
          const count = Object.values(state.progress).filter((item) => item.box === box).length;
          return `<div><strong>Box ${box}</strong><div class="progress tall"><span style="width:${Math.min(100, count * 22)}%"></span></div><span class="muted">${count} 词</span></div>`;
        }).join("")}
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
  document.querySelectorAll("[data-learner-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.learnerView = button.dataset.learnerView;
      if (state.learnerView === "study") {
        state.inStudySession = false;
        state.autoplayPlaying = false;
        state.challengeResult = "";
        state.challengeRetryInput = "";
        state.challengeRetryTyping = false;
        window.clearTimeout(challengeTimer);
      }
      saveState(state);
      render();
    });
  });
  document.querySelectorAll("[data-review]").forEach((button) => {
    button.addEventListener("click", () => {
      gradeStudyWord(button.dataset.review, "autoplay");
      moveAutoplay(1);
      resetAutoplayCountdown();
      saveState(state);
      render();
    });
  });
  document.querySelectorAll("[data-kana]").forEach((button) => {
    button.addEventListener("click", () => appendChallengeKana(button.dataset.kana));
  });
  document.querySelectorAll("[data-modal-stop]").forEach((node) => {
    node.addEventListener("click", (event) => event.stopPropagation());
  });
  document.querySelectorAll("[data-action]").forEach((node) => node.addEventListener("click", handleAction));
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  const wordId = Number(event.currentTarget.dataset.word);
  const courseId = Number(event.currentTarget.dataset.course);
  const chapterId = event.currentTarget.dataset.chapter;
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
    if (state.studyMode === "challenge") {
      state.autoplayPlaying = false;
      ensureChallengeStarted();
    } else {
      window.clearTimeout(challengeTimer);
      state.challengeResult = "";
    }
    saveState(state);
  }
  if (action === "autoplay-toggle") {
    state.autoplayPlaying = !state.autoplayPlaying;
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
  if (action === "toggle-autoplay-next-chapter") {
    state.autoplayAutoNextChapter = event.currentTarget.checked;
    resetAutoplayCountdown();
  }
  if (action === "toggle-autoplay-delay") {
    state.autoplayDelayReveal = event.currentTarget.checked;
    resetAutoplayCountdown();
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
    state.autoplayPlaying = false;
    state.challengeResult = "";
    window.clearTimeout(challengeTimer);
  }
  if (action === "add-sample-due") addSampleDue();
  if (action === "restart-challenge") resetChallenge();
  if (action === "challenge-reveal-answer") revealChallengeAnswer();
  if (action === "start-course") startCourse(courseId);
  if (action === "start-chapter") startChapter(courseId, chapterId);
  if (action === "practice-mistakes") practiceMistakes();
  if (action === "mark-due") markDue(wordId);
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

function ensureChallengeStarted() {
  if (state.challengeStartedAt && state.challengeStatus === "active" && state.challengeWordIds.length) return;
  resetChallenge();
}

function resetChallenge() {
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
  } else {
    state.challengeWrong += 1;
    state.challengeInput = input;
    state.challengeRetryInput = "";
    state.challengeRetryTyping = false;
    state.challengeLives = Math.max(0, state.challengeLives - 1);
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
  const chapterId = state.activeChapterId;
  if (!chapterId) return;
  const stars = Math.max(1, Math.min(5, Number(state.challengeLives || 0)));
  const previous = state.chapterProgress[chapterId] || {};
  state.chapterProgress[chapterId] = {
    ...previous,
    stars,
    bestStars: Math.max(Number(previous.bestStars || 0), stars),
    lastCompletedAt: Date.now(),
  };
}

function renderChapterStars(chapterId) {
  const bestStars = Math.max(0, Math.min(5, Number(state.chapterProgress[chapterId]?.bestStars || 0)));
  const earned = "★".repeat(bestStars);
  const empty = "☆".repeat(5 - bestStars);
  return `<span class="chapter-stars" aria-label="${bestStars} / 5">${earned}<span>${empty}</span></span>`;
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
  const byId = new Map(state.words.map((word) => [word.id, word]));
  return state.challengeWordIds
    .map((id) => byId.get(id))
    .filter((word) => word && ids.has(word.id) && word.status === "published" && (state.isPaid || word.access === "free"));
}

function challengeSourceWords() {
  const due = dueWords();
  return due.length ? due : studyWords();
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
  return studyWords().filter((word) => state.progress[word.id]?.due || false);
}

function studyWords() {
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
  const course = state.courses.find((item) => item.id === id);
  if (course?.access === "member" && !state.isPaid) return showToast("付费词库需要解锁后学习");
  const chapter = courseChapters(course)[0];
  if (!chapter) return showToast("暂无可学习章节");
  startChapter(id, chapter.id);
}

function startChapter(courseId, chapterId) {
  const course = state.courses.find((item) => item.id === courseId);
  if (course?.access === "member" && !state.isPaid) return showToast("付费词库需要解锁后学习");
  const chapter = courseChapters(course).find((item) => item.id === chapterId);
  if (!chapter) return showToast("暂无可学习章节");
  state.activeCourseId = courseId;
  state.activeChapterId = chapterId;
  state.chapterPickerCourseId = null;
  state.inStudySession = true;
  state.autoplayIndex = 0;
  state.autoplayPlaying = false;
  resetAutoplayWordOrder();
  chapter.words.forEach((word) => {
    state.progress[word.id] = { ...(state.progress[word.id] || defaultProgress()), due: true };
  });
  state.learnerView = "study";
  resetChallenge();
  saveState(state);
  showToast(`已开始：${course?.title || "词库"} / ${chapter.label}`);
}

function practiceMistakes() {
  state.words.forEach((word) => {
    if ((state.progress[word.id]?.wrong || 0) > 0) state.progress[word.id].due = true;
  });
  state.learnerView = "study";
  saveState(state);
  showToast("错词已加入今日复习");
}

function markDue(id) {
  const word = state.words.find((item) => item.id === id);
  if (!word) return;
  if (word.access === "member" && !state.isPaid) return showToast("付费词库需要解锁后学习");
  state.progress[id] = { ...(state.progress[id] || defaultProgress()), due: true };
  saveState(state);
  showToast(`${word.japanese} 已加入今日复习`);
}

function moveAutoplay(offset) {
  const words = autoplayWords();
  if (!words.length) return;
  const nextIndex = state.autoplayIndex + offset;
  if (offset > 0 && nextIndex >= words.length && state.autoplayAutoNextChapter && moveToAdjacentChapter(1)) {
    return;
  }
  state.autoplayIndex = (nextIndex + words.length) % words.length;
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
  return `${state.activeCourseId}:${state.activeChapterId}:${words.map((word) => word.id).join(",")}`;
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
  if (course.id === 2) return words.filter((word) => word.access === "member" && (word.level === "N3" || word.tags.includes("商务")));
  if (course.id === 3) return words.filter((word) => word.access === "member" && word.tags.includes("外来语"));
  return words;
}

function courseChapters(course) {
  if (!course) return [];
  const words = [...courseWords(course)].sort(compareKanaWords);
  const count = Math.max(1, Number(course.chapters || 1));
  const size = Math.ceil(words.length / count);
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

function isAutoplayAnswerVisible() {
  if (!state.autoplayDelayReveal) return true;
  if (!state.autoplayRevealAt) return true;
  return Date.now() >= state.autoplayRevealAt;
}

function showToast(message) {
  state.toast = message;
  render();
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1800);
}

render();

