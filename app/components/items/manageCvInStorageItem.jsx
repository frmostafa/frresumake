import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

export default function ManageCvInStorageItem({
  savedData,
  onActiveItemChange,
  onDelteCv
}) {
  const isFocused = useIsFocused();
  const [data, setDate] = useState(savedData);

  useEffect(() => {
    console.log("data in items", savedData["id"]);
  }, [isFocused]);
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#EAE174", "#1AF2F1"]}
      style={styles.cvContainer}
    >
      {/* <Image
      style={styles.profileImgStyle}
      source={require("../../assets/image/user.png")}
    ></Image> */}
      <View style={styles.mcWrapper}>
        <View style={styles.itemActionWrapper}>
          {!savedData.activeCv && (
            <TouchableOpacity
              onPress={() => onActiveItemChange(savedData)}
            >
              <View style={styles.ItemBadgeOrange}>
                <Text>ACTIVATE</Text>
              </View>
            </TouchableOpacity>
          )}
          {savedData.activeCv && (
            <View style={styles.ItemBadgeGreen}>
              <Text>ACTIVE</Text>
            </View>
          )}

          <TouchableOpacity onPress={()=> onDelteCv(savedData)}>
            <MaterialIcons name="delete-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.nameText}>
          {savedData.name} {savedData.lName}
        </Text>
        <Text style={styles.jobTitleText}>{savedData.jobTitle}</Text>
        <View style={styles.averageResumeContainer}>
          <View style={styles.averageResumeItem}>
            <MaterialIcons name="chrome-reader-mode" size={36} color="black" />
            <View style={styles.horiItemSpacer}></View>

            <Text style={styles.kholaseCountText}>2</Text>
          </View>
          <View style={styles.itemSpacer}></View>
          <View style={styles.averageResumeItem}>
            <MaterialIcons name="architecture" size={36} color="black" />
            <View style={styles.horiItemSpacer}></View>
            <Text style={styles.kholaseCountText}>4</Text>
          </View>
          <View style={styles.itemSpacer}></View>

          <View style={styles.averageResumeItem}>
            <MaterialIcons name="shopping-bag" size={36} color="black" />
            <View style={styles.horiItemSpacer}></View>
            <Text style={styles.kholaseCountText}>0</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  ItemBadgeGreen: {
    backgroundColor: "#2ffc55",
    padding: 7,
    borderRadius: 10,
  },
  ItemBadgeOrange: {
    backgroundColor: "#ff9900",
    padding: 7,
    borderRadius: 10,
  },
  itemActionWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  jobTitleText: {
    fontSize: 16,
    fontWeight: "300",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "500",
  },
  averageResumeContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  profileImgStyle: {
    width: 100,
    height: 100,
    position: "absolute",
    top: -50,
    left: "35%",
  },
  averageResumeItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginHorizontal: 15,
  },
  itemSpacer: {
    height: 70,
    backgroundColor: "white",
    width: 1,
  },
  horiItemSpacer: {
    height: 1,
    backgroundColor: "white",
    width: 40,
    marginTop: 5,
  },
  kholaseCountText: {
    fontSize: 26,
    fontWeight: "300",
  },

  cvContainer: {
    width: "100%",
    borderRadius: 25,
    marginTop: 30,
    alignItems: "center",
  },
  mcWrapper: {
    width: "100%",
    flexDirection: "column",
    padding: 10,
    alignItems: "center",
  },
});
