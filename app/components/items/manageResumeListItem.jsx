import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

export default function ManageResumeListItem({
  contextData,
  noActive,
  onEditResume,
  onDeleteCv,
  onSavePdfResume,
  onsetHeight,
  onAddNew
}) {
  const [noActiveItem, setNoActiveItem] = useState(noActive);
  useEffect(() => {
    setNoActiveItem(noActive);
  }, [noActive]);

  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    onsetHeight(height);
  };
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["dodgerblue", "#FCBEF9"]}
      style={styles.cvContainer}
      onLayout={onLayout}
    >
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
            <TouchableWithoutFeedback onPress={() => onEditResume()}>
              <View style={styles.averageResumeItem}>
                <Octicons name="diff-added" size={32} color="black" />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.itemSpacer}></View>
            <TouchableWithoutFeedback onPress={() => onEditResume()}>
              <View style={styles.averageResumeItem}>
                <Feather name="edit" size={32} color="black" />
              </View>
            </TouchableWithoutFeedback>

            <View style={styles.itemSpacer}></View>

            <View style={styles.averageResumeItem}>
              <TouchableWithoutFeedback onPress={() => onAddNew()}>
                <View style={styles.averageResumeItem}>
                  <Feather name="download" size={32} color="black" />
                </View>
              </TouchableWithoutFeedback>
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
    padding: 5,
    borderRadius: 10,
  },
  itemActionWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
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
    marginVertical: 10,
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
    marginVertical: 10,
    width: 55,
  },
  kholaseCountText: {
    fontSize: 20,
    fontWeight: "300",
  },

  cvContainer: {
    width: "100%",
    backgroundColor: "dodgerblue",
    height: 300,
  },
  mcWrapper: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
});
