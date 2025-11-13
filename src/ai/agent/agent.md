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

# **目前主流的 Agent 框架**

## 🔍 主流程介紹

### 1. LangChain

![Image](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfyehOLYokz7juutVouQpY56Fq8KoUKYanO2T6W7pWb4dfUEFJI2mNBQwci0T8X1m-OS_hRJw_ibHZNJVZOy5OBqnHSOrprEPj2ISKav6TG-w9LwC6EK6iX2QjCJXI8phIlgrfS1Q?key=vjkRO_OFGvhSVDaCBiAOcoq_)

**特色**

- 非常成熟、被廣泛使用的框架。 ([RoboticsBiz][1])
- 模組化：支持模型、prompt template、chain、agent、tool、memory 等元件。
- 廣泛的工具／資料庫整合（向量資料庫、檔案 loader 等）使其在 RAG（Retrieval Augmented Generation）非常強。 ([APIpie.ai][2])
- 適用於：你需要「把 LLM 變成應用程式／系統」並整合外部資料、記憶、工具。

**優點**

- 社群大、案例多、生態成熟。
- 靈活度高，可自行擴展工具、自訂流程。
- 支援多模型（不僅限特定廠牌），適合你若想用不同模型／本地模型。

**缺點**

- 入門可能稍微有些學習曲線（眾多模組、流程選項）。
- 若只是做極簡「一句話呼叫模型」可能太重。
- 若需要非常簡化或完全零程式碼的環境，可能不是最快速方案。

### 2. AutoGen

![Image](https://www.akira.ai/hs-fs/hubfs/multi-agent-framework-with-autogen.png?height=1080&name=multi-agent-framework-with-autogen.png&width=1920)

![Image](https://microsoft.github.io/autogen/0.2/assets/images/app-c414cd164ef912e5e8b40f61042143ad.png)

![Image](https://www.microsoft.com/en-us/research/wp-content/uploads/2023/09/AutoGen_Fig1.png)

![Image](https://www.microsoft.com/en-us/research/wp-content/uploads/2023/09/AutoGen_Fig2.png)

![Image](https://microsoft.github.io/autogen/0.2/assets/images/autogen_agentchat-250ca64b77b87e70d34766a080bf6ba8.png)

![Image](https://microsoft.github.io/autogen/0.2/assets/images/agenteval_ov_v3-c471c3a909d8046fc75e70fb198e63ac.png)

**特色**

- 微軟 (Microsoft) 出的多代理對話／協作框架。 ([Firecrawl - The Web Data API for AI][3])
- 適合構建「多個代理角色互動／分工」的系統。

**優點**

- 若你的系統需要「多角色代理」互相協作（例如虛擬角色中有多個子角色）時很有用。
- 設計比較針對對話與代理協作。

**缺點**

- 相比 LangChain，可能在工具整合、外部系統呼叫上自由度稍低。
- 若只是單一代理或簡化應用可能不是最輕量選擇。

---

### 3. CrewAI

![Image](https://miro.medium.com/0%2AQSjdwjIdBs355Q8F.png)

![Image](https://miro.medium.com/v2/resize%3Afit%3A661/1%2AmhhghuDye5w8GOFCtxzSbA.jpeg)

![Image](https://raw.githubusercontent.com/crewAIInc/nvidia-demo/main/arch_diagram.png)

![Image](https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2025/03/28/image009.png)

![Image](https://admin.bentoml.com/uploads/crewai_bentoml_diagram_b9a2e1246a.png)

**特色**

- 主打「角色扮演」與「多代理團隊協作」。 ([Medium][4])
- 適合內容創作、資料分析、協作流程中不同角色分工的場景。

**優點**

- 快速原型、多角色設定比較直觀。
- 適合你若想讓虛擬角色中有多個子代理／角色互動。

**缺點**

- 若你的系統重點是「工具呼叫＋記憶＋遊戲／控制流程」而不是多角色自動協作，CrewAI 的分工架構可能不是最核心。
- 生態比 LangChain 少；自訂工具或系統整合可能需更多手動工作。

---

### 4. Letta （前稱 MemGPT）

![Image](https://files.buildwithfern.com/https%3A//letta.docs.buildwithfern.com/2025-10-28T05%3A19%3A42.210Z/images/stateful_agents.png)

![Image](https://cdn.prod.website-files.com/66bb3d1f468f0f3848a20a84/6824ff9e8b9b8cfa0b38d37d_memory-h-l4.png)

![Image](https://cdn.prod.website-files.com/66bb3d1f468f0f3848a20a84/67361c7879df5b88f88a2c7a_67361c696ebead1b0ac05d21_agents-stack-map-nov-14-24.webp)

![Image](https://cdn.prod.website-files.com/66bb3d1f468f0f3848a20a84/67868277d12fa3fe98b03691_6786820ed12fa3fe98afc1ac_tavily_call.png)

![Image](https://opengraph.githubassets.com/c7ec5cdc692dd166b9ae82d16a8b9fa97f64b15d05366b3ddb266ebe258cb788/letta-ai/letta-chatbot-example)

![Image](https://camo.githubusercontent.com/fdc5aaa8954a75376aa22bcc84ca58af619232fde159d249e345d03a4310aca9/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f4a4938696f57325f6941552f302e6a7067)

**特色**

- 主打「記憶」與長期上下文管理的代理框架。 ([Humai.blog][5])
- 適合需要長期對話記錄、人物背景、角色演化的系統。

**優點**

- 若你的虛擬角色需要「記住你過去做過什麼、習慣、偏好」這類特性，Letta 在記憶這邊有特化。
- 支援多模型、協作、狀態持久化。

**缺點**

- 相對於更通用型的框架（如 LangChain）可能在工具整合、控制流程上功能較窄。
- 若控制／遊戲場景中工具呼叫很多（MCP 控制、動畫、音訊等）可能還需搭配其它模組。

---

### 5. Semantic Kernel

![Image](https://visualstudiomagazine.com/articles/2025/10/01/~/media/ECG/visualstudiomagazine/Images/2023/12/sk_s.ashx)

![Image](https://miro.medium.com/1%2AmMDTcHoocYw4DU7E_2ocmg.png)

![Image](https://learn.microsoft.com/en-us/semantic-kernel/media/the-kernel-is-at-the-center-of-everything.png)

![Image](https://devblogs.microsoft.com/semantic-kernel/wp-content/uploads/sites/78/2024/09/ProcessPic1-1.png)

![Image](https://devblogs.microsoft.com/semantic-kernel/wp-content/uploads/sites/78/2023/03/Embedding_SK_Picture.jpg)

![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/1%2Anauh4Hkeb7C9oqOc-YoNIg.png)

**特色**

- 由微軟打造，偏向企業整合／流程型代理應用。 ([Gist][6])
- 支援多語言／企業環境整合較好。

**優點**

- 若你的系統需要和現有企業系統、後端／資料庫、認證、合規流程整合，Semantic Kernel 是考量之一。
- 提供 agent、process abstraction 等。

**缺點**

- 若你的焦點是遊戲／虛擬角色控制、輕量化流程，可能相對較「企業級」且較重。
- 生態與社群案例可能不如 LangChain 廣泛。

---

## 🧠 主流 AI Agent 框架比較總覽（2025）

| 框架                                | 開發者 / 支援者                  | 核心定位                                                  | 優點                                                                              | 缺點                                                       | 適合用途                                    |
| ----------------------------------- | -------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------- |
| **LangChain**                       | LangChain Inc.（開源社群最活躍） | **LLM 應用開發框架**：整合模型、記憶、資料庫、工具、Agent | 模組完整（Chains, Agents, Tools, Memory）<br>支援多模型與 RAG<br>生態最大、教學多 | 入門曲線高<br>配置較繁瑣<br>不適合極輕量應用               | 通用型 AI 系統、RAG、智慧助理、多模態 Agent |
| **OpenAI Agents** (`openai-agents`) | **OpenAI 官方**                  | **官方 Agent 平台**：與 GPTs 同核心，支援工具呼叫與記憶   | 官方支援、穩定性高<br>與 GPT-4o、Whisper、DALL·E 完美整合<br>設定簡單             | 僅支援 OpenAI 模型<br>封閉、可擴展性低<br>不易嵌入自訂系統 | 快速原型、產品級 GPT 助理、內部工具 Agent   |
| **AutoGen**                         | 微軟 Microsoft                   | **多代理協作框架**：讓多個 Agent 分工合作完成任務         | 多角色互動自然<br>支援人類在迴圈中 (Human-in-the-loop)<br>可與 LangChain 結合     | 框架重、配置多<br>不適合單代理應用                         | 研究、團隊協作型 AI、代理溝通模擬           |
| **CrewAI**                          | CrewAI Inc.（開源社群）          | **角色分工與團隊協作 Agent**                              | 建立多角色工作流簡單<br>支援任務委派、對話互動                                    | 生態較新<br>文件不如 LangChain 完善                        | 多角色對話、內容生產、虛擬團隊              |
| **Letta (MemGPT)**                  | Letta AI                         | **長期記憶型 Agent 框架**                                 | 對話記憶強大<br>支援狀態保存與角色成長                                            | 工具整合度低<br>社群規模小                                 | 個人助理、虛擬角色、長期互動型應用          |
| **Semantic Kernel**                 | 微軟 Microsoft                   | **企業級 Agent 流程框架**                                 | 強整合企業系統 (Azure, .NET)<br>流程穩定、支援 Plugin                             | 偏重企業環境、學習曲線高                                   | 企業後端整合、流程自動化                    |
| **LlamaIndex**（原 GPT Index）      | Jerry Liu 等開源貢獻者           | **資料導向框架**（RAG 為主）                              | 文件檢索、知識庫整合強<br>與 LangChain 相容                                       | 不是完整 Agent 架構（無多步決策）                          | 文件問答、知識庫系統                        |
| **Haystack**                        | deepset.ai                       | **開源 NLP / RAG 框架**                                   | 工業級穩定<br>支援自建搜尋 + Pipeline                                             | 不以 Agent 為中心<br>模型切換不靈活                        | 文件搜尋、問答、知識庫後端                  |

---

## 🔍 重點對比（簡表）

| 類別                     | 最強代表             | 說明                                         |
| ------------------------ | -------------------- | -------------------------------------------- |
| 🧩 **通用 LLM 應用框架** | **LangChain**        | 模組完整、支援度最高，可組合多功能 Agent。   |
| ⚙️ **官方簡化版本**      | **OpenAI Agents**    | 官方支援、最容易上手，但只能用 OpenAI 模型。 |
| 👥 **多角色互動**        | **AutoGen / CrewAI** | 適合多 Agent 協作、虛擬角色群體模擬。        |
| 🧠 **長期記憶型**        | **Letta (MemGPT)**   | 強化記憶與人格持久性，適合虛擬角色。         |
| 🏢 **企業整合導向**      | **Semantic Kernel**  | 適合大型企業系統或 Azure 生態。              |

---

## 🧭 選擇建議（依用途）

| 你的目標                                         | 推薦框架                | 理由                                                |
| ------------------------------------------------ | ----------------------- | --------------------------------------------------- |
| 想做一個「有記憶、有工具、有控制能力」的 AI 助理 | ✅ **LangChain**        | 模組齊全，方便擴充記憶與工具（MCP、Unity 控制等）。 |
| 想快速做出一個像 GPTs 一樣的 Agent               | ✅ **OpenAI Agents**    | 官方整合度高，上線快。                              |
| 想做「多角色互動、對話分工」的系統（如 NPC 群）  | ✅ **CrewAI / AutoGen** | 多代理溝通、任務協作。                              |
| 想讓 AI 角色「記得你以前說過的話」並逐步成長     | ✅ **Letta**            | 長期記憶與狀態管理能力強。                          |
| 想在企業系統內導入 AI 流程                       | ✅ **Semantic Kernel**  | 企業導向、流程穩定。                                |

---

## 📘 小結：一句話差異整理

| 框架                                             | 一句話定位 |
| ------------------------------------------------ | ---------- |
| **LangChain** → 「AI 系統開發瑞士刀」            |            |
| **OpenAI Agents** → 「官方 GPTs 的程式版」       |            |
| **AutoGen** → 「多 Agent 協作模擬框架」          |            |
| **CrewAI** → 「分工團隊型 Agent」                |            |
| **Letta** → 「有長期記憶的個人 AI 助理」         |            |
| **Semantic Kernel** → 「企業級 AI Agent 工具鏈」 |            |

[1]: https://roboticsbiz.com/top-open-source-frameworks-for-building-ai-agents-and-agentic-ai-applications/?utm_source=chatgpt.com "Top open-source frameworks for building AI agents and agentic AI applications - RoboticsBiz"
[2]: https://apipie.ai/docs/blog/top-10-opensource-ai-agent-frameworks-may-2025?utm_source=chatgpt.com "Top 10 Open-Source AI Agent Frameworks of May 2025 | APIpie"
[3]: https://www.firecrawl.dev/blog/best-open-source-agent-frameworks-2025?utm_source=chatgpt.com "The Best Open Source Frameworks For Building AI Agents in 2025"
[4]: https://odsc.medium.com/top-10-open-source-ai-agent-frameworks-to-know-in-2025-c739854ec859?utm_source=chatgpt.com "Top 10 Open-Source AI Agent Frameworks to Know in 2025 | by ODSC - Open Data Science | Medium"
[5]: https://www.humai.blog/top-12-frameworks-for-building-ai-agents-in-2025/?utm_source=chatgpt.com "Top 12 Frameworks for Building AI Agents in 2025"
[6]: https://gist.github.com/chunhualiao/71be16bc76dc8c306634878a63edd2db?utm_source=chatgpt.com "agentic frameworks · GitHub"
