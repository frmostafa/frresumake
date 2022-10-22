import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cvsContext } from "../../context/cvsContext";
import uuid from 'react-native-uuid';


export default function AddWorkModal({fields, toggleVisibility, type}) {
  const [filedsOption , setFieldsOption] = useState(fields);
  const { firstCv, setFirstCv } = useContext(cvsContext);

  const onInputChange = (optionId, e) => {
    let lObj = [...filedsOption] ;
    let option = lObj.find(obj => obj.id === optionId);
    option.value = e;
    setFieldsOption(lObj);
  }

  const handleAddData = () => {
    let newObj = {};
    filedsOption.forEach(element => {
      if(element.value != ""){
        newObj[element.name] = element.value;
      }else{
        newObj[element.name] = "";
      }
    });
    newObj["id"] = uuid.v4();
    let lObj = firstCv;
    let directArr = lObj.data[type];
    let newArr = directArr.push(newObj);
    setFirstCv(lObj);
    // console.log("what is data",newObj)
    toggleVisibility();
  }

  useEffect(()=>{setFieldsOption(fields)},[]);
  return (
    <View style={styles.detail}>
      {filedsOption.flatMap((field) =>(
        <View style={styles.textInputContainer} key={field.id}>
        <TextInput placeholder={field.label}
         onChangeText={(newText) => {
          onInputChange(field.id,newText)
        }}
        value={field["value"]}
        style={styles.textInput} />
      </View>
      ))}
      <Button title="DONE" onPress={()=> handleAddData()}/>


{/*       
          // onChangeText={(newText) => {
          //   setInputValue(newText);
          //   firstCv[name] = newText;
          //   setFirstCv(firstCv);
          // }}
          // value={firstCv[name] ? firstCv[name] : inputValue} */}
         
  
    </View>
  );
}

const styles = StyleSheet.create({
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
