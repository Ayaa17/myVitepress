---
icon: pen-to-square
date: 2025-11-17
category:
  - AI
tag:
  - llm
  - agent
  - python
---

# OpenAI Agents SDK + Memory

使用[openai-agents-python](https://github.com/openai/openai-agents-python)的 memory 模組來實現記憶功能，
提供以下三種方式來記錄 session 的記憶

## OpenAI Conversations API

全部自動存在 OpenAI 的雲端

```python
from agents import OpenAIConversationsSession

session = OpenAIConversationsSession()

# Optionally resume a previous conversation by passing a conversation ID
# session = OpenAIConversationsSession(conversation_id="conv_123")

result = await Runner.run(
    agent,
    "Hello",
    session=session,
)
```

## SQLite memory - 快速單機部署

在 Local 端使用 SQLite（可以是記憶體或檔案型）儲存每個 session 的對話紀錄。

```python
from agents import SQLiteSession

# In-memory database (lost when process ends)
session = SQLiteSession("user")

# Persistent file-based database
session = SQLiteSession("user", "local.db")

# Use the session
result = await Runner.run(
    agent,
    "Hello",
    session=session
)
```

## 透過 SQLAlchemySession 串接自建資料庫

使用 SQLAlchemy 支援的多種資料庫（如 PostgreSQL、MySQL、SQLite 等）作為 session 記憶後端，常用於生產環境、多人系統、或已經有現成資料庫的架構。資源管理更靈活。

### 方式 1:快速部屬 使用 in-memory SQLite

```python
import asyncio
from agents import Agent, Runner
from agents.extensions.memory.sqlalchemy_session import SQLAlchemySession

async def main():
    agent = Agent("Assistant")
    session = SQLAlchemySession.from_url(
        "user",
        url="sqlite+aiosqlite:///:memory:",
        create_tables=True,  # Auto-create tables for the demo
    )

    result = await Runner.run(agent, "Hello", session=session)

if __name__ == "__main__":
    asyncio.run(main())
```

### 方式 2:結合既有 SQLAlchemy Engine

```python
import asyncio
from agents import Agent, Runner
from agents.extensions.memory.sqlalchemy_session import SQLAlchemySession
from sqlalchemy.ext.asyncio import create_async_engine

async def main():
    # In your application, you would use your existing engine
    engine = create_async_engine("sqlite+aiosqlite:///conversations.db")

    agent = Agent("Assistant")
    session = SQLAlchemySession(
        "user-456",
        engine=engine,
        create_tables=True,  # Auto-create tables for the demo
    )

    result = await Runner.run(agent, "Hello", session=session)
    print(result.final_output)

    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(main())
```

## OpenAI Agent 裡 SQLAlchemySession vs SQLiteSession 差別

OpenAI Agents SDK 裡的這兩個其實都是「資料庫 Session Provider」，讓 Agent 可以持久化儲存記憶、資料、Task、狀態等。

但是 **使用場景完全不同**。

### 1. SQLAlchemySession（通用 ORM Session）

適用場景

- **你要用外部資料庫**（例如你的 Agent 雲端部署）
- **你要管控資料表 schema、migration**
- **你有大量資料，不適合用 local SQLite**
- **你需要多 Agent 共用同個 DB**

優點

- 高度客製化
- 接任何 DB
- 最適合作為 Production backend

缺點

- 你要自己管理資料庫 schema 與 engine
- 需要 SQLAlchemy 知識

### 2. SQLiteSession（快速上手、本地記憶用）

適用場景

- **本地測試（local dev）**
- **你的 Agent 只需要存記憶，不需要複雜 DB**
- **你不想搞 SQLAlchemy schema**

優點

- 超簡單
- 不需要 ORM
- 非常適合開發初期、Prototype

缺點

- 只能 SQLite
- 不適合大量資料或高併發
- 多 Agent 共用資料檔容易出事

### **總結差別**

| 項目       | SQLAlchemySession               | SQLiteSession         |
| ---------- | ------------------------------- | --------------------- |
| 支援資料庫 | 任何 DB（MySQL、PG…）           | 只有 SQLite           |
| 設定       | 需自己建立 SQLAlchemy engine    | 只要 `.db` 路徑就能用 |
| 用途       | Production、Server、多人共用 DB | 本地開發、快速測試    |
| 彈性       | ⭐⭐⭐⭐⭐                      | ⭐⭐                  |
| 容易度     | ⭐⭐                            | ⭐⭐⭐⭐⭐            |

## Reference

- [OpenAI Agents SDK 04 - 使用 Sessions 輕鬆管理 AI 記憶](https://vocus.cc/article/68bab130fd897800010b7b75)
- [Context Engineering - Short-Term Memory Management with Sessions from OpenAI Agents SDK](https://cookbook.openai.com/examples/agents_sdk/session_memory)
- [How to adapt the new OpenAI Agents SDK to work with local Ollama models along with an example agent.](https://www.reddit.com/r/LocalLLaMA/comments/1j9oj4q/how_to_adapt_the_new_openai_agents_sdk_to_work/)
- [Complete Guide: Integrating OpenAI Agents SDK with Ollama for Local AI Agent Development](https://danielkliewer.com/blog/2025-03-12-openai-agents-sdk-ollama-integration)
- [openai-agents-python](https://github.com/openai/openai-agents-python)
