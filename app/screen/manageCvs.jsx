import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Screen from "./screen";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ManageCvs() {
  return (
    <Screen>
      <View style={styles.mcContainer}>
        <Text style={styles.headerText}>Manage your cv's</Text>
        <TouchableOpacity></TouchableOpacity>
        <LinearGradient
          // Background Linear Gradient
          colors={["dodgerblue", "#FCBEF9"]}
          style={styles.cvContainer}
        >
            <Image style={styles.profileImgStyle} source={require("../assets/image/user.png")}></Image>
          <View style={styles.mcWrapper}>
            <Text style={styles.nameText}>Mostafa Faryabi</Text>
            <Text style={styles.jobTitleText}>Frontend Developer</Text>

          </View>
        </LinearGradient>

        <TouchableOpacity onPress={() => console.log("add cv")}>
          <View style={styles.addNewBtn}>
            <MaterialCommunityIcons
              style={styles.addBtnText}
              name="plus-circle-outline"
              color="black"
            />
            <Text style={styles.addBtnText}>add new Resume</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
    jobTitleText :{
        fontSize : 16,
        fontWeight : "300"
    },
    nameText : {
        fontSize : 24,
        fontWeight : "500"
    },
    profileImgStyle:{
        width : 100,
        height : 100,
        position : "absolute",
        top : -50,
        left : "35%"
    },
  mcContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 32,
    marginVertical: 15,
    fontWeight: "600",
  },
  cvContainer: {
    height: 200,
    width: "100%",
    borderRadius: 25,
    marginTop : 60,
    alignItems : 'center'
  },
  mcWrapper : {
    width: "100%",
    flexDirection : "column",
    marginTop : 60,
    alignItems : "center"    
},
  addNewBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  addBtnText: {
    fontSize: 22,
    color: "dodgerblue",
    marginHorizontal: 1,
  },
});
