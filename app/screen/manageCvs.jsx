import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StatusBar,
  useColorScheme 
} from "react-native";
import * as Linking from 'expo-linking';
import * as FileSystem from 'expo-file-system';

import {printToFileAsync} from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
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
import ManageCvSkeleton from "../skeleton/manageCvSkeleton";
import HtmlGenerator from "../utility/htmlGenerator";


export default function ManageCvs({ navigation }) {
  const [cvContext, setCvContext] = useContext(cvsContext);
  const [allCv, setAllCv] = useState([]);
  const [noActiveItem, setNoActiveItem] = useState();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();

  const createAndSavePDF = async () => {
    const GeneratedHtml = HtmlGenerator(cvContext);

    try {
      const { uri } = await printToFileAsync({ html: GeneratedHtml,
    });
    await Sharing.shareAsync(uri);
    console.log("html data here" , HtmlGenerator(cvContext));

    // if (Platform.OS === "ios") {
      //await Sharing.shareAsync(uri);
      // } else {
      //   const permission = await MediaLibrary.requestPermissionsAsync();
      //   if (permission.granted) {
      //     // await MediaLibrary.createAssetAsync(uri);
      //     // await Linking.openURL('https://expo.dev');
      //     const dirInfo = await FileSystem.getInfoAsync(uri);
      //     if (dirInfo.exists) {
      //       const contentUri = await FileSystem.getContentUriAsync(uri);
      //       console.log("permision darim",contentUri);
      //       await Linking.openURL(contentUri);
      //     }
      //   }
      // }
    } catch (error) {
      console.error(error);
    }
  };

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
  const handleEditResume = () => {
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
    console.log("what is color" , colorScheme);

    setIsLoading(true);
    getData();
    let lArr = [...allCv];
    let bool = true;
    lArr.forEach((element) => {
      if (element.activeCv) {
        bool = false;
      }
    });
    setNoActiveItem(bool);
    setInterval(() => {
      setIsLoading(false);
    }, 3000);
  }, [isFocused, noActiveItem]);

  const handlePdfSave = () => {
    createAndSavePDF();
  };
  useEffect(() => {
    // setIsLoading(true);
    handleDeactiveAllItem();
    // setInterval(()=> {setIsLoading(false)}, 5000);
  }, []);

  return (
    <Screen>
    <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />

      {isLoading ? (
        <ManageCvSkeleton isLoading={isLoading} />
      ) : (
        <ScrollView>
          {noActiveItem && (
            <View style={styles.noActiveWrapper}>

              <TouchableOpacity onPress={() => handleAddNewResume()}>
                <LinearGradient
                  // Background Linear Gradient
                  colors={["#DAA641", "#1AF2F1"]}
                  style={styles.noItemBtn}
                >
                  <Text style={styles.noItemBtnText}>Add New cv</Text>
                </LinearGradient>
              </TouchableOpacity>
              {allCv.length != 0 && (
                <TouchableOpacity onPress={() => activeAnRandomCv()}>
                  <LinearGradient
                    // Background Linear Gradient
                    colors={["#DAA641", "#1AF2F1"]}
                    style={styles.noItemBtn}
                  >
                    <Text style={styles.noItemBtnText}>Active a cv</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          )}
          <ManageResumeListItem
            onSavePdfResume={handlePdfSave}
            onEditResume={handleEditResume}
            noActive={noActiveItem}
            contextData={cvContext}
            onDeleteCv={handleDeleteCVFromLocalStorage}
          />
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
          </View>
        </ScrollView>
      )}
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
