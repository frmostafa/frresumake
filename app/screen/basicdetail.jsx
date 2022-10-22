import React, { useContext, useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Button,
  TextInput,
  TouchableHighlight,
} from "react-native";
import AboutFields from "../components/aboutFields";
import AppTextInput from "../components/inputs/appTextInput";
import ContactFields from "../components/contactFields";
import EducationFields from "../components/educationFields";
import SkillsFields from "../components/skillsFields";
import StepListItem from "../components/stepListItem";
import SummaryFields from "../components/summaryFields";
import WorkFields from "../components/workFields";
import { cvsContext } from "../context/cvsContext";
import Screen from "./screen";

let offset = 0;

export default function Basicdetail() {
  let flatListRef = useRef(null);
  const { firstCv, setFirstCv } = useContext(cvsContext);

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

    if (newId < 6) {
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
    console.log("off1" , offset)

    setStepList(lArr);
    if(lastId === 5){
      offset = 0 ;
    }else{
      offset = parseInt(offset) + 45;

    }
    flatListRef.current.scrollToOffset({ offset: offset });
    console.log("off" , offset)


  };
  return (
    <Screen>
      <View style={styles.stepsContainer}>
        <Text style={styles.headerText}>FR Resumeake</Text>
        <FlatList
          horizontal={true}
          data={stepList}
          ref={flatListRef}
          keyExtractor={(st) => st.id.toString()}
          renderItem={({ item }) => (
            <StepListItem
              title={item.title}
              iconName={item.icon}
              selected={item.selected}
            />
          )}
        ></FlatList>
      </View>
      <View style={styles.addDetailContainer}>
        {stepList.flatMap((step) => {
          if (step.selected === true) {
            // if(step.id === 0){
            //   return <AboutFields key={step.id} />;

            // }else if(step.id === 1){
            //   return <ContactFields key={step.id}/>

            // }
            switch(step.id){
                case 0:
                    return <AboutFields key={step.id} />;
                    break;
                case 1 : 
                    return <ContactFields key={step.id}/>
                break;
                case 2 :
                  return <WorkFields key={step.id}/>;
                  break;
                  case 3 :
                    return <EducationFields key={step.id}/>;
                    break;
                    case 4 :
                      return <SkillsFields key={step.id}/>;
                      break;
                      case 5 :
                        return <SummaryFields key={step.id}/>;
                        break;

            } 
          }
        })}
        <TouchableHighlight
          underlayColor="#fff"
          style={styles.touchablebutton}
          onPress={handleNext}
        >
          <View style={styles.mainbtn}>
            <Text style={styles.btntext}>NEXT</Text>
          </View>
        </TouchableHighlight>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 36,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginVertical : 20
  },
  stepsContainer: {
    display: "flex",
    flex: 2,
  },
  addDetailContainer: {
    paddingHorizontal : 25,
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
