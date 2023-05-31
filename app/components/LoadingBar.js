import React from "react";
import { View, Spinner, Text, HStack, Box } from "native-base";
import {Dimensions} from 'react-native';
let { height: screenHeight } = Dimensions.get("window");
screenHeight = screenHeight - 300;

export const Message = props => {
  return (
    <View
      style={{
        flex: 1,
        height: screenHeight,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {props.children}
    </View>
  );
};

export const SpinnerScreen = () => {
  return (
    <Box width='100%' height='100%' bg='#bbb' style={{ flex: 1, justifyContent: "center", zIndex:100, position:'absolute',top: 0, left:0, right:0 }}>
      <HStack space={2} justifyContent="center">
        <Spinner size='lg' accessibilityLabel="Loading posts" />
      </HStack>
    </Box>
  );
};