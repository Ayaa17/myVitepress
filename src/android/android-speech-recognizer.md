---
icon: pen-to-square
date: 2025-05-12
category:
  - Android
  - AI
tag:
  - android
  - voice recognition
---

# Android SpeechRecognizer

在 Android 14（API level 34）及以上版本中，`android.speech.SpeechRecognizer` 提供了標準的語音識別能力，允許應用透過底層系統或指定的識別服務，將音訊輸入轉換為文字輸出。其主要功能包括：建立識別器實例、偵測系統是否支援識別、啟動/停止識別會話、取消或銷毀識別器，以及透過回呼介面接收識別結果和錯誤訊息。同時，Android 14 針對主執行緒呼叫、前台服務類型聲明等方面強化了行為約束，需要開發者註意避免 ANR 並正確配置服務類型。此外，API 在內網/雲端辨識、持續辨識及電量消耗等方面有侷限，需要根據應用場景選擇適當的實作方式。以下文件將從功能概覽、核心方法、回呼機制、權限與配置、Android 14 特性與限制五個部分進行介紹。

## 功能概覽

`SpeechRecognizer` 類別負責管理語音辨識的生命週期，不應直接實例化，而是透過工廠方法創建：

- **工廠方法**：`SpeechRecognizer.createSpeechRecognizer(Context)` 或指定元件的 `createSpeechRecognizer(Context, ComponentName)`；
- **可選工廠方法**：`SpeechRecognizer.createOnDeviceSpeechRecognizer(Context)` 用於僅使用設備端模型進行本地識別（無網路）([Microsoft Learn][1])；
- **可用性偵測**：`SpeechRecognizer.isRecognitionAvailable(Context)` 判斷系統中是否有可用的辨識服務([MIT Stuff][2])；
- **銷毀**：呼叫 `destroy()` 回收底層資源；

此 API 透過 `Intent` 配置識別參數，如語言模型 (`RecognizerIntent.EXTRA_LANGUAGE_MODEL`)、提示語 (`EXTRA_PROMPT`)、是否傳回置信度分數 (`EXTRA_CONFIDENCE_SCORES`) 等，在收到識別結果時，透過回調訊息應用程式介面將結果或應用程式介面[33]。

## 核心方法

### 建立與銷毀

```java
SpeechRecognizer sr = SpeechRecognizer.createSpeechRecognizer(context);
// 或僅使用本地模型：
SpeechRecognizer onDeviceSr = SpeechRecognizer.createOnDeviceSpeechRecognizer(context);
…
sr.destroy();
```

- **`createSpeechRecognizer`**：預設使用系統識別服務。
- **`createOnDeviceSpeechRecognizer`**：僅設備端識別，避免網路請求延遲和消耗([Microsoft Learn][1])。

### 會話控制

```java
// 檢查可用性
boolean available = SpeechRecognizer.isRecognitionAvailable(context);

// 啟動識別
Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
sr.startListening(intent);

// 停止識別
sr.stopListening();

// 取消目前任務
sr.cancel();
```

- **`startListening(Intent)`**：開始錄音並觸發識別，識別結果透過回呼回傳。
- **`stopListening()`**：主動結束錄入，自動觸發最終結果回呼。
- **`cancel()`**：取消目前識別要求，不再接收任何回呼([MIT Stuff][2])。

## 回呼機制

所有識別事件透過 `RecognitionListener` 介面接收，方法包括：

- **`onReadyForSpeech(Bundle params)`**：系統已就緒，可開始講話。
- **`onBeginningOfSpeech()`**：使用者已開始講話。
- **`onBufferReceived(byte[] buffer)`**：中間音訊資料回調，可用來自訂處理。
- **`onPartialResults(Bundle partialResults)`**：中間辨識結果，可用來實作即時字幕等功能。
- **`onResults(Bundle results)`**：最終識別結果，透過 `RESULTS_RECOGNITION`（候選文字清單）和 `CONFIDENCE_SCORES`（置信度數組，API 14+ 可選返回）獲取([Stack Overflow][4], [Spot][5])。
- **`onError(int error)`**：識別失敗，可透過錯誤碼（如 `ERROR_NETWORK_TIMEOUT`、`ERROR_INSUFFICIENT_PERMISSIONS` 等）區分原因。
- **`onEndOfSpeech()`**：使用者停止講話。
- **`onEvent(int eventType, Bundle params)`**：保留字段，未來版本擴充使用。

使用時必須先呼叫 `setRecognitionListener(...)` 註冊監聽器，否則不會收到任何回呼([Android Developers][6])。

## 權限與配置

- **執行時間權限**：必須在清單和執行時申請 `android.permission.RECORD_AUDIO`，否則會拋出 `ERROR_INSUFFICIENT_PERMISSIONS`。
- **主執行緒限制**：所有方法應在主執行緒調用，跨執行緒調用會拋出 `RuntimeException`；銷毀後不可再呼叫其他方法。
- **前台服務（Android 14）**：若在前台服務中啟動識別，需要在清單中聲明適當的 `foregroundServiceType`，否則在 API 34+ 會觸發 ANR 或異常([Android Developers][7])。

## Android 14+ 特性與限制

1. **ANR 嚴格檢查**：針對主線程工作超時更嚴格，`SpeechRecognizer` 所在的前台服務需聲明類型（如 `microphone`），否則可能直接觸發 ANR([Android Developers][7])。
2. **隱私權控制**：應用程式需明確聲明權限，並尊重使用者對話權限管理；若使用 `createOnDeviceSpeechRecognizer`，無需網路權限，但可能犧牲辨識準確率。
3. **持續識別消耗**：Android 文件不建議長時間連續識別，因網路傳輸和電量消耗較高，建議分段或在必要時暫時釋放識別器([Microsoft Learn][8])。

## 應用場景與注意事項

- **即時字幕**：利用 `onPartialResults` 實現，但需處理高頻回調所帶來的 UI 壓力。
- **指令辨識**：結合置信度過濾（`EXTRA_CONFIDENCE_SCORES`，API 14+ 提供），對於低置信度結果可提示重試。
- **離線模式**：透過 `createOnDeviceSpeechRecognizer` 並下載語言包，可離線運行；但僅支援常見主流語言。
- **多語言支援**：`RecognizerIntent.EXTRA_LANGUAGE` 或 `EXTRA_LANGUAGE_PREFERENCE` 設置，受系統語言包支援情況限制。

## Sample code

```Java
public class MainActivity extends AppCompatActivity {

    private String TAG = "MainActivity";
    private TextView txtSpeechInput;
    private Button btnSpeak;
    private SpeechRecognizer speechRecognizer;
    private boolean isRetry = false; // Tracks button state

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        txtSpeechInput = findViewById(R.id.txtSpeechInput);
        btnSpeak = findViewById(R.id.btnSpeak);

        // Request microphone permission
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.RECORD_AUDIO}, 1);
        }

        // Initialize SpeechRecognizer
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this);
        speechRecognizer.setRecognitionListener(new RecognitionListener() {
            @Override
            public void onReadyForSpeech(Bundle params) {
                txtSpeechInput.setText("Listening...");
            }

            @Override
            public void onBeginningOfSpeech() {}

            @Override
            public void onRmsChanged(float rmsdB) {}

            @Override
            public void onBufferReceived(byte[] buffer) {}

            @Override
            public void onEndOfSpeech() {
                txtSpeechInput.append("\n[End of Speech]");
            }

            // ✅ Show live speech-to-text while speaking
            @Override
            public void onPartialResults(Bundle partialResults) {
                ArrayList<String> matches = partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                Log.d(TAG, "onPartialResults: " +matches);

                if (matches != null && matches.size() > 0) {
                    txtSpeechInput.setText(matches.get(0)); // Show words live
                }
            }

            // ✅ Final recognized speech result
            @Override
            public void onResults(Bundle results) {
                ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                Log.d(TAG, "onResults: " +matches);

                if (matches != null && matches.size() > 0) {
                    txtSpeechInput.setText(matches.get(0)); // Final text after speech ends
                }
                btnSpeak.setText("Speak");
                isRetry = false;
            }

            // ✅ Handle errors and allow retry
            @Override
            public void onError(int error) {
                String errorMessage;
                switch (error) {
                    case SpeechRecognizer.ERROR_AUDIO:
                        errorMessage = "Audio recording error";
                        break;
                    case SpeechRecognizer.ERROR_CLIENT:
                        errorMessage = "Client side error";
                        break;
                    case SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS:
                        errorMessage = "Insufficient permissions";
                        break;
                    case SpeechRecognizer.ERROR_NETWORK:
                        errorMessage = "Network error";
                        break;
                    case SpeechRecognizer.ERROR_NO_MATCH:
                        errorMessage = "No match found";
                        break;
                    case SpeechRecognizer.ERROR_RECOGNIZER_BUSY:
                        errorMessage = "Recognition service busy";
                        break;
                    case SpeechRecognizer.ERROR_SERVER:
                        errorMessage = "Server error";
                        break;
                    case SpeechRecognizer.ERROR_SPEECH_TIMEOUT:
                        errorMessage = "No speech input";
                        break;
                    default:
                        errorMessage = "Error recognizing speech";
                        break;
                }
                txtSpeechInput.setText(errorMessage);
                btnSpeak.setText("Try Again");
                isRetry = true;
            }

            @Override
            public void onEvent(int eventType, Bundle params) {}
        });

        // ✅ Button Click Listener - Handles "Try Again" State
        btnSpeak.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isRetry) {
                    // ✅ Reset button state before restarting listening
                    btnSpeak.setText("Speak");
                    txtSpeechInput.setText("Tap Speak and say something...");
                    isRetry = false;

                    // ✅ Small delay before restarting listening
                    new Handler().postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            startListening();
                        }
                    }, 500);
                } else {
                    startListening();
                }
            }
        });
    }

    private void startListening() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "en-US"); // 或 "en-US"

        intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true); // ✅ Enable live speech results
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Say something...");
        speechRecognizer.startListening(intent);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (speechRecognizer != null) {
            speechRecognizer.destroy();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == 1 && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            Toast.makeText(this, "Microphone permission granted", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Microphone permission is required!", Toast.LENGTH_LONG).show();
        }
    }
}

```

---

## Behavior changes

### Core functionality

Legacy copy of speech service implementation removed
Android 13 removes the SpeechService implementation—including Voice IME, RecognitionService and an intent-based API—from the Google app.

In Android 12, the following changes occurred:

SpeechService functionalities were migrated to the Speech Services by Google app, which became the default SpeechService provider.
RecognitionService functionality was moved to the Android System Intelligence app to support on-device speech recognition.
To help maintain app compatibility on Android 12, the Google app uses a trampoline to divert traffic to the Speech Services by Google app. In Android 13, this trampoline is removed.

Apps should use the device's default provider for SpeechService, rather than hard-coding a specific app.

## 系統支援語音

### 可用語言列表（按語系分類）：

- 節錄於 2025/5/12

#### 英語（English）

- English (US)
- English (Australia)
- English (Canada)
- English (India)
- English (Ireland)
- English (Singapore)
- English (UK)

#### 中文（Chinese）

- 國語 (台灣)
- 普通话 (中國大陸)

#### 日語／韓語／東亞

- 日本語 (日本)
- 한국어 (대한민국)

#### 南亞語系

- हिन्दी (भारत)

#### 東南亞語系

- Bahasa Indonesia (Indonesia)
- Tiếng Việt (Việt Nam)
- ไทย (ประเทศไทย)

#### 西歐語系

- Deutsch (Deutschland)
- Deutsch (Belgien)
- Deutsch (Schweiz)
- Deutsch (Österreich)
- Français (France)
- Français (Belgique)
- Français (Suisse)
- Français (Canada)
- Italiano (Italia)
- Italiano (Svizzera)

#### 其他歐語

- Español (EE.UU.)
- Español (España)
- Português (Brasil)
- Polski (Polska)
- Русский (Россия)
- Türkçe (Türkiye)

## Reference

- [SpeechRecognizer.CreateOnDevizer.CreateRecojizer.com "SpeechRecognizer.CreateOnDevizer.CreateRecoin](https://learn.microsoft.com/en-us/dotnet/api/android.speech.speechrecognizer.createondevicespeechrecognizer?view=net-android-34.0&utm_source=chatgpt.com)
- [SpeechRecognizer - Android SDK](https://stuff.mit.edu/afs/sipb/project/android/docs/reference/android/speech/SpeechRecognizer.html?utm_source=chatgpt.com)
- [SpeechRecognizer | API reference - Android Developers](https://developer.android.com/reference/android/speech/SpeechRecognizer?utm_source=chatgpt.com)
- [Speech Recognizer get confidence below API 14 - Stack Overflow](https://stackoverflow.com/questions/18694497/speech-recognizer-get-confidence-below-api-14?utm_source=chatgpt.com)
- [RecognitionListener | Android - Developers](https://spot.pcc.edu/~mgoodman/developer.android.com/reference/android/speech/RecognitionListener.html?utm_source=chatgpt.com)
- [RecognitionListener | API reference | Android Developers](https://developer.android.com/reference/android/speech/RecognitionListener?utm_source=chatgpt.com)
- [Behavior changes: Apps targeting Android 14 or higher](https://developer.android.com/about/versions/14/behavior-changes-14?utm_source=chatgpt.com)
- ["SpeechRecognizer Class (Android.Speech) - Learn Microsoft"](https://learn.microsoft.com/en-us/dotnet/api/android.speech.speechrecognizer?view=net-android-35.0&utm_source=chatgpt.com)
- [github kib666/SpeechRecognizer](https://github.com/kib666/SpeechRecognizer)
- [Android 13 behavior-changes speech-service](https://developer.android.com/about/versions/13/behavior-changes-all?authuser=2#speech-service)
