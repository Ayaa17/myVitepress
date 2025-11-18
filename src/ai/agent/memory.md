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

# AI Agent Memory

## AI Agent 記憶方式

- **即時記憶（Working Memory）** :「當前對話上下文」，跟 Agent 對話時，它會把最近的訊息放進模型的上下文（context window），一旦上下文超出模型限制（例如 8k、32k、128k tokens），舊的內容就會被丟掉，關閉 Agent 後不會保存

- **中期記憶（Session Memory）**： 在一段使用期間內維持狀態（如連續對話保持人名、任務）

- **長期記憶（Long-term Memory / Vector DB）** : 通常會透過 `Embedding + Vector Database`（如 Chroma / Milvus / Pinecone）把訊息編成向量（embedding） 存進資料庫，下次對話時，用 RAG 搜尋相關記憶，再提供給模型。

  用途：

  - 記住你的偏好（例如你喜歡什麼語氣）
  - 記住重要資訊（設定、任務進度、知識庫）
  - 記住你之前做過的事情（例如完成某任務的結果）

- **系統記憶（State / Tools / Files）** : 有些 Agent 會把資訊存在`JSON 檔、YAML 設定檔`、`MCP server 的 state`、`本地資料`，養成類 Agent 會存「性格」、「技能」等設定。_這比較像「系統狀態」而不是對話記憶。_

  用途：

  - 保存 Agent 狀態
  - 保存計畫進度
  - 保存任務樹 / DAG / workflows

```
使用者講話
    ↓
Agent 檢查是否需要寫入「長期記憶」
    - 有價值？持久？需要下次知道？
    ↓
若需要 → 向量化後寫入 Vector DB
    ↓
下次提問 → RAG 取回最相關的記憶
    ↓
和你的問題一起餵給 LLM
    ↓
模型回應（看起來像「記住了」）
```

---

## AI Agent 記憶設計要點

### **一、記憶層次與分類**

1. **即時記憶（Working Memory）**

   - 短期對話上下文
   - 關閉 Agent 後即消失
   - 上下文 window 限制 → 過長需裁剪或摘要

2. **長期記憶（Long-term / Vector Memory）**

   - 儲存有價值的資訊（偏好、事件、知識）
   - 透過 embedding + vector DB 檢索
   - 可永久保存，可跨會話使用

3. **系統記憶（System / State Memory）**

   - Agent 設定、任務狀態、工具註冊
   - 結構化資料（JSON / DB / workflow engine）
   - 支援重啟恢復、任務管理與審計

---

### **二、容量與摘要策略**

- **Context Window 限制** → 需控制 Working Memory 長度
- **長期記憶膨脹** → 需定期整理
- **策略**：

  - 摘要舊訊息（Summarization）
  - Chunk / 切段長文本
  - 淘汰策略：LRU、時間過期、重要性分數

---

### **三、持久化與檢索效率**

- **技術手段**：

  - Vector DB（Chroma / Milvus / Pinecone / Weaviate）
  - Metadata 過濾 + embedding 相似度

- **策略**：

  - 任務專用 embedding
  - 檢索優先最新 / 最相關訊息
  - 定期重建向量 / 更新 index

- **目標**：快速找到對當前對話有用的資訊

---

### **四、隱私與權限控管**

- **用戶同意**（Consent）：

  - 儲存前詢問，用戶可 opt-in / opt-out

- **刪除 / 修改權限**：

  - 支援「Right to be forgotten」

- **存取控制**：

  - 分層資料（公共 / 私人 / 系統）
  - 角色 / Agent 層級控制

- **安全措施**：

  - 敏感資料加密（KMS / Vault）
  - 傳輸加密（TLS / HTTPS）

- **目標**：符合法規，保護用戶隱私

---

### **五、資料一致性與版本管理**

- Schema 驗證（JSON Schema / Pydantic）
- 記憶版本號 / timestamp
- 更新時做 atomic operation / merge
- 支援 migration / backward compatibility

---

### **六、系統可靠性**

- checkpoint / snapshot（工作流 /任務進度）
- 事件驅動（emit update events）
- 監控：task backlog、失敗率
- 備援與快照：定期備份關鍵資料

---

### **七、常見問題與應對策略**

| 問題         | 原因                          | 解法                                      |
| ------------ | ----------------------------- | ----------------------------------------- |
| 記憶膨脹     | 過度累積對話 / 長期記憶       | 摘要、chunk、淘汰策略                     |
| 記憶不一致   | 多來源更新 / 無版本控制       | 版本號、atomic update、merge              |
| 檢索低效     | Embedding 不對齊 / DB 索引差  | 重新向量化、metadata 過濾、專用 embedding |
| 系統記憶混亂 | schema 升級 / checkpoint 遺失 | schema 驗證、快照、migration              |
| 記憶污染     | 未篩選輸入 / 敏感資料         | 過濾、redaction、存取控制                 |
| 過度依賴記憶 | 忽略即時訊息                  | 結合最新 context 與長期記憶               |

---

### **八、實作建議**

1. 記憶分層設計：Working / Long-term / System
2. 長期記憶用向量庫 + metadata
3. 系統記憶用結構化 DB / workflow engine
4. 摘要 + chunk 控制容量
5. 權限控制 + 安全加密
6. 版本管理 + schema 驗證
7. 定期監控、備份、測試

---

## AI Agent 的記憶流程示意

AI Agent 記憶模組設計的流程，清楚標示短期記憶、長期記憶、系統記憶，以及各個策略節點：

```
┌───────────────────────────────┐
│         使用者輸入訊息          │
└───────────────┬───────────────┘
                │
                ▼
       ┌─────────────────┐
       │ 收到訊息處理階段 │
       └─────────┬───────┘
                 │
     ┌───────────┼───────────┐
     │                       │
     ▼                       ▼
┌──────────────┐        ┌──────────────┐
│ 短期記憶 WM   │        │ 系統記憶 SM  │
│ (Working     │        │ (System      │
│  Memory)     │        │  Memory)     │
└──────────────┘        └──────────────┘
     │                       │
     │ 保存對話上下文         │ 更新任務進度 / Persona / 工具狀態
     │                       │
     ▼                       ▼
┌─────────────────────────────┐
│ 判斷是否需存入長期記憶 LTM    │
│ (是否有長期價值，需檢索/回顧) │
└───────────────┬─────────────┘
                │ 是
                ▼
       ┌─────────────────────┐
       │ 長期記憶 LTM         │
       │ (Vector DB + Embedding│
       │ + Metadata)           │
       └─────────┬───────────┘
                 │
         生成 Embedding 存入 DB
                 │
                 ▼
       ┌─────────────────┐
       │ 回應生成階段     │
       └─────────┬───────┘
                 │
     ┌───────────┼─────────────┐
     │                         │
     ▼                         ▼
取短期記憶 + 查詢長期記憶      取系統記憶
作為上下文                     (Persona, Task, Tool)
     │                         │
     └───────────┬─────────────┘
                 ▼
         LLM/Agent 生成回應
                 │
                 ▼
          回應使用者
                 │
                 ▼
       ┌─────────────────┐
       │ 記憶管理策略     │
       └─────────┬───────┘
                 │
  ┌──────────────┼─────────────────┐
  ▼              ▼                 ▼
容量控制        隱私控制          一致性檢查
(摘要/淘汰)    (Consent/刪除)     (Version/Atomic Update)
```

### 流程重點

1. **短期記憶（WM）**：即時對話上下文，有限容量，超過時需要摘要或裁剪。
2. **長期記憶（LTM）**：用 embedding 存入向量資料庫，可跨會話檢索。
3. **系統記憶（SM）**：儲存 persona、任務進度、工具列表，支持重啟恢復。
4. **記憶管理策略**：

   - 容量控制 → 摘要 / 淘汰策略
   - 隱私控制 → 用戶同意 / 刪除 / 加密
   - 一致性檢查 → 版本號 / atomic update / merge

---

## Reference

- [Add longterm memory per user using OPENAI AGENTS SDK](https://community.openai.com/t/add-longterm-memory-per-user-using-openai-agents-sdk/1324654/2)
- [如何為-ai-agent-設計「長期記憶」功能？](https://doris-school.com/%E5%A6%82%E4%BD%95%E7%82%BA-ai-agent-%E8%A8%AD%E8%A8%88%E3%80%8C%E9%95%B7%E6%9C%9F%E8%A8%98%E6%86%B6%E3%80%8D%E5%8A%9F%E8%83%BD%EF%BC%9F/)
- [AI Agent 的記憶模組（Memory）](https://ithelp.ithome.com.tw/articles/10375548)
