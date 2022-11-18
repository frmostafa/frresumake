import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Basicdetail from "./app/screen/basicdetail";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShowCv from "./app/screen/showCv";
import { clearCv, currentcv, cvsContext } from "./app/context/cvsContext";
import ManageCvs from "./app/screen/manageCvs";
import { useState } from "react";
import Toast from "react-native-toast-message";
import PanTesting from "./app/screen/panTesting";
// import ReanimatedTest from "./app/screen/reanimatedTest";
import "react-native-reanimated";

const Tab = createBottomTabNavigator();

export default function App() {
  const [cvContext, setCvContext] = useState(clearCv);

  return (
    <cvsContext.Provider value={[cvContext, setCvContext]}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarHideOnKeyboard: Platform.OS !== "ios",
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "make") {
                  iconName = focused ? "pencil-box" : "pencil-box-outline";
                } else if (route.name === "show") {
                  iconName = focused ? "view-list" : "view-list-outline";
                } else if (route.name === "manage") {
                  iconName = focused
                    ? "clipboard-edit"
                    : "clipboard-edit-outline";
                } else if (route.name === "test") {
                  iconName = focused
                    ? "clipboard-edit"
                    : "clipboard-edit-outline";
                }
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
              tabBarShowLabel: "false",
              header: () => null,
            })}
          >
            {/* <Tab.Screen name="test" component={ReanimatedTest} /> */}

            <Tab.Screen name="manage" component={ManageCvs} />
            <Tab.Screen name="make" component={Basicdetail} />
            <Tab.Screen name="show" component={ShowCv} />
            <Tab.Screen name="test" component={PanTesting} />
          </Tab.Navigator>
        </NavigationContainer>
        <Toast />
      </GestureHandlerRootView>
    </cvsContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabbg: {},
});
