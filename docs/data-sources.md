# 数据来源记录

## JLPT N5 基础词库

- 导入日期：2026-06-17
- 数据文件：`data/jlpt-n5-words.js`
- 移动端同步文件：`mobile/src/data/freeLexicons.ts`
- 原始来源：Grimwald79/jlpt-n5-srs
- 来源地址：https://github.com/Grimwald79/jlpt-n5-srs
- 原始文件：https://github.com/Grimwald79/jlpt-n5-srs/blob/main/JLPT_N5_Vocab.csv
- 许可证：MIT License
- 许可证地址：https://github.com/Grimwald79/jlpt-n5-srs/blob/main/LICENSE
- 原始版权声明：Copyright (c) 2026 Clayton Grimwald

### 导入说明

- 原始字段为 `Kanji`、`Furigana`、`Romaji`、`Meaning`。
- Web 原型字段映射为 `japanese`、`kana`、`meaning`、`meaningEn`、`tags` 等系统内置字段。
- 多读音条目的 `kana` 暂取第一个读音，便于假名挑战按长度自动判定。
- 原始含义为英文释义，已保存在 `meaningEn`。
- `meaning` 为第一版自动生成中文释义，用于学习端优先展示；后续需要逐步人工校对、补充中文例句和例句翻译。
- JLPT 官方没有公开固定词表，本词库应描述为“社区整理 N5 词表”，不要宣传为官方完整清单。

### 例句与读音

- 例句导入日期：2026-06-19
- 例句来源：Tatoeba
- 来源地址：https://tatoeba.org/
- 下载页：https://tatoeba.org/en/downloads
- 文本许可证：CC BY 2.0 FR
- 使用范围：为 N5 词条补充日文例句；中文译文优先采用 Tatoeba 中文译句，缺失时使用系统生成中文占位并标记来源。
- 署名要求：产品内需要保留 Tatoeba 文本来源说明。
- 音频策略：第一版不下载、不打包 Tatoeba 音频；Web 原型使用浏览器系统 TTS 播放日语读音。
- 音频备注：Tatoeba 音频授权由贡献者逐条选择，license 为空时不可在 Tatoeba 项目外复用，因此不作为第一版读音来源。

## JLPT N4 基础词库

- 导入日期：2026-06-19
- 数据文件：`data/jlpt-n4-words.js`
- 移动端同步文件：`mobile/src/data/freeLexicons.ts`
- 导入脚本：`scripts/import-jlpt-vocab.js --level=N4`
- 词条来源：Jisho API 的 `#jlpt-n4` 查询结果
- 来源地址：https://jisho.org/api/v1/search/words?keyword=%23jlpt-n4
- 词典字段来源：JMdict/EDICT 字段（Jisho 返回值中的 `attribution.jmdict = true`）
- JMdict 项目地址：https://www.edrdg.org/jmdict/j_jmdict.html
- 使用方式：保留日文、假名、英文释义、词性，并生成学习端优先展示的中文释义。
- 许可备注：JLPT 官方没有公开固定词表，N4 词表应描述为“基于 Jisho/JMdict 与社区 JLPT 标签整理的 N4 基础词库”，不要宣传为官方完整清单。
- 排除来源：`5mdld/anki-jlpt-decks` 为 CC BY-NC 4.0，含非商业限制，未用于本项目导入。

### N4 分章规则

- Web 学习端按 `kana` 假名排序。
- 每章最多 40 词，动态生成章节数。
- 章节标签使用首尾假名范围，例如 `第3章 か-き`。
- 自动播放、点读记忆、假名挑战共用同一章节词队列。

### N4 例句与读音

- 例句来源：Tatoeba
- 来源地址：https://tatoeba.org/
- 下载页：https://tatoeba.org/en/downloads
- 文本许可证：CC BY 2.0 FR
- 导入结果：本次 N4 570 词中匹配到 486 条 Tatoeba 日文例句和中文译句。
- 未匹配到 Tatoeba 例句的词条保留空例句字段，后续可人工补齐。
- 音频策略：继续使用系统 TTS，不打包 Tatoeba 音频文件。
