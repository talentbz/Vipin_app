import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Animated,
} from 'react-native';

const FormSelectorBtn = ({ title, borderBottomColor, color, style, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.container, style, { borderBottomColor }]}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: '50%',
    backgroundColor: '#fff1',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { color: 'white', fontSize: 14 },
});

export default FormSelectorBtn;
