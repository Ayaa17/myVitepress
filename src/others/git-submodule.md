---
icon: pen-to-square
date: 2025-02-05
category:
  - Others
tag:
  - git
  - github
---

# Git Submodule 使用指南

Git Submodule 允許你在一個 Git 倉庫內嵌套另一個 Git 倉庫，適用於依賴管理或共享代碼的場景。

## 1. 添加 Submodule

```sh
git submodule add <repository_url> <path>
```

示例：

```sh
git submodule add https://github.com/example/library.git external/library
```

這將會在 `external/library` 目錄內添加 `library.git` 倉庫作為 Submodule。

## 2. 初始化與更新 Submodule

如果你從倉庫克隆了包含 Submodule 的專案，需要初始化並更新 Submodule：

```sh
git submodule update --init --recursive
```

或者可以使用以下方式克隆倉庫並同步 Submodule：

```sh
git clone --recursive <repository_url>
```

## 3. 更新 Submodule 到最新版本

進入 Submodule 目錄並拉取最新變更：

```sh
cd external/library
git pull origin main
```

回到主倉庫，提交 Submodule 變更：

```sh
git add external/library
git commit -m "Update submodule to latest version"
git push origin main
```

## 4. 切換 Submodule 分支

默認情況下，Submodule 維持特定的提交版本，如需切換到某個分支，可執行：

```sh
cd external/library
git checkout main
git pull origin main
```

如果希望 Submodule 直接跟隨最新的分支版本，可以修改 `.gitmodules`：

```sh
[submodule "external/library"]
	path = external/library
	url = https://github.com/example/library.git
	branch = main
```

然後更新 Submodule：

```sh
git submodule update --remote --merge
```

## 5. 移除 Submodule

若要移除 Submodule，需要執行以下步驟：

```sh
git submodule deinit -f -- external/library
rm -rf .git/modules/external/library
rm -rf external/library
git commit -m "Remove submodule external/library"
```

## 6. 常見問題與解決方案

### 1. Submodule 內容是空的？

執行以下命令來初始化並更新 Submodule：

```sh
git submodule update --init --recursive
```

### 2. Submodule 跟主倉庫不同步？

執行以下命令來更新 Submodule 為最新版本：

```sh
git submodule update --remote --merge
```

## 總結

Git Submodule 提供了一種方式來管理獨立的 Git 倉庫作為主倉庫的一部分，適用於需要共享或復用代碼的場景。但管理 Submodule 需要額外步驟，例如手動更新 Submodule，因此需根據需求選擇是否使用。
