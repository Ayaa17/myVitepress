---
icon: pen-to-square
date: 2024-08-02
category:
  - AI
tag:
  - nlp
---
# Zero-Shot Classification

Zero-shot classification 是一種自然語言處理任務，模型在訓練時使用一組標記示例，但能夠分類來自之前未見類別的新示例。

## 內容概述

### 1. 什麼是Zero-Shot Classification？

零-shot分類是一種預測模型在訓練期間未見過的類別的方法。這種方法利用預訓練的語言模型，可以視為轉移學習的一種形式，特別適用於標記數據量較小的情況。

Zero-Shot Learning（ZSL）是一種在訓練過程中未見過某些類別的樣本，但能夠在測試階段對這些類別進行分類的技術。這種學習方式通常依賴輔助信息來進行推斷。

### 2. 輔助信息的類型

1. **屬性描述**
    - 類別可以用一組預定義的屬性來描述，例如「長鬃」、「有斑點」等。
    - 屬性通常以結構化的方式組織，這樣可以提高學習的效率和準確性。
    - 這種方法在計算機視覺中應用廣泛，並且在自然語言處理中也有一些例子。
2. **文本描述**
    - 類別標籤被視為具有語義意義，通常會附加定義或自然語言描述，例如從維基百科獲取的類別描述。
    - 此技術在自然語言處理中尤為重要，因為它幫助模型理解類別的含義。
3. **類別相似度**
    - 將類別嵌入到一個連續的特徵空間中，通過預測樣本在該空間中的位置來進行分類。
    - 雖然在訓練過程中未觀察到某些類別的樣本，但可以利用已知類別的特徵來推斷新類別的特徵。

### 3. 模型架構
Zero-Shot Learning模型通常包括兩個主要組件：
1. **特徵學習模塊**：學習如何從輸入數據中提取特徵，這些特徵用於描述類別。
2. **推斷模塊**：利用輔助信息來進行類別推斷，通常涉及將輸入樣本的特徵與類別的輔助信息進行比對。

### 4. 廣義Zero-Shot Learning

在這種設置中，測試時可能會同時出現新類別和已知類別的樣本。這要求分類器能夠判斷一個樣本是來自於新類別還是已知類別。

#### 解決方案

1. **閘控模塊**：
    - 訓練一個模型來判斷樣本來自新類別還是舊類別，並在推斷時輸出硬決策或軟概率決策。
2. **生成模塊**：
    - 生成未見類別的特徵表示，並使用標準分類器對所有類別（包括已見和未見的）進行訓練。

### 5. 技術挑戰

1. **類別間的相似性**：如何有效地利用類別之間的相似性來進行推斷。
2. **輔助信息的質量**：輔助信息的質量和結構直接影響分類的準確性。
3. **樣本不平衡**：在某些情況下，已知類別的樣本可能遠多於未見類別的樣本，這會影響模型的學習效果。

### 6. 應用實例

1. **圖像分類**：能夠識別未見過的動物類別，例如訓練模型識別馬，但能夠推斷斑馬的類別。
2. **語義分割**：對於未見過的物體類別進行分割，使用輔助信息來指導分割過程。
3. **自然語言處理**：在文本分類中，模型能夠根據文本描述進行分類，無需提供樣本數據。

## 實現方法

### 詞嵌入（Word Embeddings）

- 詞嵌入是將單詞映射到高維向量空間中的方法。常見的詞嵌入技術包括 Word2Vec、GloVe、BERT、GPT 等。這些技術能夠捕捉單詞之間的語義關係，從而在向量空間中表示單詞的語義信息。例如，Word2Vec和GloVe主要用於靜態詞嵌入，而BERT和GPT是動態詞嵌入，能夠根據上下文動態調整詞的表示。
- 在零樣本分類中，詞嵌入用於將類別標籤和文本描述轉換為向量，然後比較這些向量的相似度。

### 自然語言理解（Natural Language Understanding, NLU）

- NLU 是 NLP 的一部分，旨在使機器理解和解釋人類語言。這包括語義解析、情感分析、主題建模等。
- 零樣本分類需要 NLU 技術來理解新類別的描述，並將其轉換為合適的向量表示。

### 跨模態學習（Cross-Modal Learning）

- 跨模態學習涉及從不同的數據模態（如文本、圖像、音頻）中學習共享表示。這在零樣本分類中特別重要，因為模型需要將文本描述和類別標籤進行語義對齊。
- 通過共享的向量空間，模型可以比較不同模態的數據，進行相似性評估。

### 通用語言模型（Universal Language Models）

- 使用預訓練的通用語言模型（如 BERT、GPT-3），這些模型已經在大量文本數據上進行了預訓練，具有強大的語義理解能力。
- 通過微調（fine-tuning）或直接使用預訓練模型，實現零樣本分類。

### 對比學習（Contrastive Learning）

- 使用對比學習技術，通過學習將相似的數據點靠近，不相似的數據點分開，來增強模型的分類能力。
- 這種技術在零樣本學習中可以有效利用有限的標記數據，增強模型在新類別上的泛化能力。

### 推斷

可以使用🤗 Transformers庫中的零-shot分類管道進行推斷：

```python
from transformers import pipeline

pipe = pipeline(model="facebook/bart-large-mnli")
pipe("I have a problem with my iphone that needs to be resolved asap!",
    candidate_labels=["urgent", "not urgent", "phone", "tablet", "computer"])
# output
# >>> {'sequence': 'I have a problem with my iphone that needs to be resolved asap!!', 'labels': ['urgent', 'phone', 'computer', 'not urgent', 'tablet'], 'scores': [0.504, 0.479, 0.013, 0.003, 0.002]}
```

## 注意事項

1. **數據質量**
   - 雖然零樣本分類不依賴大量標記數據，但需要高質量的文本描述和類別標籤。
   - 這些描述應該清晰且具有代表性，以提高分類的準確性。

2. **模型選擇**
   - 選擇合適的預訓練模型是成功的關鍵。
   - 不同的語言模型在不同的任務上性能可能有所不同，需根據具體應用場景選擇最合適的模型。

3. **候選標籤的選擇**
   - 確保候選標籤與待分類文本的內容相關。
   - 避免無關標籤對結果的干擾，以提高分類的準確性。

4. **文本預處理**
   - 對待分類的文本進行必要的預處理，如去除多餘的空格和特殊字符。
   - 這能提升分類效果。

5. **語義相似度計算**
   - 計算文本描述與類別標籤之間的相似度是零樣本分類的重要環節。
   - 常用的方法包括餘弦相似度、點積和歐氏距離等。
   - 選擇合適的相似度計算方法能提高分類的準確性。

## Reference
- Word2Vec: Mikolov, T., Chen, K., Corrado, G., & Dean, J. (2013). Efficient estimation of word representations in vector space.
- GloVe: Pennington, J., Socher, R., & Manning, C. D. (2014). GloVe: Global Vectors for Word Representation.
- BERT: Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K. (2019). BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding.
- GPT-3: Brown, T. B., et al. (2020). Language Models are Few-Shot Learners.
- Zero-Shot Learning with BERT: Blog on using BERT for Zero-Shot Learning
- Contrastive Learning: Chen, T., et al. (2020). A Simple Framework for Contrastive Learning of Visual Representations.