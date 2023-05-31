import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NativeBaseProvider, extendTheme, View } from "native-base";

import MainNavigator from './app/MainNavigator';
import LoginProvider from './app/context/LoginProvider';
import { color } from './app/common/color';

export default function App() {
  const newTheme = extendTheme({
    colors: {
      primary: {
        50: '#38d8d6',
        100: '#38d8d6',
        200: '#38d8d6',
        300: '#38d8d6',
        400: '#38d8d6',
        500: '#38d8d6',
        600: '#38d8d6',
        700: '#38d8d6',
        800: '#38d8d6',
        900: '#38d8d6',
      },
      background : 'red'
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  });
  return (
    <LoginProvider>
      <NativeBaseProvider theme={newTheme}>
        <NavigationContainer>
          <RootSiblingParent> 
            <MainNavigator />
          </RootSiblingParent>
        </NavigationContainer>
      </NativeBaseProvider>
        
    </LoginProvider>
  );
}
