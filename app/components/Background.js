import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Box } from 'native-base';
import { color } from '../common/color';
import LinearGradient from 'react-native-linear-gradient';

const Background  = ({ children }) => {
    
    return (
      <Box style={{ flex: 1 }} safeAreaTop safeAreaBottom >
        <LinearGradient
          colors={['red', 'yellow', 'green' ]}
        >
            <StatusBar
            backgroundColor={color.color_background}
            barStyle={'light-content'}
            />
            <Box flex={1} backgroundColor={color.color_background}>
            {children}
            </Box>
        </LinearGradient>
      </Box>
    );
  };
  
  export default Background;
