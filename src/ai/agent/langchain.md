---
icon: pen-to-square
date: 2025-11-10
category:
  - AI
tag:
  - llm
  - nlp
  - agent
  - python
---

# LangChain

## 一、LangChain 是什麼

LangChain 是一套 **用來建構以 LLM 為核心的應用（chatbot、RAG、Agent、自動化工作流）** 的開放原始碼框架／編排層，提供模型介面、prompt 管理、chain/agent 模型、工具（tools）、記憶（memory）、向量資料庫（vectorstores）等標準化元件，讓你把 LLM 串成可重複、可測試、可部署的系統。([LangChain 文檔][1])

## 二、核心概念

### (1) 模型（LLM / Chat models）

- LangChain 將各家模型（OpenAI、Anthropic、Google、HuggingFace 等）包成統一的「模型介面」，開發者可用同一套邏輯切換模型提供者（降低綁定風險）。([LangChain 文檔][2])

### (2) Prompt / PromptTemplate

- 把 prompt 視為一個可參數化的模板（`PromptTemplate`），方便重用與版本化。LangChain 支援把 prompt 與 LLM 串成「runnable / chain」，可以把多個步驟（prompt→llm→ 後處理）串接起來。範例用法與注意事項都在官方文件。([api.python.langchain.com][3])

### (3) Chains（流程/管線）

- Chain = 把多個步驟（呼叫 model / 處理輸入 / 呼叫工具等）串接成一個有輸入輸出的流程。常見有：單步 LLMChain（或新的 runnable 組合）、SequentialChain（多步順序）、Retrieval + LLM 的組合等。

> 註：LangChain 的 API 持續演進（部分舊 class 有 deprecations），推薦參考文件的最新範例。([api.python.langchain.com][4])

### (4) Tools（工具）

- Tool 把外部功能（HTTP API、資料庫查詢、執行程式碼、MCP、系統指令等）封裝成模型可呼叫的介面。Agent 在運作時會根據需要決定是否呼叫某個 tool，並用 tool 的回傳結果繼續推理或行動。([LangChain 文檔][5])

### (5) Agents（代理 / 自治型工作流）

- Agent = LLM + Tools 的決策器（會循環推理、決定呼叫哪個 tool、何時終止），可基於 ReAct 等 prompting 策略或更高階的 graph-based runtime（LangGraph）。LangChain 提供多種 agent 建構器（create_react_agent、create_agent 等），適合把外部能力賦予 LLM。([LangChain 文檔][6])

### (6) Memory（記憶）

- Memory 用來在多輪對話或長期互動中保存與回傳上下文。常見型式：ConversationBuffer（保留完整歷史）、SummaryMemory（自動摘要以節省 tokens）、WindowMemory（只保留最近 k 條）等，選擇依應用需求與 token 成本。([api.python.langchain.com][7])

### (7) Embeddings、Vectorstores、Retrievers（RAG）

- 把文件分段後做 embeddings，存到向量資料庫（FAISS、Chroma、Pinecone、Qdrant…），再用 Retriever 取回最相關片段，把片段當 context 交給 LLM → 形成 Retrieval-Augmented Generation（RAG）流程。LangChain 封裝了向量庫介面與常見的「檢索 + 組合回答」流程範本。([LangChain 文檔][8])

### (8) Document loaders / Text splitters / Combine chains

- 包含 PDF/HTML/Office 等多種 loader，與分段工具（text splitter）及合併策略（map-reduce、stuff、chain-of-thought style combine）來控制如何把多個片段送入 LLM。

### (9) 觀察/測試/部署（Studio / LangSmith 等）

- LangChain 生態有觀察 (tracing)、測試與部署工具（例如官方提供的 studio / LangSmith），幫助你追蹤 agent 呼叫、評估回覆與做 A/B 測試。([LangChain 文檔][9])

---

## 三、實務用法（常見工作流 + 範例）

> **注意**：LangChain API 會隨版本更新（某些 class/函式已標示 deprecate 或改名）。下面示範的是常見設計模式，實際 import 路徑請以你安裝的版本官方文件為準。([api.python.langchain.com][4])

### A. 最簡單：Prompt → LLM（單步）

```python
# 概念示例（實際 import 依版本）
from langchain_openai import OpenAI
from langchain_core.prompts import PromptTemplate

llm = OpenAI()  # 用你的 API 金鑰設定
prompt = PromptTemplate.from_template("把這句話翻成中文：{text}")
chain = prompt | llm   # runnable 組合的概念
out = chain.invoke({"text": "Hello world"})
print(out)
```

（用途：快速測試模型、簡單任務）([LangChain 文檔][10])

---

### B. RAG（文件問答）典型 pipeline

步驟：loader → splitter → embeddings → vectorstore → retriever → retrieval-chain (LLM)

```text
1. 用 DocumentLoader 讀入 PDF/網頁
2. 用 TextSplitter 切成 chunks（例如 1k tokens）
3. 透過 Embeddings 轉成向量
4. 存到向量 DB（FAISS/Chroma/Pinecone）
5. retriever = vectorstore.as_retriever()
6. 用 create_retrieval_chain(retriever, combine_docs_chain=...) 呼叫 LLM 取得答案
```

（優點：大幅降低幻覺、把多源文件變成可搜尋知識庫）([LangChain 文檔][8])

---

### C. Agent + Tools（自動化 / 可行動的 LLM）

範例思路（pseudo）：

```python
from langchain.agents import create_react_agent
from langchain.tools import Tool
from langchain_openai import OpenAI

def my_mcp_tool(cmd: str) -> str:
    # 呼叫你的 MCP server（HTTP / socket）
    return send_mcp_command(cmd)

tool = Tool(name="mcp", func=my_mcp_tool, description="控制 Minecraft 的指令")
agent = create_react_agent(llm=OpenAI(), tools=[tool], prompt=...)
# agent 會在內部推理、決定何時呼叫 tool，再用 tool 回傳繼續推理
agent.run("請幫我在 x=10 y=64 z=10 建一間小屋")
```

（Agent 適用於需要 model 決策 + 多步工具呼叫的場景；實務需限制迭代次數、驗證 tool 結果）([LangChain 文檔][6])

---

### D. 記憶（多輪聊天）

```python
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory(return_messages=True)
# 在建立會話 chain 或 agent 時把 memory 傳進去
```

選擇 `Buffer`、`Summary` 或 `Window` 取決於：對話長度、token 成本、是否需長期人物資料。([api.python.langchain.com][11])

---

## 四、常見問題 / 最佳實務建議（實務派）

1. **要不要用 RAG？**

   - 如果系統需要「基於專屬文件給出精準答案」，RAG 幾乎是必備（降低 hallucination）。([LangChain 文檔][8])

2. **chunk 大小怎麼選？**

   - 以模型 context window 考量：太長會超 context，太短可能丟失語境；常用 500–1500 tokens（視任務與模型而定）。

3. **memory 不要無限制蓄積**

   - 長對話建議用 SummaryMemory 或定期整理，避免 token 爆表與成本失控。([api.python.langchain.com][7])

4. **Agent 的安全與可靠性**

   - 給 agent 明確的 tool 描述、限制最大步數、加入校驗器（validate tool outputs）與人員介入點（human-in-loop）。

5. **測試與觀察**

   - 使用 LangChain 的 tracing / studio / LangSmith 類工具來追蹤 model 呼叫、評估與回滾行為。([LangChain 文檔][9])

6. **版本與相容性**

   - LangChain 進化快速（有些 class/方法被標示為 deprecated），在實作前先對照你環境的官方文件與 release note。([api.python.langchain.com][4])

---

## 五、參考流程（快速決策導圖，怎麼上手）

1. 明確用例（聊天 / 文件問答 / 自動化）
2. 選模型（OpenAI / Anthropic / 私有）＋設定金鑰
3. 如果牽涉文件 → 做 loader→split→embed→vectorstore→retriever
4. 視需求加入 memory（短期 or summary）
5. 若需呼叫外部功能 → 實作 tool，加入 Agent（並設 guardrails）
6. 本地化測試 + 監控（tracing）→ 部署

---

## Reference

[1]: https://docs.langchain.com/oss/python/langchain/overview?utm_source=chatgpt.com "LangChain overview"
[2]: https://docs.langchain.com/oss/python/langchain/models?utm_source=chatgpt.com "Models - Docs by LangChain"
[3]: https://api.python.langchain.com/en/latest/prompts/langchain_core.prompts.prompt.PromptTemplate.html?utm_source=chatgpt.com "langchain_core.prompts.prompt.PromptTemplate"
[4]: https://api.python.langchain.com/en/latest/chains/langchain.chains.llm.LLMChain.html?utm_source=chatgpt.com "langchain.chains.llm.LLMChain"
[5]: https://docs.langchain.com/oss/python/langchain/tools?utm_source=chatgpt.com "Tools - Docs by LangChain"
[6]: https://docs.langchain.com/oss/python/langchain/agents?utm_source=chatgpt.com "Agents - Docs by LangChain"
[7]: https://api.python.langchain.com/en/latest/langchain/memory/langchain.memory.summary.ConversationSummaryMemory.html?utm_source=chatgpt.com "ConversationSummaryMemory"
[8]: https://docs.langchain.com/oss/python/langchain/rag?utm_source=chatgpt.com "Build a RAG agent with LangChain"
[9]: https://docs.langchain.com/oss/python/langchain/studio?utm_source=chatgpt.com "Studio - Docs by LangChain"
[10]: https://docs.langchain.com/oss/python/integrations/llms/openai?utm_source=chatgpt.com "OpenAI - Docs by LangChain"
[11]: https://api.python.langchain.com/en/latest/memory/langchain.memory.buffer.ConversationBufferMemory.html?utm_source=chatgpt.com "langchain.memory.buffer.ConversationBufferMemory"
