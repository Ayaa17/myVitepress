---
icon: pen-to-square
date: 2025-03-24
category:
  - Others
tag:
  - flutter
---

# Dart use log(x) with base number

Dart does not currently have an arbitrary base logarithm function, only base e (log). This is most likely inherited from JavaScript, which also only provides these two.

In general, the logarithm at one base, b1, can be found using the logarithm at any other base, b2 as logb1(x) = logb2(x) / logb2(b1).

So, to find the base-10 logarithm of 5 using only the natural logarithm (base e), you can write log(5)/log(10). The constant log(10) is available as ln10, so it can also be written log(5)/ln10.

If it happens often, you can define your own functions:

```dart
double logBase(num x, num base) => log(x) / log(base);
double log10(num x) => log(x) / ln10;
```

## reference

- [how to use log(x) with base number](https://github.com/dart-lang/sdk/issues/38519)
