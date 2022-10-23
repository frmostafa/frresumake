import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { cvsContext } from "../context/cvsContext";
import AppTextInput from "./inputs/appTextInput";
import uuid from "react-native-uuid";


export default function DoneCv({ onPressNext }) {
  const [cvContext, setCvContext] = useContext(cvsContext);
  const [allCv, setAllCv] = useState([]);
  const [saved, setSaved] = useState(cvContext['isSaved'])

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("cev", jsonValue);

    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("cev");
      console.log("data async1",  jsonValue);

      let data = jsonValue != null ? JSON.parse(jsonValue) : [];
      console.log("data async",  data);

      setAllCv(data);

      return data;
    } catch (e) {
      // error reading value
      console.log("what is err",e)
    }
  };
  useEffect(()=>{
    // const data = getData();
    // setAllCv(data);
    getData();
  },[])

  const handleSaveCv = () => {
    let cvData = cvContext;
    cvData["isSaved"] = true;
    cvData["id"] = uuid.v4();;
    setCvContext(cvData)
    let lArr = allCv;
    lArr.push(cvData);
    storeData(lArr);
    getData()
    console.log("chi save konam",  lArr);
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
        onPress={()=>handleSaveCv()}
      >
        <View style={styles.mainbtn}>
          <Text style={styles.btntext}>{ saved ? "ALREADY SAVED" : "SAVE AND SHOW"}</Text>
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
