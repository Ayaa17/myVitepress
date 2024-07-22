---
author: Denny
icon: pen-to-square
date: 2024-06-07
category:
  - AI
tag:
  - mlops
---

# MLOps Knowledge


## MLOps

``` mermaid
flowchart TB
    subgraph dp [Data Prepare]
    dp1("Data collection")-->dp2("Data labeling")
    dp2-->dp3("Data clean")
    dp3-->dp4("Normalize")
    end
    subgraph tt [Train & Tune]
    tt1("Choose train model")<-->tt2("Hyperparameter tuning ")
    end
    subgraph cc [CI & CD]
    cc1("Training")-->cc2("Record training data")
    cc2-->cc3("Evaluate model")
    end
    subgraph dm [Deploy & Monitor]
    dm1("Create Demo App")
    end
    dp <--> tt
    tt <--> cc
    cc --> dm
    click dp1 href "#data-collection"
    click cc1 href "#gitlab-ci-cd"
```

### Gitlab CI/CD
[MLOps](https://docs.google.com/presentation/d/1ORvNTuaJqcanc--pCZbhwcP-oKPB4rr1JR9dkc9hunc/edit?usp=sharing)

## Android Benchamrk APK [Link](https://www.tensorflow.org/lite/performance/measurement#android_benchmark_app)

Follow ablove link step

1. Install currect version APK to your Device
```cmd
adb install -r -d -g android_aarch64_benchmark_model.apk
```

2. Put the test model into the Devcie
```cmd
adb push your_model.tflite /data/local/tmp
```

3. Run benchmark APK
```cmd
adb shell am start -S -n org.tensorflow.lite.benchmark/.BenchmarkModelActivity --es args '"--graph=/data/local/tmp/your_model.tflite --num_threads=4"'
```

4. Turn logcat

In my case, if you wait for almost 20 seconds, you will see the following log in the logcat.
```cmd
10:04:31.319  2638-2638  tflite          org.tensorflow.lite.benchmark  I  count=50 first=392063 curr=392613 min=390939 max=416049 avg=392865 std=3443
10:04:31.319  2638-2638  tflite          org.tensorflow.lite.benchmark  I  Inference timings in us: Init: 164025, First inference: 394833, Warmup (avg): 394149, Inference (avg): 392865
10:04:31.319  2638-2638  tflite          org.tensorflow.lite.benchmark  I  Note: as the benchmark tool itself affects memory footprint, the following is only APPROXIMATE to the actual memory footprint of the model at runtime. Take the information at your discretion.
10:04:31.319  2638-2638  tflite          org.tensorflow.lite.benchmark  I  Memory footprint delta from the start of the tool (MB): init=65.1562 overall=66.5391
```
