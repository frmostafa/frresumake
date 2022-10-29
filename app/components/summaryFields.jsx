import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import AppTextInput from "./inputs/appTextInput";
export default function SummaryFields({ onPressNext }) {
  const [number, setNumber] = useState("");

  return (
    <View style={styles.detail}>
      <View>
      <Text style={styles.primaryText}>you're allmost done!</Text>
      <Text style={styles.secondaryText}>
        please add you'r resume summary!
      </Text>
      <View style={styles.textInputContainer}>
      <TextInput
      multiline = {true}
      style={styles.textInput}
      numberOfLines = {10}>

      </TextInput>
        </View>
      </View>
      <TouchableOpacity
        underlayColor="#fff"
        style={styles.touchablebutton}
        onPress={onPressNext}
      >
        <View style={styles.mainbtn}>
          <Text style={styles.btntext}>NEXT</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  detail: {
    display: "flex",
    height : "100%",
    justifyContent : "space-between"
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
  mainbtn: {
    borderRadius: 30,
    width: "100%",
    backgroundColor: "dodgerblue",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#52006A",
    elevation: 10,
  },
  btntext: {
    color: "white",
    fontSize: 24,
  },
  touchablebutton: {
    overlayColor: "#fff",
  },
  textInput :{
    marginHorizontal: 30,
    fontSize: 18,
    width:"100%"
  },
  textInputContainer: {
    width: "100%",
    borderRadius: 25,
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 8,
    marginVertical: 20,
    borderColor: "#CDCDCD",
    borderWidth: 2,
  },
});
