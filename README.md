# 👣 Fetal Movement Tracker (DFM)

A calm, intuitive mobile application built with **React Native** and **Expo** to help expectant mothers track fetal movements. This app allows users to record "kick counts" using a timer, view historical data, and access guidance on monitoring fetal health.

---

## ✨ Features

* **⏱️ Kick Timer:** Interactive timer with a "breathing" ripple animation to record the duration it takes to reach 10 kicks.
* **📜 History Log:** Persistent storage of past sessions with date, time, and duration.
* **🗑️ Swipe-to-Delete:** Smooth gesture-based deletion for managing history records (iOS-style).
* **ℹ️ Guidance Modal:** Frosted glass overlay providing clear instructions on how to perform the count.
* **🎨 Custom UI:** Clean, pastel-themed interface designed for readability and comfort.

---

## 🛠️ Tech Stack & Libraries

This project relies on the **Expo** ecosystem. Key dependencies include:

| Category | Library | Purpose |
| :--- | :--- | :--- |
| **Core** | `react`, `react-native` | UI and Application Logic |
| **Framework** | `expo` | Build and Development Environment |
| **Navigation** | `@react-navigation/native` | Screen navigation structure |
| **Storage** | `@react-native-async-storage` | Persisting user data locally |
| **Interactions**| `react-native-gesture-handler` | Swipe gestures for list items |
| **Visuals** | `expo-blur` | Glassmorphism effects (BlurView) |
| **Visuals** | `react-native-reanimated` | Advanced animations (optional dependency) |
| **Icons** | `@expo/vector-icons` | Feather & FontAwesome5 icons |

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (LTS version recommended)
* [Git](https://git-scm.com/)

### 2. Installation
Clone the project and install dependencies:

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd FetalMovementTracker

# Install dependencies
npm install




📝 Assumptions & Design Decisions
Cardiff "Count-to-Ten" Method: The application assumes the user is following the standard protocol of tracking how long it takes to feel 10 distinct fetal movements. The target is fixed at 10.

Local Storage: To ensure privacy and simplicity, all data is stored locally on the device. There is no cloud sync or backend database. Uninstalling the app will clear the history.

Single User: The app is designed for a single user; there are no authentication or multi-profile features.

Gesture UI: Deletion of records uses a "Right-to-Left" swipe gesture, a common pattern in mobile UX, to keep the interface clean of clutter buttons.