import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function ManageResumeListItem() {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["dodgerblue", "#FCBEF9"]}
      style={styles.cvContainer}
    >
      <Image
        style={styles.profileImgStyle}
        source={require("../../assets/image/user.png")}
      ></Image>
      <View style={styles.mcWrapper}>
        <Text style={styles.nameText}>Mostafa Faryabi</Text>
        <Text style={styles.jobTitleText}>Frontend Developer</Text>
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
    height: 200,
    width: "100%",
    borderRadius: 25,
    marginTop: 60,
    alignItems: "center",
  },
  mcWrapper: {
    width: "100%",
    flexDirection: "column",
    marginTop: 60,
    alignItems: "center",
  },
});
