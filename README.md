# 单词勇者岛 · V16

V16 基于 V15，重点修复两件事：iOS 15.8.x 跟读录音“能播放但没有声音”，以及 Android Chrome `speechSynthesis.getVoices()` 长时间返回空数组时的 TTS 重绑定流程。

## iOS 15.8.x 跟读录音
- 继续使用同一个麦克风按钮：第一次开始录音，再次点击结束。
- iOS 15.x 不再让 `webkitSpeechRecognition` 与 `MediaRecorder` 同时抢麦克风。
- 旧 iOS 改为“录音声音优先”：保证录音回放里能保留用户真实声音；自动语音评分会显示为不可用，而不是用一个把录音静音的识别结果冒充成功。
- iOS 15.x 使用更简单的 `getUserMedia({audio:true})`，并在取得麦克风后短暂稳定再开始录音。
- 停止麦克风后等待音频会话释放；点“播放我的录音”时会新建一个 `Audio(dataURL)` 播放实例，减少旧 Safari 把声音错误路由到通话/听筒会话的问题。
- 仍保留 MP4/AAC + Data URL 的旧 Safari 兼容路径。

## Android Google en-US 音色
- `voiceschanged` 监听现在先于第一次 `getVoices()` 注册，避免错过很早到达的音色事件。
- “刷新设备音色”在 Android 上改为用户手势内真正启动一次极低音量 en-US `SpeechSynthesisUtterance("Hello")`，用于重新连接 Android/Chrome TTS 服务，而不是 V15 的零宽字符 + 静音探测。
- TTS `onstart` / `onend` / `voiceschanged` 后继续扫描；一旦 Google en-US 被 Chrome 公开，立即缓存并优先使用。
- 诊断区增加“Android TTS 重绑定状态/次数”。
- 如果浏览器仍持续返回 `getVoices() = []`，网页无法凭空构造一个 `SpeechSynthesisVoice` 对象；此时仍使用 `lang=en-US` 的系统默认发音，并等待 Chrome 后续公开真实音色列表。

## 其他
- iPhone 继续默认跟随系统 en-US，美式音色设置逻辑保留。
- Android 继续 Google en-US 优先。
- PWA 缓存版本升级到 V16。
