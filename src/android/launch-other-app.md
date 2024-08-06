---
icon: pen-to-square
date: 2024-08-06
category:
  - Android
tag:
  - android
---
# Launch other app

## Android API 12+ App Launch Issue from Another App

To address the issue of launching an app from another app in Android API level 12 and above, follow these steps:

### Update Manifest

Add the following to your `AndroidManifest.xml`:
```xml
<manifest> 
    <queries>
        <package android:name="package.of.app.you.wanna.open"/>
    </queries>
</manifest>
```

## Launch App Using PackageManager
Use the PackageManager to launch the desired app:

```java
Intent openIntent = context.getPackageManager().getLaunchIntentForPackage("package.of.app.you.wanna.open");
openIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_NEW_DOCUMENT);
context.startActivity(openIntent);
```

## Note
From Android API 30, for security reasons, packages are made invisible. Therefore, you need to know the package you want to open and query it to allow opening.

## Reference
- [stackoverflow - Facing issue while launching App from another app in Android API level 12 and above](https://stackoverflow.com/questions/75869764/facing-issue-while-launching-app-from-another-app-in-android-api-level-12-and-ab)