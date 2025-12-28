---
icon: pen-to-square
date: 2025-12-28
category:
  - Others
tag:
  - flutter
---

# Flutter 生成 App Icon 完整教學（iOS / Android）

本教學將帶你 **用最標準、最安全、最省時的方式**，在 Flutter 專案中同時產生 **iOS 與 Android 的 App Icon**。

> ✅ 適用：正式上架 App Store / Google Play
>
> ✅ 不需手動切圖、不碰 Xcode / Android Studio

---

## 一、推薦做法總覽（結論先看）

👉 **使用官方主流套件：`flutter_launcher_icons`**

- 一張主圖自動產生所有尺寸
- 同時支援 iOS / Android
- 可控背景色 / 前景圖
- CI / 自動化友善

---

## 二、準備 App Icon 圖片

### 1️⃣ 圖片規格（非常重要）

| 項目 | 建議值             |
| ---- | ------------------ |
| 尺寸 | **1024 × 1024 px** |
| 格式 | PNG（無透明邊緣）  |
| 色彩 | sRGB               |
| 邊界 | 主體距邊緣至少 10% |

📌 **iOS 不接受透明背景**

---

### 2️⃣ 放置圖片位置（建議）

```text
assets/icon/app_icon.png
```

---

## 三、安裝 flutter_launcher_icons

### 1️⃣ 加入 dev_dependencies

編輯 `pubspec.yaml`：

```yaml
dev_dependencies:
  flutter_launcher_icons: ^0.13.1
```

安裝：

```bash
flutter pub get
```

---

## 四、設定 App Icon 產生規則

在 `pubspec.yaml` **最底部**加入：

```yaml
flutter_launcher_icons:
  android: true
  ios: true
  image_path: "assets/icon/app_icon.png"
```

---

## 五、產生 App Icon

```bash
flutter pub run flutter_launcher_icons
```

或（新版本）：

```bash
dart run flutter_launcher_icons
```

✅ 成功後會看到：

- Android mipmap 自動產生
- iOS AppIcon.appiconset 更新

---

## 六、平台細節補充

### Android

- 自動產生於：

```text
android/app/src/main/res/mipmap-*
```

- 自動更新 `AndroidManifest.xml`

---

### iOS

- 自動產生於：

```text
ios/Runner/Assets.xcassets/AppIcon.appiconset
```

- 無需手動設定 Xcode

---

## 七、Adaptive Icon（Android 8+，進階）

📌 可避免不同手機裁切問題（推薦）

### 設定範例

```yaml
flutter_launcher_icons:
  android: true
  ios: true
  image_path: "assets/icon/app_icon.png"
  adaptive_icon_background: "#FFF8EE"
  adaptive_icon_foreground: "assets/icon/app_icon_fg.png"
```

- `background`：純色或圖片
- `foreground`：主體（透明 PNG）

---

## 八、常見錯誤與解法

### ❌ Icon 沒變？

```bash
flutter clean
flutter pub get
dart run flutter_launcher_icons
```

Android 裝置：

- 移除 App 後重裝

---

### ❌ iOS 顯示黑邊 / 圓角怪怪的

- 圖片貼太邊
- 主體過大

➡️ 預留 10–15% 安全區

---

### ❌ Xcode 還是舊 Icon

```bash
flutter build ios
```

或刪除 DerivedData

---

## 九、上架前檢查清單（Icon）

- [ ] 主體清楚、縮小仍可辨識
- [ ] 無文字（官方強烈建議）
- [ ] iOS 無透明
- [ ] Android Adaptive icon 正常
- [ ] 實機檢查（深色 / 淺色）

---

## 十、推薦 Icon 設計風格（實務）

- 扁平化（Flat）
- 高對比
- 少元素
- 避免小字

📌 **Icon 是曝光最高的 UI 元素**

---

## 十一、常用指令總覽

```bash
flutter pub get
dart run flutter_launcher_icons
flutter clean
```

---

## ✅ 總結

| 項目 | 建議                   |
| ---- | ---------------------- |
| 工具 | flutter_launcher_icons |
| 圖片 | 1024×1024 PNG          |
| 操作 | 一行指令               |
| 上架 | 完全符合規範           |

---
