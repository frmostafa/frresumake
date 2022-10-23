import React, { useCallback, useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cvsContext } from "../context/cvsContext";
import Screen from "./screen";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

export default function ShowCv() {
  const [cvContext] = useContext(cvsContext);
  const [mainRoot] = useState(cvContext);
  const [data] = useState(cvContext["data"]);
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("data", cvContext);
  }, [isFocused]);

  return (
    <Screen>
      <View style={styles.showCvContainer}>
        <Text style={styles.cvName}>
          {cvContext.name} {cvContext.lName}
        </Text>
        <Text style={styles.cvJobTitle}>{cvContext.jobTitle}</Text>
        <View style={styles.cvdetailcontainer}>
          <View style={styles.cvdetailItem}>
            {cvContext.email !== "" && (
              <MaterialCommunityIcons name="email" size={14} color="black" />
            )}
            <Text style={styles.cvdetailText}>{cvContext.email}</Text>
          </View>
          <View style={styles.cvdetailItem}>
            {cvContext.number !== "" && (
              <MaterialCommunityIcons name="phone" size={14} color="black" />
            )}
            <Text style={styles.cvdetailText}>{cvContext.number}</Text>
          </View>
        </View>
        <View style={styles.cvdetailcontainer}>
          <View style={styles.cvdetailItem}>
            {mainRoot.address !== "" && (
              <MaterialCommunityIcons
                name="map-marker"
                size={14}
                color="black"
              />
            )}
            <Text style={styles.cvdetailText}>{mainRoot.address}</Text>
          </View>
          <View style={styles.cvdetailItem}>
            {mainRoot.dateOfBirth !== "" && (
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={14}
                color="black"
              />
            )}
            <Text style={styles.cvdetailText}>{mainRoot.dateOfBirth}</Text>
          </View>
        </View>

        {Object.keys(data).map((item, i) => (
          <View key={i} style={styles.cvAddDataContainer}>
            <Text style={styles.cvAddDataTitleText}>{item}</Text>

            <View style={styles.addDataWrapper}>
              {data[item].map((data, i) => (
                <View key={i} style={styles.addDataMainLine}>
                  <View style={styles.addDaaMainLineText}>
                    <Text style={styles.addDataTextPrimary}>
                      {data.primary}
                    </Text>
                    <Text style={styles.addDataTextSecondary}>
                      {data.secondary}
                    </Text>
                  </View>
                  <View style={styles.addDaaMainLineText}>
                    <Text style={styles.addDataTextSecondary}>
                      {data.startDate}
                    </Text>
                    <Text style={styles.addDataTextSecondary}>-</Text>
                    <Text style={styles.addDataTextSecondary}>
                      {data.endDate}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cvAddDataContainer: {
    width: "100%",
    marginTop: 20,
  },
  addDataWrapper: {
    borderTopColor: "black",
    borderTopWidth: 2,
  },
  addDataMainLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  showCvContainer: {
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  addDaaMainLineText: {
    flexDirection: "row",
  },
  cvdetailcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cvdetailItem: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 2,
  },
  cvName: {
    fontSize: 36,
  },
  cvJobTitle: {
    marginVertical: 5,
    fontSize: 24,
  },
  cvdetailText: {
    fontSize: 12,
  },
  cvAddDataTitleText: {
    fontSize: 18,
    fontWeight: "600",
  },
  addDataTextPrimary: {
    fontSize: 16,
  },
  addDataTextSecondary: {
    fontSize: 12,
    color: "#bcbcbc",
    marginTop: 5,
  },
});
