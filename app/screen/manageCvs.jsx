import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView } from "react-native";
import Screen from "./screen";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ManageResumeListItem from "../components/items/manageResumeListItem";
import { clearCv, cvsContext } from "../context/cvsContext";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ManageCvInStorageItem from "../components/items/manageCvInStorageItem";
import { navigation } from "@react-navigation/native";
import Basicdetail from "./basicdetail";


export default function ManageCvs({navigation}) {
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
      }else{
        element.activeCv = false;
      }
    });
    const sortedArray = lArr.sort((a, b) => (a.activeCv) ? -1 : 1)

    storeData(sortedArray);

  }

  const handleDeactiveAllItem = () => {
    let lArr = [...allCv];
    lArr.forEach(element => {
      element.activeCv = false;
      storeData(lArr);
    });
  }

  const handleDeleteCVFromLocalStorage = (itemToDelete) => { 
    let lArr = [...allCv];
    let itemId = itemToDelete["id"];
    let itemToDel = lArr.filter((item) => item.id === itemId);
    let isActive = itemToDel[0].activeCv ? true : false;
    let newArr = lArr.filter((item) => item.id !== itemId);
    console.log("item to del", isActive)
    if(newArr.length === 1) {
      let lastItem = newArr[0];
      handleChangeActiveItem(lastItem);
    }else if(isActive){
      let anotherItem = newArr[0];
      handleChangeActiveItem(anotherItem);
    }    
    storeData(newArr);
  } 

  const handleAddNewResume = () => {
    setCvContext(clearCv);
    handleDeactiveAllItem()
    navigation.navigate('make', { screen: 'Basicdetail' });
  }

  useEffect(() => {
    getData()
  }, [isFocused]);


  return (
    <Screen>
      <ScrollView >
        <ManageResumeListItem contextData={cvContext}/>
        <TouchableOpacity onPress={() => handleAddNewResume()}>
          <View style={styles.addNewBtn}>
            <MaterialCommunityIcons
              style={styles.addBtnText}
              name="plus-circle-outline"
              color="black"
            />
            <Text style={styles.addBtnText}>add new Resume</Text>
          </View>
        </TouchableOpacity>
        <View  style={styles.storageCvsFlatList}>
        {allCv.map((item)=>(

          <ManageCvInStorageItem key={item.id} savedData={item} onActiveItemChange={handleChangeActiveItem} onDelteCv={handleDeleteCVFromLocalStorage} />

        ))}
        </View>
        {/* <FlatList
        style={styles.storageCvsFlatList}
        data={allCv}
        keyExtractor={(key) => key.id.toString()}
        renderItem={({ item }) => (
          <ManageCvInStorageItem savedData={item} onActiveItemChange={handleChangeActiveItem} onDelteCv={handleDeleteCVFromLocalStorage} />
        )}
        ></FlatList> */}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  storageCvsFlatList : {
    paddingHorizontal : 12,
    width : "100%",
  },
  mcContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom : 170
  },
  cvContainer: {
    height: 200,
    width: "100%",
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
