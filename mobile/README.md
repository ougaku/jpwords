# JpWords Mobile

React Native / Expo 单机免费版骨架。

## 当前定位

- 无需登录。
- 首次启动将内置词库导入 SQLite。
- 本地保存学习进度。
- 免费词库可直接学习，付费词库先展示锁定状态。
- 免费版和付费版使用同一套学习功能，区别只在可用词库范围。

## 启动方式

当前仓库没有安装移动端依赖。后续在 `mobile/` 下安装依赖后运行：

```powershell
npm install
npm run start
```

## 关键文件

- `App.tsx`：第一版学习端界面。
- `src/data/freeLexicons.ts`：打包进 App 的词库数据。
- `src/db/schema.ts`：SQLite schema。
- `src/db/localRepository.ts`：本地数据仓库。
- `src/srs.ts`：间隔重复规则。
