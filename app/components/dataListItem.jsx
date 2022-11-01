import React from "react";
import { Text, StyleSheet, View } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  EvilIcons,
} from "@expo/vector-icons";

export default function DataListItem({ data }) {
  return (
    <View style={[styles.dataListCard, styles.shadowProp]}>
      <View style={styles.dataListTextLineOne}>
        <Text style={styles.dataListTitle}>{data.primary}</Text>
        <MaterialCommunityIcons name="delete" color="red" size={20} />
      </View>
      <View>
        <Text>
          <MaterialIcons
            name="location-city"
            style={styles.iconStyle}
            size={20}
            color="black"
          />
          {data.secondary}
        </Text>
      </View>
      <View style={styles.dataListTextLineTwo}>
        <Text>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={20}
            color="black"
          />{" "}
          {data.startDate} - {data.endDate}
        </Text>
        <Text>
          <EvilIcons name="location" size={20} color="black" /> {data.city},
          {data.country}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    marginTop: 20,
  },
  dataListCard: {
    padding: 10,
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 12,
  },
  dataListTextLineOne: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "space-between",
  },
  dataListTextLineTwo: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "flex-start",
  },
  dataListTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
});
