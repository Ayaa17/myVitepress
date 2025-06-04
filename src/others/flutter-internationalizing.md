---
icon: pen-to-square
date: 2025-06-04
category:
  - Others
tag:
  - flutter
---

以下是根據 Flutter 官方文件中「」的說明，整理出的一個典型國際化（locale）實作流程，並以 Markdown 格式呈現，便於閱讀與使用：

---

# Flutter 國際化（Internationalization）實作流程

## 1. 匯入依賴

在 `pubspec.yaml` 中加入以下依賴：

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  intl: ^0.18.0
```

**intl 版本須根據 flutter_localizations 限制**

## 2. 建立國際化資源（使用 `arb` 檔案）

在 `lib/l10n/` 資料夾中建立語系檔案，例如：

```text
lib/l10n/app_en.arb
lib/l10n/app_zh.arb
```

### 範例內容 `app_en.arb`

```json
{
  "title": "Hello",
  "@title": {
    "description": "The application title"
  }
}
```

### 範例內容 `app_zh.arb`

```json
{
  "title": "你好",
  "@title": {
    "description": "應用程式的標題"
  }
}
```

## 3. 建立設定檔 `l10n.yaml`（可選）

在專案根目錄新增：

```yaml
arb-dir: lib/l10n
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart
```

## 4. 執行 `flutter gen-l10n` 自動產生程式碼

```bash
flutter gen-l10n
```

或直接使用：

```bash
flutter pub get
```

## 5. 設定 `MaterialApp` 的國際化支援

```dart
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'l10n/app_localizations.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter i18n Demo',
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('en'),
        Locale('zh'),
      ],
      home: const MyHomePage(),
    );
  }
}
```

## 6. 使用國際化字串

```dart
import 'package:flutter/material.dart';
import 'l10n/app_localizations.dart';

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalizations.of(context)!.title),
      ),
      body: Center(
        child: Text(AppLocalizations.of(context)!.title),
      ),
    );
  }
}
```

## 7. 測試

確保裝置語言設定為 `en` 或 `zh`，或在 `MaterialApp` 中指定 `locale` 測試特定語言：

```dart
locale: Locale('zh'),
```

## Reference

- [Internationalization](https://docs.flutter.dev/ui/accessibility-and-internationalization/internationalization)
