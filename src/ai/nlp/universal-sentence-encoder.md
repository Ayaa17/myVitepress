---
icon: pen-to-square
date: 2024-08-06
category:
  - AI
tag:
  - nlp
---
# Universal Sentence Encoder
使用 Universal Sentence Encoder 來進行句子相似度和句子分類任務。 Universal Sentence Encoder 可以輕鬆取得句子層級的嵌入向量，並計算句子之間的語意相似度。

## 主要内容

1. **設定環境**：介紹如何設置環境以訪問 TF Hub 上的 Universal Sentence Encoder，並提供適用於單字、句子和段落的範例。
2. **載入模組**：提供載入 Universal Sentence Encoder 模組的程式碼範例。
3. **計算表示**：展示如何為每一則訊息計算表示，並顯示支援的不同長度。
4. **視覺化相似度**：使用熱圖顯示訊息之間的相似度。
5. **評估**：介紹 STS（語義文本相似度）基準，並提供下載資料及評估句子嵌入向量的程式碼範例。

## Sample code

### 設定環境
```python
!pip3 install seaborn
```

### 載入模組
```python
from absl import logging
import tensorflow as tf
import tensorflow_hub as hub
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import re
import seaborn as sns

module_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
model = hub.load(module_url)
print("module %s loaded" % module_url)

def embed(input):
    return model(input)
```

### 計算表示
```python
word = "Elephant"
sentence = "I am a sentence for which I would like to get its embedding."
paragraph = (
    "Universal Sentence Encoder embeddings also support short paragraphs. "
    "There is no hard limit on how long the paragraph is. Roughly, the longer "
    "the more 'diluted' the embedding will be."
)
messages = [word, sentence, paragraph]

# Reduce logging output.
logging.set_verbosity(logging.ERROR)

message_embeddings = embed(messages)
for i, message_embedding in enumerate(np.array(message_embeddings).tolist()):
    print("Message: {}".format(messages[i]))
    print("Embedding size: {}".format(len(message_embedding)))
    message_embedding_snippet = ", ".join((str(x) for x in message_embedding[:3]))
    print("Embedding: [{}, ...]\n".format(message_embedding_snippet))
```

### 視覺化相似度
```python
def plot_similarity(labels, features, rotation):
    corr = np.inner(features, features)
    sns.set(font_scale=1.2)
    g = sns.heatmap(
        corr,
        xticklabels=labels,
        yticklabels=labels,
        vmin=0,
        vmax=1,
        cmap="YlOrRd"
    )
    g.set_xticklabels(labels, rotation=rotation)
    g.set_title("Semantic Textual Similarity")

def run_and_plot(messages_):
    message_embeddings_ = embed(messages_)
    plot_similarity(messages_, message_embeddings_, 90)
```

### 評估：STS（語義文本相似度）基準
STS 基准提供了根据从句子嵌入向量计算得出的相似度得分与人为判断的一致程度的评估。

```python
import pandas
import scipy
import math
import csv

sts_dataset = tf.keras.utils.get_file(
    fname="Stsbenchmark.tar.gz",
    origin="http://ixa2.si.ehu.es/stswiki/images/4/48/Stsbenchmark.tar.gz",
    extract=True
)
```

### 評估句子嵌入向量
```python
sts_data = sts_dev

def run_sts_benchmark(batch):
    sts_encode1 = tf.nn.l2_normalize(embed(tf.constant(batch['sent_1'].tolist())), axis=1)
    sts_encode2 = tf.nn.l2_normalize(embed(tf.constant(batch['sent_2'].tolist())), axis=1)
    cosine_similarities = tf.reduce_sum(tf.multiply(sts_encode1, sts_encode2), axis=1)
    clip_cosine_similarities = tf.clip_by_value(cosine_similarities, -1.0, 1.0)
    scores = 1.0 - tf.acos(clip_cosine_similarities) / math.pi
    return scores
```

## Reference
- [tensorflow-tutorials](https://www.tensorflow.org/hub/tutorials/semantic_similarity_with_tf_hub_universal_encoder?hl=zh-cn)
- [kaggle-universal-sentence-encoder](https://www.kaggle.com/models/google/universal-sentence-encoder/tensorFlow1/lite/2?tfhub-redirect=true)
- [使用 Multilingual Universal Sentence Encoder 研究跨语言相似度和构建语义搜索引擎](https://www.tensorflow.org/hub/tutorials/cross_lingual_similarity_with_tf_hub_multilingual_universal_encoder?hl=zh-cn)
- [github-Ayaa17/nlu-sample](https://github.com/Ayaa17/nlu-sample)