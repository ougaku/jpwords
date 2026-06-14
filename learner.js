const { statusLabels, loadState, saveState, escapeHtml, stat, defaultProgress } = JpWords;
const app = document.querySelector("#app");
const state = loadState();

function render() {
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
}

function renderLearnerSidebar() {
  const items = [
    ["study", "今日学习", "今"],
    ["library", "词库", "本"],
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
    study: ["今日学习", "按间隔重复复习到期单词，先回忆再看答案"],
    library: ["词库", "浏览免费与会员词库，选择适合当前阶段的内容"],
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
        <a class="btn link-btn" href="./admin.html">后台管理</a>
      </div>
    </header>
  `;
}

function renderLearnerView() {
  if (state.learnerView === "library") return renderLearnerLibrary();
  if (state.learnerView === "mistakes") return renderMistakes();
  if (state.learnerView === "stats") return renderLearnerStats();
  return renderStudy();
}

function renderStudy() {
  const queue = dueWords();
  const current = queue[state.currentReviewIndex % Math.max(queue.length, 1)];
  if (!current) {
    return `
      <div class="panel study-empty">
        <div class="panel-body stack">
          <div class="complete-mark">✓</div>
          <h2>今日复习完成</h2>
          <p class="muted">可以去词库添加新词，或者复盘错词本。</p>
          <div class="row-actions">
            <button class="btn primary" data-learner-view="library">去词库</button>
            <button class="btn" data-learner-view="mistakes">看错词</button>
          </div>
        </div>
      </div>
    `;
  }
  const progress = state.progress[current.id] || defaultProgress();
  return `
    <div class="study-layout">
      <div class="study-card panel">
        <div class="study-card-top">
          <span class="badge ${current.access === "member" ? "member" : "published"}">${current.access === "member" ? "会员词" : "免费词"}</span>
          <span class="muted">${current.level} · ${current.part} · 记忆盒 ${progress.box}</span>
        </div>
        <div class="study-word">${current.japanese}</div>
        <div class="study-kana ${state.reviewRevealed ? "" : "hidden-answer"}">${current.kana}</div>
        <div class="answer-panel ${state.reviewRevealed ? "revealed" : ""}">
          <div class="meaning">${current.meaning}</div>
          <div class="example">${current.example}</div>
          <div class="muted">${current.translation}</div>
          <div class="tag-row">${current.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
        <div class="study-actions">
          ${state.reviewRevealed
            ? `<button class="btn danger" data-review="wrong">不记得</button><button class="btn" data-review="hard">模糊</button><button class="btn primary" data-review="correct">记得</button>`
            : `<button class="btn primary large" data-action="reveal-answer">显示答案</button>`}
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-title">今日进度</div></div>
        <div class="panel-body stack">
          <div class="stats compact">
            ${stat("待复习", queue.length)}
            ${stat("已完成", todayCompleted())}
          </div>
          <div class="progress tall"><span style="width:${Math.min(100, Math.round(todayCompleted() / state.learner.dailyGoal * 100))}%"></span></div>
          <div class="notice">答错会很快再次出现；答对会进入更高记忆盒，下一次复习间隔更长。</div>
          <button class="btn" data-action="add-sample-due">加入新词练习</button>
        </div>
      </div>
    </div>
  `;
}

function renderLearnerLibrary() {
  return `
    <div class="grid-2">
      <div class="panel">
        <div class="panel-header"><div class="panel-title">推荐词库</div></div>
        <div class="panel-body course-list">
          ${state.courses.map((course) => `
            <div class="course-item">
              <div class="row-actions">
                <strong>${course.title}</strong>
                <span class="badge ${course.access === "member" ? "member" : "published"}">${course.access === "member" ? "会员" : "免费"}</span>
                ${course.featured ? '<span class="badge review">推荐</span>' : ""}
              </div>
              <div class="course-meta"><span>${course.category}</span><span>${course.chapters} 章节</span><span>${course.words} 词</span><span>每日 ${course.dailyGoal} 词</span></div>
              <div class="progress"><span style="width:${course.access === "free" ? 42 : 18}%"></span></div>
              <button class="btn primary" data-action="start-course" data-course="${course.id}">开始学习</button>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-title">单词预览</div></div>
        <div class="panel-body">
          <div class="table-wrap">${learnerWordTable(state.words.filter((word) => word.status === "published"))}</div>
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
      render();
    });
  });
  document.querySelectorAll("[data-review]").forEach((button) => {
    button.addEventListener("click", () => handleReview(button.dataset.review));
  });
  document.querySelectorAll("[data-action]").forEach((node) => node.addEventListener("click", handleAction));
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  const wordId = Number(event.currentTarget.dataset.word);
  const courseId = Number(event.currentTarget.dataset.course);
  if (action === "reveal-answer") state.reviewRevealed = true;
  if (action === "add-sample-due") addSampleDue();
  if (action === "start-course") startCourse(courseId);
  if (action === "practice-mistakes") practiceMistakes();
  if (action === "mark-due") markDue(wordId);
  render();
}

function handleReview(result) {
  const queue = dueWords();
  const current = queue[state.currentReviewIndex % Math.max(queue.length, 1)];
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
  state.reviewRevealed = false;
  state.currentReviewIndex = Math.min(state.currentReviewIndex + 1, dueWords().length);
  saveState(state);
  showToast(result === "correct" ? "很好，下一次间隔会变长" : "已加入强化复习");
}

function dueWords() {
  return state.words.filter((word) => word.status === "published" && (state.progress[word.id]?.due || false));
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
  state.words.filter((word) => word.status === "published").slice(0, 3).forEach((word) => {
    state.progress[word.id] = { ...(state.progress[word.id] || defaultProgress()), due: true };
  });
  state.learnerView = "study";
  saveState(state);
  showToast(`已开始：${course?.title || "词库"}`);
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
  state.progress[id] = { ...(state.progress[id] || defaultProgress()), due: true };
  saveState(state);
  showToast(`${word.japanese} 已加入今日复习`);
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
