import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { Dimensions } from "react-native";
// import { useDimensions } from "../../utility/hooks/useDimensions";
const { width } = Dimensions.get('window');

export default function ManageCvInStorageItem({
  savedData,
  onActiveItemChange,
  onDelteCv,
  
}) {
  const isFocused = useIsFocused();
  const [data, setDate] = useState(savedData);
  const eduCount = data.data.education.length;
  const skillCount = data.data.skill.length;
  const workCount = data.data.work.length;



  useEffect(() => {}, [isFocused]);

  
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#EAE174", "#1AF2F1"]}
      style={styles.cvContainer}

    >
      <View style={styles.mcWrapper}  
>
        <View style={styles.itemActionWrapper}>
          {!savedData.activeCv && (
            <TouchableOpacity onPress={() => onActiveItemChange(savedData)}>
              <View style={styles.ItemBadgeOrange}>
                <Text>ACTIVATE</Text>
              </View>
            </TouchableOpacity>
          )}
          {savedData.activeCv && (
            <View style={styles.ItemBadgeGreen}>
              <Text>ACTIVE</Text>
            </View>
          )}

          <TouchableOpacity onPress={() => onDelteCv(savedData)}>
            <MaterialIcons name="delete-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.nameText}>
          {savedData.name} {savedData.lName}
        </Text>
        <Text style={styles.jobTitleText}>{savedData.jobTitle}</Text>
        <View style={styles.averageResumeContainer}>
          <View style={styles.averageResumeItem}>
            <MaterialIcons name="architecture" size={36} color="black" />
            <View style={styles.horiItemSpacer}></View>
            <Text style={styles.kholaseCountText}>{skillCount}</Text>
          </View>
          <View style={styles.itemSpacer}></View>
          <View style={styles.averageResumeItem}>
            <MaterialIcons name="chrome-reader-mode" size={36} color="black" />
            <View style={styles.horiItemSpacer}></View>

            <Text style={styles.kholaseCountText}>{eduCount}</Text>
          </View>
          <View style={styles.itemSpacer}></View>

          <View style={styles.averageResumeItem}>
            <MaterialIcons name="shopping-bag" size={36} color="black" />
            <View style={styles.horiItemSpacer}></View>
            <Text style={styles.kholaseCountText}>{workCount}</Text>
          </View>
        </View>

        
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  ItemBadgeGreen: {
    backgroundColor: "#2ffc55",
    padding: 7,
    borderRadius: 10,
  },
  ItemBadgeOrange: {
    backgroundColor: "#ff9900",
    padding: 7,
    marginLeft : 10,
    borderRadius: 10,
  },
  itemActionWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
    width : width 
    
  },
  jobTitleText: {
    fontSize: 16,
    fontWeight: "300",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "500",
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

  cvContainer: {
    width: "100%",
    borderRadius: 25,
    marginTop: 30,
    alignItems: "center",
    paddingLeft : 20,
    paddingRight : 20
  },
  mcWrapper: {
    width: "100%",
    flexDirection: "column",
    padding: 10,
    alignItems: "center",
  },
});
