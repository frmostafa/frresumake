import React, { useRef } from "react";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Animated, Dimensions } from "react-native";
import { View, StyleSheet, ScrollView, PanResponder } from "react-native";
import Constant from "expo-constants";
import { useEffect } from "react";

const NegativeTopViewHeight = -300;
export default function PanTesting() {
  const pan = useRef(new Animated.ValueXY()).current;

  const [topViewHeight, setTopViewHeight] = useState(0);
  const [scrollViewTopValue, setScrollViewTopValue] = useState(-10);
  const panRef = useRef(null);
  const scrollViewRef = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // pan.setOffset({
        //   x: pan.x._value,
        //   y: pan.y._value,
        // });
      },
      onPanResponderMove: (e, gestureState) => {
        if (panRef.current) {
          panRef.current.measureInWindow((y, height) => {
            const panDy = gestureState.dy;

            if (panDy > 1) {
              console.log("what is height", gestureState.dy);
              if (height > 250) {
                setScrollViewTopValue(-10);
              } else {
                scrollViewRef.current.setNativeProps({
                  scrollEnabled: false,
                });
                setScrollViewTopValue(gestureState.dy);
              }
            } else if (panDy <= 1) {
              if (height < 50) {
                setScrollViewTopValue(NegativeTopViewHeight);
              } else {
                setScrollViewTopValue(scrollViewTopValue + gestureState.dy);
              }
            } else {
              //   delta = pan.y;
            }
          });
        }
      },
      onPanResponderRelease: () => {
        if (panRef.current) {
          panRef.current.measureInWindow((y, height) => {
            if (height > 260) {
              scrollViewRef.current.setNativeProps({
                scrollEnabled: false,
              });
            } else if (height < 70) {
              scrollViewRef.current.setNativeProps({
                scrollEnabled: true,
              });
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
      <View
        style={[{ top: scrollViewTopValue }, styles.topscrollViewWrapper]}
        ref={panRef}
        {...panResponder.panHandlers}
      >
        <View style={styles.panIconViewContainer}>
          <View style={styles.panIconView}></View>
        </View>
        <ScrollView
          onScroll={({ nativeEvent }) => {
            if (ifCloseToTop(nativeEvent)) {
              scrollViewRef.current.setNativeProps({
                scrollEnabled: false,
              });
            }
          }}
          ref={scrollViewRef}
          style={[styles.scrollViewWrapper]}
        >
          <View style={styles.itemsToScroll}></View>
          <View style={styles.itemsToScroll}></View>
          <View style={styles.itemsToScroll}></View>
          <View style={styles.itemsToScroll}></View>
          <View style={styles.itemsToScroll}></View>
          <View style={styles.itemsToScroll}></View>
          <View style={styles.itemsToScroll}></View>
          <View style={styles.itemsToScroll}></View>
        </ScrollView>
      </View>
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
