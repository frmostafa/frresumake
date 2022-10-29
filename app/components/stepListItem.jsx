import React from "react";
import { Text, StyleSheet, View, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function StepListItem({ data, onPress }) {
  return (
    <TouchableHighlight underlayColor="#fff" onPress={()=>onPress(data.id)}>
      <View
        style={[
            data.selected === true ? styles.stepContainerActive : styles.stepContainer,
        ]}
      >
        <MaterialIcons
          style={[
            data.selected === true ? styles.stepitemsActive : styles.stepitems,
          ]}
          name={data.icon}
          size={36}
          color="black"
        />
        <Text
          style={[
            data.selected === true ? styles.stepitemsActive : styles.stepitems,
          ]}
        >
          {data.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  stepitems: {
    color: "#CDCDCD",
    marginBottom: 3,
  },
  stepitemsActive: {
    color: "dodgerblue",
    marginBottom: 3,
  },
  stepContainer: {
    width: 60,
    height: 60,
    marginHorizontal: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 4,
    paddingBottom: 1,
  },
  stepContainerActive: {
    width: 60,
    height: 60,
    marginHorizontal: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "dodgerblue",
    borderBottomWidth: 4,
    paddingBottom: 1,
  },
});
