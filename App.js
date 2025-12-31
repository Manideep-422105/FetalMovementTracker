// // temporary test in App.js
// import { useEffect } from 'react';
// import { saveSession, getSessions } from './src/utils/storage';
// import { View, Text } from 'react-native';

// export default function App() {
//   useEffect(() => {
//     const testStorage = async () => {
//         // 1. Save a dummy session
//         await saveSession({
//             id: Date.now(),
//             date: new Date().toLocaleDateString(),
//             duration: 45,
//             kickCount: 10
//         });

//         // 2. Read it back
//         const data = await getSessions();
//         console.log("Saved Data:", data);
//     };
//     testStorage();
//   }, []);
//   return(
//     // Your App JSX here
//     <View>
//       <Text>Fetal Movement Tracker</Text>
//     </View>

//   )
//   // ... rest of your App code
// }

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text } from "react-native";
import 'react-native-gesture-handler';

import HomeScreen from "./src/screens/Home";
import CounterScreen from "./src/screens/Counter";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#fff" },
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "My Fetal Tracker",
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 16 }}>
                <Text style={{ fontSize: 20 }}>ℹ️</Text>
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="Counter"
          component={CounterScreen}
          options={{ title: "Track Movement" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
