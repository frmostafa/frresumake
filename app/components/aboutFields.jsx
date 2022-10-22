import React, { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { cvs, cvsContext } from "../context/cvsContext";
import AppTextInput from "./inputs/appTextInput";

export default function AboutFields() {

  // const { firstCv, setFirstCv } = useContext(cvsContext);
  // const [fName, setFname] = useState("");
  // const [lName, setLname] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  // const [jobTiltle, setJobTitle] = useState("");

  return (
    <View style={styles.detail}>
      <Text style={styles.primaryText}>Let's get started with your name!</Text>
      <Text style={styles.secondaryText}>what is your name?</Text>
      <AppTextInput label="FIRST NAME" name="name" />
      <AppTextInput label="LAST NAME" name="lName" />
      <AppTextInput label="DATE OF BIRTH" name="dateOfBirth" />
      <AppTextInput label="JOB TITLE" name="jobTitle" />
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
