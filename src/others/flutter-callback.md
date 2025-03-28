---
icon: pen-to-square
date: 2025-03-28
category:
  - Others
tag:
  - flutter
---

# Flutter implements callback

## sample code

new interface class:

```dart

// sample class

class S {
  void Function(String)? onABC;
  void Function(int)? onDEF;

  STTCallback({this.onABC, this.onDEF});
}
```

how to use:

```dart

mian()  {

final st = S(onABC: (string) {
        print("S onABC: $string");
        // add here
    }, onDEF: (i) {
        print("S onDEF: $i");
        // add here
    }
}

```
