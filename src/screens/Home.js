import React, { useState, useCallback, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getSessions, deleteSession } from "../utils/storage"; 
import SessionItem from "../components/SessionItem";

const Home = ({ navigation }) => {
  const [sessions, setSessions] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const data = await getSessions();
    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setSessions(sortedData);
  };

  const handleDeleteSession = async (id) => {
    const newSessions = sessions.filter(session => session.id !== id);
    setSessions(newSessions);
    await deleteSession(id);

  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "DFM (Kick counter)",
      headerTitleAlign: "center",
      headerStyle: { shadowColor: "transparent", elevation: 0 },
      headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 16 }}>
          <Image
            source={require("../../assests/Badge.png")}
            style={{
              width: 70,
              height: 30,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.articleCard}>
        <ImageBackground
          source={require("../../assests/article.jpg")}
          style={styles.articleBackground}
          imageStyle={{ borderRadius: 16 }}
          resizeMode="cover"
        >
          <Image
            source={require("../../assests/blur.png")}
            style={[StyleSheet.absoluteFill, { borderRadius: 16 }]}
            resizeMode="cover"
          />

          <Image
            source={require("../../assests/leap.png")}
            style={styles.badgeImage}
            resizeMode="contain"
          />

          <TouchableOpacity style={styles.saveButton}>
            <Feather
              name="bookmark"
              size={16}
              color="black"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <Text style={styles.articleTitle}>DFM (fetal movement)</Text>
        </ImageBackground>
      </View>

      <TouchableOpacity
        style={styles.recordButton}
        onPress={() => navigation.navigate("Counter")}
      >
        <Text style={styles.recordButtonText}>Record fetal movement</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Past records</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SessionItem 
              item={item} 
              onDelete={handleDeleteSession} 
            />
          )}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
               <Text style={styles.emptyText}>No records yet.</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 10,
  },
  articleCard: {
    height: 160,
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#dcdcdc",
  },
  articleBackground: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  badgeImage: {
    width: 100,
    height: 30,
    alignSelf: "flex-start",
    marginTop: 0,
  },
  saveButton: {
    position: "absolute",
    top: 12,
    right: 16,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  saveButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
  },
  articleTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 3,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  recordButton: {
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "#333",
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 30,
  },
  recordButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  emptyContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
});

export default Home;