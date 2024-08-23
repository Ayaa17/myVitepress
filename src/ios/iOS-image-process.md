---
icon: pen-to-square
date: 2024-08-23
category:
  - iOS
tag:
  - ios
---

# iOS UIImage 影像處理

在 iOS 的 Swift 中，影像處理可以通過多種方式進行，以下是一些常用的方法和工具：

1. `UIGraphicsBeginImageContext` : 雖然主要用於創建繪圖上下文和進行圖形繪製和相關的上下文操，但這些操作可以看作是影像處理的一部分，尤其是在需要生成自訂圖像或進行圖像合成時。讓你可以進行以下操作：

   1. **自訂繪圖**: 可以在上下文中進行自訂繪圖，例如繪製形狀、文字、圖像等，並生成新的圖像。這些操作涉及基本的影像處理，如填充顏色、繪製圖形等。

   2. **合成圖像**: 通過將不同的圖形或圖像合成在一起，可以創建複雜的圖像。這種合成技術在影像處理中非常常見，例如將標籤、圖標添加到圖像上。

   3. **裁剪和縮放**: 可以在上下文中對圖像進行裁剪、縮放等操作，這些都是常見的影像處理技術。

   4. **轉換格式**: 當你從上下文中生成 `UIImage` 時，實際上也是進行了格式轉換和圖像的編碼處理。

1. `CoreImage` : Core Image 是 Apple 提供的一個強大影像處理框架。它允許你應用各種濾鏡和效果，進行圖像修正和變換。Core Image 支持高效的 GPU 加速。
   常見的濾鏡包括模糊、銳化、色彩調整等。你可以使用 CIFilter 來應用這些濾鏡。

## UIGraphics sample code

### resize

創建一個 width x height 像素的圖形上下文，在其中繪製圖片，然後生成一個 UIImage。

```swift
func resizeUIImage(
        image:UIImage,
        width:Int,
        height:Int
    ) -> UIImage? {
        let targetSize = CGSize(
            width: width,
            height: height
        )
        UIGraphicsBeginImageContextWithOptions(
            targetSize,
            false,
            1.0
        )
        image.draw(
            in: CGRect(
                origin: .zero,
                size: targetSize
            )
        )
        let resizedImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return resizedImage
    }
```

### add alpha channel

為原圖添加 Alpha

```swift
func imageAddMask(oriImage:UIImage, mask:Data ) -> UIImage? {
        guard let cgImage = oriImage.cgImage else { return nil }

        let floatArray: [Float] = mask.withUnsafeBytes { Array(UnsafeBufferPointer<Float>(start: $0.bindMemory(to: Float.self).baseAddress!, count: mask.count / MemoryLayout<Float>.size)) }


        let width = cgImage.width
        let height = cgImage.height

        // 1. 建立一個圖像上下文
        UIGraphicsBeginImageContext(oriImage.size)

        // 2. 繪製原始影像
        oriImage.draw(in: CGRect(origin:.zero,size:CGSize(width:width,height:height)))

        // 3. 取得上下文
        guard let context = UIGraphicsGetCurrentContext() else { return nil }

        // 4. 取得像素點
        guard let pixelData = context.data else { return nil }

        let data = pixelData.bindMemory(to: UInt8.self, capacity: width * height * 4) // RGBA

        for y in 0..<height {
            for x in 0..<width {
                let index = (y * width + x)
                let alphaValue = CGFloat(floatArray[index])
                data[index * 4 + 3] = UInt8(alphaValue * 255)
            }
        }

        // 7. 取得合成影像
        let modifiedImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()

        return modifiedImage
    }
```

### Notice

在特殊情況時，需要自訂義 context 參數

Sample:

```swift
import UIKit

// 假設圖片的大小是 1175 x 1755
let width = 1175
let height = 1755

// 產生一個範例的 floatArray，範圍在 0.0 到 1.0 之間
var floatArray: [Float] = Array(repeating: 1.0, count: width * height) // 這裡的值可以根據你的需求設定

// 載入原始圖片
guard let inputImage = UIImage(named: "example.jpg") else {
    fatalError("无法加载图片")
}

// 建立圖像上下文
let colorSpace = CGColorSpaceCreateDeviceRGB()
let bitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.premultipliedLast.rawValue)
let bytesPerPixel = 4
let bytesPerRow = bytesPerPixel * width
let bitmapData = UnsafeMutableRawPointer.allocate(byteCount: height * bytesPerRow, alignment: MemoryLayout<UInt8>.alignment)

guard let context = CGContext(
    data: bitmapData,
    width: width,
    height: height,
    bitsPerComponent: 8,
    bytesPerRow: bytesPerRow,
    space: colorSpace,
    bitmapInfo: bitmapInfo.rawValue) else {
    fatalError("無法建立圖形上下文")
}

// 將圖像繪製到上下文中
context.draw(inputImage.cgImage!, in: CGRect(x: 0, y: 0, width: width, height: height))

// 取得像素資料指針
let pixelBuffer = context.data!.bindMemory(to: UInt8.self, capacity: width * height * 4) // RGBA

// 遍歷每個像素，並修改 alpha 通道
for y in 0..<height {
    for x in 0..<width {
        let pixelIndex = (y * width + x) * bytesPerPixel
        let alphaValue = UInt8(floatArray[y * width + x] * 255) // 將 floatArray 的值轉換為 0-255 的 alpha 值
        pixelBuffer[pixelIndex + 3] = alphaValue // 修改 alpha 通道
    }
}

// 建立新的 CGImage
guard let cgImage = context.makeImage() else {
 fatalError("無法創建 CGImage")
}

// 將新的 CGImage 轉換為 UIImage
let finalImage = UIImage(cgImage: cgImage)

// 顯示處理後的圖像
let imageView = UIImageView(image: finalImage)
imageView.frame = CGRect(x: 0, y: 0, width: 300, height: 300)

```

## Core Image

### resize

```swift
import UIKit
import CoreImage

func resizeImage(image: UIImage, targetSize: CGSize) -> UIImage? {
    // 創建 CIImage 從輸入 UIImage
    guard let ciImage = CIImage(image: image) else { return nil }

    // 計算縮放比例
    let scaleX = targetSize.width / image.size.width
    let scaleY = targetSize.height / image.size.height

    // 創建 CILanczosScaleTransform filter
    let filter = CIFilter(name: "CILanczosScaleTransform")!
    filter.setValue(ciImage, forKey: kCIInputImageKey)
    filter.setValue(scaleX, forKey: kCIInputScaleKey)
    filter.setValue(1.0, forKey: kCIInputAspectRatioKey)

    // 獲取處理後的輸出 CIImage
    guard let outputCIImage = filter.outputImage else { return nil }

    // 創建 CIContext
    let context = CIContext()

    // 生成 UIImage 從處理後的 CIImage
    guard let cgImage = context.createCGImage(outputCIImage, from: outputCIImage.extent) else { return nil }

    return UIImage(cgImage: cgImage)
}

```

使用示例

```swift
if let originalImage = UIImage(named: "example.png") {
    let resizedImage = resizeImage(image: originalImage, targetSize: CGSize(width: 200, height: 200))
    // 使用 resizedImage
}
```
