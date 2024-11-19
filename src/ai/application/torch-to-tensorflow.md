---
icon: pen-to-square
date: 2024-11-14
category:
  - AI
tag:
  - convert
  - tool
---

# PyTorch 模型轉換成 TensorFlow 

## 透過 onnx -> TensorFlow

### 前置準備
1. 安裝必需的套件：
   ```bash
   pip install torch onnx tf2onnx tensorflow
   ```

### 步驟 1：將 PyTorch 模型轉換成 ONNX 格式

首先，將 PyTorch 模型導出為 ONNX 格式。

```python
import torch
import torch.onnx as onnx

# 假設已有訓練好的 PyTorch 模型
model = ...  # 載入您的模型
model.eval()  # 設為評估模式，避免隨機性

# 定義範例輸入，用於導出模型的結構
dummy_input = torch.randn(1, 3, 224, 224)  # 根據模型需求調整形狀

# 將模型保存為 ONNX 格式
onnx_file_path = "model.onnx"
torch.onnx.export(
    model,
    dummy_input,
    onnx_file_path,
    export_params=True,
    opset_version=11,
    do_constant_folding=True,
    input_names=['input'],
    output_names=['output']
)
print(f"ONNX 模型已保存至：{onnx_file_path}")
```

### 步驟 2：將 ONNX 模型轉換成 TensorFlow 格式

在這一步，我們將使用 `onnx2tf` 將 ONNX 模型轉換為 TensorFlow 格式。

#### install requirements:

    ``` bash
    !pip install onnx2tf
    !pip install onnx==1.16.1
    !pip install onnxruntime==1.18.1
    !pip install onnx-simplifier==0.4.30
    !pip install onnx_graphsurgeon
    !pip install simple_onnx_processing_tools
    !pip install psutil==5.9.5
    !pip install ml_dtypes==0.4.0
    !pip install flatbuffers
    ```

#### convert

```python
from onnx2tf import convert

# 指定模型轉換參數
input_path = "model.onnx"
output_path = "saved_model"

# 進行轉換
convert(input_path=input_path, output_path=output_path)

```

or `Run in bash`

```bash
python onnx2tf -i model.onnx -o saved_model
```

### 步驟 3：驗證 TensorFlow 模型的輸出

載入已保存的 TensorFlow 模型，並使用範例輸入進行推理，以確認模型轉換是否成功。

```python
# 載入 TensorFlow 模型
loaded_model = tf.saved_model.load(tf_model_path)

# 使用範例輸入進行推理
dummy_input_tf = tf.random.normal([1, 224, 224, 3])  # 根據模型輸入形狀調整
output = loaded_model(dummy_input_tf)
print("TensorFlow 模型輸出：", output)
```


## 透過 ai-edge-torch -> TensorFlow

[colab sample](https://github.com/google-ai-edge/ai-edge-torch/blob/main/docs/pytorch_converter/getting_started.ipynb)

### 安裝 ai-edge-torch

``` bash
!pip install -r https://raw.githubusercontent.com/google-ai-edge/ai-edge-torch/main/requirements.txt
!pip install ai-edge-torch-nightly
```

### Convert to tflite

```python
print('load model')

# load mode here
# model = ....

image = torch.rand(1, 512, 512, 3)
mask = torch.rand(1, 512, 512, 1)
sample_args = (image, mask,)

print('ai_edge_torch.convert...')
edge_model = ai_edge_torch.convert(model, sample_args)

print('ai_edge_model.export...')
edge_model.export(f'model.tflite')
```

### Note
如果需要tensorflow model
可以改 `torch_xla_utils`.merged_bundle_to_tfl_model(...) 

## Reference
- [google-ai-edge/ai-edge-torch](https://github.com/google-ai-edge/ai-edge-torch)
- [PINTO0309/onnx2tf](https://github.com/PINTO0309/onnx2tf)
