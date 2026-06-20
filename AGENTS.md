# AGENTS.md

## Project

JpWords is a Japanese vocabulary learning app prototype.

- `index.html` is the learner-side Web/App prototype.
- `admin.html` is the backend management prototype.
- `shared.js` contains shared local state, seed data merge logic, and helpers.
- `learner.js` contains learner UI, study modes, SRS progress, local books, and browser TTS.
- `styles.css` and `learner-app.css` define desktop and phone-style learner UI.
- `mobile/` is the Expo / React Native / SQLite direction and should not be changed for Web-only tasks unless explicitly requested.

## Product Rules

- The Web learner is the unified App prototype. Do not create a separate standalone Web prototype for the offline app.
- Free and paid versions should have the same learning features; only available lexicons differ.
- Built-in lexicons are local data. Progress, chapter stars, vocab book, and favorites are stored locally.
- Current learner modes are:
  - `自动播放`
  - `点读记忆`
  - `假名挑战`
- SRS progress remains the source of review status. Browsing or point-reading should not update SRS unless an explicit feedback action does so.
- `生词本` and `收藏词库` are separate local collections.

## Development Rules

- Keep changes narrowly scoped to the requested behavior.
- Prefer existing UI patterns and helper functions in `learner.js` / `shared.js`.
- Preserve the current kana challenge behavior:
  - feedback stays inside the input area
  - no floating result frame
  - the `不会` button stays in the kana button grid unless explicitly moved
- Avoid broad refactors, unrelated formatting churn, or changing generated/imported vocabulary data unless the request is about lexicon data.
- Do not commit local-only or accidental files such as:
  - `.vscode/`
  - `.cache/`
  - `node_modules/`
  - `*.log`
  - `-Context`

## Run

```powershell
node server.js 4301
```

Common URL:

```text
http://127.0.0.1:4301/index.html
```

If the Codex sandbox kills the background process, start Node outside the sandbox with:

```powershell
Start-Process -FilePath 'C:\Program Files\nodejs\node.exe' -ArgumentList @('server.js','4301') -WorkingDirectory 'C:\dev\codex-workspace\jpwords' -WindowStyle Hidden
```

## Verification

For learner-side edits, run at minimum:

```powershell
node --check learner.js
```

If `shared.js` changed:

```powershell
node --check shared.js
```

For broader changes:

```powershell
npm run check
```

Confirm the local app responds:

```powershell
Invoke-WebRequest -Uri 'http://127.0.0.1:4301/index.html' -UseBasicParsing
```

## Git And Deployment

- Default workflow: local commit only, no GitHub push.
- Commit messages must be in Chinese and include a detailed body.
- Push to GitHub only when the user explicitly asks.
- Upload to FTP only when the user explicitly asks.
- FTP target path is `/itasca.co.jp/jpwords`.
- Do not store FTP credentials in repository files.

