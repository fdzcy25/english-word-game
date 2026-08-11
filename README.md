# 单词勇者岛 · V17

V17 以 V16 为基础，只对 Android TTS 做“回归验证”：Android 的 Google 美式音色读取与发音路径恢复到 V6 的原始时序；iPhone/iPad 的系统美式音色策略、iOS 15.8.7 录音有声回放修复，以及同一麦克风按钮开始/结束跟读全部保留。

## Android V17 回归 V6
- 页面初始化立即读取一次 `speechSynthesis.getVoices()`。
- 监听 `speechSynthesis.onvoiceschanged`。
- 仅在 250ms / 900ms / 1800ms 再被动读取三次。
- 删除 V11-V16 后续增加的 Android TTS 重绑定、低音量 Hello 唤醒、60 秒持续恢复、高频扫描、焦点/触摸/页面恢复扫描。
- Android `speak()` 恢复 V6：`cancel()` -> 创建 `SpeechSynthesisUtterance` -> 选择 Google en-US -> `lang=en-US` -> `speak()`。
- “刷新设备音色”在 Android 只执行一次被动 `getVoices()`，不触发任何 TTS。
- 音色检测详情只做被动显示，不主动干预 Android TTS。

## 继续保留
- iPhone/iPad 默认“跟随 iPhone 系统美式音色”。
- iOS 15.8.7 跟读录音有声优先修复。
- 跟读麦克风：第一次点击开始录音，再次点击结束录音。
- 录音回放、标准发音、重新录音。
- Android Google en-US 优先。

页面底部版本号：`单词勇者岛 · V17`。
