import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
} from "react-native";
import AppTextInput from "./inputs/appTextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cvsContext } from "../context/cvsContext";
import DataListItem from "./dataListItem";
import AddDataModal from "./modals/addDataModal"

const modalFields = [
{id : 1 , Type : "textInput" , name : "primary" , value : "" , label : "JOB TITLE"},
{id : 2 , Type : "textInput" , name : "secondary" , value : "" , label : "EMPLOYER"},
{id : 3 , Type : "textInput" , name : "city" , value : "" , label : "CITY"},
{id : 4 , Type : "textInput" , name : "country" , value : "" , label : "COUNTRY"},
{id : 5 , Type : "textInput" , name : "startDate" , value : "" , label : "START DATE"},
{id : 6 , Type : "textInput" , name : "endDate" , value : "" , label : "End Date"}
]
export default function WorkFields() {
  const { firstCv, setFirstCv } = useContext(cvsContext);
  const [modalVisible, setModalVisible] = useState(false);
 
  const toggleModalVisiblity = () => {
    setModalVisible(!modalVisible);
  }
  useEffect(()=>{console.log("chi shod" , firstCv.data['work'])},[])
  return (
    <>
    <View style={styles.detail}>
      <Text style={styles.primaryText}>your work experience</Text>
      <Text style={styles.secondaryText}>
        we recommend to add the most recent 2 companies that you have work for
      </Text>
      {firstCv.data['work'].map((item) =>(
          <DataListItem key={item.id} data={item} />
        ))}
 
      <TouchableOpacity onPress={()=>setModalVisible(true)}>
        <View style={styles.addNewBtn}>
          <MaterialCommunityIcons
            style={styles.addBtnText}
            name="plus-circle-outline"
            color="black"
          />
          <Text style={styles.addBtnText}>add new work</Text>
        </View>
      </TouchableOpacity>
      
    </View>
        <Modal visible={modalVisible} animationType={"slide"}>
          <Button title="close" onPress={()=> setModalVisible(false)}></Button>
          <AddDataModal type="work" toggleVisibility={toggleModalVisiblity} fields={modalFields}/>
        </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  detail: {
    display: "flex",
  },
  primaryText: {
    fontSize: 24,
    marginHorizontal: 8,
    marginTop: 36,
  },
  secondaryText: {
    marginTop: 36,
    marginHorizontal: 8,
    marginBottom: 40,
    fontSize: 16,
  },
  addNewBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop : 30
  },
  addBtnText: {
    fontSize: 22,
    color: "dodgerblue",
    marginHorizontal: 1,
  },
});