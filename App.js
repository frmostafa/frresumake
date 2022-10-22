import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Basicdetail from "./app/screen/basicdetail";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShowCv from "./app/screen/showCv";
import { currentcv, cvsContext } from "./app/context/cvsContext";
import ManageCvs from "./app/screen/manageCvs";
import { useState } from "react";

const Tab = createBottomTabNavigator();

export default function App() {
  const [cvContext, setCvContext] = useState(currentcv);

  return (
    <cvsContext.Provider value={[cvContext, setCvContext]}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
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
              }

              // You can return any component that you like here!
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

            // tabBarBackground: () => (
            //   <View tint="light" intensity={100} style={styles.tabbg}  />
            // ),
          })}
        >
          <Tab.Screen name="manage" component={ManageCvs} />
          <Tab.Screen name="make" component={Basicdetail} />
          <Tab.Screen name="show" component={ShowCv} />
        </Tab.Navigator>
      </NavigationContainer>
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
