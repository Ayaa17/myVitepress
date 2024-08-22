---
icon: pen-to-square
date: 2024-08-22
category:
  - iOS
tag:
  - ios
---

# iOS 專案結構示例

常見的專案結構如下 :

```bash
MyApp/
├── MyApp.xcodeproj
├── MyApp/
│ ├── AppDelegate.swift
│ ├── SceneDelegate.swift (iOS 13及以上)
│ ├── ContentView.swift
│ ├── Models/
│ │ ├── User.swift
│ │ └── Item.swift
│ ├── Views/
│ │ ├── HomeView.swift
│ │ ├── DetailView.swift
│ │ └── CustomButton.swift
│ ├── ViewModels/
│ │ ├── HomeViewModel.swift
│ │ └── DetailViewModel.swift
│ ├── Services/
│ │ ├── APIService.swift
│ │ └── UserDefaultsService.swift
│ ├── Resources/
│ │ ├── Assets.xcassets
│ │ ├── LaunchScreen.storyboard
│ │ └── Localizable.strings
│ ├── Supporting Files/
│ │ ├── Info.plist
│ │ └── Entitlements.plist
│ └── Extensions/
│ ├── UIView+Extensions.swift
│ └── String+Extensions.swift
└── Tests/
├── MyAppTests/
│ └── MyAppTests.swift
└── MyAppUITests/
└── MyAppUITests.swift
```

## 檔案功能說明

1.  **MyApp.xcodeproj**: Xcode 專案的檔案，包含專案的配置和設置。

2.  **MyApp/** : 專案的主要源代碼資料夾。

    - **AppDelegate.swift**: 應用的入口點，處理應用生命週期事件（如啟動、進入背景等）。

    - **SceneDelegate.swift**: 處理多窗口（iOS 13 及以上）的場景管理。

    - **ContentView.swift**: 應用的主視圖，通常是 SwiftUI 的根視圖。

    - **Models/** : 存放數據模型檔案，通常定義應用的數據結構。

      - **User.swift**: 定義用戶模型，包含用戶屬性和方法。

      - **Item.swift**: 定義項目模型，包含項目屬性和方法。

    - **Views/** : 存放視圖檔案，包含用戶界面的各個部分。

      - **HomeView.swift**: 應用的主螢幕視圖。

      - **DetailView.swift**: 顯示詳細資訊的視圖。

      - **CustomButton.swift**: 自定義按鈕的視圖。

    - **ViewModels/** : 存放視圖模型，處理視圖的業務邏輯和數據。

      - **HomeViewModel.swift**: 處理主頁視圖的數據和邏輯。

      - **DetailViewModel.swift**: 處理詳細視圖的數據和邏輯。

    - **Services/** : 存放服務類，處理與外部系統的互動。

      - **APIService.swift**: 處理網絡請求和 API 調用。

      - **UserDefaultsService.swift**: 處理用戶偏好設置的存儲和讀取。

    - **Resources/** : 存放資源檔案（如圖像、字符串等）。

      - **Assets.xcassets**: 存放應用圖像和顏色資源。

      - **LaunchScreen.storyboard**: 應用啟動螢幕的界面。

      - **Localizable.strings**: 存放本地化字符串。

    - **Supporting Files/** : 存放應用的支持檔案。

      - **Info.plist**: 應用的配置信息。

      - **Entitlements.plist**: 存放應用權限設置。

    - **Extensions/** : 存放擴展功能的檔案。

      - **UIView+Extensions.swift**: 擴展 UIView 的功能。

      - **String+Extensions.swift**: 擴展 String 的功能。

3.  **Tests/** : 存放測試檔案。

    - **MyAppTests/** : 單元測試資料夾。

      - **MyAppTests.swift**: 包含對應用邏輯的單元測試。

    - **MyAppUITests/** : UI 測試資料夾。

      - **MyAppUITests.swift**: 包含對應用用戶界面的測試。

## Reference

- [apple - developer doc](https://developer.apple.com/documentation/xcode)
- [ithome - SwiftUI 專案結構](https://ithelp.ithome.com.tw/m/articles/10319769)
- [github - iOS 開發資源](https://github.com/Superbil/awesome-iOS-cht)
- [Medium - iOS Clean Swift 架構之實際應用](https://blog.twjoin.com/ios-clean-swift%E6%9E%B6%E6%A7%8B%E4%B9%8B%E5%AF%A6%E9%9A%9B%E6%87%89%E7%94%A8-%E4%B8%8A-a239fc92e702)
