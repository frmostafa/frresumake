import React from "react";
import { Text, StyleSheet, LinearGradient } from "react-native";
import { Skeleton } from "@rneui/themed";
import { View } from "react-native";

export default function ManageCvSkeleton() {
  return (
    <View style={styles.skeleton}>
      {/* <Stack row align="center" spacing={4}>  */}
         <Skeleton animation="wave" width={"100%"} height={380} />
         <Skeleton
        style={styles.skeletmargin}
          LinearGradientComponent={LinearGradient}
          animation="wave"
          width={200}
          height={50}
        />
        <Skeleton
        style={styles.skeletmargin}
          LinearGradientComponent={LinearGradient}
          animation="wave"
          width={"90%"}
          height={110}
          
        />
      
         <Skeleton
        style={styles.skeletmargin}
          LinearGradientComponent={LinearGradient}
          animation="wave"
          width={"90%"}
          height={100}
        />
           <Skeleton
        style={styles.skeletmargin}
          LinearGradientComponent={LinearGradient}
          animation="wave"
          width={"90%"}
          height={100}
        />
       
        {/* <Skeleton animation="none" width={80} height={40} />  */}
     {/* </Stack> */}
    </View>
  );
}

const styles = StyleSheet.create({
    skeleton : {
        alignItems :'center',
        justifyContent : 'space-between',
        flexDirection : "column"
    },
    skeletmargin : {
        marginVertical : 25,
        
    }
});
