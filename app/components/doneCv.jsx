import React, { useContext, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { cvsContext } from "../context/cvsContext";
import AppTextInput from "./inputs/appTextInput";

export default function DoneCv({ onPressNext }) {
  const [cvContext] = useContext(cvsContext);
  const [allCv, setAllCv] = useState([]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("cvs", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("cvs");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const handleSaveCv = () => {
    // let cvData = cvContext;
    // cvData.cvName = cvName;
    console.log("chi save konam", cvContext);
  };
  return (
    <View style={styles.detail}>
      <Text style={styles.primaryText}>you're allmost done!</Text>
      <Text style={styles.secondaryText}>
        we recommend to add the most recent 2 companies that you have work for
      </Text>
      <AppTextInput name="cvName" label="RESUME NAME" />
      <TouchableOpacity
        underlayColor="#fff"
        style={styles.touchablebutton}
        onPress={() => handleSaveCv()}
      >
        <View style={styles.mainbtn}>
          <Text style={styles.btntext}>SAVE AND SHOW</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        underlayColor="#fff"
        style={styles.touchablebutton}
        onPress={onPressNext}
      >
        <View style={styles.mainbtn}>
          <Text style={styles.btntext}>BACK TO ABOUT FIELD</Text>
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
  mainbtn: {
    borderRadius: 30,
    width: "100%",
    backgroundColor: "green",
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
});
