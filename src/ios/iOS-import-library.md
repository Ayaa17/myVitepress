---
icon: pen-to-square
date: 2024-08-22
category:
  - iOS
tag:
  - ios
---

# iOS import library

The best way to import third-party dependencies is via dependency managers.

在 iOS 開發中，最常見且廣泛使用的方式是 CocoaPods。它是一個流行的依賴管理工具，允許開發者輕鬆地新增、更新和管理第三方程式庫。以下是使用 CocoaPods 導入庫的詳細步驟：

<details><summary>方法 1: 使用 CocoaPods</summary>

## 方法 1: 使用 CocoaPods

### 1. 安裝 CocoaPods（如果尚未安裝）:

打開終端機並執行以下命令：

```bash
sudo gem install cocoapods
```

### 2. 建立 Podfile:

在專案根目錄下打開終端機並運行：

```bash
pod init
```

### 3. 編輯 Podfile:

開啟產生的 Podfile 文件，並新增 TensorFlow Lite 的依賴項。找到 `# Pods for YourProjectName` 的位置，並新增以下內容：

```ruby
platform :ios, '12.0'
use_frameworks!

target 'MyApp' do
  pod 'TensorFlowLiteSwift'
end
```

### 4. 安裝依賴 :

在終端機中執行以下命令以安裝依賴：

```bash
pod install
```

### 5. 開啟 .xcworkspace 檔案:

從現在開始，使用產生的 `.xcworkspace` 檔案來開啟你的 Xcode 專案。

### 6. 清理項目（可選）

有時候，當 CocoaPods 發生問題或出現代碼不同步的情況，可以清理 Xcode 項目來解決：

在 Xcode 中選擇 Product > Clean Build Folder (⇧ + ⌘ + K)。
重新編譯你的項目。

### 7. 更新 CocoaPods 依賴（可選）

如果需要更新所有的 CocoaPods 依賴到最新版本，使用以下命令：

```bash
pod update
```

這會更新所有依賴庫到它們的最新版本，並同步到項目中。

### 8. build App error handle — Sandbox deny
出現以下error:

```sh
Sandbox: rsync.samba(26872) deny(1) file-read-data /Users/normal/Library/Developer/Xcode/DerivedData/remove-background-fmepdzkazwvdmebddmihubuvdgkb/Build/Products/Debug-iphonesimulator/remove-background.app/Frameworks/Alamofire.framework/Alamofire.bundle

Sandbox: rsync.samba(26873) deny(1) file-read-data /Users/normal/Library/Developer/Xcode/DerivedData/remove-background-fmepdzkazwvdmebddmihubuvdgkb/Build/Products/Debug-iphonesimulator/remove-background.app/Frameworks/Alamofire.framework/Alamofire

```
resolve: 在 Target App 的 Build Settings 將 User Script Sandboxing 設為 No。

</details>

<details><summary>方法 2: 使用 Swift Package Manager</summary>

## 方法 2: 使用 Swift Package Manager

### 1. 打開 Xcode:

打開你的 Xcode 專案。

### 2. 新增包依賴 :

1. 選擇項目文件（左側導覽列中的項目名稱）。
2. 在主視圖中，選擇 "Package Dependencies" 標籤。
3. 點選左上角的 "+" 按鈕，輸入以下 URL：
   ```text
   https://github.com/tensorflow/tensorflow.git
   ```
4. 選擇合適的版本，點選 "Add Package".

### 3. 在程式碼中導入庫 :

在需要使用 TensorFlow Lite 的 Swift 檔案中，加入以下導入語句：

```swift
import TensorFlowLite
```

</details>

<details>
<summary>方法 3: 使用 Carthage</summary>

## 方法 3: 使用 Carthage

### 1. 安裝 Carthage（如果尚未安裝）:

打開終端機並執行以下命令：

```bash
brew install carthage
```

### 2. 建立 Cartfile:

在專案根目錄下建立一個名為 `Cartfile` 的文件，並加入以下內容：

```text
github "tensorflow/tensorflow" ~> 2.0.0
```

### 3. 安裝依賴 :

在終端機中執行以下命令：

```bash
carthage update --platform iOS
```

### 4. 將生成的框架加入到 Xcode:

將產生的 `Carthage/Build/iOS/TensorFlowLite.framework` 拖曳到你的 Xcode 專案中，並確保選取 "Copy items if needed" 選項。

### 5. 在程式碼中導入庫 :

在需要使用 TensorFlow Lite 的 Swift 檔案中，加入以下導入語句：

```swift
import TensorFlowLite
```

</details>

##

## Reference

- [stackoverflow - how-to-include-a-library-into-my-swift-project](https://stackoverflow.com/questions/42843054/how-to-include-a-library-into-my-swift-project)
- [apple developer - 为你的 App 添加软件包依赖项](https://developer.apple.com/cn/documentation/xcode/adding_package_dependencies_to_your_app/)
- [medium - 使用 CocoaPods 管理第三方套件](https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E5%95%8F%E9%A1%8C%E8%A7%A3%E7%AD%94%E9%9B%86/%E4%BD%BF%E7%94%A8-cocoapods-%E7%AE%A1%E7%90%86%E7%AC%AC%E4%B8%89%E6%96%B9%E5%A5%97%E4%BB%B6-6e6135b62814)