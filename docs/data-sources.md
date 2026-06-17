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
