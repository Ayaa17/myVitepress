---
icon: pen-to-square
date: 2025-11-11
category:
  - Python
tag:
  - python
---

# 🐍 使用 uv 管理 Python 專案

採用 **[uv](https://github.com/astral-sh/uv)** 取代傳統的 `pip`、`venv`、`poetry` 等工具，用於快速、可靠的 Python 套件管理與虛擬環境建置。

---

## 🔹 uv 是什麼？

`uv` 是一個專注於 Python 的超高速工具鏈，集成了：

- **套件管理**（取代 `pip` / `poetry`）
- **虛擬環境管理**（取代 `venv` / 部分 conda 功能）
- **Python 版本管理**（類似 `pyenv`）
- **可重現環境**（自動生成鎖定檔 `uv.lock`）

它以 **Rust** 實作，安裝與依賴解析速度可達傳統工具的 10 倍以上。

---

## 🔹 uv 的主要改善與優勢

| 改善項目 | 傳統方式 | uv 的改善 |
|-----------|-----------|------------|
| **套件安裝速度** | `pip install` 解析依賴慢 | Rust 解析器極快，安裝效率提升 10 倍以上 |
| **虛擬環境管理** | 需手動 `python -m venv .venv` | 自動建立 `.venv`，`uv run` 自動使用 |
| **可重現環境** | `requirements.txt` 無法完全鎖版本 | 自動生成 `uv.lock`，確保可重現 |
| **依賴解析穩定性** | `pip`/`poetry` 可能 timeout | Rust solver 穩定快速 |
| **Python 版本管理** | 需手動或用 pyenv | 內建版本管理，可自動下載與切換 |
| **Docker 支援** | pip 多層命令慢 | `uv` 可快取依賴、加速建置 |
| **整合性** | pip + venv + pyenv 整合繁瑣 | 一套工具整合全部功能 |

---

## 🔹 uv 使用範例

### 🧱 初始化專案
```bash
uv init myproject
cd myproject
````

### 📦 安裝套件

```bash
uv add requests numpy torch
```

### 🐍 安裝特定 Python 版本

```bash
uv python install 3.12
uv python pin 3.12
```

### ▶️ 執行程式

```bash
uv run python app/main.py
```

---

## 🐳 在 Docker 中使用 uv

```dockerfile
FROM python:3.12-slim

# 安裝 uv
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.cargo/bin:$PATH"

WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev
COPY app ./app

CMD ["uv", "run", "python", "-m", "app.main"]
```

---

## 🧭 將現有 `requirements.txt` 專案升級為 uv

### 📁 原始專案結構

```
myproject/
├── requirements.txt
├── main.py
└── ...
```

內容範例：

```
requests==2.31.0
flask==3.0.0
```

---

### ① 安裝 uv

**macOS / Linux**

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows (PowerShell)**

```powershell
powershell -ExecutionPolicy Bypass -Command "irm https://astral.sh/uv/install.ps1 | iex"
```

確認安裝：

```bash
uv --version
```

---

### ② 初始化 pyproject.toml

```bash
uv init
```

建立後內容如下：

```toml
[project]
name = "myproject"
version = "0.1.0"
requires-python = ">=3.10"
dependencies = []
```

---

### ③ 匯入 requirements.txt

```bash
uv pip compile requirements.txt
```

這會產生 `uv.lock` 檔案，鎖定所有依賴版本。

---

### ④ 同步套件環境

```bash
uv sync
```

執行後結構變為：

```
myproject/
├── pyproject.toml
├── uv.lock
├── requirements.txt
├── .venv/
└── main.py
```

---

### ⑤ 執行程式

```bash
uv run python main.py
```

或執行 CLI：

```bash
uv run flask run
```

---

### ⑥ （可選）清理舊環境

```bash
rm -rf venv .venv
pip cache purge
```

---

## 🧰 進階使用技巧

| 功能     | 指令                  |
| ------ | ------------------- |
| 新增套件   | `uv add fastapi`    |
| 移除套件   | `uv remove flask`   |
| 升級所有依賴 | `uv sync --upgrade` |
| 鎖定環境   | `uv lock`           |

---

## 🐳 Docker 範例（最小化構建）

```dockerfile
FROM python:3.11-slim

RUN curl -LsSf https://astral.sh/uv/install.sh | sh && \
    mv ~/.local/bin/uv /usr/local/bin/

WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen
COPY . .

CMD ["uv", "run", "main.py"]
```

---

## ✅ 使用 uv 的好處總結

| 功能                | 傳統 pip       | uv           |
| ----------------- | ------------ | ------------ |
| 安裝速度              | 🐢 慢         | ⚡ 超快（Rust）   |
| 環境管理              | 手動建立 venv    | 自動管理         |
| 版本鎖定              | pip-tools 外掛 | 內建 `uv.lock` |
| Docker 效率         | 複雜慢          | 快且可重現        |
| pyproject.toml 支援 | ❌            | ✅ 原生支援       |

---

## 🔹 適用情境建議

| 使用情境                 | 建議           |
| -------------------- | ------------ |
| 一般 Web / AI / CLI 專案 | ✅ 非常推薦       |
| Docker 化應用           | ✅ 高效可重現      |
| 多 Python 版本開發        | ✅ uv 內建支援    |
| 大量 GPU / CUDA 環境     | ⚠️ 可搭配 conda |

---

## 📚 參考資源

* 🔗 [uv 官方 GitHub](https://github.com/astral-sh/uv)
* 📘 [uv 安裝教學](https://astral.sh/uv/install)

---

🧩 **結論**
`uv` 是現代 Python 專案管理的理想選擇，
它讓開發者能用一個工具同時完成套件、環境、與版本管理，
簡化開發流程、提升速度與穩定性。

```
