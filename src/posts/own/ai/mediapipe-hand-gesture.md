---
author: Teddy
icon: pen-to-square
date: 2024-06-07
category:
  - AI
tag:
  - gesture
  - recognition
  - object detection
---

# MediaPipe Gesture Recognition

## Demo on Android Device

![Unable to display the GIF. It is a demonstration showing the results of MediaPipe gesture recognition.](https://github.com/google-ai-edge/mediapipe-samples/raw/main/examples/gesture_recognizer/android/gesturerec.gif?raw=true)

## Overview
Provides the recognized hand gesture results along with the landmarks of the detected hands.

- **Input**
  - Image
  - Video
  - Stream
- **Output**
  - Categories of hand gestures
  - Handedness of detected hands
  - Landmarks of detected hands in image coordinates
  - Landmarks of detected hands in world coordinates

### Categories of Hand Gestures

- **0**: Unrecognized gesture, label: **Unknown**
- **1**: Closed fist, label: **Closed_Fist** ✊
- **2**: Open palm, label: **Open_Palm** 👋
- **3**: Pointing up, label: **Pointing_Up** ☝️
- **4**: Thumbs down, label: **Thumb_Down** 👎
- **5**: Thumbs up, label: **Thumb_Up** 👍
- **6**: Victory, label: **Victory** ✌️
- **7**: Love, label: **ILoveYou** 🤟

### Landmarks of Detected Hands

![Unable to display the image, it is a diagram illustrating the keypoint localization of 21 hand-knuckle coordinates within the detected hand regions.](https://ai.google.dev/static/edge/mediapipe/images/solutions/hand-landmarks.png)


## Task Configuration Options

- `runningMode`
  - Options: `IMAGE`, `VIDEO`, `LIVE_STREAM`.
- `numHands`
  - Default is `1`.
- `minHandDetectionConfidence`
- `minHandPresenceConfidence`
- `minTrackingConfidence`
  - This is the bounding box IoU threshold between hands in the current frame and the last frame. If the tracking fails, Gesture Recognizer triggers hand detection. Otherwise, the hand detection is skipped.
  - Gesture Recognizer uses tracking to avoid triggering palm detection model on every frame, which helps reduce the latency of Gesture Recognizer.
- `cannedGesturesClassifierOptions`
- `customGesturesClassifierOptions`
- `resultListener`
  - Only be used when running mode is `LIVE_STREAM`.
- `errorListener`


## Key Components of Code

- [Sample code](https://github.com/google-ai-edge/mediapipe-samples/tree/main/examples/gesture_recognizer/android)
- Key Components
  - [`GestureRecognizerHelper.kt`](https://github.com/google-ai-edge/mediapipe-samples/blob/main/examples/gesture_recognizer/android/app/src/main/java/com/google/mediapipe/examples/gesturerecognizer/GestureRecognizerHelper.kt) - Initializes the gesture recognizer and handles the model and delegate selection.
  - [`MainActivity.kt`](https://github.com/google-ai-edge/mediapipe-samples/blob/main/examples/gesture_recognizer/android/app/src/main/java/com/google/mediapipe/examples/gesturerecognizer/MainActivity.kt) - Implements the application, including calling `GestureRecognizerHelper` and `GestureRecognizerResultsAdapter`.
  - [`GestureRecognizerResultsAdapter.kt`](https://github.com/google-ai-edge/mediapipe-samples/blob/main/examples/gesture_recognizer/android/app/src/main/java/com/google/mediapipe/examples/gesturerecognizer/fragment/GestureRecognizerResultsAdapter.kt) - Handles and formats the results.

## Custom Model
If you want to improve or alter the capabilities of the models provided in this task, you can use Model Maker to modify the existing models. Custom models used with MediaPipe must be in the .task format, which is a model bundle file. You should consider using Model Maker to modify the provided models for this task before building your own.

For more information about customizing a model for this task, see [Customize models for Gesture Recognizer](https://ai.google.dev/edge/mediapipe/solutions/customization/gesture_recognizer).

## Reference

- [MediaPipe gesture recognition overview](https://ai.google.dev/edge/mediapipe/solutions/vision/gesture_recognizer)
- [Gesture recognition guide for Android](https://ai.google.dev/edge/mediapipe/solutions/vision/gesture_recognizer/android)
- [Android sample code](https://github.com/google-ai-edge/mediapipe-samples/tree/main/examples/gesture_recognizer/android)
- [Hand gesture recognition model customization guide](https://ai.google.dev/edge/mediapipe/solutions/customization/gesture_recognizer)
