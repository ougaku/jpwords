# JpWords 单机免费版规划

## 阶段目标

第一阶段先做一个可独立发布的移动端 App：无需登录，内置固定词库，本地保存学习进度。免费版开放基础词库；付费版解锁更多内置词库。免费版和付费版使用同一套学习功能，不按功能做阉割。后台管理系统暂时继续作为内容维护与商业化规则原型，不进入第一版移动端运行链路。

## 产品边界

- 学习端：今日复习、词库浏览、错词本、学习统计。
- 内容：App 包内置词库，发布新词库需要发版或通过后续资源包机制更新。
- 账号：第一阶段不做登录、云同步、跨设备恢复。
- 存储：SQLite 保存本地学习进度、复习队列、权益状态和轻量设置。
- 商业化：免费/付费只区分可用词库范围；付费状态存在本地，后续接入应用商店内购校验。
- 后台：保留现有 Web 原型，用来沉淀词条结构、课程结构、审核流程和运营配置。

## 免费版能力

- 默认开放基础词库：建议从 JLPT N5/N4 或 500-1000 个高频词开始。
- 学习算法：使用简化 SRS 记忆盒，答错回到 Box 0，答对进入更高 Box。
- 每日目标：默认 10 个新词，可在本地设置中修改。
- 错词强化：错题自动加入短间隔复习。
- 统一学习界面：手动 SRS 复习和自动播放在同一张学习卡片中切换。

## 付费版能力

- 解锁更多内置词库：N3/N2/N1、商务日语、外来语专题。
- 使用与免费版完全相同的学习功能、统计和错词训练。
- 后续可加例句音频、AI 助记、云同步，但不放进第一阶段。

## 技术方案

- 移动端：React Native / Expo。
- 本地数据库：expo-sqlite。
- 词库打包：TypeScript 静态数据或 JSON 资源，首次启动导入 SQLite。
- 状态管理：第一版使用 React state + repository 函数，避免过早引入复杂状态库。
- 复习算法：独立纯函数，便于单元测试和未来迁移到服务端。
- 内购：先保留本地付费状态开关，后续替换为真实应用商店校验。

## 数据模型

```text
lexicons
- id
- title
- level
- access: free | paid
- version
- word_count

words
- id
- lexicon_id
- japanese
- kana
- meaning
- part
- level
- example
- translation
- tags_json

progress
- word_id
- box
- correct_count
- wrong_count
- due_at
- last_result
- updated_at

settings
- key
- value
```

## 实施顺序

1. 建立 `mobile/` Expo 骨架、SQLite schema、内置词库 seed 和 SRS 逻辑。
2. 做第一版学习页：复习卡片、显示答案、三档反馈。
3. 做词库页：免费词库可进入，付费词库展示锁定状态。
4. 做本地进度：首次启动导入词库，学习反馈写入 SQLite。
5. 做付费词库抽象：先用本地开关模拟，再接入真实内购校验。
6. 从后台原型导出发布词条，形成可打包的词库 JSON。
7. 增加数据校验脚本，防止词条缺字段、重复或等级错误。

## 当前仓库落点

- `mobile/`：单机免费版 Expo 骨架。
- `mobile/src/data/freeLexicons.ts`：第一批内置示例词库。
- `mobile/src/db/schema.ts`：SQLite 表结构。
- `mobile/src/db/localRepository.ts`：本地导入和进度读写接口。
- `mobile/src/srs.ts`：复习间隔与答题结果规则。
