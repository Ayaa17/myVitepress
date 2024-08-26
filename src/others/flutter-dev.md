---
icon: pen-to-square
date: 2024-08-09
category:
  - Others
tag:
  - flutter
---

# Flutter development records

## log 紀錄

對於更複雜的應用，建議使用 logger package，它提供了更多功能，例如不同級別的日志記錄、格式化、輸出到文件等。
`Logger` package：

1. **安裝 logger**：

   ```yaml
   dependencies:
   logger: ^1.2.2
   ```

1. **實現代碼** :

   ```dart
   import 'package:logger/logger.dart';

   var logger = Logger();

   logger.d("Debug message");
   logger.i("Info message");
   logger.w("Warning message");
   logger.e("Error message");
   ```

1. **控制日志输出** : 在 Flutter 中，使用 Logger 或其他類似的日誌工具時，預設日誌不會在發布（release）模式下消失，但你可以透過設定日誌記錄行為來控制日誌在不同建置模式下的輸出。

- 使用 kReleaseMode 進行判斷 :
  在 Dart 中，你可以使用 kReleaseMode 來偵測套用是否處於 release 模式，然後基於此條件來決定是否要記錄日誌。使用

      ```dart
      import 'package:flutter/foundation.dart';
      import 'package:logger/logger.dart';

          var logger = Logger(
          level: kReleaseMode ? Level.warning : Level.debug,
          );
      ```

      在上述程式碼中，在 release 模式下，日誌的等級被設定為 Level.warning，因此僅有警告或更高優先順序的日誌會被記錄。

## 圖片讀取

可以使用 Flutter 的 Image Widget 來顯示圖像，並使用 file_picker 或 image_picker 插件來打開圖像檔案。

1. **添加必要的依賴** : 需要在 pubspec.yaml 文件中添加必要的依賴項，比如 file_picker 或 image_picker

   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     file_picker: ^5.2.1
     # 或者你可以選擇使用 image_picker
     image_picker: ^1.0.0
   ```

1. **實現代碼** : 以下是使用 file_picker 打開並顯示本地圖像的範例代碼

   ```dart
   import 'package:file_picker/file_picker.dart';
   import 'dart:io';
   import 'package:logger/logger.dart';

   class ImagePickerScreen extends StatefulWidget {
   const ImagePickerScreen({super.key});

   @override
   _ImagePickerScreenState createState() => _ImagePickerScreenState();
   }

   class _ImagePickerScreenState extends State<ImagePickerScreen> {
   File? _image;
   Uint8List? _imageBytes;

       Future<void> _pickImage() async {
           // 使用 file_picker 選擇圖像文件
           FilePickerResult? result = await FilePicker.platform.pickFiles(
           type: FileType.image,
           );

           if (result != null) {
           if (kIsWeb) {
               // 處理 Web 平台的情況
               // Web 平台不支持 File 路徑
               logger.d(
                   'Selected file name: ${result.files.single.name}, Web platform does not support file paths.');

               setState(() {
               _imageBytes = result.files.single.bytes;
               });
           } else {
               // 處理其他平台
               final path = result.files.single.path;
               if (path != null) {
               setState(() {
                   _image = File(path);
               });
               } else {
               logger.d('Selected file path is null');
               }
           }
           } else {
           // 用戶取消了文件選擇
           logger.d('No image selected.');
           }
       }

       @override
       Widget build(BuildContext context) {
           return Scaffold(
           appBar: AppBar(
               title: Text('Image Picker'),
           ),
           body: Center(
               child: _imageBytes != null
                   ? Image.memory(_imageBytes!) // 在 Web 平台上顯示圖片
                   : _image != null
                       ? Image.file(_image!) // 在移動或桌面平台上顯示圖片
                       : Text('No image selected.'),
           ),
           floatingActionButton: FloatingActionButton(
               onPressed: _pickImage,
               child: Icon(Icons.add_a_photo),
           ),
           );
       }
   }

   ```

## Bytearray -> Float32List Android 平台處理

使用 Float32List 來處理浮點數的數據。如果您的 Android 端返回的是一個 bytearray，您需要將其轉換為 Float32List。以下是如何進行串接的步驟：

1. **Android 端** : 在 Android 端確保您將`float array`轉換為`byte array`。您可以使用`ByteBuffer`來實現這一點：

   ```java
   import java.nio.ByteBuffer;

   public byte[] floatArrayToByteArray(float[] floatArray) {
       ByteBuffer byteBuffer = ByteBuffer.allocate(floatArray.length * 4); // 4 bytes per float
       for (float f : floatArray) {
           byteBuffer.putFloat(f);
       }
       return byteBuffer.array();
   }
   ```

2. **Flutter 端** : 在 Flutter 端，您需要從 Android 端接收這個`bytearray`，並將其轉換為`Float32List`。假設您使用的是`MethodChannel`來進行通訊：

   ```dart
   import 'dart:typed_data';
   import 'package:flutter/services.dart';

   class FloatArrayReceiver {
   static const platform = MethodChannel('your_channel_name');

   Future<Float32List> getFloatArray() async {
       try {
       final List<dynamic> byteArray = await platform.invokeMethod('getFloatArray');

       // 將 List<dynamic> 轉換為 Uint8List
       Uint8List uint8List = Uint8List.fromList(byteArray.cast<int>());

       // 將 Uint8List 轉換為 Float32List
       Float32List float32List = Float32List.view(uint8List.buffer);

       return float32List;
       } on PlatformException catch (e) {
       print("Failed to get float array: '${e.message}'.");
       return Float32List(0); // 返回空的 Float32List
       }
   }
   }
   ```

3. **Android 端的 MethodChannel 實現** : 確保在 Android 端正確設置`MethodChannel`來返回`bytearray`：

   ```java
   import io.flutter.embedding.engine.FlutterEngine;
   import io.flutter.plugin.common.MethodChannel;

   public class MainActivity extends FlutterActivity {
       private static final String CHANNEL = "your_channel_name";

       @Override
       public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
           super.configureFlutterEngine(flutterEngine);
           new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL)
               .setMethodCallHandler(
                   (call, result) -> {
                       if (call.method.equals("getFloatArray")) {
                           float[] floatArray = {1, 512, 512, 1}; // Your float array
                           byte[] byteArray = floatArrayToByteArray(floatArray);
                           // 將 byteArray 轉換為 List<Integer> 並返回
                           List<Integer> intList = new ArrayList<>();
                           for (byte b : byteArray) {
                               intList.add((int) b);
                           }
                           result.success(intList);
                       } else {
                           result.notImplemented();
                       }
                   }
               );
       }
   }
   ```

4. **References** : [一篇看懂 android 与 flutter 之间的通信](https://leetcode.jp/%E4%B8%80%E7%AF%87%E7%9C%8B%E6%87%82android%E4%B8%8Eflutter%E4%B9%8B%E9%97%B4%E7%9A%84%E9%80%9A%E4%BF%A1/)

## Flutter .gitignore

```sh
# Do not remove or rename entries in this file, only add new ones
# See https://github.com/flutter/flutter/issues/128635 for more context.

# Miscellaneous
*.class
*.lock
*.log
*.pyc
*.swp
.DS_Store
.atom/
.buildlog/
.history
.svn/

# IntelliJ related
*.iml
*.ipr
*.iws
.idea/

# Visual Studio Code related
.classpath
.project
.settings/
.vscode/*

# Flutter repo-specific
/bin/cache/
/bin/internal/bootstrap.bat
/bin/internal/bootstrap.sh
/bin/mingit/
/dev/benchmarks/mega_gallery/
/dev/bots/.recipe_deps
/dev/bots/android_tools/
/dev/devicelab/ABresults*.json
/dev/docs/doc/
/dev/docs/api_docs.zip
/dev/docs/flutter.docs.zip
/dev/docs/lib/
/dev/docs/pubspec.yaml
/dev/integration_tests/**/xcuserdata
/dev/integration_tests/**/Pods
/packages/flutter/coverage/
version
analysis_benchmark.json

# packages file containing multi-root paths
.packages.generated

# Flutter/Dart/Pub related
**/doc/api/
.dart_tool/
.flutter-plugins
.flutter-plugins-dependencies
**/generated_plugin_registrant.dart
.packages
.pub-preload-cache/
.pub-cache/
.pub/
build/
flutter_*.png
linked_*.ds
unlinked.ds
unlinked_spec.ds

# Android related
**/android/**/gradle-wrapper.jar
.gradle/
**/android/captures/
**/android/gradlew
**/android/gradlew.bat
**/android/local.properties
**/android/**/GeneratedPluginRegistrant.java
**/android/key.properties
*.jks

# iOS/XCode related
**/ios/**/*.mode1v3
**/ios/**/*.mode2v3
**/ios/**/*.moved-aside
**/ios/**/*.pbxuser
**/ios/**/*.perspectivev3
**/ios/**/*sync/
**/ios/**/.sconsign.dblite
**/ios/**/.tags*
**/ios/**/.vagrant/
**/ios/**/DerivedData/
**/ios/**/Icon?
**/ios/**/Pods/
**/ios/**/.symlinks/
**/ios/**/profile
**/ios/**/xcuserdata
**/ios/.generated/
**/ios/Flutter/.last_build_id
**/ios/Flutter/App.framework
**/ios/Flutter/Flutter.framework
**/ios/Flutter/Flutter.podspec
**/ios/Flutter/Generated.xcconfig
**/ios/Flutter/ephemeral
**/ios/Flutter/app.flx
**/ios/Flutter/app.zip
**/ios/Flutter/flutter_assets/
**/ios/Flutter/flutter_export_environment.sh
**/ios/ServiceDefinitions.json
**/ios/Runner/GeneratedPluginRegistrant.*

# macOS
**/Flutter/ephemeral/
**/Pods/
**/macos/Flutter/GeneratedPluginRegistrant.swift
**/macos/Flutter/ephemeral
**/xcuserdata/

# Windows
**/windows/flutter/ephemeral/
**/windows/flutter/generated_plugin_registrant.cc
**/windows/flutter/generated_plugin_registrant.h
**/windows/flutter/generated_plugins.cmake

# Linux
**/linux/flutter/ephemeral/
**/linux/flutter/generated_plugin_registrant.cc
**/linux/flutter/generated_plugin_registrant.h
**/linux/flutter/generated_plugins.cmake

# Coverage
coverage/

# Symbols
app.*.symbols

# Exceptions to above rules.
!**/ios/**/default.mode1v3
!**/ios/**/default.mode2v3
!**/ios/**/default.pbxuser
!**/ios/**/default.perspectivev3
!/packages/flutter_tools/test/data/dart_dependencies_test/**/.packages
!/dev/ci/**/Gemfile.lock
!.vscode/settings.json
```

**References** : [github - flutter/flutter](https://github.com/flutter/flutter/blob/master/.gitignore)

## Flutter 更改 project name

1. 項目內安裝 rename 包 :

   在 pubspec.yaml 文件中添加 rename 到 dev_dependencies：

   ```yaml
   dev_dependencies:
     rename: ^2.0.1
   ```

   執行安裝

   ```bash
   flutter pub get
   ```

2. 使用 `rename` 更改應用名稱及包名:

   更改應用名稱:

   ```bash
   flutter pub run rename --appname "new name"
   ```

   更改包名:

   ```bash
   flutter pub run rename --bundleId com.newname.app
   ```

3. 修改個平台 hardcode 值


4. 清理並重新建構項目:

   更改完成後，運行以下命令清理和重新建構項目：

   ```bash
   flutter clean
   flutter pub get
   flutter run
   ```
