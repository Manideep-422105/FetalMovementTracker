import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const SessionItem = ({ item, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${dayName} • ${day} ${month} ${year}`;
  };

  const formatDuration = (totalSeconds) => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;

    const minStr = min.toString().padStart(2, "0");
    const secStr = sec.toString().padStart(2, "0");

    return `${minStr} min : ${secStr} sec`;
  };

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        style={styles.deleteButtonContainer}
        onPress={() => {
          Alert.alert(
            "Delete Record",
            "Are you sure you want to delete this session?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => onDelete(item.id),
              },
            ]
          );
        }}
      >
        <Animated.View
          style={[styles.deleteButtonContent, { transform: [{ scale }] }]}
        >
          <Feather name="trash-2" size={24} color="white" />
          <Text style={styles.deleteText}>Delete</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          <Text style={styles.durationText}>
            {formatDuration(item.duration)}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "white",
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dateText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  durationText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  deleteButtonContainer: {
    backgroundColor: "#FF3B30", 
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 12,
    borderRadius: 12,
    width: 100,
  },
  deleteButtonContent: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  deleteText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
});

export default SessionItem;
