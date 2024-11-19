---
icon: pen-to-square
date: 2024-11-14
category:
  - AI
tag:
  - convert
  - tool
---

# PyTorch 模型轉 ONNX 

## 前置準備
1. 安裝 PyTorch 和 ONNX 支援的工具：
   ```bash
   pip install torch onnx
   ```

## 範例代碼
這段範例程式碼示範如何將一個 PyTorch 模型轉換成 ONNX 格式。

```python
import torch
import torch.onnx as onnx

# 假設已有一個訓練好的 PyTorch 模型
model = ...  # 載入您的模型，例如 model = MyModel()
model.eval()  # 設定為評估模式，避免加入隨機性

# 定義模型輸入的範例張量（必須與模型的輸入形狀一致）
dummy_input = torch.randn(1, 3, 224, 224)  # 範例輸入，可根據模型需求調整形狀

# 將模型轉換成 ONNX 格式
onnx_file_path = "model.onnx"
torch.onnx.export(
    model,                    # torch.nn.Module
    dummy_input,              # 模型輸入範例 -> (image, mask)
    onnx_file_path,           # ONNX 文件的輸出路徑
    export_params=True,       # 儲存模型的參數
    opset_version=11,         # 選擇 ONNX opset 版本，11 是常用版本之一
    do_constant_folding=True, # 啟用常數折疊以減少計算量
    input_names=['input'],    # 設定輸入節點名稱，可依需要更改 -> ex:兩個input: input_names=['input_1', 'input_2']

    output_names=['output']   # 設定輸出節點名稱
)

print(f"ONNX 模型已儲存至：{onnx_file_path}")
```

## 參數說明
- **`model`**： PyTorch 模型。
- **`dummy_input`**：一個範例輸入，用於定義模型的輸入形狀。
- **`onnx_file_path`**：儲存 ONNX 模型的檔案路徑。
- **`export_params`**：設定為 `True` 以包含模型參數。
- **`opset_version`**：指定 ONNX opset 版本，通常使用 11 或 13。
- **`do_constant_folding`**：啟用常數折疊優化。
- **`input_names` 和 `output_names`**：設定 ONNX 模型的輸入與輸出名稱，便於後續操作。

## 檢查轉換結果
可以用 `onnx` 來驗證模型是否成功轉換。

```python
import onnx

# 載入並檢查模型
onnx_model = onnx.load(onnx_file_path)
onnx.checker.check_model(onnx_model)
print("ONNX 模型檢查通過，轉換成功！")
```


## Reference
[sample - lama/export_LaMa_to_onnx.ipynb](https://github.com/advimman/lama/blob/a4e2c0a7a53f83fdeb8785773980ca95aa69663e/export_LaMa_to_onnx.ipynb)