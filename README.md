# JpWords

JpWords 是日语单词学习 App 的本地 Web 原型和移动端实验工程。当前学习端 Web 原型作为 App 体验的统一原型，后台管理系统独立在 `admin.html`。

## 运行 Web 原型

```powershell
node server.js
```

默认地址：

```text
http://127.0.0.1:4173/index.html
```

如需指定端口：

```powershell
node server.js 4301
```

常用页面：

```text
http://127.0.0.1:4173/index.html              # 学习端 / App 原型
http://127.0.0.1:4173/index.html?layout=phone # 手机布局预览
http://127.0.0.1:4173/admin.html              # 后台管理
http://127.0.0.1:4173/standalone.html         # 兼容入口
```

## 检查

```powershell
node --check learner.js
node --check shared.js
node --check admin.js
node --check data/jlpt-n5-words.js
npm run validate:lexicons
```

移动端类型检查：

```powershell
cd mobile
npm run typecheck
```

## Git 工作流

默认只做本地 commit，不推送 GitHub。

推荐流程：

```powershell
git status --short
git add <修改文件>
git commit -m "中文提交标题" -m "详细修改内容"
```

不要默认使用 `git push`。只有明确要求推送时，才推送到远端。

## 移动端方向

移动端位于 `mobile/`，技术方向为 React Native / Expo + SQLite，本地打包内置词库，本地保存学习进度。免费版和付费版功能一致，差异只在可访问词库范围。
