---
icon: pen-to-square
date: 2024-07-05
category:
  - AI
tag:
  - voice recognition
  - whisper
  - nlp
order: 3
---
# Fine-Tune Whisper For Multilingual ASR with huggingface Transformers

All 11 of the pre-trained checkpoints are available on the Hugging Face Hub. The checkpoints are summarised in the following table with links to the models on the Hub:

| Size     | Layers | Width | Heads | Parameters | English-only                                         | Multilingual                                        |
|----------|--------|-------|-------|------------|------------------------------------------------------|-----------------------------------------------------|
| tiny     | 4      | 384   | 6     | 39 M       | [✓](https://huggingface.co/openai/whisper-tiny.en)   | [✓](https://huggingface.co/openai/whisper-tiny.)    |
| base     | 6      | 512   | 8     | 74 M       | [✓](https://huggingface.co/openai/whisper-base.en)   | [✓](https://huggingface.co/openai/whisper-base)     |
| small    | 12     | 768   | 12    | 244 M      | [✓](https://huggingface.co/openai/whisper-small.en)  | [✓](https://huggingface.co/openai/whisper-small)    |
| medium   | 24     | 1024  | 16    | 769 M      | [✓](https://huggingface.co/openai/whisper-medium.en) | [✓](https://huggingface.co/openai/whisper-medium)   |
| large    | 32     | 1280  | 20    | 1550 M     | x                                                    | [✓](https://huggingface.co/openai/whisper-large)    |
| large-v2 | 32     | 1280  | 20    | 1550 M     | x                                                    | [✓](https://huggingface.co/openai/whisper-large-v2) |
| large-v3 | 32     | 1280  | 20    | 1550 M     | x                                                    | [✓](https://huggingface.co/openai/whisper-large-v3) |

``*fine-tune時須考量local端硬體能夠支援的model大小``

## Fine-tuning Whisper in a Google Colab

[colab](https://colab.research.google.com/github/sanchit-gandhi/notebooks/blob/main/fine_tune_whisper.ipynb): 採用small model來當預訓練模型，利用``mozilla-foundation/common_voice_11_0`` 的這個資料集來 fine-tune 印地語。原先的 Whisper small模型的 WER 為 63.5%，經過 4000 steps後，最後使得該WER降到 32.0%。

## Fine-tuning by own dataset
根據上面colab的sample code,這邊找了兩段語音，來對tiny model做微調。

### 語音分別為 :
- ``"這個BenQ大約是2月底購買的"`` -> training
- ``"又看到BenQ官方主打最適合Mac"`` -> test

### tiny-model predction :
- ``"這個Benz大約是2月底購買的"``
- ``"又看到Ben Koo官方主打最適合MET"``

### after Fine-tuning :　
- ``"BenQ 這是大約二月底購買的"``
- ``"又看到BenQ 官方主打最適合美"``

可以看到BenQ、Mac在原先的model是不認識的，我們收集了有BenQ的語音後，就可以讓model成功辨識出該字串，在Mac的部分因為training data中還是沒有包含該字串，所以在 fine-tuning 後依然不認識該字串。

## Sample code
[whisper_fine_tune sample](https://github.com/Ayaa17/whisper_fine_tune) : flow the README.md, tuning self model.

## Reference
- [huggingface/fine-tune-whisper.md](https://github.com/huggingface/blog/blob/main/fine-tune-whisper.md)
- [colab sample -> fine_tune_whisper](https://colab.research.google.com/github/sanchit-gandhi/notebooks/blob/main/fine_tune_whisper.ipynb)
