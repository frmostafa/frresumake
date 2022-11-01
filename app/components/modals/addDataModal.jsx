import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { cvsContext } from "../../context/cvsContext";
import uuid from "react-native-uuid";

export default function AddWorkModal({ fields, toggleVisibility, type, onClosePress }) {
  const [filedsOption, setFieldsOption] = useState(fields);
  const [cvContext, setCvContext] = useContext(cvsContext);

  const onInputChange = (optionId, e) => {
    let lObj = [...filedsOption];
    let option = lObj.find((obj) => obj.id === optionId);
    option.value = e;
    setFieldsOption(lObj);
  };

  const handleAddData = () => {
    let newObj = {};
    filedsOption.forEach((element) => {
      if (element.value != "") {
        newObj[element.name] = element.value;
      } else {
        newObj[element.name] = "";
      }
    });
    newObj["id"] = uuid.v4();
    let lObj = cvContext;
    let directArr = lObj.data[type];
    let newArr = directArr.push(newObj);
    setCvContext(lObj);
    // console.log("what is data",newObj)
    toggleVisibility();
  };

  useEffect(() => {
    setFieldsOption(fields);
  }, []);
  return (
    <View style={styles.detail}>
      <TouchableWithoutFeedback onPress={()=> onClosePress() }>
        <View style={styles.closebtnWrapper}>
          <AntDesign name="closecircleo" size={24} color="black" />
        </View>
      </TouchableWithoutFeedback>
      {filedsOption.flatMap((field) => (
        <View style={styles.textInputContainer} key={field.id}>
          <TextInput
            placeholder={field.label}
            onChangeText={(newText) => {
              onInputChange(field.id, newText);
            }}
            value={field["value"]}
            style={styles.textInput}
          />
        </View>
      ))}
      <Button title="DONE" onPress={() => handleAddData()} />
    </View>
  );
}

const styles = StyleSheet.create({
  closebtnWrapper: {
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: 15,
  },
  textInputContainer: {
    width: "100%",
    borderRadius: 25,
    backgroundColor: "#fff",
    flexDirection: "column",
    padding: 8,
    marginVertical: 20,
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 2,
  },
  textInput: {
    marginHorizontal: 30,
    fontSize: 18,
  },
  icon: {
    marginHorizontal: 15,
  },
});
