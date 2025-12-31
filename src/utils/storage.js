import AsyncStorage from "@react-native-async-storage/async-storage";
const STORAGE_KEY = "@fetal_movement_sessions";

export const getSessions = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    let sessions = jsonValue != null ? JSON.parse(jsonValue) : [];
    sessions.sort((a, b) => new Date(b.id) - new Date(a.id));

    return sessions;
  } catch (e) {
    console.error("Error loading sessions:", e);
    return [];
  }
};

export const saveSession = async (newSession) => {
  try {
    const existingSessions = await getSessions();
    const updatedSessions = [newSession, ...existingSessions];
    const jsonValue = JSON.stringify(updatedSessions);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);

    return updatedSessions;
  } catch (e) {
    console.error("Error saving session:", e);
  }
};

export const deleteSession = async (id) => {
  try {
    const existingSessions = await getSessions();
    const filteredSessions = existingSessions.filter(
      (session) => session.id !== id
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSessions));
    return filteredSessions;
  } catch (error) {
    console.error("Error deleting session:", error);
    return [];
  }
};
