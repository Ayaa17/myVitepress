---
icon: pen-to-square
date: 2025-03-25
category:
  - Python
tag:
  - python
---
# Python byte decode to string

## Decode failed issue
有的字元不是utf8

## resolurion

忽略錯誤亂碼

```py
f.read().decode('utf-8','ignore')
```

## Other language

```dart

//忽略
utf8.decoder(wordBytes,allowMalformed:true);

//直接用String
String word = String.fromCharCodes(wordBytes);

```