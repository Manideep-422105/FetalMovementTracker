import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const { height } = Dimensions.get("window");

const InfoModal = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <BlurView intensity={90} tint="light" style={styles.absoluteContainer}>
      <View style={styles.centeredView}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={22} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Header Card */}
        <View style={styles.headerCard}>
          <Image
            source={require("../../assests/Footprints.png")}
            style={styles.iconImage}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Steps to count fetal kicks</Text>
        </View>

        {/* Body Card */}
        <View style={styles.bodyCard}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.stepRow, styles.rowWhite]}>
              <Text style={styles.stepText}>
                1. Choose a <Text style={styles.bold}>time</Text> when you are{" "}
                <Text style={styles.bold}>least distracted</Text> or when you
                typically <Text style={styles.bold}>feel the fetus move.</Text>
              </Text>
            </View>

            <View style={[styles.stepRow, styles.rowGrey]}>
              <Text style={styles.stepText}>
                2. Get <Text style={styles.bold}>comfortable. Lie</Text> on your{" "}
                <Text style={styles.bold}>left side</Text> or sit with your feet
                propped up.
              </Text>
            </View>

            <View style={[styles.stepRow, styles.rowWhite]}>
              <Text style={styles.stepText}>
                3. Place your{" "}
                <Text style={styles.bold}>hands on your belly.</Text>
              </Text>
            </View>

            <View style={[styles.stepRow, styles.rowGrey]}>
              <Text style={styles.stepText}>
                4. <Text style={styles.bold}>Start a timer</Text> or watch the
                clock.
              </Text>
            </View>

            <View style={[styles.stepRow, styles.rowWhite]}>
              <Text style={styles.stepText}>
                5. <Text style={styles.bold}>Count</Text> each kick. Keep
                counting until you get{" "}
                <Text style={styles.bold}>
                  10 kicks / flutters / swishes / rolls.
                </Text>
              </Text>
            </View>

            <View style={[styles.stepRow, styles.rowGrey, styles.lastRow]}>
              <Text style={styles.stepText}>
                6. Once you reach{" "}
                <Text style={styles.bold}>10 kicks, jot down</Text> how many{" "}
                <Text style={styles.bold}>minutes</Text> it took.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  absoluteContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingBottom: 70,
  },

  closeButtonContainer: {
    width: "90%",
    maxWidth: 420,
    alignSelf: "center",
    alignItems: "flex-end",
    marginBottom: 8,
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    width: "90%",
    maxWidth: 420,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginLeft: 10,
    flex: 1,
  },

  iconImage: {
    width: 24,
    height: 24,
  },

  bodyCard: {
    backgroundColor: "white",
    borderRadius: 18,
    overflow: "hidden",
    width: "90%",
    maxWidth: 420,
    maxHeight: height * 0.6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  scrollContent: {
    paddingBottom: 0,
  },

  stepRow: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  rowWhite: { backgroundColor: "white" },
  rowGrey: { backgroundColor: "#F5F5F5" },

  lastRow: {
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },

  stepText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },

  bold: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default InfoModal;
