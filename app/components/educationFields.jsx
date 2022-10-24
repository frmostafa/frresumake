import React, { useContext, useState } from "react";
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
import AddWorkModal from "./modals/addDataModal";

const modalFields = [
  { id: 1, Type: "textInput", name: "primary", value: "", label: "DEGREE" },
  { id: 2, Type: "textInput", name: "secondary", value: "", label: "SCHOOL" },
  { id: 3, Type: "textInput", name: "city", value: "", label: "CITY" },
  { id: 4, Type: "textInput", name: "country", value: "", label: "COUNTRY" },
  {
    id: 5,
    Type: "textInput",
    name: "startDate",
    value: "",
    label: "START DATE",
  },
  { id: 6, Type: "textInput", name: "endDate", value: "", label: "End Date" },
];
export default function EducationFields({ onPressNext }) {
  const [cvContext] = useContext(cvsContext);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModalVisiblity = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <View style={styles.detail}>
        <Text style={styles.primaryText}>your education</Text>
        <Text style={styles.secondaryText}>
          we recommend to add the most recent 2 companies that you have educate in
        </Text>
        {cvContext.data["education"].map((item) => (
          <DataListItem key={item.id} data={item} />
        ))}

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.addNewBtn}>
            <MaterialCommunityIcons
              style={styles.addBtnText}
              name="plus-circle-outline"
              color="black"
            />
            <Text style={styles.addBtnText}>add new education</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableHighlight
        underlayColor="#fff"
        style={styles.touchablebutton}
        onPress={onPressNext}
      >
        <View style={styles.mainbtn}>
          <Text style={styles.btntext}>NEXT</Text>
        </View>
      </TouchableHighlight>
      <Modal visible={modalVisible} animationType={"slide"}>
        <Button title="close" onPress={() => setModalVisible(false)}></Button>
        <AddWorkModal
          type="education"
          toggleVisibility={toggleModalVisiblity}
          fields={modalFields}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  detail: {
    display: "flex",
  },
  addBtnText: {
    fontSize: 22,
    color: "dodgerblue",
    marginHorizontal: 1,
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
    marginTop: 30,
  },
  dataListCard: {
    padding: 10,
    width: "100%",
    height: 90,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
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
  mainbtn: {
    borderRadius: 30,
    width: "100%",
    backgroundColor: "dodgerblue",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#52006A",
    elevation: 10,
  },
  btntext: {
    color: "white",
    fontSize: 24,
  },
  touchablebutton: {
    overlayColor: "#fff",
  },
});
