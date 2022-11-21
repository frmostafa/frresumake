import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StatusBar,
  useColorScheme,
  Animated,
  PanResponder,
} from "react-native";
import * as Linking from "expo-linking";
import * as FileSystem from "expo-file-system";

// import useDimensions from "../utility/hooks/useDimensions"
import { printToFileAsync } from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import Screen from "./screen";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";
import ManageResumeListItem from "../components/items/manageResumeListItem";
import { clearCv, cvsContext } from "../context/cvsContext";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ManageCvInStorageItem from "../components/items/manageCvInStorageItem";
import Basicdetail from "./basicdetail";
import ManageCvSkeleton from "../skeleton/manageCvSkeleton";
import HtmlGenerator from "../utility/htmlGenerator";
import { Dimensions } from "react-native";

const NegativeTopViewHeight = -300;

export default function ManageCvs({ navigation }) {
  const [panViewTop, setPanViewTop] = useState(0);
  const [topViewHeight, setTopViewHeight] = useState(0);
  const [cvContext, setCvContext] = useContext(cvsContext);
  const [allCv, setAllCv] = useState([]);
  const [noActiveItem, setNoActiveItem] = useState();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [scrollViewTopValue, setScrollViewTopValue] = useState(-10);

  const scrollViewRef = useRef(null);
  const panRef = useRef(null);
  const pan = useRef(new Animated.ValueXY()).current;

  const createAndSavePDF = async () => {
    const GeneratedHtml = HtmlGenerator(cvContext);
    try {
      const { uri } = await printToFileAsync({ html: GeneratedHtml });
      await Sharing.shareAsync(uri);
      console.log("html data here", HtmlGenerator(cvContext));
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

  // const getAbsolutePosition = (top) => {
  //   if (!top) {
  //     return topViewHeight === 0 ? 250 : topViewHeight - 10;
  //   } else {
  //     return 10;
  //   }
  // };
  const handlePdfSave = () => {
    createAndSavePDF();
  };

  useEffect(() => {
    handleDeactiveAllItem();
    setPanViewTop(topViewHeight === 0 ? 250 : topViewHeight - 10);
  }, []);

  const ifCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return contentOffset.y == 0;
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (e, gestureState) => {
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(e, gestureState);
        // if (panRef.current) {
        //   panRef.current.measureInWindow((y, height) => {
        //     const panDy = gestureState.dy;

        //     if (panDy > 1) {
        //       console.log("what is height", gestureState.dy);
        //       if (height > 250) {
        //         setScrollViewTopValue(-10);
        //       } else {
        //         scrollViewRef.current.setNativeProps({
        //           scrollEnabled: false,
        //         });
        //         setScrollViewTopValue(gestureState.dy);
        //       }
        //     } else if (panDy <= 1) {
        //       if (height < 50) {
        //         setScrollViewTopValue(NegativeTopViewHeight);
        //       } else {
        //         setScrollViewTopValue(scrollViewTopValue + gestureState.dy);
        //       }
        //     } else {
        //       //   delta = pan.y;
        //     }
        //   });
        // }
      },
      onPanResponderRelease: () => {
        if (panRef.current) {
          panRef.current.measureInWindow((y, height) => {
            if (height < 150) {
              Animated.spring(pan, {
                toValue: { x: 0, y: -300 },
                useNativeDriver: false,
              }).start();
            } else if (height >= 150) {
              Animated.spring(pan, {
                toValue: { x: 0, y: -10 },
                useNativeDriver: false,
              }).start();
            }
          });
        }
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />

      {isLoading ? (
        <ManageCvSkeleton isLoading={isLoading} />
      ) : (
        //scrollView
        <View style={styles.MainContainer}>
          {/* {noActiveItem && (
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
          )} */}
          <ManageResumeListItem
            onSavePdfResume={handlePdfSave}
            onEditResume={handleEditResume}
            noActive={noActiveItem}
            contextData={cvContext}
            onDeleteCv={handleDeleteCVFromLocalStorage}
            onsetHeight={(height) => setTopViewHeight(height)}
            onAddNew={handleAddNewResume}
          />

          <Animated.View
            style={[
              styles.topscrollViewWrapper,
              {
                transform: [{ translateY: pan.y }],
              },
            ]}
            ref={panRef}
          >
            <View
              style={styles.panIconViewContainer}
              {...panResponder.panHandlers}
            >
              <View style={styles.panIconView}></View>
              <View style={styles.panIconView}></View>
              <View style={styles.panIconView}></View>
            </View>
            <ScrollView style={[styles.scrollViewWrapper]}>
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
            </ScrollView>
          </Animated.View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  topscrollViewWrapper: {
    backgroundColor: "#f9f9f9",
    width: "100%",
    height: Dimensions.get("window").height,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: "center",
    overflow: "hidden",
  },
  scrollViewWrapper: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
  panIconViewContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
  },
  panIconView: {
    width: 45,
    height: 5,
    backgroundColor: "#e0dbdb",
    marginBottom: 2,
    borderRadius: 5,
  },
  itemsToScroll: {
    height: 150,
    width: 200,
    backgroundColor: "green",
    marginVertical: 10,
  },

  swipeBaseView: {
    // backgroundColor: "#252525",
    height: 40,
    width: "100%",
    alignItems: "center",
  },
  swipeWrapper: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
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
