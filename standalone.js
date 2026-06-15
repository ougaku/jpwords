const lexicons = [
  {
    id: "jlpt-n5",
    title: "JLPT N5 基础词库",
    level: "N5",
    access: "free",
    words: [
      { id: "n5-001", japanese: "学校", kana: "がっこう", meaning: "学校", part: "名词", level: "N5", example: "毎朝、学校へ行きます。", translation: "每天早上去学校。" },
      { id: "n5-002", japanese: "水", kana: "みず", meaning: "水", part: "名词", level: "N5", example: "水を飲みます。", translation: "喝水。" },
      { id: "n5-003", japanese: "行く", kana: "いく", meaning: "去", part: "动词", level: "N5", example: "駅へ行きます。", translation: "去车站。" },
      { id: "n5-004", japanese: "食べる", kana: "たべる", meaning: "吃", part: "动词", level: "N5", example: "朝ご飯を食べます。", translation: "吃早饭。" }
    ]
  },
  {
    id: "daily-n4",
    title: "N4 日常高频词",
    level: "N4",
    access: "free",
    words: [
      { id: "n4-001", japanese: "アルバイト", kana: "あるばいと", meaning: "兼职，打工", part: "名词/する动词", level: "N4", example: "週末にアルバイトをしています。", translation: "周末在打工。" },
      { id: "n4-002", japanese: "準備", kana: "じゅんび", meaning: "准备", part: "名词/する动词", level: "N4", example: "旅行の準備をします。", translation: "准备旅行。" }
    ]
  },
  {
    id: "business",
    title: "商务日语高频表达",
    level: "N3-N2",
    access: "paid",
    words: [
      { id: "biz-001", japanese: "申請", kana: "しんせい", meaning: "申请", part: "名词/する动词", level: "N3", example: "ビザを申請しました。", translation: "申请了签证。" },
      { id: "biz-002", japanese: "対応", kana: "たいおう", meaning: "应对，处理", part: "名词/する动词", level: "N3", example: "早急に対応します。", translation: "会尽快处理。" }
    ]
  }
];

const storageKey = "jpwords.standalone.web";
const app = document.querySelector("#app");
let timer = null;

const state = loadState();

function loadState() {
  const defaults = {
    tab: "study",
    mode: "review",
    edition: "free",
    lexiconId: "jlpt-n5",
    revealed: false,
    autoplayIndex: 0,
    autoplayPlaying: false,
    autoplaySpeed: 5000,
    showKana: true,
    showMeaning: true,
    showExample: true,
    toast: "",
    progress: {}
  };
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(storageKey) || "{}") };
  } catch {
    return defaults;
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify({ ...state, toast: "" }));
}

function availableLexicons() {
  return lexicons.filter((lexicon) => state.edition === "paid" || lexicon.access === "free");
}

function selectedLexicon() {
  const allowed = availableLexicons();
  return allowed.find((lexicon) => lexicon.id === state.lexiconId) || allowed[0] || lexicons[0];
}

function allStudyWords() {
  return selectedLexicon().words.map((word) => ({ ...word, lexicon: selectedLexicon() }));
}

function progressFor(wordId) {
  if (!state.progress[wordId]) {
    state.progress[wordId] = { box: 0, due: true, correct: 0, wrong: 0, lastResult: "" };
  }
  return state.progress[wordId];
}

function dueWords() {
  return allStudyWords().filter((word) => progressFor(word.id).due);
}

function currentWord() {
  const words = state.mode === "autoplay" ? allStudyWords() : dueWords();
  if (!words.length) return null;
  const index = state.mode === "autoplay" ? state.autoplayIndex : 0;
  return words[index % words.length];
}

function render() {
  const current = currentWord();
  app.innerHTML = `
    <div class="page">
      <div class="phone">
        <div class="status"></div>
        <header class="header">
          <div class="brand">
            <div class="mark">日</div>
            <div>
              <div class="title">JpWords</div>
              <div class="subtitle">单机版 Web 原型</div>
            </div>
          </div>
          <button class="pill ${state.edition === "paid" ? "active" : ""}" data-action="toggle-edition">${state.edition === "paid" ? "付费版" : "免费版"}</button>
        </header>
        <main class="screen">
          ${state.tab === "study" ? renderStudy(current) : ""}
          ${state.tab === "library" ? renderLibrary() : ""}
          ${state.tab === "stats" ? renderStats() : ""}
        </main>
        <nav class="tabs">
          ${tabButton("study", "学习")}
          ${tabButton("library", "词库")}
          ${tabButton("stats", "统计")}
        </nav>
      </div>
    </div>
    <div class="toast ${state.toast ? "show" : ""}">${state.toast}</div>
  `;
  bindEvents();
  syncTimer();
}

function tabButton(id, label) {
  return `<button class="tab ${state.tab === id ? "active" : ""}" data-tab="${id}">${label}</button>`;
}

function renderStudy(current) {
  const words = state.mode === "autoplay" ? allStudyWords() : dueWords();
  if (!current) {
    return `
      <div class="segmented">
        <button class="${state.mode === "review" ? "active" : ""}" data-action="set-mode" data-mode="review">手动复习</button>
        <button class="${state.mode === "autoplay" ? "active" : ""}" data-action="set-mode" data-mode="autoplay">自动播放</button>
      </div>
      <div class="card empty">
        <div>
          <div class="meaning">${state.mode === "review" ? "今日复习完成" : "暂无可播放单词"}</div>
          <p class="muted">可以切换词库，或使用自动播放继续熟悉内容。</p>
          <button class="btn primary" data-tab="library">去词库</button>
        </div>
      </div>
    `;
  }
  const progress = progressFor(current.id);
  return `
    <div class="segmented">
      <button class="${state.mode === "review" ? "active" : ""}" data-action="set-mode" data-mode="review">手动复习</button>
      <button class="${state.mode === "autoplay" ? "active" : ""}" data-action="set-mode" data-mode="autoplay">自动播放</button>
    </div>
    <div class="metrics">
      ${metric(state.mode === "review" ? "待复习" : "可播放", words.length)}
      ${metric("记忆盒", progress.box)}
      ${metric("错词", totalWrong())}
    </div>
    <section class="card">
      <div class="card-top">
        <span class="badge ${current.lexicon.access === "paid" ? "paid" : ""}">${current.lexicon.access === "paid" ? "付费词" : "免费词"}</span>
        <span class="muted">${current.lexicon.title} · ${current.level} · ${state.mode === "autoplay" ? `${(state.autoplayIndex % words.length) + 1}/${words.length}` : `Box ${progress.box}`}</span>
      </div>
      <div>
        <div class="word">${current.japanese}</div>
        <div class="kana ${state.mode === "review" && !state.revealed ? "blur" : ""}">${state.mode === "autoplay" && !state.showKana ? "假名已隐藏" : current.kana}</div>
      </div>
      ${state.mode === "autoplay" || state.revealed ? renderAnswer(current) : `<div class="answer"><span class="muted">先回忆读音和意思，再显示答案。</span></div>`}
      ${state.mode === "review" ? renderReviewActions() : renderAutoplayActions()}
    </section>
    ${state.mode === "autoplay" ? renderAutoplaySettings() : `<div class="notice">只有点击“不记得 / 模糊 / 记得”才会更新 SRS 进度；自动播放不影响掌握度。</div>`}
  `;
}

function renderAnswer(word) {
  const meaning = state.mode === "review" || state.showMeaning ? `<div class="meaning">${word.meaning}</div>` : "";
  const example = state.mode === "review" || state.showExample ? `<div class="example">${word.example}</div><div class="muted">${word.translation}</div>` : "";
  return `<div class="answer">${meaning}${example || '<span class="muted">释义和例句已隐藏</span>'}</div>`;
}

function renderReviewActions() {
  if (!state.revealed) {
    return `<button class="btn primary" data-action="reveal">显示答案</button>`;
  }
  return `
    <div class="actions">
      <button class="btn danger" data-grade="wrong">不记得</button>
      <button class="btn" data-grade="hard">模糊</button>
      <button class="btn primary" data-grade="correct">记得</button>
    </div>
  `;
}

function renderAutoplayActions() {
  return `
    <div class="actions">
      <button class="btn" data-action="prev">上一词</button>
      <button class="btn primary" data-action="play">${state.autoplayPlaying ? "暂停" : "播放"}</button>
      <button class="btn" data-action="next">下一词</button>
    </div>
  `;
}

function renderAutoplaySettings() {
  return `
    <div class="panel">
      <div class="row"><strong>播放设置</strong><span class="muted">不写入 SRS 进度</span></div>
      <div class="speed-row">
        ${[3000, 5000, 8000].map((speed) => `<button class="btn ${state.autoplaySpeed === speed ? "primary" : ""}" data-speed="${speed}">${speed / 1000}秒</button>`).join("")}
      </div>
      <div class="toggle-row">
        <button class="btn ${state.showKana ? "primary" : ""}" data-toggle="showKana">假名</button>
        <button class="btn ${state.showMeaning ? "primary" : ""}" data-toggle="showMeaning">释义</button>
        <button class="btn ${state.showExample ? "primary" : ""}" data-toggle="showExample">例句</button>
      </div>
    </div>
  `;
}

function renderLibrary() {
  return lexicons.map((lexicon) => {
    const locked = lexicon.access === "paid" && state.edition !== "paid";
    const studied = lexicon.words.filter((word) => progressFor(word.id).lastResult).length;
    const percent = Math.round(studied / lexicon.words.length * 100);
    return `
      <section class="lexicon">
        <div class="row">
          <div>
            <div class="lexicon-title">${lexicon.title}</div>
            <div class="muted">${lexicon.level} · ${lexicon.words.length} 词</div>
          </div>
          <span class="badge ${locked ? "lock" : lexicon.access === "paid" ? "paid" : ""}">${locked ? "锁定" : lexicon.access === "paid" ? "付费" : "免费"}</span>
        </div>
        <div class="progress"><span style="width:${percent}%"></span></div>
        <button class="btn primary" data-lexicon="${lexicon.id}" ${locked ? "disabled" : ""}>${locked ? "付费版解锁" : "开始学习"}</button>
      </section>
    `;
  }).join("");
}

function renderStats() {
  return `
    <div class="metrics">
      ${metric("总词库", lexicons.length)}
      ${metric("可用词库", availableLexicons().length)}
      ${metric("正确率", `${accuracy()}%`)}
    </div>
    <section class="panel">
      <strong>本地进度</strong>
      <div class="row"><span>正确次数</span><strong>${totalCorrect()}</strong></div>
      <div class="row"><span>错误次数</span><strong>${totalWrong()}</strong></div>
      <div class="row"><span>已练习词</span><strong>${Object.values(state.progress).filter((item) => item.lastResult).length}</strong></div>
      <button class="btn danger" data-action="reset">重置本地进度</button>
    </section>
  `;
}

function metric(label, value) {
  return `<div class="metric"><span class="muted">${label}</span><strong>${value}</strong></div>`;
}

function bindEvents() {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.tab = button.dataset.tab;
      saveAndRender();
    });
  });
  document.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", handleAction));
  document.querySelectorAll("[data-grade]").forEach((button) => button.addEventListener("click", () => grade(button.dataset.grade)));
  document.querySelectorAll("[data-speed]").forEach((button) => button.addEventListener("click", () => {
    state.autoplaySpeed = Number(button.dataset.speed);
    saveAndRender();
  }));
  document.querySelectorAll("[data-toggle]").forEach((button) => button.addEventListener("click", () => {
    state[button.dataset.toggle] = !state[button.dataset.toggle];
    saveAndRender();
  }));
  document.querySelectorAll("[data-lexicon]").forEach((button) => button.addEventListener("click", () => {
    state.lexiconId = button.dataset.lexicon;
    state.tab = "study";
    state.revealed = false;
    state.autoplayIndex = 0;
    saveAndRender();
  }));
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  if (action === "toggle-edition") {
    state.edition = state.edition === "paid" ? "free" : "paid";
    state.autoplayIndex = 0;
    showToast(state.edition === "paid" ? "已切换到付费版预览" : "已切换到免费版");
    return;
  }
  if (action === "set-mode") {
    state.mode = event.currentTarget.dataset.mode;
    state.revealed = false;
    if (state.mode === "review") state.autoplayPlaying = false;
  }
  if (action === "reveal") state.revealed = true;
  if (action === "prev") moveAutoplay(-1);
  if (action === "next") moveAutoplay(1);
  if (action === "play") state.autoplayPlaying = !state.autoplayPlaying;
  if (action === "reset") {
    state.progress = {};
    state.revealed = false;
    state.autoplayIndex = 0;
    showToast("本地进度已重置");
    return;
  }
  saveAndRender();
}

function grade(result) {
  const word = currentWord();
  if (!word || state.mode !== "review") return;
  const progress = progressFor(word.id);
  if (result === "correct") {
    progress.correct += 1;
    progress.box = Math.min(5, progress.box + 1);
    progress.due = false;
  } else if (result === "hard") {
    progress.correct += 1;
    progress.box = Math.max(1, progress.box);
    progress.due = true;
  } else {
    progress.wrong += 1;
    progress.box = 0;
    progress.due = true;
  }
  progress.lastResult = result;
  state.revealed = false;
  saveState();
  showToast(result === "correct" ? "很好，已进入更高记忆盒" : "已加入强化复习");
}

function moveAutoplay(offset) {
  const words = allStudyWords();
  if (!words.length) return;
  state.autoplayIndex = (state.autoplayIndex + offset + words.length) % words.length;
}

function syncTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  if (state.mode !== "autoplay" || !state.autoplayPlaying || allStudyWords().length <= 1) return;
  timer = setInterval(() => {
    moveAutoplay(1);
    render();
  }, state.autoplaySpeed);
}

function totalCorrect() {
  return Object.values(state.progress).reduce((sum, item) => sum + (item.correct || 0), 0);
}

function totalWrong() {
  return Object.values(state.progress).reduce((sum, item) => sum + (item.wrong || 0), 0);
}

function accuracy() {
  const correct = totalCorrect();
  const wrong = totalWrong();
  return Math.round(correct / Math.max(correct + wrong, 1) * 100);
}

function saveAndRender() {
  saveState();
  render();
}

function showToast(message) {
  state.toast = message;
  saveState();
  render();
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    state.toast = "";
    render();
  }, 1600);
}

render();
