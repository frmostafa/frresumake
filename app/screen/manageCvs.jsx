import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import Screen from "./screen";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ManageResumeListItem from "../components/items/manageResumeListItem";
import { cvsContext } from "../context/cvsContext";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ManageCvInStorageItem from "../components/items/manageCvInStorageItem";


export default function ManageCvs() {
  const [cvContext, setCvContext] = useContext(cvsContext);
  const [allCv, setAllCv] = useState([]);
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
      const data = jsonValue != null ? JSON.parse(jsonValue) : []; 

      setAllCv(data);

      return data;
    } catch (e) {
      // error reading value
    }
  };

  const handleChangeActiveItem = (itemToActivate)=> {
    setCvContext(itemToActivate)
    let lArr = [...allCv];
    let itemId = itemToActivate["id"];
    lArr.forEach(element => {
      if(element.id === itemId){
        element.activeCv = true
        console.log("item to active " , element);
      }else{
        element.activeCv = false;
      }
      storeData(lArr);
    });
  }

  const handleDeleteCVFromLocalStorage = (itemIdToDelete) => { 
    let lArr = [...allCv];
    let newArr = lArr.filter((item) => item.id !== itemIdToDelete);
    if(newArr.length === 2) {
      console.log("in akharin bare")
    }
    // storeData(newArr);
  }

  useEffect(() => {
    getData()
  }, [isFocused]);
  return (
    <Screen>
      <View style={styles.mcContainer}>
        <Text style={styles.headerText}>Manage your cv's</Text>
        <ManageResumeListItem contextData={cvContext}/>
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
        <FlatList
        style={styles.storageCvsFlatList}
        data={allCv}
        keyExtractor={(key) => key.id.toString()}
        renderItem={({ item }) => (
          <ManageCvInStorageItem savedData={item} onActiveItemChange={handleChangeActiveItem} onDelteCv={handleDeleteCVFromLocalStorage} />
        )}
        ></FlatList>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  storageCvsFlatList : {
    width : "100%",
  },
  mcContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom : 170
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
