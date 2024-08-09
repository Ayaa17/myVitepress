---
icon: pen-to-square
date: 2024-08-09
category:
  - Others
tag:
  - flutter
---
# Flutter install with vscode

### 安裝 Flutter 和 Dart 插件

1. 打開 VSCode，點擊左側的擴展圖標（或按 `Ctrl+Shift+X`）。
2. 搜尋 "Flutter" 並安裝官方插件。
3. 搜尋 "Dart" 並安裝官方插件。

### 安裝 各平台ide

- Android Studio
    - Android SDK
    - Android toolchain
    - Android cmdline tool
- Visual Studio
    - Desktop development with C++ workload. 
- Xcode : todo


### 安裝 Flutter SDK

1. 前往 [Flutter 官方網站](https://flutter.dev/docs/get-started/install) 下載最新的 Flutter SDK。
2. 解壓縮下載的文件並將其路徑添加到系統環境變量中。
3. 打開終端，輸入 `flutter doctor -v` 來檢查安裝是否成功並解決任何潛在的問題。

### 創建新的 Flutter 項目

1. 打開 VSCode 的命令面板（按 `Ctrl+Shift+P`）。
2. 輸入並選擇 `Flutter: New Project`，然後按照提示操作。


### 運行 Flutter 項目

1. 打開 VSCode 終端（按 `Ctrl+`）並導航到你的項目文件夾。
2. 確保你的設備已連接或模擬器已啟動。
3. 輸入 `flutter run` 來運行你的 Flutter 應用。

### 運行 已存在 Flutter 項目
如果你的 Flutter 項目有問題，可以通過以下命令清理並重新生成項目：
```sh
flutter clean
flutter pub get
```

### 調試 Flutter 應用

1. 使用 VSCode 的內建調試工具可以輕鬆進行調試。
2. 在你想要調試的代碼行左側設置斷點，然後點擊調試圖標（或按 `F5`）來啟動調試模式。