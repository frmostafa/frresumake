import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { cvsContext } from "../../context/cvsContext";

export default function AppTextInput({ icon, label, name, ...otherProps }) {
  const [inputValue, setInputValue] = useState("");
  const [cvContext, setCvContext] = useContext(cvsContext);

  return (
    <View style={styles.textInputContainer}>
      {icon && (
        <MaterialCommunityIcons
          style={styles.icon}
          name="email"
          size={20}
          color="red"
        />
      )}
      <TextInput
        onChangeText={(newText) => {
          setInputValue(newText);
          cvContext[name] = newText;
          setCvContext(cvContext);
        }}
        value={cvContext[name] ? cvContext[name] : inputValue}
        placeholder={label}
        style={styles.textInput}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    width: "100%",
    borderRadius: 25,
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 8,
    marginVertical: 20,
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 2,
  },
  textInput: {
    marginHorizontal: 30,
    fontSize: 18,
    width:"100%"
  },
  icon: {
    marginHorizontal: 15,
  },
});
