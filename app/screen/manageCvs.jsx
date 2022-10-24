import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import Screen from "./screen";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ManageResumeListItem from "../components/items/manageResumeListItem";
import { clearCv, cvsContext } from "../context/cvsContext";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ManageCvInStorageItem from "../components/items/manageCvInStorageItem";
import Basicdetail from "./basicdetail";

export default function ManageCvs({ navigation }) {
  const [cvContext, setCvContext] = useContext(cvsContext);
  const [allCv, setAllCv] = useState([]);
  const [noActiveItem, setNoActiveItem] = useState();
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

  const handleChangeActiveItem = (itemToActivate) => {
    setNoActiveItem(!noActiveItem);
    setCvContext(itemToActivate);
    let lArr = [...allCv];
    let itemId = itemToActivate["id"];
    lArr.forEach((element) => {
      if (element.id === itemId) {
        element.activeCv = true;
      } else {
        element.activeCv = false;
      }
    });
    const sortedArray = lArr.sort((a, b) => (a.activeCv ? -1 : 1));

    storeData(sortedArray);
  };

  const handleDeactiveAllItem = () => {
    let lArr = [...allCv];
    lArr.forEach((element) => {
      element.activeCv = false;
      storeData(lArr);
    });
  };

  const handleDeleteCVFromLocalStorage = (itemToDelete) => {
    let lArr = [...allCv];
    let itemId = itemToDelete["id"];
    let itemToDel = lArr.filter((item) => item.id === itemId);
    let isActive = itemToDel[0].activeCv ? true : false;
    let newArr = lArr.filter((item) => item.id !== itemId);
    console.log("item to del", isActive);
    if (newArr.length === 1) {
      let lastItem = newArr[0];
      handleChangeActiveItem(lastItem);
    } else if (isActive) {
      let anotherItem = newArr[0];
      handleChangeActiveItem(anotherItem);
    }
    storeData(newArr);
  };

  const handleAddNewResume = () => {
    setCvContext(clearCv);
    handleDeactiveAllItem();
    navigation.navigate("make", { screen: "Basicdetail" });
  };

  const activeAnRandomCv = () => {
    setNoActiveItem(!noActiveItem);
    let lArr = [...allCv];
    lArr[0].activeCv = true;
    setCvContext(lArr[0]);
    storeData(lArr);
  };
  useEffect(() => {
    getData();
    let lArr = [...allCv];
    let bool = true;
    lArr.forEach((element) => {
      if (element.activeCv) {
        bool = false;
      }
    });
    setNoActiveItem(bool);
    console.log("what");
  }, [isFocused, noActiveItem]);

  useEffect(() => {
    handleDeactiveAllItem();
  }, []);

  return (
    <Screen>
      <ScrollView>
        {noActiveItem && (
          <View style={styles.noActiveWrapper}>
            <TouchableOpacity onPress={() => handleAddNewResume()}>
              <LinearGradient
                // Background Linear Gradient
                colors={["#EAE174", "#1AF2F1"]}
                style={styles.noItemBtn}
              >
                <Text style={styles.noItemBtnText}>Add New cv</Text>
              </LinearGradient>
            </TouchableOpacity>
            {allCv.length != 0 && (
              <TouchableOpacity onPress={() => activeAnRandomCv()}>
                <LinearGradient
                  // Background Linear Gradient
                  colors={["#EAE174", "#1AF2F1"]}
                  style={styles.noItemBtn}
                >
                  <Text style={styles.noItemBtnText}>Active a cv</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        )}
        <ManageResumeListItem noActive={noActiveItem} contextData={cvContext} />
        {!noActiveItem && (
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
        )}
        <View style={styles.storageCvsFlatList}>
          {allCv.flatMap((elem) =>
            !elem.activeCv ? (
              <ManageCvInStorageItem
                key={elem.id}
                savedData={elem}
                onActiveItemChange={handleChangeActiveItem}
                onDelteCv={handleDeleteCVFromLocalStorage}
              />
            ) : null
          )}
          {/* {allCv.map((item) => (
            <ManageCvInStorageItem
              key={item.id}
              savedData={item}
              onActiveItemChange={handleChangeActiveItem}
              onDelteCv={handleDeleteCVFromLocalStorage}
            />
          ))} */}
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
  noItemBtnText: {
    fontSize: 28,
    fontWeight: "400",
  },
  noActiveWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  storageCvsFlatList: {
    paddingHorizontal: 12,
    width: "100%",
  },
  mcContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 170,
  },
  noItemBtn: {
    justifyContent: "center",
    height: 120,
    width: 150,
    marginTop: 60,
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
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
