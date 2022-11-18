import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export default function ReanimatedTest() {
  const randomNumber = useSharedValue(100);

  const style = useAnimatedStyle(() => {
    return {
      width: randomNumber.value,
      height: randomNumber.value,
    };
  });
  return (
    <View
    // style={{
    //   flex: 1,
    //   alignItems: "center",
    //   justifyContent: "center",
    //   flexDirection: "column",
    //   backgroundColor: "#7CA1B4",
    // }}
    >
      <TouchableOpacity
        onPress={() => {
          // randomNumber.value = withSpring(Math.random() * 350);
        }}
      >
        <Animated.Image
          source={require("./../assets/image/babysuper.png")}
          resizeMode="contain"
          // style={style}
        />
      </TouchableOpacity>
    </View>
  );
}

// const styles = StyleSheet.create({});
