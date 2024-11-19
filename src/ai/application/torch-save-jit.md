---
icon: pen-to-square
date: 2024-11-14
category:
  - AI
tag:
  - convert
  - tool
---

# 將 PyTorch 模型保存為 TorchScript（JIT）格式

## 前置準備
1. 確保 PyTorch 已安裝。
   ```bash
   pip install torch
   ```

## 使用 TorchScript 保存模型

在 PyTorch 中，有兩種方式可以將模型保存為 TorchScript 格式：`trace` 和 `script`。一般來說，如果模型包含條件語句或迴圈結構，建議使用 `torch.jit.script`。否則，可以使用 `torch.jit.trace` 來簡化過程。

## 範例代碼

### 方法 1：使用 `torch.jit.trace`
如果模型輸入和結構是固定的，`torch.jit.trace` 是更簡單的方式。

```python
import torch

# 假設已有一個訓練好的 PyTorch 模型
model = ...  # 載入您的模型，例如 model = MyModel()
model.eval()  # 設定為評估模式

# 定義模型的範例輸入，用於追蹤模型結構
dummy_input = torch.randn(1, 3, 224, 224)  # 根據模型需求調整輸入形狀

# 使用 torch.jit.trace 將模型保存為 TorchScript 格式
traced_model = torch.jit.trace(model, dummy_input)
traced_model.save("model_traced.pt")

print("模型已保存為 model_traced.pt")
```

### 方法 2：使用 `torch.jit.script`
若模型包含條件或動態結構，使用 `torch.jit.script` 可以保持靈活性。

```python
import torch

# 假設已有一個訓練好的 PyTorch 模型
model = ...  # 載入您的模型
model.eval()

# 使用 torch.jit.script 將模型保存為 TorchScript 格式
scripted_model = torch.jit.script(model)
scripted_model.save("model_scripted.pt")

print("模型已保存為 model_scripted.pt")
```

## 選擇 `trace` 還是 `script`
- **`torch.jit.trace`**：適合用於靜態結構的模型，不包含分支結構或迴圈。
- **`torch.jit.script`**：適合動態結構模型，能處理分支與迴圈。

## 加載與使用已保存的 TorchScript 模型
保存後，可以輕鬆地重新加載模型並執行推理：

```python
# 加載保存的 TorchScript 模型
loaded_model = torch.jit.load("model_traced.pt")  # 或 "model_scripted.pt"
loaded_model.eval()

# 使用模型進行推理
output = loaded_model(dummy_input)
print(output)
```

## 建立 PyTorch 模型的 Wrapper(Optional)
在 PyTorch 中，您可以用 Wrapper 封裝模型，以便進行額外處理、設定預處理/後處理步驟，或者將不同的模組組合在一起。以下是一個簡單的範例說明如何建立一個 Wrapper 類別來包裝 PyTorch 模型。


### 目的
- 可以進行輸入預處理和輸出後處理。
- 管理不同的模型輸入和輸出格式。
- 將多個模型組合成一個模組。

### Wrapper 範例代碼

假設您有一個圖像分類模型，並希望自動對輸入進行標準化，並對模型輸出進行後處理（例如轉成標籤名稱）。

```python
import torch
import torch.nn as nn
import torchvision.transforms as transforms

# 假設已經有一個訓練好的模型
class MyModelWrapper(nn.Module):
    def __init__(self, model, class_names):
        super(MyModelWrapper, self).__init__()
        self.model = model
        self.class_names = class_names

        # 定義輸入的預處理變換
        self.preprocess = transforms.Compose([
            transforms.Resize((224, 224)),  # 調整圖片大小
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])

    def forward(self, x):
        # 進行預處理
        x = self.preprocess(x)
        x = x.unsqueeze(0)  # 增加批次維度，適合 batch = 1 的情況

        # 執行模型推理
        output = self.model(x)
        
        # 後處理：轉換為類別名稱
        _, predicted = torch.max(output, 1)
        label = self.class_names[predicted.item()]
        
        return label

# 模擬載入訓練好的模型和類別名稱
model = ...  # 這裡放入您訓練好的模型
class_names = ["cat", "dog", "bird"]  # 假設有三個類別

# 將模型包裝進 Wrapper
wrapped_model = MyModelWrapper(model, class_names)

# 使用 Wrapper 模型進行推理
from PIL import Image
image = Image.open("path_to_your_image.jpg")  # 讀入圖像

output_label = wrapped_model(image)
print(f"預測類別：{output_label}")
```

### 代碼說明
- **`__init__`**：初始化時傳入了預訓練模型和類別名稱列表。
- **`self.preprocess`**：定義了圖像的預處理步驟，包括縮放、轉成張量和標準化。
- **`forward`**：封裝推理流程，包含預處理、模型推理和後處理。
  
這樣，`MyModelWrapper` 可以直接處理輸入圖像並返回標籤名稱，簡化了推理過程。