import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AppTextInput from "./inputs/appTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cvsContext } from "../context/cvsContext";
import DataListItem from "./dataListItem";

export default function SkillsFields() {
    const [number, setNumber] = useState("");
    const { firstCv, setFirstCv } = useContext(cvsContext);


  return (
    <View style={styles.detail}>
      <Text style={styles.primaryText}>skills</Text>
      <Text style={styles.secondaryText}>
        we recommend to add the most recent 2 companies that you have work for
      </Text>
      {firstCv.data['skill'].map((item) =>(
          <DataListItem key={item.id} data={item} />
        ))}
 
      <TouchableOpacity onPress={() => console.log("add new")}>
        <View style={styles.addNewBtn}>
          <MaterialCommunityIcons
            style={styles.addBtnText}
            name="plus-circle-outline"
            color="black"
          />
          <Text style={styles.addBtnText}>add new skill</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  detail: {
    display: "flex",
  },
  primaryText: {
    fontSize: 24,
    marginHorizontal: 8,
    marginTop: 36,
  },
  secondaryText: {
    marginTop: 36,
    marginHorizontal: 8,
    marginBottom: 40,
    fontSize: 16,
  },
  addNewBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop : 30
  },
  addBtnText: {
    fontSize: 22,
    color: "dodgerblue",
    marginHorizontal: 1,
  },
});