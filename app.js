const statusLabels = {
  draft: "草稿",
  review: "待审核",
  published: "已发布",
  archived: "已下架",
};

const roles = {
  admin: {
    label: "超级管理员",
    permissions: ["内容编辑", "发布/下架", "会员维护", "运营配置", "权限管理", "只读查看"],
  },
  editor: {
    label: "内容编辑",
    permissions: ["内容编辑", "导入词库", "提交审核", "只读查看"],
  },
  support: {
    label: "客服/运营",
    permissions: ["会员维护", "运营配置", "只读查看"],
  },
  viewer: {
    label: "只读查看员",
    permissions: ["只读查看"],
  },
};

const state = {
  view: "dashboard",
  role: "admin",
  importSummary: "等待导入。",
  filters: {
    q: "",
    level: "all",
    status: "all",
    access: "all",
  },
  editingWordId: null,
  toast: "",
  words: [
    {
      id: 1,
      japanese: "学校",
      kana: "がっこう",
      meaning: "学校",
      part: "名词",
      level: "N5",
      example: "毎朝、学校へ行きます。",
      translation: "每天早上去学校。",
      tags: ["基础", "场所"],
      status: "published",
      version: 2,
      access: "free",
    },
    {
      id: 2,
      japanese: "申請",
      kana: "しんせい",
      meaning: "申请",
      part: "名词/する动词",
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
      meaning: "迅速的，敏捷的",
      part: "形容词",
      level: "N2",
      example: "素早い対応に感謝します。",
      translation: "感谢迅速处理。",
      tags: ["商务", "易混词"],
      status: "draft",
      version: 1,
      access: "member",
    },
    {
      id: 4,
      japanese: "アルバイト",
      kana: "あるばいと",
      meaning: "兼职，打工",
      part: "名词/する动词",
      level: "N4",
      example: "週末にアルバイトをしています。",
      translation: "周末在打工。",
      tags: ["外来语", "生活"],
      status: "published",
      version: 1,
      access: "free",
    },
  ],
  courses: [
    { id: 1, title: "JLPT N5 基础词库", category: "JLPT", chapters: 12, words: 680, status: "published", access: "free", featured: true, dailyGoal: 10 },
    { id: 2, title: "商务日语高频表达", category: "商务日语", chapters: 8, words: 420, status: "review", access: "member", featured: true, dailyGoal: 8 },
    { id: 3, title: "外来语专题突破", category: "外来语", chapters: 6, words: 260, status: "draft", access: "member", featured: false, dailyGoal: 12 },
  ],
  members: [
    { id: 1001, name: "王小明", email: "ming@example.com", plan: "免费", status: "active", registered: "2026-05-01", expires: "-", streak: 12, mastered: 238 },
    { id: 1002, name: "Lina Chen", email: "lina@example.com", plan: "月度会员", status: "subscribed", registered: "2026-04-18", expires: "2026-07-18", streak: 28, mastered: 612 },
    { id: 1003, name: "佐藤美咲", email: "misaki@example.com", plan: "年度会员", status: "subscribed", registered: "2026-02-09", expires: "2027-02-09", streak: 44, mastered: 1030 },
    { id: 1004, name: "客服测试号", email: "support@example.com", plan: "月度会员", status: "frozen", registered: "2026-05-20", expires: "2026-06-20", streak: 3, mastered: 91 },
  ],
  entitlements: [
    { key: "高级词库", enabled: true },
    { key: "学习统计", enabled: true },
    { key: "错词强化", enabled: true },
    { key: "例句音频", enabled: false },
    { key: "AI助记", enabled: false },
  ],
  operations: {
    dailyNewWords: 10,
    freeLevels: "N5,N4",
    memberContent: "商务日语,N3,N2,N1,外来语专题",
    announcement: "N4 高频动词词库本周更新，会员可提前学习。",
    banner: "备考季会员专项复习开启",
  },
};

const can = (permission) => state.role === "admin" || roles[state.role].permissions.includes(permission);
const app = document.querySelector("#app");

function render() {
  app.innerHTML = `
    <div class="shell">
      ${renderSidebar()}
      <main class="main">
        ${renderTopbar()}
        <section class="content">${renderView()}</section>
      </main>
    </div>
    <div class="toast ${state.toast ? "show" : ""}">${state.toast}</div>
  `;
  bindEvents();
}

function renderSidebar() {
  const items = [
    ["dashboard", "概览", "◎"],
    ["words", "单词库", "字"],
    ["courses", "学习资料", "本"],
    ["members", "会员", "人"],
    ["operations", "运营配置", "⚙"],
    ["permissions", "权限", "權"],
  ];
  return `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">日</div>
        <div>
          <div class="brand-title">JpWords Admin</div>
          <div class="brand-subtitle">学习资料维护后台</div>
        </div>
      </div>
      <nav class="nav">
        ${items.map(([id, label, icon]) => `<button data-view="${id}" class="${state.view === id ? "active" : ""}"><span class="nav-icon">${icon}</span>${label}</button>`).join("")}
      </nav>
      <div class="sidebar-footer">
        <div class="muted">当前角色</div>
        <select class="role-select" id="roleSelect">
          ${Object.entries(roles).map(([key, role]) => `<option value="${key}" ${state.role === key ? "selected" : ""}>${role.label}</option>`).join("")}
        </select>
      </div>
    </aside>
  `;
}

function renderTopbar() {
  const titles = {
    dashboard: ["系统维护概览", "集中查看内容质量、会员状态和运营指标"],
    words: ["单词库维护", "逐条编辑、审核发布、批量导入和版本保护"],
    courses: ["学习资料维护", "课程、词库、章节、会员可见范围和推荐配置"],
    members: ["会员维护", "查询用户、订阅状态、有效期和权益"],
    operations: ["运营配置", "每日学习目标、免费范围、公告和 Banner"],
    permissions: ["权限管理", "按角色控制后台可操作范围"],
  };
  const [title, subtitle] = titles[state.view];
  return `
    <header class="topbar">
      <div>
        <h1 class="page-title">${title}</h1>
        <p class="page-subtitle">${subtitle}</p>
      </div>
      <div class="top-actions">
        <span class="badge member">${roles[state.role].label}</span>
        <button class="btn" data-view="words">查词库</button>
        <button class="btn primary" data-action="quick-publish" ${can("发布/下架") ? "" : "disabled"}>发布待审</button>
      </div>
    </header>
  `;
}

function renderView() {
  if (state.view === "words") return renderWords();
  if (state.view === "courses") return renderCourses();
  if (state.view === "members") return renderMembers();
  if (state.view === "operations") return renderOperations();
  if (state.view === "permissions") return renderPermissions();
  return renderDashboard();
}

function renderDashboard() {
  const published = state.words.filter((word) => word.status === "published").length;
  const reviews = state.words.filter((word) => word.status === "review").length;
  const subscribers = state.members.filter((member) => member.status === "subscribed").length;
  const avgMastered = Math.round(state.members.reduce((sum, member) => sum + member.mastered, 0) / state.members.length);
  return `
    <div class="stats">
      ${stat("已发布单词", published)}
      ${stat("待审核内容", reviews)}
      ${stat("订阅会员", subscribers)}
      ${stat("人均掌握词", avgMastered)}
    </div>
    <div class="grid-2">
      <div class="panel">
        <div class="panel-header"><div class="panel-title">内容质量队列</div><button class="btn" data-view="words">处理</button></div>
        <div class="panel-body">
          <div class="table-wrap">${wordTable(state.words.filter((word) => word.status !== "archived").slice(0, 5))}</div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-title">运营规则</div><button class="btn" data-view="operations">配置</button></div>
        <div class="panel-body stack">
          <div class="notice">免费范围：${state.operations.freeLevels}<br>会员内容：${state.operations.memberContent}</div>
          <div class="toggle-line"><strong>每日新词</strong><span>${state.operations.dailyNewWords} 个</span></div>
          <div class="toggle-line"><strong>公告</strong><span class="muted">${state.operations.announcement}</span></div>
          <div class="toggle-line"><strong>会员权益</strong><span>${state.entitlements.filter((item) => item.enabled).length}/${state.entitlements.length} 开启</span></div>
        </div>
      </div>
    </div>
  `;
}

function renderWords() {
  const word = state.words.find((item) => item.id === state.editingWordId) || emptyWord();
  const filtered = state.words.filter((item) => {
    const q = state.filters.q.trim().toLowerCase();
    const matchesQ = !q || [item.japanese, item.kana, item.meaning, item.tags.join(",")].join(" ").toLowerCase().includes(q);
    return matchesQ &&
      (state.filters.level === "all" || item.level === state.filters.level) &&
      (state.filters.status === "all" || item.status === state.filters.status) &&
      (state.filters.access === "all" || item.access === state.filters.access);
  });
  return `
    <div class="grid-2">
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">单词列表</div>
          <div class="row-actions">
            <button class="btn" data-action="new-word" ${can("内容编辑") ? "" : "disabled"}>新增</button>
            <button class="btn primary" data-action="submit-review" ${can("提交审核") || can("发布/下架") ? "" : "disabled"}>提交审核</button>
          </div>
        </div>
        <div class="panel-body">
          <div class="toolbar">
            <input class="input" id="filterQ" placeholder="搜索日文、假名、释义、标签" value="${escapeHtml(state.filters.q)}">
            ${select("filterLevel", ["all", "N5", "N4", "N3", "N2", "N1"], state.filters.level, { all: "全部等级" })}
            ${select("filterStatus", ["all", "draft", "review", "published", "archived"], state.filters.status, { all: "全部状态", ...statusLabels })}
            ${select("filterAccess", ["all", "free", "member"], state.filters.access, { all: "全部权限", free: "免费", member: "会员" })}
          </div>
          <div class="table-wrap">${wordTable(filtered)}</div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-title">${state.editingWordId ? "编辑单词" : "新增单词"}</div></div>
        <div class="panel-body stack">
          ${renderWordForm(word)}
          ${renderImportBox()}
        </div>
      </div>
    </div>
  `;
}

function renderWordForm(word) {
  return `
    <form id="wordForm" class="form-grid">
      <input type="hidden" name="id" value="${word.id || ""}">
      ${field("japanese", "日文", word.japanese)}
      ${field("kana", "假名", word.kana)}
      ${field("meaning", "中文释义", word.meaning)}
      ${field("part", "词性", word.part)}
      <div class="field"><label>JLPT等级</label>${select("level", ["N5", "N4", "N3", "N2", "N1"], word.level)}</div>
      <div class="field"><label>可见范围</label>${select("access", ["free", "member"], word.access, { free: "免费", member: "会员" })}</div>
      ${field("tags", "标签（逗号分隔）", word.tags.join(","))}
      <div class="field"><label>状态</label>${select("status", ["draft", "review", "published", "archived"], word.status, statusLabels, !can("发布/下架"))}</div>
      <div class="field full"><label>例句</label><textarea class="textarea" name="example">${escapeHtml(word.example)}</textarea></div>
      <div class="field full"><label>例句翻译</label><textarea class="textarea" name="translation">${escapeHtml(word.translation)}</textarea></div>
      <div class="form-actions full">
        <button class="btn primary" type="submit" ${can("内容编辑") ? "" : "disabled"}>保存</button>
        <button class="btn" type="button" data-action="submit-current" ${can("提交审核") || can("发布/下架") ? "" : "disabled"}>送审</button>
        <button class="btn" type="button" data-action="publish-current" ${can("发布/下架") ? "" : "disabled"}>发布</button>
        <span class="muted">已发布内容再次保存会生成新版本。</span>
      </div>
    </form>
  `;
}

function renderImportBox() {
  return `
    <div class="import-box">
      <div class="notice">CSV列：日文,假名,中文释义,词性,等级,例句,例句翻译,标签,可见范围。导入会检查缺失字段、重复单词和等级格式。</div>
      <textarea class="textarea" id="csvInput" placeholder="学校,がっこう,学校,名词,N5,学校へ行きます。,去学校。,基础|场所,免费"></textarea>
      <button class="btn" data-action="import-csv" ${can("导入词库") || can("内容编辑") ? "" : "disabled"}>校验并导入</button>
      <div class="import-result" id="importResult">${state.importSummary}</div>
    </div>
  `;
}

function renderCourses() {
  return `
    <div class="grid-2">
      <div class="panel">
        <div class="panel-header"><div class="panel-title">课程/词库</div><button class="btn primary" data-action="save-courses" ${can("内容编辑") ? "" : "disabled"}>保存配置</button></div>
        <div class="panel-body course-list">
          ${state.courses.map((course) => `
            <div class="course-item">
              <div class="row-actions">
                <strong>${course.title}</strong>
                <span class="badge ${course.status}">${statusLabels[course.status]}</span>
                <span class="badge ${course.access === "member" ? "member" : "published"}">${course.access === "member" ? "会员" : "免费"}</span>
              </div>
              <div class="course-meta">
                <span>${course.category}</span>
                <span>${course.chapters} 章节</span>
                <span>${course.words} 词</span>
                <span>每日目标 ${course.dailyGoal}</span>
              </div>
              <div class="progress"><span style="width:${Math.min(100, Math.round(course.words / 8))}%"></span></div>
              <div class="row-actions">
                <button class="btn" data-course="${course.id}" data-action="toggle-featured" ${can("运营配置") ? "" : "disabled"}>${course.featured ? "取消推荐" : "设为推荐"}</button>
                <button class="btn" data-course="${course.id}" data-action="toggle-access" ${can("运营配置") ? "" : "disabled"}>切换免费/会员</button>
                <button class="btn primary" data-course="${course.id}" data-action="publish-course" ${can("发布/下架") ? "" : "disabled"}>发布</button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-title">资料组织规则</div></div>
        <div class="panel-body stack">
          <div class="notice">第一版按“课程/词库/章节/单词”组织。课程控制可见范围和推荐，单词保留独立版本，学习记录只引用发布版本。</div>
          <div class="toggle-line"><strong>JLPT</strong><span>N5-N1</span></div>
          <div class="toggle-line"><strong>专题</strong><span>日常会话 / 商务 / 外来语</span></div>
          <div class="toggle-line"><strong>上线流程</strong><span>草稿 → 待审核 → 已发布</span></div>
        </div>
      </div>
    </div>
  `;
}

function renderMembers() {
  return `
    <div class="grid-2">
      <div class="panel">
        <div class="panel-header"><div class="panel-title">用户与订阅</div><button class="btn primary" data-action="extend-selected" ${can("会员维护") ? "" : "disabled"}>补偿7天</button></div>
        <div class="panel-body">
          <div class="table-wrap">
            <table>
              <thead><tr><th>用户</th><th>会员</th><th>状态</th><th>有效期</th><th>学习</th><th>操作</th></tr></thead>
              <tbody>
                ${state.members.map((member) => `
                  <tr>
                    <td><strong>${member.name}</strong><div class="muted">${member.email}</div></td>
                    <td>${member.plan}</td>
                    <td><span class="badge ${member.status === "subscribed" ? "published" : member.status === "frozen" ? "archived" : "draft"}">${member.status}</span></td>
                    <td>${member.expires}</td>
                    <td>连续 ${member.streak} 天<br><span class="muted">掌握 ${member.mastered} 词</span></td>
                    <td class="row-actions">
                      <button class="btn" data-member="${member.id}" data-action="extend-member" ${can("会员维护") ? "" : "disabled"}>+7天</button>
                      <button class="btn danger" data-member="${member.id}" data-action="freeze-member" ${can("会员维护") ? "" : "disabled"}>${member.status === "frozen" ? "解冻" : "冻结"}</button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><div class="panel-title">会员权益</div><button class="btn" data-action="save-entitlements" ${can("会员维护") ? "" : "disabled"}>保存权益</button></div>
        <div class="panel-body">
          ${state.entitlements.map((item, index) => `
            <label class="toggle-line">
              <span>${item.key}</span>
              <input type="checkbox" data-entitlement="${index}" ${item.enabled ? "checked" : ""} ${can("会员维护") ? "" : "disabled"}>
            </label>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderOperations() {
  return `
    <div class="panel">
      <div class="panel-header"><div class="panel-title">运营配置</div><button class="btn primary" data-action="save-operations" ${can("运营配置") ? "" : "disabled"}>保存</button></div>
      <div class="panel-body">
        <form id="operationsForm" class="form-grid">
          ${field("dailyNewWords", "每日新词数量", state.operations.dailyNewWords, "number")}
          ${field("freeLevels", "免费词库范围", state.operations.freeLevels)}
          ${field("memberContent", "会员可见内容", state.operations.memberContent)}
          ${field("banner", "Banner文案", state.operations.banner)}
          <div class="field full"><label>公告</label><textarea class="textarea" name="announcement">${escapeHtml(state.operations.announcement)}</textarea></div>
        </form>
      </div>
    </div>
  `;
}

function renderPermissions() {
  return `
    <div class="permissions">
      ${Object.entries(roles).map(([key, role]) => `
        <div class="permission-card">
          <div class="row-actions"><strong>${role.label}</strong>${state.role === key ? '<span class="badge published">当前</span>' : ""}</div>
          <div class="check-list">
            ${role.permissions.map((permission) => `<span>✓ ${permission}</span>`).join("")}
          </div>
          <button class="btn" data-role="${key}" data-action="switch-role">切换角色</button>
        </div>
      `).join("")}
    </div>
  `;
}

function wordTable(words) {
  return `
    <table>
      <thead><tr><th>单词</th><th>释义</th><th>等级/词性</th><th>例句</th><th>状态</th><th>操作</th></tr></thead>
      <tbody>
        ${words.map((word) => `
          <tr>
            <td><div class="jp">${word.japanese}</div><div class="kana">${word.kana}</div></td>
            <td>${word.meaning}<div class="muted">${word.tags.join(" / ")}</div></td>
            <td>${word.level}<br><span class="muted">${word.part}</span></td>
            <td>${word.example}<div class="muted">${word.translation}</div></td>
            <td><span class="badge ${word.status}">${statusLabels[word.status]}</span><div class="muted">v${word.version} · ${word.access === "member" ? "会员" : "免费"}</div></td>
            <td class="row-actions">
              <button class="btn" data-word="${word.id}" data-action="edit-word">编辑</button>
              <button class="btn primary" data-word="${word.id}" data-action="publish-word" ${can("发布/下架") ? "" : "disabled"}>发布</button>
              <button class="btn danger" data-word="${word.id}" data-action="archive-word" ${can("发布/下架") ? "" : "disabled"}>下架</button>
            </td>
          </tr>
        `).join("") || '<tr><td colspan="6" class="muted">没有匹配的单词。</td></tr>'}
      </tbody>
    </table>
  `;
}

function stat(label, value) {
  return `<div class="stat"><div class="stat-label">${label}</div><div class="stat-value">${value}</div></div>`;
}

function field(name, label, value = "", type = "text") {
  return `<div class="field"><label>${label}</label><input class="input" type="${type}" name="${name}" value="${escapeHtml(String(value))}"></div>`;
}

function select(name, options, value, labels = {}, disabled = false) {
  return `<select class="select" name="${name}" id="${name}" ${disabled ? "disabled" : ""}>${options.map((option) => `<option value="${option}" ${value === option ? "selected" : ""}>${labels[option] || option}</option>`).join("")}</select>`;
}

function emptyWord() {
  return { id: "", japanese: "", kana: "", meaning: "", part: "名词", level: "N5", example: "", translation: "", tags: [], status: "draft", version: 1, access: "free" };
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      render();
    });
  });
  const roleSelect = document.querySelector("#roleSelect");
  if (roleSelect) roleSelect.addEventListener("change", (event) => {
    state.role = event.target.value;
    showToast(`已切换为${roles[state.role].label}`);
  });
  document.querySelectorAll("[data-action]").forEach((node) => node.addEventListener("click", handleAction));
  ["filterQ", "filterLevel", "filterStatus", "filterAccess"].forEach((id) => {
    const input = document.querySelector(`#${id}`);
    if (!input) return;
    input.addEventListener("input", (event) => {
      const key = id.replace("filter", "").toLowerCase();
      state.filters[key === "q" ? "q" : key] = event.target.value;
      render();
    });
  });
  const form = document.querySelector("#wordForm");
  if (form) form.addEventListener("submit", saveWord);
  const operationsForm = document.querySelector("#operationsForm");
  if (operationsForm) operationsForm.addEventListener("submit", (event) => event.preventDefault());
  document.querySelectorAll("[data-entitlement]").forEach((input) => {
    input.addEventListener("change", () => {
      state.entitlements[Number(input.dataset.entitlement)].enabled = input.checked;
    });
  });
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  const wordId = Number(event.currentTarget.dataset.word);
  const courseId = Number(event.currentTarget.dataset.course);
  const memberId = Number(event.currentTarget.dataset.member);
  if (action === "new-word") state.editingWordId = null;
  if (action === "edit-word") state.editingWordId = wordId;
  if (action === "publish-word") updateWordStatus(wordId, "published");
  if (action === "archive-word") updateWordStatus(wordId, "archived");
  if (action === "submit-review") submitDrafts();
  if (action === "submit-current") updateWordStatus(currentFormWordId(), "review");
  if (action === "publish-current") updateWordStatus(currentFormWordId(), "published");
  if (action === "quick-publish") publishAllReviews();
  if (action === "import-csv") importCsv();
  if (action === "toggle-featured") toggleCourse(courseId, "featured");
  if (action === "toggle-access") toggleCourse(courseId, "access");
  if (action === "publish-course") updateCourseStatus(courseId, "published");
  if (action === "extend-member") extendMember(memberId);
  if (action === "freeze-member") freezeMember(memberId);
  if (action === "extend-selected") extendMember(state.members[0].id);
  if (action === "save-entitlements") showToast("会员权益已保存");
  if (action === "save-courses") showToast("学习资料配置已保存");
  if (action === "save-operations") saveOperations();
  if (action === "switch-role") state.role = event.currentTarget.dataset.role;
  render();
}

function saveWord(event) {
  event.preventDefault();
  if (!can("内容编辑")) return showToast("当前角色没有内容编辑权限");
  const form = new FormData(event.currentTarget);
  const id = Number(form.get("id"));
  const existing = state.words.find((word) => word.id === id);
  const next = {
    id: id || Date.now(),
    japanese: form.get("japanese").trim(),
    kana: form.get("kana").trim(),
    meaning: form.get("meaning").trim(),
    part: form.get("part").trim(),
    level: form.get("level"),
    example: form.get("example").trim(),
    translation: form.get("translation").trim(),
    tags: form.get("tags").split(",").map((tag) => tag.trim()).filter(Boolean),
    status: form.get("status") || existing?.status || "draft",
    version: existing?.status === "published" ? existing.version + 1 : existing?.version || 1,
    access: form.get("access"),
  };
  const errors = validateWord(next);
  if (errors.length) return showToast(errors.join("；"));
  if (existing) Object.assign(existing, next);
  else state.words.unshift(next);
  state.editingWordId = next.id;
  showToast(existing?.status === "published" ? "已保存为新版本" : "单词已保存");
  render();
}

function validateWord(word) {
  const required = ["japanese", "kana", "meaning", "part", "level", "example", "translation"];
  const errors = required.filter((key) => !word[key]).map((key) => `${key}不能为空`);
  if (!["N5", "N4", "N3", "N2", "N1"].includes(word.level)) errors.push("等级必须是N5-N1");
  const duplicate = state.words.find((item) => item.id !== word.id && item.japanese === word.japanese && item.kana === word.kana);
  if (duplicate) errors.push("检测到重复单词");
  return errors;
}

function updateWordStatus(id, status) {
  const word = state.words.find((item) => item.id === id);
  if (!word) return showToast("请先选择或保存单词");
  word.status = status;
  showToast(`${word.japanese} 已更新为${statusLabels[status]}`);
}

function submitDrafts() {
  const count = state.words.filter((word) => word.status === "draft").map((word) => {
    word.status = "review";
    return word;
  }).length;
  showToast(`${count} 个草稿已提交审核`);
}

function publishAllReviews() {
  const count = state.words.filter((word) => word.status === "review").map((word) => {
    word.status = "published";
    return word;
  }).length;
  showToast(`${count} 个待审内容已发布`);
}

function currentFormWordId() {
  const value = document.querySelector('[name="id"]')?.value;
  return value ? Number(value) : state.editingWordId;
}

function importCsv() {
  const input = document.querySelector("#csvInput");
  const rows = input.value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const imported = [];
  const errors = [];
  rows.forEach((row, index) => {
    const cells = row.split(",").map((cell) => cell.trim());
    if (cells.length < 9) {
      errors.push(`第${index + 1}行：字段不足`);
      return;
    }
    const word = {
      id: Date.now() + index,
      japanese: cells[0],
      kana: cells[1],
      meaning: cells[2],
      part: cells[3],
      level: cells[4],
      example: cells[5],
      translation: cells[6],
      tags: cells[7].split("|").map((tag) => tag.trim()).filter(Boolean),
      access: cells[8] === "会员" || cells[8] === "member" ? "member" : "free",
      status: "review",
      version: 1,
    };
    const validation = validateWord(word);
    if (validation.length) errors.push(`第${index + 1}行：${validation.join("；")}`);
    else imported.push(word);
  });
  state.words.unshift(...imported);
  state.importSummary = `成功导入 ${imported.length} 条，失败 ${errors.length} 条。${errors.length ? `<br>${errors.map(escapeHtml).join("<br>")}` : ""}`;
  showToast(`导入完成：${imported.length} 条进入待审核`);
}

function toggleCourse(id, key) {
  const course = state.courses.find((item) => item.id === id);
  if (!course) return;
  if (key === "featured") course.featured = !course.featured;
  if (key === "access") course.access = course.access === "member" ? "free" : "member";
  showToast("课程配置已更新");
}

function updateCourseStatus(id, status) {
  const course = state.courses.find((item) => item.id === id);
  if (!course) return;
  course.status = status;
  showToast(`${course.title} 已发布`);
}

function extendMember(id) {
  const member = state.members.find((item) => item.id === id);
  if (!member) return;
  if (member.expires === "-") member.expires = "2026-06-22";
  else {
    const date = new Date(`${member.expires}T00:00:00`);
    date.setDate(date.getDate() + 7);
    member.expires = date.toISOString().slice(0, 10);
  }
  member.status = "subscribed";
  member.plan = member.plan === "免费" ? "补偿会员" : member.plan;
  showToast(`${member.name} 已补偿7天会员`);
}

function freezeMember(id) {
  const member = state.members.find((item) => item.id === id);
  if (!member) return;
  member.status = member.status === "frozen" ? "subscribed" : "frozen";
  showToast(`${member.name} 状态已更新`);
}

function saveOperations() {
  const form = document.querySelector("#operationsForm");
  const data = new FormData(form);
  state.operations.dailyNewWords = Number(data.get("dailyNewWords")) || 10;
  state.operations.freeLevels = data.get("freeLevels").trim();
  state.operations.memberContent = data.get("memberContent").trim();
  state.operations.banner = data.get("banner").trim();
  state.operations.announcement = data.get("announcement").trim();
  showToast("运营配置已保存");
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

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]));
}

render();
