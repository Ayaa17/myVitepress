---
icon: pen-to-square
date: 2025-03-20
category:
  - Others
tag:
  - flutter
  - android
---
#　Flutter build failed on andorid platform

## Build log

```

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
> Get more help at https://help.gradle.org.
==============================================================================

2: Task failed with an exception.
-----------
* What went wrong:
Execution failed for task ':path_provider_android:compileDebugJavaWithJavac'.
> Could not resolve all files for configuration ':path_provider_android:androidJdkImage'.
   > Failed to transform core-for-system-modules.jar to match attributes {artifactType=_internal_android_jdk_image, org.gradle.libraryelements=jar, org.gradle.usage=java-runtime}.
      > Execution failed for JdkImageTransform: D:\Android_SDK\Sdk\platforms\android-35\core-for-system-modules.jar.
         > Error while executing process C:\Program Files\Android\Android Studio\jbr\bin\jlink.exe with arguments {--module-path C:\Users\XXXXXXXXX\.gradle\caches\transforms-3\cc12c5242eac95612f50f56c
5a36d784\transformed\output\temp\jmod --add-modules java.base --output C:\Users\XXXXXXXXX\.gradle\caches\transforms-3\cc12c5242eac95612f50f56c5a36d784\transformed\output\jdkImage --disable-plugin syst
em-modules}

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
> Get more help at https://help.gradle.org.
==============================================================================

BUILD FAILED in 6s
Running Gradle task 'assembleDebug'...                              7.6s

┌─ Flutter Fix ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [!] This is likely due to a known bug in Android Gradle Plugin (AGP) versions less than 8.2.1, when                                   │
│ D:\XXXXXXXXXXXXXXXXX\android\settings.gradle,                                                      │
│ in the 'plugins' closure (by the number following "com.android.application").                                                         │
│  Alternatively, if your project was created with an older version of the templates, it is likely                                      │
│ in the buildscript.dependencies closure of the top-level build.gradle:                                                                │
│ D:\XXXXXXXXXXXXXXXXX\android\build.gradle,                                                         │
│ as the number following "com.android.tools.build:gradle:".                                                                            │
│                                                                                                                                       │
│ For more information, see:                                                                                                            │
│ https://issuetracker.google.com/issues/294137077                                                                                      │
│ https://github.com/flutter/flutter/issues/156304                                                                                      │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
Error: Gradle task assembleDebug failed with exit code 1

```

## Solution

Android Gradle Plugin (AGP) upgrade to 8.2.1

D:\XXXXXXXXXXXXXXXXX\android\settings.gradle

id "com.android.application" version <mark>"8.1.0"</mark> apply false -> <mark>"8.2.1"</mark>

like below:

``` sh
# android\settings.gradle
plugins {
    id "dev.flutter.flutter-plugin-loader" version "1.0.0"
    id "com.android.application" version "8.2.1" apply false
    id "org.jetbrains.kotlin.android" version "1.8.22" apply false
}
```