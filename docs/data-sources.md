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
