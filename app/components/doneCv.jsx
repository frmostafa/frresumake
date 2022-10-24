import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { cvsContext } from "../context/cvsContext";
import AppTextInput from "./inputs/appTextInput";
import uuid from "react-native-uuid";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import ShowCv from "../screen/showCv";

export default function DoneCv({ onPressNext }) {
  const [cvContext, setCvContext] = useContext(cvsContext);
  const [allCv, setAllCv] = useState([]);
  const [saved, setSaved] = useState(cvContext["isSaved"]);
  const isFocused = useIsFocused();

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("cev", jsonValue);
      setAllCv(value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("cev");

      let data = jsonValue != null ? JSON.parse(jsonValue) : [];

      setAllCv(data);

      return data;
    } catch (e) {
      // error reading value
      console.log("what is err", e);
    }
  };
  useEffect(() => {
    // const data = getData();
    // setAllCv(data);
    getData();
    setSaved(cvContext["isSaved"]);
    console.log("is saved?", cvContext["isSaved"]);
  }, [isFocused]);

  const handleChangeActiveItem = (itemToActivate) => {
    setCvContext(itemToActivate);
    let lArr = [...allCv];
    let itemId = itemToActivate["id"];
    lArr.forEach((element) => {
      if (element.id === itemId) {
        element.activeCv = true;
        console.log("item to active ", element);
      } else {
        element.activeCv = false;
      }
    });
    const sortedArray = lArr.sort((a) => (a.activeCv ? -1 : 1));
    storeData(sortedArray);
  };
  const handleSaveCv = () => {
    let cvData = cvContext;
    cvData["isSaved"] = true;
    cvData["id"] = uuid.v4();
    cvData["activeCv"] = true;
    setCvContext(cvData);
    let lArr = allCv;
    lArr.push(cvData);
    handleChangeActiveItem(cvData);
    storeData(lArr);
    getData();
    // navigation.navigate("show", { screen: "ShowCv" });
  };
  const handleUpdateCv = () => {
    let toUpItemId = cvContext["id"];
    let dataArr = [...allCv];
    let filtredArr = dataArr.filter((item) => item.id !== toUpItemId);
    let newArr = [...filtredArr, cvContext];
    console.log("data to arr", newArr);
    // console.log("in context", cvContext);

    storeData(newArr);
  };
  return (
    <View style={styles.detail}>
      <Ionicons name="checkmark-done-circle" style={styles.donelogo} />
      <Text style={styles.primaryText}>you're allmost done!</Text>

      {saved && (
        <ScrollView>
          <Text style={styles.secondaryText}>
            this cv already saved as : {cvContext["cvName"]}
          </Text>

          <TouchableOpacity
            underlayColor="#fff"
            style={styles.touchablebutton}
            onPress={() => handleUpdateCv()}
          >
            <View style={styles.mainbtn}>
              <Text style={styles.btntext}>UPDATE '{cvContext["cvName"]}'</Text>
            </View>
          </TouchableOpacity>
          <AppTextInput name="cvName" label="RESUME NAME" />

          <TouchableOpacity
            underlayColor="#fff"
            style={styles.touchablebutton}
            onPress={() => handleSaveCv()}
          >
            <View style={styles.mainbtn}>
              <Text style={styles.btntext}>Add as New CV</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      )}

      {!saved && (
        <>
          <AppTextInput name="cvName" label="RESUME NAME" />

          <TouchableOpacity
            underlayColor="#fff"
            style={styles.touchablebutton}
            onPress={() => handleSaveCv()}
          >
            <View style={styles.mainbtn}>
              <Text style={styles.btntext}>Save</Text>
            </View>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        underlayColor="#fff"
        style={styles.touchablebutton}
        onPress={onPressNext}
      >
        <View style={styles.mainbtn}>
          <Text style={styles.btntext}>BACK TO Editing</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  donelogo: {
    fontSize: 100,
    color: "green",
    marginTop: 15,
  },
  detail: {
    alignItems: "center",
    width: "100%",
  },
  primaryText: {
    fontSize: 24,
    marginHorizontal: 8,
    marginVertical: 15,
  },
  secondaryText: {
    marginTop: 36,
    marginHorizontal: 8,
    marginBottom: 40,
    fontSize: 16,
  },
  mainbtn: {
    borderRadius: 30,
    width: 300,
    backgroundColor: "green",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#52006A",
    elevation: 10,
    padding: 20,
    height: "auto",
  },
  btntext: {
    color: "white",
    fontSize: 24,
  },
  touchablebutton: {
    overlayColor: "#fff",
  },
});
