import React, { useRef } from "react";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated, Dimensions } from "react-native";
import { View, StyleSheet, ScrollView, PanResponder } from "react-native";
import Constant from "expo-constants";
import { useEffect } from "react";

const NegativeTopViewHeight = -280;
// let isOnTop = false;
export default function PanTesting() {
  let pan = useRef(new Animated.ValueXY()).current;
  const topLoc = new Animated.ValueXY({ x: 0, y: -50 });
  const [topViewHeight, setTopViewHeight] = useState(0);
  const [scrollViewTopValue, setScrollViewTopValue] = useState(-10);
  const [panResponderEnabled, setPanResponderEnabled] = useState(true)
  const panRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [isOnTop, setIsOnTop] = useState(false);

  let wht = new Animated.ValueXY({x:0,y:0});
  useEffect(()=>{
    console.log("useeffect alan ejra mishe")
    if(isOnTop){
      scrollViewRef.current.setNativeProps({
        scrollEnabled: true,
      });
      setPanResponderEnabled(false);
    }else{ scrollViewRef.current.setNativeProps({
      scrollEnabled: false,
    });
    setPanResponderEnabled(false);
  }
  },[isOnTop])
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (panRef.current) {
          panRef.current.measureInWindow((y, height) => {
            if(height < 150){
             
            setIsOnTop(true);
            

            }else if(height >= 150){
             
            setIsOnTop(false);

            }        

          });
          }
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      // onPanResponderMove: Animated.event(
      //   [
      //     null,
      //     { dx: pan.x, dy: pan.y }
      //   ]
      // ),
      onPanResponderMove: (e, gestureState) => {
       
            var panDy = pan.y._value;
            if(panResponderEnabled){
              Animated.event([null, { dx: pan.x, dy: pan.y }], {
                useNativeDriver: false,
              })(e, gestureState);
            }


            if (panDy > 1) {
              console.log("mosbat", panDy)

            
            } else if (panDy <= 1) {
              console.log("manfi", panDy)

            }
        
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
         if (panRef.current) {
          panRef.current.measureInWindow((y, height) => {
            if(height < 150){
              Animated.spring(            
                pan,         
                {toValue:{x:0,y:-280},
                useNativeDriver : false
              }   

            ).start();
            
            // setPanResponderEnabled(false);
            setIsOnTop(true);
            

            }else if(height >= 150){
              Animated.spring(            
                pan,         
                {toValue:{x:0,y:-10},
                useNativeDriver : false
              }   
            ).start();
            // setPanResponderEnabled(true);
            setIsOnTop(false);

            }        

          });
          }
      },
    })
  ).current;

  const ifCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return contentOffset.y == 0;
  };
  return (
    <View style={styles.MainContainer}>
      <View style={styles.topViewWrapper}></View>
      <Animated.View
        style={[
          styles.topscrollViewWrapper,
          {
            transform: [{ translateY: pan.y }],
          },
        ]}
        ref={panRef}
        {...panResponder.panHandlers}
      >
        <View style={styles.panIconViewContainer}>
          <View style={styles.panIconView}></View>
        </View>
        <ScrollView
          //scroll
          onScroll={({ nativeEvent }) => {
            // if (ifCloseToTop(nativeEvent)) {
            //   scrollViewRef.current.setNativeProps({
            //     scrollEnabled: false,
            //   });
            //   setPanResponderEnabled(true);

            // }
          }}
          // onScroll={({ nativeEvent }) => {Animated.event(
          //   [{nativeEvent: {contentOffset: {y: wht.y}}}],
          //   {useNativeDriver : true},
          //   {listener: (event) => console.log(event)}, // Optional async listener
          // )}}

          ref={scrollViewRef}
          style={[styles.scrollViewWrapper]}
        >
          <View style={styles.itemsToScroll} ></View>
          <View style={styles.itemsToScroll}></View>
          <View style={styles.itemsToScroll}></View>
          <View style={styles.itemsToScroll}></View>
          <View style={styles.itemsToScroll}></View>
          <View style={styles.itemsToScroll}></View>
          <View style={styles.itemsToScroll}></View>
          <View style={styles.itemsToScroll}></View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  topscrollViewWrapper: {
    backgroundColor: "#ebebeb",
    width: "100%",
    height: Dimensions.get("window").height,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: "center",
    overflow: "hidden",
  },
  scrollViewWrapper: {
    width: "100%",
    height: "100%",
  },
  MainContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ebebeb",
    alignItems: "center",
    height: "100%",
  },
  topViewWrapper: {
    width: "100%",
    backgroundColor: "dodgerblue",
    height: 300,
  },
  itemsToScroll: {
    height: 150,
    width: 200,
    backgroundColor: "green",
    marginVertical: 10,
  },
  panIconView: {
    width: 40,
    height: 5,
    backgroundColor: "#252525",
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  panIconViewContainer: {
    width: "100%",
    alignItems: "center",
  },
});
