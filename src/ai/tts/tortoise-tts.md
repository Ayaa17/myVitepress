---
icon: pen-to-square
date: 2024-07-30
category:
  - AI
tag:
  - tts
  - voice recognition
---
# Tortoise TTS
Tortoise TTS是一個文字轉語音的程序，它可以將文字轉換為逼真的語音。這個程式有多個聲音，能夠模擬不同說話者的音色和語調。所以，你可以根據需要選擇不同的聲音風格。 Tortoise TTS程式的原始程式碼包含了在推理模式下運行所需的所有程式碼。

[Web UI tool](https://huggingface.co/spaces/Manmay/tortoise-tts)

## sample code

[colab sample](https://colab.research.google.com/drive/1NxiY3zHN4Nd8J3YAqFsbYaOB71IiLE04?usp=sharing#scrollTo=Yia_iBpuJ9gn)

[colab long text sample](https://colab.research.google.com/drive/1g_CssJK34kwRi7VRtFd73WvTLq9UbnZT?usp=sharing)

```python
# Imports used through the rest of the notebook.
import torch
import torchaudio
import torch.nn as nn
import torch.nn.functional as F

from tortoise.api import TextToSpeech
from tortoise.utils.audio import load_audio, load_voice, load_voices

# This will download all the models used by Tortoise from the HuggingFace hub.
tts = TextToSpeech()

# This is the text that will be spoken.
text = "Thanks for reading this article. I hope you learned something."

# Pick a "preset mode" to determine quality. Options: {"ultra_fast", "fast" (default), "standard", "high_quality"}. See docs in api.py
# Generate speech with the custotm voice.
gen = tts.tts_with_preset(text, preset="fast")
torchaudio.save(f'generated.wav', gen.squeeze(0).cpu(), 24000)

```

### if want use custotm voice:
```python
# Optionally, upload use your own voice by running the next two cells. I recommend
# you upload at least 2 audio clips. They must be a WAV file, 6-10 seconds long.
CUSTOM_VOICE_NAME = "martin"

import os
from google.colab import files

custom_voice_folder = f"tortoise/voices/{CUSTOM_VOICE_NAME}"
os.makedirs(custom_voice_folder)
for i, file_data in enumerate(files.upload().values()):
  with open(os.path.join(custom_voice_folder, f'{i}.wav'), 'wb') as f:
    f.write(file_data)


# Generate speech with the custotm voice.
voice_samples, conditioning_latents = load_voice(CUSTOM_VOICE_NAME)
gen = tts.tts_with_preset(text, voice_samples=voice_samples, conditioning_latents=conditioning_latents, 
                          preset=preset)
torchaudio.save(f'generated-{CUSTOM_VOICE_NAME}.wav', gen.squeeze(0).cpu(), 24000)
IPython.display.Audio(f'generated-{CUSTOM_VOICE_NAME}.wav')

```

## Result
Generated audio clip(s) as a torch tensor. Shape 1,S if k=1 else, (k,1,S) where S is the sample length. Sample rate is **24kHz**.

- **eng text : Thanks for reading this article. I hope you learned something.**

<audio controls>
    <source src="@source/ai/tts/result/tts-english.wav" type="audio/mpeg">
    Your browser does not support the audio tag.
</audio>

- **zh text : 感謝您閱讀本文。我希望你學到了一些東西。**

<audio controls>
    <source src="@source/ai/tts/result/tts-zh.wav" type="audio/mpeg">
    Your browser does not support the audio tag.
</audio>

## Parameter

1. preset:
    - **ultra_fast** : Produces speech at a speed which belies the name of this repo. (Not really, but it's definitely fastest).
    - **fast** : Decent quality speech at a decent inference rate. A good choice for mass inference.
    - **standard** : Very good quality. This is generally about as good as you are going to get.
    - **high_quality** : Use if you want the absolute best. This is not really worth the compute, though.
1. temperature
1. length_penalty
1. repetition_penalty
1. top_p
1. cond_free_k
1. diffusion_temperature

## Custotm voice notice

1. **選擇「乾淨」的音頻**：
   - 音頻中除了人聲外，必須沒有其他噪音或音樂（有聲書是最佳選擇）。
2. **避免氣聲過重或音調過低的音頻**：
   - 該程序無法正確處理這種音效，會生成雜音和怪聲。
3. **控制音量**：
   - 音頻音量不應過大。如果使用有聲書，在 Audacity 中查看波形圖，選擇的音頻片段應該與波形圖相似。為了避免合成出的音頻變成雜音或怪聲，建議將音量降低至少 6dB。
4. **選擇合適的音頻片段數量和時長**：
   - 建議選擇 3-5 個每個 8-12 秒的片段，每個片段中語調應有所變化。如果語調過於平穩，合成的聲音會顯得沒有感情。
5. **注意音色的差異**：
   - 即使是同一位錄音者，不同場合錄製的聲音音色也會有所不同。比如同一位配音者在不同有聲書中的音色差異。建議選擇音色差異明顯的素材來提高合成音頻的效果。
6. **音頻編碼要求**：
   - 雖然開發者的 README 中指出 WAV 音頻編碼必須是 Floating Point，但實際上只要音頻的采樣率是 22050Hz 且是單聲道，就應該沒有問題。即使合成時出現 "Chunk (non-data) not understood" 的錯誤，也不必擔心，音頻仍會正常合成。

## Reference
- [tortoise-tts githuub](https://github.com/neonbjb/tortoise-tts)
- [Toolify.ai tortoise-tts](https://www.toolify.ai/zh/ai-news-cn/tortoise-tts%E7%A5%9E%E5%A5%87%E7%9A%84%E5%A4%9A%E5%A3%B0%E9%9F%B3%E6%96%87%E6%9C%AC%E8%BD%AC%E8%AF%AD%E9%9F%B3%E5%B7%A5%E5%85%B7-1075048)
- [TorToiSe语音克隆程序使用心得](https://blog.csdn.net/c2a2o2/article/details/131149636)
