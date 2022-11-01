import React, { useContext, useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import AboutFields from "../components/aboutFields";
import AppTextInput from "../components/inputs/appTextInput";
import ContactFields from "../components/contactFields";
import EducationFields from "../components/educationFields";
import SkillsFields from "../components/skillsFields";
import StepListItem from "../components/stepListItem";
import SummaryFields from "../components/summaryFields";
import WorkFields from "../components/workFields";
import Screen from "./screen";
import DoneCv from "../components/doneCv";
import Constants from 'expo-constants'


let offset = 0;

export default function Basicdetail() {
  let flatListRef = useRef(null);

  const [stepList, setStepList] = useState([
    { id: 0, title: "About", icon: "person", selected: true },
    { id: 1, title: "Contact", icon: "email", selected: false },
    { id: 2, title: "Work", icon: "shopping-bag", selected: false },
    { id: 3, title: "Education", icon: "chrome-reader-mode", selected: false },
    { id: 4, title: "Skills", icon: "architecture", selected: false },
    { id: 5, title: "Summary", icon: "assistant-photo", selected: false },
    { id: 6, title: "Done", icon: "done-all", selected: false },
  ]);

  const handleNext = () => {
    let lArr = [...stepList];
    let selectedItem = lArr.filter((step) => step.selected === true);
    let lastId = selectedItem[0].id;
    let newId = parseInt(lastId) + 1;

    if (newId < 7) {
      lArr.forEach((st) => {
        if (st.id === lastId) {
          st.selected = false;
        }
        if (st.id === newId) {
          st.selected = true;
        }
      });
    } else {
      lArr.forEach((st) => {
        if (st.id === lastId) {
          st.selected = false;
        }
        if (st.id === 0) {
          st.selected = true;
        }
      });
    }
    console.log("off1", offset);

    setStepList(lArr);
    if (lastId === 6) {
      offset = 0;
    } else {
      offset = parseInt(offset) + 45;
    }
    flatListRef.current.scrollToOffset({ offset: offset });
    console.log("off", offset);
  };

  const handleActiveStep = (itemId) => {
    let lArr = [...stepList];

    if (itemId < 7) {
      lArr.forEach((st) => {
        if (st.id === itemId) {
          st.selected = true;
        } else {
          st.selected = false;
        }
      });
      if (itemId !== 0) {
        offset = 220 - 220 / itemId;
        flatListRef.current.scrollToOffset({ offset: offset });
      } else {
        offset = 0;
        flatListRef.current.scrollToOffset({ offset: offset });
      }
    }

    console.log("off1", offset);

    setStepList(lArr);
  };
  return (
    // <Screen>
    <KeyboardAvoidingView 
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.screenContainer}
      >
      <View style={styles.stepsContainer}>
        <Text style={styles.headerText}>FR Resumeake</Text>
        <FlatList
          horizontal={true}
          data={stepList}
          ref={flatListRef}
          keyExtractor={(st) => st.id.toString()}
          renderItem={({ item }) => (
            <StepListItem data={item} onPress={handleActiveStep} />
          )}
        ></FlatList>
      </View>
      {/* <View style={styles.addDetailContainer}> */}
        {stepList.flatMap((step) => {
          if (step.selected === true) {
            switch (step.id) {
              case 0:
                return <AboutFields key={step.id} onPressNext={handleNext} />;
                break;
              case 1:
                return <ContactFields key={step.id} onPressNext={handleNext} />;
                break;
              case 2:
                return <WorkFields key={step.id} onPressNext={handleNext} />;
                break;
              case 3:
                return (
                  <EducationFields key={step.id} onPressNext={handleNext} />
                );
                break;
              case 4:
                return <SkillsFields key={step.id} onPressNext={handleNext} />;
                break;
              case 5:
                return <SummaryFields key={step.id} onPressNext={handleNext} />;
                break;
              case 6:
                return <DoneCv key={step.id} onPressNext={handleNext} />;
                break;
            }
          }
        })}
      {/* </View> */}
      </KeyboardAvoidingView>
    // {/* </Screen> */}
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    // justifyContent: "center",
    padding: '5%',
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#fff'
  },
  headerText: {
    fontSize: 36,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  stepsContainer: {
    display: "flex",
  },
  addDetailContainer: {
    paddingHorizontal: 25,
    display: "flex",
    flex: 8,
    justifyContent: "space-between",
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
