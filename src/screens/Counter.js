import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Animated,
  Easing,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { saveSession } from "../utils/storage";
import InfoModal from "../components/InfoModal";

const Counter = ({ navigation }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      animationRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.18,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      animationRef.current.start();
    } else {
      animationRef.current && animationRef.current.stop();
      pulseAnim.setValue(1);
    }
  }, [isRunning]);

  // Header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Record DFM",
      headerTitleAlign: "center",
      headerTransparent: true,
      headerTintColor: "#000",
      headerTitleStyle: { fontWeight: "700", fontSize: 18, marginRight: 30 },
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => setModalVisible(true)}
        >
          <Feather name="info" size={24} color="#333" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Timer
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (totalSeconds) => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSave = async () => {
    if (seconds === 0) {
      Alert.alert("Wait", "Please record a session before saving.");
      return;
    }

    await saveSession({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration: seconds,
      kickCount: 10,
    });

    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("../../assets/bg_gradient.png")}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <InfoModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />

        <View style={styles.centerContent}>
          {/* Tooltip */}
          <View style={styles.tooltipWrapper}>
            <View style={styles.tooltipBubble}>
              <Text style={styles.tooltipText}>Stop recording after</Text>
              <Text style={styles.tooltipTextBold}>10 kicks</Text>
            </View>
            <View style={styles.tooltipArrow} />
          </View>

          {/* Timer Section */}
          <View style={styles.timerSection}>
            <Animated.View
              style={[
                styles.rippleOuter,
                { transform: [{ scale: pulseAnim }] },
              ]}
            />
            <Animated.View
              style={[
                styles.rippleInner,
                { transform: [{ scale: pulseAnim }] },
              ]}
            />

            <View style={styles.timerCard}>
              <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            </View>
          </View>

          {/* Control Button */}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setIsRunning(!isRunning)}
            activeOpacity={0.8}
          >
            {isRunning ? (
              <View style={styles.stopIcon} />
            ) : (
              <View style={styles.playIcon} />
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.linkUnderlineFull}>
              What if I am not getting{"\n"}enough kicks?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    marginTop: -40,
  },

  tooltipWrapper: { alignItems: "center", marginBottom: 30 },
  tooltipBubble: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  tooltipText: { fontSize: 24, fontWeight: "600", color: "#000" },
  tooltipTextBold: { fontSize: 24, fontWeight: "700", color: "#000" },
  tooltipArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
    marginTop: 1,
  },

  timerSection: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
    marginTop: 20,
    position: "relative",
  },
  rippleOuter: {
    position: "absolute",
    width: 280,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: "white",
    opacity: 0.3,
  },
  rippleInner: {
    position: "absolute",
    width: 240,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "white",
    opacity: 0.6,
  },
  timerCard: {
    backgroundColor: "white",
    width: 180,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6F61",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  timerText: { fontSize: 40, fontWeight: "700", color: "#E65540" },

  controlButton: {
    width: 72,
    height: 72,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 50,
  },
  playIcon: {
    width: 0,
    height: 0,
    borderTopWidth: 12,
    borderBottomWidth: 12,
    borderLeftWidth: 20,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#333",
    marginLeft: 4,
  },
  stopIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#333",
    borderRadius: 4,
  },

  footer: { width: "100%", paddingHorizontal: 24, alignItems: "center" },
  saveButton: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  saveButtonText: { fontSize: 16, fontWeight: "bold", color: "#000" },

  linkUnderlineFull: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default Counter;
