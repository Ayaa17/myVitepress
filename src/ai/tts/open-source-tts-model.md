---
icon: pen-to-square
date: 2024-07-23
category:
  - AI
tag:
  - tts
  - voice recognition
---
# Open Source Text-to-Speech Models (TTS)

Started to save /u/M4xM9450’s comment on the topic of open source TTS models.  
Disclaimer: I’m far from an expert in this field, but I saw some desire to have a shared resource.  
Please feel free to suggest or comment to clean this up or extend as you see fit.

## Neural TTS Models

### Tacotron
- **Submitted:** Mar 29, 2017
- **Paper:** [Tacotron: Towards End-to-End Speech Synthesis](https://arxiv.org/pdf/1703.10135.pdf)
- **Github:** [keithito/tacotron](https://github.com/keithito/tacotron) (Not the official implementation but is the one cited the most)

### Tacotron2
- **Submitted:** Dec 16, 2017
- **Paper:** [Natural TTS Synthesis by Conditioning Wavenet on Mel Spectrogram Predictions](https://arxiv.org/pdf/1712.05884.pdf)
- **Github:** [NVIDIA/tacotron2](https://github.com/NVIDIA/tacotron2)

### Transformer TTS
- **Submitted:** Sept 19, 2018
- **Paper:** [Neural Speech Synthesis with Transformer Network](https://arxiv.org/pdf/1809.08895.pdf)
- **Github:** N/A

### Flowtron
- **Submitted:** May 12, 2020
- **Paper:** [Flowtron: an Autoregressive Flow-based Generative Network for Text-to-Speech Synthesis](https://arxiv.org/pdf/2005.05957.pdf)
- **Github:** [NVIDIA/flowtron](https://github.com/NVIDIA/flowtron)

### FastSpeech2
- **Submitted:** Jun 8, 2020
- **Paper:** [FastSpeech 2: Fast and High-Quality End-to-End Text to Speech](https://arxiv.org/pdf/2006.04558.pdf)
- **Github:** [ming024/FastSpeech2](https://github.com/ming024/FastSpeech2) (Not the official implementation but is the one cited the most)

### FastPitch
- **Submitted:** Jun 11, 2020
- **Paper:** [FastPitch: Parallel Text-to-speech with Pitch Prediction](https://arxiv.org/pdf/2006.06873.pdf)
- **Github:** [NVIDIA/DeepLearningExamples](https://github.com/NVIDIA/DeepLearningExamples/tree/master/PyTorch/SpeechSynthesis/FastPitch)

### TalkNet (1/2)
- **Submitted:** May 12, 2020 / Apr 16, 2021
- **Paper:** [TalkNet: Efficient and Scalable Neural Voice Cloning](https://arxiv.org/pdf/2005.05514.pdf) / [TalkNet 2: End-to-End Speaker Adaptation for High Fidelity and Sample Efficient Text-to-Speech](https://arxiv.org/pdf/2104.08189.pdf)
- **Github:** [NVIDIA/NeMo](https://github.com/NVIDIA/NeMo)

### GlowTTS
- **Submitted:** May 22, 2020
- **Paper:** [Glow-TTS: A Generative Flow for Text-to-Speech via Monotonic Alignment Search](https://arxiv.org/pdf/2005.11129v1.pdf)
- **Github:** [jaywalnut310/glow-tts](https://github.com/jaywalnut310/glow-tts)

### GradTTS (Diffusion TTS)
- **Submitted:** May 13, 2021
- **Paper:** [Grad-TTS: A Diffusion Probabilistic Model for Text-to-Speech](https://arxiv.org/pdf/2105.06337.pdf)
- **Github:** [huawei-noah/Speech-Backbones](https://github.com/huawei-noah/Speech-Backbones/tree/main/Grad-TTS)

### RadTTS
- **Submitted:** Aug 18, 2021
- **Paper:** [RadTTS: Parallel Flow-based TTS with Robust Alignment Learning and Diverse Synthesis](https://openreview.net/pdf?id=0NQwnnwAORi)
- **Github:** [NVIDIA/radtts](https://github.com/NVIDIA/radtts)

### Neural-HMMs
- **Submitted:** Aug 30, 2021
- **Paper:** [Neural HMMs are All You Need (for High-Quality Attention-Free TTS)](https://arxiv.org/abs/2108.13320)
- **Github:** [shivammehta25/Neural-HMM](https://github.com/shivammehta25/Neural-HMM)

### OverFlow
- **Submitted:** Nov 13, 2022
- **Paper:** [OverFlow: A Semi-Autoregressive Approach for Text-to-Speech with Conditional Normalizing Flows](https://arxiv.org/abs/2211.06892)
- **Github:** [shivammehta25/OverFlow](https://github.com/shivammehta25/OverFlow)

### Matcha-TTS
- **Submitted:** Sep 6, 2023
- **Paper:** [Matcha-TTS: A fast TTS architecture with conditional flow matching](https://arxiv.org/abs/2309.03199)
- **Github:** [shivammehta25/Matcha-TTS](https://github.com/shivammehta25/Matcha-TTS)

## Vocoders (Mel-spec to Audio)

### WaveNet
- **Submitted:** Sept 12, 2016
- **Paper:** [WaveNet: A Generative Model for Raw Audio](https://arxiv.org/pdf/1609.03499v2.pdf)
- **Github:** N/A

### WaveGlow
- **Submitted:** Oct 31, 2018
- **Paper:** [WaveGlow: A Flow-based Generative Network for Speech Synthesis](https://arxiv.org/pdf/1811.00002.pdf)
- **Github:** [NVIDIA/waveglow](https://github.com/NVIDIA/waveglow)

### HiFiGAN
- **Submitted:** Oct 12, 2020
- **Paper:** [HiFi-GAN: Generative Adversarial Networks for Efficient and High Fidelity Speech Synthesis](https://arxiv.org/pdf/2010.05646.pdf)
- **Github:** [jik876/hifi-gan](https://github.com/jik876/hifi-gan)

### MixerTTS
- **Submitted:** Oct 7, 2021
- **Paper:** [Mixer-TTS: An FFT-Free Token-Mixing Architecture for Text-to-Speech](https://arxiv.org/pdf/2110.03584.pdf)
- **Github:** [NVIDIA/NeMo](https://github.com/NVIDIA/NeMo)

### VITS
- **Submitted:** Jun 11, 2021
- **Paper:** [VITS: Conditional Variational Autoencoder with Adversarial Learning for End-to-End Text-to-Speech](https://arxiv.org/pdf/2106.06103.pdf)
- **Github:** [jaywalnut310/vits](https://github.com/jaywalnut310/vits)

### STYLER
- **Submitted:** Mar 17, 2021
- **Paper:** [STYLER: Style-Driven Expressive Speech Synthesis with Parallel WaveGAN](https://arxiv.org/pdf/2103.09474.pdf)
- **Github:** [keonlee9420/STYLER](https://github.com/keonlee9420/STYLER)

### TorToiseTTS
- **Submitted:** N/A
- **Paper:** N/A
- **Github:** [neonbjb/tortoise-tts](https://github.com/neonbjb/tortoise-tts)

### DiffTTS (DiffSinger)
- **Submitted:** Apr 3, 2021
- **Paper:** [DiffSinger: Singing Voice Synthesis via Shallow Diffusion Mechanism](https://arxiv.org/pdf/2104.01409v1.pdf)
- **Github:** [keonlee9420/DiffSinger](https://github.com/keonlee9420/DiffSinger)

## Uncategorised / Unevaluated

### eSpeak
- **Submitted:** N/A
- **Paper:** [eSpeak: Text to Speech Synthesizer](https://arxiv.org/abs/2305.15255.pdf)
- **Github:** [espeak-ng/espeak-ng](https://github.com/espeak-ng/espeak-ng)

### CMU Flite TTS
- **Submitted:** N/A
- **Paper:** [Flite: A Small Fast Run-Time Synthesis Engine](https://www.cs.cmu.edu/~awb/Papers/ISCA01/flite/flite.html)
- **Github:** [festvox/flite](https://github.com/festvox/flite)

### MaryTTS
- **Submitted:** N/A
- **Paper:** [MaryTTS: An Open-Source Text-to-Speech Synthesis System](https://arxiv.org/abs/1712.04787.pdf)
- **Github:** [marytts/marytts](https://github.com/marytts/marytts)

### Mimic 3
- **Note:** Don’t get mixed with MIMIC-III, a medical database.
- **Submitted:** N/A
- **Paper:** N/A
- **Github:** [MycroftAI/mimic3](https://github.com/MycroftAI/mimic3)

### MBROLA
- **Submitted:** N/A
- **Paper:** [MBROLA: A Speech Synthesis System Based on a Harmonic-Stochastic Model](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=7b1fdadf05b8f968a5b361f6f82852ade62c8010)
- **Github:** [numediart/MBROLA](https://github.com/numediart/MBROLA)

### SpeechT5
- **Submitted:** Oct 14, 2021
- **Paper:** [SpeechT5: Unified-Modal Speech Pre-Training for Spoken Language Processing](https://arxiv.org/abs/2110.07205)
- **Github:** [microsoft/SpeechT5](https://github.com/microsoft/SpeechT5)

### SpeechBrain
- **Submitted:** N/A
- **Paper:** N/A
- **Github:** [speechbrain/speechbrain](https://github.com/speechbrain/speechbrain)
- **Website:** [SpeechBrain](https://speechbrain.github.io/)


## Credits

/u/M4xM9450’s comment on the topic of open source TTS models.


## Reference
- [google docs(v:2024-06-20)](https://docs.google.com/document/d/1sariO32u4a87vfZDzAR-fq2RwuZ_zxBj29vMG8UFH2s/edit#heading=h.oa4e2lvzqfhc)
- [reddit-comments](https://www.reddit.com/r/MachineLearning/comments/12kjof5/d_what_is_the_best_open_source_text_to_speech/)