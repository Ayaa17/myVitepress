---
icon: pen-to-square
date: 2025-01-20
category:
  - AI
tag:
  - voice activity detection
  - vad
---

# Voice activity detection

語音活動檢測（VAD，Voice Activity Detection）是語音處理中的一個關鍵技術，用於檢測音頻信號中是否包含語音或非語音（靜音或噪音）部分。VAD 被廣泛應用於語音識別、語音通信、語音增強等領域，可以幫助提高系統的效能，減少不必要的計算負擔。

## VAD 的工作原理

VAD 的核心目的是區分語音信號和非語音信號，通常依賴於音頻特徵（如音頻強度、頻譜、基頻等）進行判斷。其主要的工作步驟如下：

1. **信號分幀**：將音頻信號分為短時間幀，通常是 20ms 到 30ms。
2. **提取特徵**：從每一幀中提取語音相關的特徵，如短時能量、過零率、梅爾頻率倒譜係數（MFCC）等。
3. **分類決策**：根據提取的特徵，進行分類判斷，確定該幀是語音還是噪聲或靜音。

## VAD 的應用

- **語音識別**：VAD 幫助篩選出語音部分，從而提高語音識別系統的精確度。
- **語音通信**：在語音通話中，VAD 可以減少無語音的時間，節省帶寬和計算資源。
- **噪音抑制**：通過識別語音部分，VAD 能夠將噪聲部分進行過濾，改善語音品質。
- **語音增強**：幫助提取語音信號，進行語音增強和清晰度提升。

## VAD 算法

常見的 VAD 算法包括：

1. **基於能量的 VAD**：簡單通過每幀的能量進行判斷，能量高於某個閾值則判定為語音，否則為非語音。
2. **基於過零率的 VAD**：通過檢測每幀信號的過零率來判斷是否包含語音。
3. **基於頻譜特徵的 VAD**：利用 MFCC、頻譜質心等特徵來判定語音活動。
4. **機器學習 VAD**：使用深度學習或其他機器學習方法進行語音與非語音的分類。

## 實現 VAD

### 使用 Python 實現簡單 VAD

這是一個簡單的基於能量的 VAD 實現範例：

```python
import numpy as np
import librosa

def vad_energy(signal, sample_rate, frame_length=1024, energy_threshold=0.6):
    frames = librosa.util.frame(signal, frame_length=frame_length, hop_length=frame_length//2)
    energies = np.sum(frames**2, axis=0)
    normalized_energies = energies / np.max(energies)
    vad_result = normalized_energies > energy_threshold
    return vad_result

# 讀取音頻信號
signal, sample_rate = librosa.load('audio_file.wav', sr=None)
vad_result = vad_energy(signal, sample_rate)
```

### 使用深度學習模型進行 VAD

深度學習方法使用卷積神經網絡（CNN）、長短期記憶網絡（LSTM）等結構來自動識別語音活動。這些模型通常需要大量的標註數據進行訓練。

## 優缺點

### 優點

- **提高效率**：VAD 有助於降低後續處理的計算負擔，只關注語音部分。
- **改善語音質量**：能夠濾除噪音，提供更清晰的語音信號。

### 缺點

- **對噪音敏感**：在高噪音環境下，VAD 的準確度可能會下降。
- **延遲問題**：即使是簡單的 VAD 算法，也可能會增加處理延遲，尤其是在實時系統中。

## VAD DL model

深度學習模型:

- [pyannote/segmentation-3.0(pyannote/pyannote-audio)](https://huggingface.co/pyannote/segmentation-3.0)
- [snakers4/silero-vad](https://github.com/snakers4/silero-vad)
- [VAD Marblenet - NGC Catalog - NVIDIA](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/nemo/models/vad_marblenet)

## Reference

- [Wiki - Voice activity detection](https://en.wikipedia.org/wiki/Voice_activity_detection)
- [pyannote/pyannote-audio](https://github.com/pyannote/pyannote-audio)
- [snakers4/silero-vad](https://github.com/snakers4/silero-vad)
- [【Python 軍火庫 🧨 - silero-vad】 偵測語音活動的神兵利器](https://vocus.cc/article/65afa21cfd89780001d00497)
- [VAD Marblenet - NGC Catalog - NVIDIA](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/nemo/models/vad_marblenet)
- [Python 中的說話者分類(pyannote, NeMo sample)](https://picovoice.ai/blog/speaker-diarization-in-python/)
