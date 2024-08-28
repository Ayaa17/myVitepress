---
icon: pen-to-square
date: 2024-08-28
category:
  - iOS
tag:
  - ios
---
# Xcode 導入 dylib 動態連結library

要將一個包含 `include` 文件和 `lib` 文件（包括多個 `.dylib` 文件）的庫導入到 Xcode 專案中，你可以按照以下步驟進行：

1. **將文件添加到專案中**：
   - 打開 Xcode 專案，選擇你想要添加庫的專案目標。
   - 在 Xcode 的“Project Navigator”中，右鍵單擊你的專案文件夾，選擇“Add Files to [Your Project Name]”。
   - 選擇你的 `include` 文件夾和 `lib` 文件夾，將它們添加到你的專案中。確保選擇“Create groups”而不是“Create folder references”。

2. **設置 Header Search Paths**：
   - 選擇你的專案目標，在“Build Settings”選項卡下，找到“Header Search Paths”。
   - 添加包含 `include` 文件夾的路徑。這是用來告訴 Xcode 去哪裡找到頭文件。

3. **設置 Library Search Paths**：
   - 在“Build Settings”中，找到“Library Search Paths”。
   - 添加包含 `.dylib` 文件的路徑。這是用來告訴 Xcode 去哪裡找到庫文件。

4. **鏈接庫**：
   - 在“Build Phases”選項卡下，展開“Link Binary With Libraries”。
   - 點擊“+”按鈕，然後選擇需要鏈接的 `.dylib` 文件。你也可以拖放 `.dylib` 文件到這裡。

5. **設置 Runpath Search Paths**：
   - 在“Build Settings”中，找到“Runpath Search Paths”。
   - 添加包含 `.dylib` 文件的路徑，通常是 `@executable_path/../Frameworks` 或其他適合你的路徑。

6. **檢查鏈接設置**：
   - 確保你的專案在“Build Phases”中的“Link Binary With Libraries”部分正確地鏈接了 `.dylib` 文件。
   - 如果有需要，檢查是否需要其他的設置，如“Other Linker Flags”。

完成這些步驟後，你的庫應該已經成功導入到 Xcode 專案中，並且可以在你的代碼中使用它。


## Add Library
在 Xcode 中，`Link Binary with Libraries` 和 `Embed Frameworks` 可以添加Library：

## 1. **Link Library（鏈接庫）**
   - **用途**：在編譯階段將靜態或動態庫與你的應用程序二進制文件進行鏈接。這意味著當你編譯應用程序時，會把鏈接的庫信息嵌入到應用程序中，以便在運行時查找和使用這些庫。
   - **影響**：鏈接的庫會在運行時由系統自動加載。對於靜態庫，鏈接後會將庫的內容直接嵌入到應用程序二進制文件中。而動態庫（如 `.dylib`）則不會嵌入，系統會在應用程序運行時動態加載它們。
   - **使用場景**：大多數情況下，用於鏈接必需的第三方庫或系統庫。

## 2. **Embed Library（嵌入庫）**
   - **用途**：嵌入庫主要是針對動態框架（`.framework`）或動態庫（`.dylib`），這些庫需要在運行時與應用程序一起打包。嵌入操作確保這些動態庫隨應用程序一起分發，而不需要單獨安裝。
   - **影響**：嵌入的庫會被包含在應用程序的捆綁包（Bundle）內。這確保了應用程序運行時能夠找到並加載這些庫，即使它們不是系統或全局安裝的庫。
   - **使用場景**：當你需要確保某個動態庫在運行時與應用程序一起使用，並且不能依賴於系統安裝該庫時，應該使用嵌入。

## 總結
- **鏈接（Link）**：確保應用程序在運行時可以找到和使用指定的庫，適用於靜態和動態庫。鏈接後的動態庫不會被自動包含在應用捆綁包中。
- **嵌入（Embed）**：將動態庫或框架直接包含在應用程序的捆綁包內，以確保應用程序可以使用這些庫，無需依賴外部安裝。


## Build app

當你將一個動態庫（如 `.dylib`）僅通過 `Link Binary with Libraries` 鏈接到 Xcode 專案中，而沒有嵌入到應用程序中，可能會導致在運行時找不到該動態庫。這是因為：

- **鏈接**確保在編譯時，應用程序知道需要使用該動態庫，但並不保證該動態庫會在運行時存在於合適的位置。
- 如果該 `.dylib` 不在系統的標準路徑（如 `/usr/lib` 或 `/Library/Frameworks`），或者沒有嵌入到應用的捆綁包中，應用在運行時可能會找不到這個庫，導致崩潰或加載失敗。

### 如何解決
如果你在打包應用程序時希望確保動態庫可以在運行時找到，有兩種方法：

1. **嵌入 `.dylib` 文件**：
   - 在 Xcode 的“Build Phases”中，將 `.dylib` 文件添加到“Embed Frameworks”部分。這將確保 `.dylib` 文件被打包到你的應用程序捆綁包內。

2. **設置適當的 `Runpath Search Paths`**：
   - 在“Build Settings”中設置 `Runpath Search Paths`，例如 `@executable_path/../Frameworks`。這告訴應用程序在執行時在哪裡尋找動態庫。這些庫可以手動放置在該路徑下。

### 備註
Embed library 要登入開發者帳號