import React, { useContext, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Screen from "./screen";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ManageResumeListItem from "../components/items/manageResumeListItem";
import { cvsContext } from "../context/cvsContext";

export default function ManageCvs() {
  const [cvContext] = useContext(cvsContext);

  useEffect(() => {
    console.log("what is context bro 2", cvContext);
  }, []);
  return (
    <Screen>
      <View style={styles.mcContainer}>
        <Text style={styles.headerText}>Manage your cv's</Text>
        <ManageResumeListItem />
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
    marginTop: 60,
    alignItems: "center",
  },
  mcWrapper: {
    width: "100%",
    flexDirection: "column",
    marginTop: 60,
    alignItems: "center",
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
  averageResumeContainer: {
    flexDirection: "row",
    marginTop: 10,
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
});
