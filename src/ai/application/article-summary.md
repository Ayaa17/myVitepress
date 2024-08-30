---
icon: pen-to-square
date: 2024-08-29
category:
  - AI
tag:
  - nlp
---
# Article Summarizer
以下是一些開源或已公開模型的AI摘要生成模型：

1. **BART (Bidirectional and Auto-Regressive Transformers)**:
   - **開源狀況**: BART 是開源的，Facebook AI 已將其模型權重和代碼公開在 Hugging Face 模型庫上，可以直接使用。
   - **使用方法**: 
        - [BART](https://github.com/Ayaa17/nlu-sample/blob/main/bart-summary.py)
        - [mBART](https://github.com/Ayaa17/nlu-sample/blob/main/bart-multilingual-summary.py)
   - **Hugging Face鏈接**: [BART on Hugging Face](https://huggingface.co/facebook/bart-large-cnn)
   - **Notice**: 
        - model有限制input token(512/1024?)，長文需額外處理。
        - multilingual 語言翻譯有限制，並且似乎不支援文轉錄(?)

2. **T5 (Text-To-Text Transfer Transformer)**:
   - **開源狀況**: T5 是開源的，Google 已將模型的權重和代碼公開在 Hugging Face 上。
   - **使用方法**: 
      - [T5](https://github.com/Ayaa17/nlu-sample/blob/main/t5-summary.py)
      - [mT5](https://github.com/Ayaa17/nlu-sample/blob/main/t5-multilingual-summary.py)
   - **Hugging Face鏈接**: [T5 on Hugging Face](https://huggingface.co/t5-large)
   - **Notice**: 
        - mT5(multilingual) 似乎無法直接使用，不斷預測出`<extra_id_0>` token。
        - [Hugging face issue- Generating from mT5](https://github.com/huggingface/transformers/issues/8704)
        - [Hugging face issue - loss is always 0.0](https://github.com/huggingface/transformers/issues/22467)

3. **PEGASUS**:
   - **開源狀況**: PEGASUS 是開源的，Google 將這個模型的權重和代碼發布在 GitHub 和 Hugging Face 上。
   - **使用方法**:
      - [PEGASUS](https://github.com/Ayaa17/nlu-sample/blob/main/bart-summary.py)
   - **Hugging Face鏈接**: [PEGASUS on Hugging Face](https://huggingface.co/google/pegasus-large)
   - **Notice**: 
      - model有限制input token(1024)，長文需額外處理。
      - PEGASUS 主要是為英語文本摘要任務設計的，目前沒有官方的多語言版本。

4. **LED (Longformer Encoder-Decoder)**:
   - **開源狀況**: LED 是開源的，由 Allen Institute for AI 釋出，並且可以在 Hugging Face 上使用。
   - **使用方法**: 
      - [LED](https://github.com/Ayaa17/nlu-sample/blob/main/led-summary.py)
   - **Hugging Face鏈接**: [LED on Hugging Face](https://huggingface.co/allenai/led-large-16384)
   - **Notice**: 
      - LED 是基於 Longformer 模型的，這個模型透過使用稀疏注意力機制（sparse attention）來有效地處理長文本序列。標準的 Transformer 模型在處理長文本時會遇到記憶體和計算資源的瓶頸，而 LED 透過稀疏注意力機制緩解了這些問題。
      - 處理超長文字輸入。

5. **GPT-2**:
   - **開源狀況**: GPT-2 是開源的，OpenAI 釋放了完整的模型權重和代碼。雖然 GPT-3 並未完全開源，但 GPT-2 已經是一個強大的生成模型，可以用來進行摘要生成。
   - **使用方法**: 
   - [GPT-2](https://github.com/Ayaa17/nlu-sample/blob/main/gpt-2-summary.py)
   - **Hugging Face鏈接**: [GPT-2 on Hugging Face](https://huggingface.co/gpt2)
   - **Notice**: 
      - GPT-2 does not have an official multilingual version.

這些模型都可以在 Hugging Face 的模型庫中找到，你可以直接加載這些模型來進行摘要生成，也可以根據需要進行微調以適應特定的應用場景。
