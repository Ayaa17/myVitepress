---
date: 2024-07-24
category:
  - unity
tag:
  - unity
  - game
---

# AVG 遊戲架構

在開發包含開始畫面和遊戲畫面的 AVG（文字冒險遊戲）時，合理的專案架構可以幫助你更好地管理和擴展遊戲內容。以下是一個基本的專案架構建議：

## 1. 遊戲場景 (Scenes)

- 開始場景 (Start Scene):包含遊戲的主選單，選項設置，和其他遊戲開始前的介面。

- 遊戲主場景 (Main Game Scene):

  - 主要的遊戲內容，如劇情對話、玩家選擇、動畫等。
  - 可以根據不同的章節或事件將遊戲分成多個子場景。

- 其他輔助場景:
  - 設定場景 (Settings Scene): 遊戲設定介面，如音量調整、語言選擇等。
  - 檔案/讀檔場景 (Save/Load Scene): 允許玩家儲存或載入遊戲進度的介面。
  - 過場動畫或過渡場景 (Cutscene/Transition Scenes): 用於播放重要劇情動畫或轉場。

## 2. 資源資料夾 (Assets Folders)

- 圖像 (Images): 包含角色立繪、背景圖片、UI 元素等。
- 音訊 (Audio): 背景音樂、音效、語音檔案等。
- 腳本 (Scripts): 遊戲邏輯、對話系統、玩家輸入等腳本。
- 預製件 (Prefabs): 常用的 UI 元件、角色模型等預製件。

## 3. 腳本架構 (Script Structure)

- 核心系統腳本 (Core System Scripts): 包括對話管理器、選擇系統、資料管理等核心功能。
- 場景管理腳本 (Scene Management Scripts): 用於處理場景切換、過場動畫等。
- UI 腳本 (UI Scripts): 處理介面交互，如按鈕點擊、選單導航等。
- 事件腳本 (Event Scripts): 定義遊戲中的特定事件，如劇情觸發、分支選擇等。

## 4. 資料管理 (Data Management)

- 對白與劇情資料 (Dialogue and Story Data):
  - 使用 JSON、XML 或其他資料格式儲存遊戲的對話和劇情分支。
  - 這些數據可以透過腳本動態載入和處理。
- 存檔系統 (Save System): 實現遊戲進度的保存與載入功能，包括玩家選擇、遊戲狀態等。

## 5. 專案管理 (Project Management)

- 版本控制 (Version Control): 使用 Git 或其他版本控制系統來管理程式碼和資源。
- 任務管理 (Task Management): 使用 Trello、Jira 等工具追蹤開發進度和任務分配。

## 6. 結構範例

以下是一個基於上述架構的專案資料夾結構範例。這種結構有助於組織資源和腳本，使專案更易於管理和維護：

```mathematica
MyAdventureGame/
├── Assets/
│   ├── Scenes/
│   │   ├── StartScene.unity
│   │   ├── MainGameScene.unity
│   │   ├── SettingsScene.unity
│   │   ├── SaveLoadScene.unity
│   │   └── Cutscene1.unity
│   │
│   ├── Scripts/
│   │   ├── Core/
│   │   │   ├── DialogueManager.cs
│   │   │   ├── GameManager.cs
│   │   │   └── SaveLoadManager.cs
│   │   │
│   │   ├── UI/
│   │   │   ├── MainMenu.cs
│   │   │   ├── SettingsMenu.cs
│   │   │   └── SceneSwitcher.cs
│   │   │
│   │   ├── Events/
│   │   │   ├── EventTrigger.cs
│   │   │   └── EventManager.cs
│   │   │
│   │   └── Utils/
│   │       ├── AudioManager.cs
│   │       ├── Singleton.cs
│   │       └── FadeEffect.cs
│   │
│   ├── Resources/
│   │   ├── Dialogues/
│   │   │   ├── Chapter1.json
│   │   │   └── Chapter2.json
│   │   │
│   │   ├── Sprites/
│   │   │   ├── Characters/
│   │   │   │   ├── Character1.png
│   │   │   │   └── Character2.png
│   │   │   │
│   │   │   └── Backgrounds/
│   │   │       ├── Background1.png
│   │   │       └── Background2.png
│   │   │
│   │   ├── Audio/
│   │   │   ├── Music/
│   │   │   │   ├── BackgroundMusic.mp3
│   │   │   │   └── TitleTheme.mp3
│   │   │   │
│   │   │   └── SFX/
│   │   │       ├── ClickSound.wav
│   │   │       └── DoorOpen.wav
│   │   │
│   │   ├── Prefabs/
│   │   │   ├── UI/
│   │   │   │   ├── DialogueBox.prefab
│   │   │   │   └── Button.prefab
│   │   │   │
│   │   │   └── Characters/
│   │   │       ├── Character1.prefab
│   │   │       └── Character2.prefab
│   │   │
│   │   └── Fonts/
│   │       ├── MainFont.ttf
│   │       └── SecondaryFont.ttf
│   │
│   ├── Artworks/
│   │   └── ConceptArt/
│   │       ├── Character1Concept.png
│   │       └── EnvironmentConcept.png
│   │
│   └── Shaders/
│       ├── Shader1.shader
│       └── Shader2.shader
│
└── ProjectSettings/
    ├── EditorBuildSettings.asset
    ├── InputManager.asset
    └── TagManager.asset

```

### 說明

- Assets: 主資源資料夾，包含所有的遊戲資源。
- Scenes: 存放所有場景文件，依場景類型或功能分類。
- Scripts: 依照功能或模組劃分腳本，包括核心系統、UI 處理、事件管理等。
- Resources: 動態載入的資源，例如對話資料、圖片、音訊等。
- Artworks: 概念藝術圖、設計圖等參考素材。
- Shaders: 著色器文件，用於定義遊戲中的視覺效果。
