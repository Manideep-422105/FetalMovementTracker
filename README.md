# 👣 Fetal Movement Tracker (DFM)

A calm, intuitive mobile application built with **React Native** and **Expo** to help expectant mothers track fetal movements. This app allows users to record "kick counts" using a timer, view historical data, and access guidance on monitoring fetal health.

---

## ✨ Features

- **⏱️ Kick Timer**  
  Interactive timer with a soothing ripple animation to track the time taken to reach 10 movements.

- **📜 History Log**  
  Automatically saves past sessions with date, time, and duration.

- **🗑️ Swipe-to-Delete**  
  Smooth, iOS-style gesture-based deletion for managing records.

- **ℹ️ Guidance Modal**  
  Frosted glass modal providing clear, accessible instructions.

- **🎨 Comfort-Focused UI**  
  Soft pastel theme and readability-first design for a pleasant experience.

---

## 🛠️ Tech Stack & Libraries

This project is built using the **Expo ecosystem** with the following major dependencies:

| Category | Library | Purpose |
|--------|--------|--------|
| **Core** | `react`, `react-native` | UI & App Logic |
| **Framework** | `expo` | Build & Dev Environment |
| **Navigation** | `@react-navigation/native` | Screen Navigation |
| **Storage** | `@react-native-async-storage/async-storage` | Local Persistence |
| **Interactions** | `react-native-gesture-handler` | Swipe Gestures |
| **Visuals** | `expo-blur` | Glassmorphism UI |
| **Animations** | `react-native-reanimated` | Smooth Animations |
| **Icons** | `@expo/vector-icons` | Icons |

---

## 🚀 Getting Started

### 1️⃣ Prerequisites
Ensure you have:
- Node.js (LTS Recommended)
- Git installed

---

### 2️⃣ Installation

```bash
# Clone the repository
git clone https://github.com/Manideep-422105/FetalMovementTracker.git

# Navigate to the project
cd FetalMovementTracker

# Install dependencies
npm install
```

---

## ▶️ Running the App

Start the local development server:

```bash
npx expo start
```

**Physical Device**
- Install **Expo Go**
- Scan the QR code from the terminal or browser

**Emulator**
- Press `a` → Launch Android Emulator  
- Press `i` → Launch iOS Simulator (macOS + Xcode required)

---

## 📱 Building the APK (Android)

To generate an installable APK:

### Install EAS CLI
```bash
npm install -g eas-cli
```

### Login to Expo
```bash
eas login
```

### Build APK
```bash
eas build -p android --profile preview
```

⏳ Build takes about **10–15 minutes**  
📥 You will receive a **download link** once complete

---

## 💾 Data Structure

The app uses **AsyncStorage** to save records locally under the key:

```
dfm_sessions
```

### Record Schema

```json
{
  "id": "1735645823123",
  "date": "2025-12-31T10:30:00Z",
  "duration": 145,
  "kickCount": 10
}
```

| Field | Type | Description |
|------|------|-------------|
| id | String | Unique timestamp ID |
| date | String (ISO) | Session timestamp |
| duration | Number | Time taken in seconds |
| kickCount | Number | Always 10 |

---

## 📝 Assumptions & Design Decisions

- **Cardiff “Count-to-Ten” Method**  
  Measures time to feel 10 distinct movements.

- **Local Storage Only (Privacy Focus)**  
  No cloud sync or backend.  
  ⚠️ Uninstalling the app removes all history.

- **Single User App**  
  No authentication or profiles.

- **Gesture-Based Deletion**
  Right-to-left swipe to delete records for a clean UI.

---


