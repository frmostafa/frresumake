import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
export default function ManageResumeListItem({ contextData, noActive, onEditResume, onDeleteCv, onSavePdfResume }) {
  const [noActiveItem, setNoActiveItem] = useState(noActive);
  useEffect(() => {
    setNoActiveItem(noActive);
  }, [noActive]);
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["dodgerblue", "#FCBEF9"]}
      style={styles.cvContainer}
    >
      {/* {!noActiveItem && ( */}
      {/* <View> */}
      {/* {!noActiveItem && (
        <Image
          style={styles.profileImgStyle}
          source={require("../../assets/image/user.png")}
        />
      )} */}
      {!noActiveItem && (
        <View style={styles.mcWrapper}>
          <View style={styles.itemActionWrapper}>
            <View style={styles.ItemBadgeGreen}>
              <Text>ACTIVE</Text>
            </View>

            <TouchableOpacity onPress={() => onDeleteCv(contextData)}>
              <MaterialIcons name="delete-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
           <Image
          style={styles.profileImgStyle}
          source={require("../../assets/image/user.png")}
        />
          <Text style={styles.nameText}>
            {contextData.name} {contextData.lName}
          </Text>
          <Text style={styles.jobTitleText}>{contextData.jobTitle}</Text>
          <View style={styles.averageResumeContainer}>
            <TouchableWithoutFeedback onPress={()=> onEditResume()}>
            <View style={styles.averageResumeItem}>
              <Feather name="edit" size={32} color="black" />
            </View>
            </TouchableWithoutFeedback>
            <View style={styles.itemSpacer}></View>
            <TouchableWithoutFeedback onPress={()=> onSavePdfResume()}>

            <View style={styles.averageResumeItem}>
              <Feather name="download" size={32} color="black" />
            </View>
            </TouchableWithoutFeedback>
            <View style={styles.itemSpacer}></View>

            <View style={styles.averageResumeItem}>
              <MaterialCommunityIcons
                name="share-variant-outline"
                size={32}
                color="black"
              />
              {/* <View style={styles.horiItemSpacer}></View>
              <MaterialIcons name="shopping-bag" size={36} color="black" /> */}
            </View>
          </View>
        </View>
      )}
      {/* </View> */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  ItemBadgeGreen: {
    backgroundColor: "#2ffc55",
    padding: 7,
    borderRadius: 10,
  },
  itemActionWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop : 15
  },
  jobTitleText: {
    fontSize: 18,
    fontWeight: "300",
  },
  nameText: {
    fontSize: 28,
    fontWeight: "500",
  },
  averageResumeContainer: {
    flexDirection: "row",
    marginVertical: 40,
  },
  profileImgStyle: {
    width: 100,
    height: 100,

  },
  averageResumeItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 70,
    marginHorizontal: 15,
  },
  itemSpacer: {
    height: 80,
    backgroundColor: "white",
    width: 1,
  },
  horiItemSpacer: {
    height: 1,
    backgroundColor: "white",
    marginVertical: 20,
    width: 55,
  },
  kholaseCountText: {
    fontSize: 20,
    fontWeight: "300",
  },

  cvContainer: {
    height: "auto",
    width: "100%",
    alignItems: "center",
  },
  mcWrapper: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
});
