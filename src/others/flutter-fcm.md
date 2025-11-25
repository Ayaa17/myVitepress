---
icon: pen-to-square
date: 2025-11-12
category:
  - Others
tag:
  - flutter
---

# 🚀 Flutter 專案導入 Firebase Cloud Messaging (FCM) 教學

本指南將分步帶您完成在 Flutter 應用程式中設置 Firebase Cloud Messaging (FCM) 的過程，涵蓋 Android 和 Dart (Flutter) 兩個部分。

## 前提條件

1.  一個已設置並連結到 Firebase 專案的 Flutter 應用。
2.  已安裝並配置 Flutter 開發環境。
3.  已在 Firebase Console 下載 `google-services.json` 文件。

---

## 第一步：Android 端配置

### 1\. 放置配置文件

將您從 Firebase Console 下載的 `google-services.json` 文件放置到 Android 專案的特定目錄下：

`your_flutter_project/android/app/google-services.json`

### 2\. 配置 Project 級別 Gradle (Kotlin DSL - .kts)

打開 `android/build.gradle.kts` 文件，在 `plugins` 區塊中添加 Google Services 插件的聲明。

```kotlin
// file: android/build.gradle.kts

plugins {
    // 保持原有的插件聲明，如 Android/Kotlin 插件
    id("com.android.application") version "8.1.1" apply false
    id("org.jetbrains.kotlin.android") version "1.9.0" apply false

    // 👇 聲明 Google Services Gradle 插件
    id("com.google.gms.google-services") version "4.4.1" apply false // ⚠️ 檢查最新版本號
}

// ... 保持您原有的其他配置 ...
```

### 3\. 配置 App 級別 Gradle (Kotlin DSL - .kts)

打開 `android/app/build.gradle.kts` 文件，在 `plugins` 區塊中**應用** Google Services 插件。

```kotlin
// file: android/app/build.gradle.kts

plugins {
    // 應用其他必要的插件
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("dev.flutter.flutter-gradle-plugin")

    // 👇 應用 Google Services 插件
    id("com.google.gms.google-services")
}
```

## 💻 第二步：Flutter 端配置與初始化

### 1\. 添加依賴

打開 `pubspec.yaml` 文件，在 `dependencies` 區塊中添加 `firebase_core` 和 `firebase_messaging` 插件。

```yaml
# file: pubspec.yaml

dependencies:
  flutter:
    sdk: flutter

  firebase_messaging: ^14.7.14 # ⚠️ 檢查最新版本號
```

執行命令下載依賴：

```bash
flutter pub get
```

### 2\. 設置 Firebase 初始化

由於 FCM 依賴於 Firebase Core，您需要在應用啟動時初始化 Firebase。

> **💡 提示：** 建議使用 `flutterfire configure` 命令來自動生成 `lib/firebase_options.dart` 文件，以確保配置正確。

打開您的主文件 (`lib/main.dart`)，進行以下修改：


```dart
# main.dart

import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_highlight/presentation/pages/fcm_test_page.dart';

Future<void> _firebaseBackgroundHandler(RemoteMessage message) async {
  print("🔹 背景通知: ${message.messageId}");
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(_firebaseBackgroundHandler);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const FcmTestPage(),
    );
  }
}

```

```dart
# fcm_test_page.dart

import 'package:flutter/material.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

class FcmTestPage extends StatefulWidget {
  const FcmTestPage({super.key});

  @override
  State<FcmTestPage> createState() => _FcmTestPageState();
}

class _FcmTestPageState extends State<FcmTestPage> {
  String? _token;
  String _message = "尚未收到通知";

  @override
  void initState() {
    super.initState();
    // print("getToken: ${FirebaseMessaging.instance.getToken()}");

    _initFCM();
  }

  Future<void> _initFCM() async {
    // iOS 要求通知權限
    await FirebaseMessaging.instance.requestPermission();

    // 取得 Token
    _token = await FirebaseMessaging.instance.getToken();
    print("✅ FCM Token: $_token");
    setState(() {});

    // 前景通知
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      setState(() {
        _message = message.notification?.title ?? "收到通知";
      });
      print("📩 前景通知: ${message.notification?.title}");
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("FCM 測試頁")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("✅ FCM Token："),
            SelectableText(_token ?? "取得中..."),
            const SizedBox(height: 20),
            const Text("✅ 最新收到的通知："),
            Text(
              _message,
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
    );
  }
}


```
---

## 🧪 第三步：測試

1.  **運行應用：** 將您的 Flutter 應用程式運行到真實的 Android 設備或模擬器上。
2.  **獲取 Token：** 查看控制台輸出的 **FCM Token**。
3.  **發送測試通知：**
    - 進入 Firebase Console。
    - 選擇 **Engage** -\> **Messaging**。
    - 點擊 **First campaign** -\> **Firebase Notification messages**。
    - 填寫標題和內容，然後在 **Send test message** 中輸入您獲取的 FCM Token 進行發送測試。

如果一切設置正確，您應該能夠根據 App 的狀態（前景、後台、終止）接收並處理通知。

## Referece
- [firebase cloud-messaging ](https://firebase.google.com/docs/cloud-messaging/get-started?platform=android&hl=zh-TW&authuser=6&_gl=1*11bxwtp*_ga*MTQwMzkyODY0MC4xNzY0MDMwMzU3*_ga_CW55HF8NVT*czE3NjQwNTE0NjMkbzIkZzEkdDE3NjQwNTYxODQkajI5JGwwJGgw#retrieve-the-current-registration-token)

- [Firebase Console - Google](https://console.firebase.google.com/)