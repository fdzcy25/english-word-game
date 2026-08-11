# 单词勇者岛 · V13

V13 在 V12 的 iOS / Android 双平台音色基础上，调整 iPhone / iPad 的默认策略：

- iPhone / iPad 默认使用“🍎 跟随 iPhone 系统美式音色（推荐）”。
- 该模式只设置 `lang = en-US`，不强制指定 `SpeechSynthesisUtterance.voice`，让 Safari / iOS 决定具体系统音色。
- 适合配合 iPhone 系统“朗读与阅读 → 声音 → 英语（美国）”中已选择的优化/高音质声音。
- Safari 实际公开给网页的 en-US 音色仍会列在下方，可逐个“选择并试听”；手动选中后网页会明确指定该 voice。
- Android 继续保持 Google en-US 优先，找不到时回退到其他美式英语音色。
- 首页试听、单词发音、跟读标准发音统一走同一套选择策略。
- 继续保留录音、停止、回放和音色诊断。

注意：网页无法确认 iOS 最终是否调用了某个没有通过 Safari `getVoices()` 公开的下载音色。
