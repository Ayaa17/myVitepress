

# Tensorflow Android library asking for READ_PHONE_STATE

造成上架時權限有疑慮


## root cause

跟sdk版本有關，再build aar時，minsdk開太低，該環境導致問題，會被多加一個`READ_PHONE_STATE`權限

版本1.10.0看似已修正，但沒有公開aar到jcenter

## work around
`Androidmenifest.xml`添加以下

```xml
<uses-permission
        android:name="android.permission.READ_PHONE_STATE"
        tools:node="remove" />
```


## reference
- [stackoverflow](https://stackoverflow.com/questions/44864081/tensorflow-android-library-asking-for-read-phone-state)
- [tensorflow-github issue](https://github.com/tensorflow/tensorflow/issues/12460)
- [fixed commit](https://github.com/tensorflow/tensorflow/commit/b148d228886e53f71401c332b8d48d45467dad47#diff-e645941cdf799f5d5471e9eaddee376393d99b6db457270794d68d9056b7e280)
- [some related issue ](https://github.com/google-ai-edge/LiteRT/issues/562)