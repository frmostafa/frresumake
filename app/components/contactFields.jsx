import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import AppTextInput from "./inputs/appTextInput";
import { cvs, cvsContext } from "../context/cvsContext";

export default function ContactFields() {

  // const { firstCv, setFirstCv } = useContext(cvsContext);
  // const [email, setEmail] = useState("");
  // const [number, setNumber] = useState("");
  // const [website, setWebsite] = useState("");
  // const [address, setAddress] = useState("");

  return (
    <ScrollView style={styles.detail}>
      <Text style={styles.primaryText}>Phone,Email and website?</Text>
      <Text style={styles.secondaryText}>
        How whould you like potential employee to contact you?
      </Text>
      <AppTextInput label="EMAIL" name="email" />
      <AppTextInput label="NUMBER" name="number" />
      <AppTextInput label="WEBSITE" name="website" />
      <AppTextInput label="ADDRES" name="address" />
    </ScrollView>
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
