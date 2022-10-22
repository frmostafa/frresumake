import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppTextInput from "./inputs/appTextInput";
export default function SummaryFields() {
  const [number, setNumber] = useState("");

  return (
    <View style={styles.detail}>
      <Text style={styles.primaryText}>you're allmost done!</Text>
      <Text style={styles.secondaryText}>
        we recommend to add the most recent 2 companies that you have work for
      </Text>
      <AppTextInput
        placeholder="NUMBER"
        onChangeText={(newText) => setNumber(newText)}
        value={number}
      />
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
});
