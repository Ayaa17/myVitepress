---
icon: pen-to-square
date: 2025-12-28
category:
  - Others
tag:
  - flutter
---

# Flutter Build Release App 指南（iOS / Android）

本文件詳細說明 **Flutter 專案在 iOS 與 Android 平台進行 Release（正式版）Build 的完整流程、注意事項與常用指令**，適合準備上架 App Store / Google Play 前參考。

---

## 一、建置前通用檢查（iOS / Android）

### 1. Flutter 環境確認

```bash
flutter doctor
```

確保以下項目皆為 ✔：

- Flutter SDK
- Android toolchain
- Xcode（iOS）
- Android Studio

---

### 2. 專案基本設定

#### 更新套件

```bash
flutter pub get
```

#### 移除舊快取（建議）

```bash
flutter clean
flutter pub get
```

---

### 3. 版本號設定（非常重要）

編輯 `pubspec.yaml`：

```yaml
version: 1.0.0+1
```

- `1.0.0` → 使用者可見版本號
- `+1` → build number（每次上架必須遞增）

---

## 二、Android Release Build 流程

### 1. 建立 Keystore（只需一次）

```bash
keytool -genkey -v \
  -keystore ~/upload-keystore.jks \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -alias upload
```

請妥善保存：

- `upload-keystore.jks`
- keystore 密碼
- key alias

---

### 2. 設定簽章（Signing）

#### 建立 `android/key.properties`

```properties
storePassword=your_store_password
keyPassword=your_key_password
keyAlias=upload
storeFile=/Users/yourname/upload-keystore.jks
```

⚠️ **請勿提交至 Git（加入 .gitignore）**

---

#### 修改 `android/app/build.gradle`

```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

---

### 3. 建立 Android Release 檔案

#### AAB（Google Play **推薦**）

```bash
flutter build appbundle
```

輸出位置：

```
build/app/outputs/bundle/release/app-release.aab
```

#### APK（測試或側載）

```bash
flutter build apk --release
```

---

### 4. 上架 Google Play

- 前往 **Google Play Console**
- 建立 App
- 上傳 `app-release.aab`
- 填寫商店資訊、隱私政策
- 發佈正式版

---

## 三、iOS Release Build 流程（macOS 必須）

### 1. Apple 開發者準備

- Apple Developer Account
- App Store Connect 建立 App
- App ID / Bundle ID（如：`com.aya.randomfood`）

---

### 2. iOS 專案設定

```bash
cd ios
pod install
cd ..
```

---

### 3. 設定 Bundle Identifier

`ios/Runner.xcodeproj`

- **Runner → General → Bundle Identifier**

必須與 App Store Connect 完全一致。

---

### 4. Xcode 簽章設定

開啟 Xcode：

```bash
open ios/Runner.xcworkspace
```

設定：

- Signing & Capabilities
- Team：選擇你的 Apple Developer Account
- 勾選 **Automatically manage signing**（建議）

---

### 5. 建立 iOS Release Build

#### 產生 iOS Release（不含簽章）

```bash
flutter build ios --release
```

⚠️ **此指令無法直接上架，僅供編譯驗證**

---

### 6. 使用 Xcode Archive（正式上架）

1. Xcode → 選擇 `Any iOS Device`
2. `Product` → `Archive`
3. 開啟 Organizer
4. Distribute App
5. App Store Connect
6. Upload

---

### 7. App Store Connect 後續

- TestFlight 測試
- 填寫 App 資訊
- 提交審核

---

## 四、常用 Build 參數

```bash
flutter build appbundle --flavor prod -t lib/main_prod.dart
flutter build ios --release --flavor prod
flutter build apk --split-per-abi
```

---

## 五、常見問題

### Q1：Android 上架失敗（Version 已存在）

➡️ `pubspec.yaml` 中 `+buildNumber` 必須遞增

---

### Q2：iOS 找不到 Provisioning Profile

➡️ 使用 Xcode 自動管理簽章

---

### Q3：Release 與 Debug 行為不同

➡️ 確認：

- API Key
- Firebase 設定
- 環境變數

---

## 六、建議上架前檢查清單

- [ ] App Icon / Launch Screen
- [ ] 隱私政策 URL
- [ ] Crashlytics
- [ ] 真機測試
- [ ] Release 模式測試

---

## 七、參考指令總覽

```bash
flutter doctor
flutter clean
flutter pub get
flutter build appbundle
flutter build apk --release
flutter build ios --release
```
