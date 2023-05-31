import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { color } from '../common/color';

const FormInput = props => {
  const { placeholder, label, error } = props;
  
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        <Text style={{ fontWeight: 'bold', color: color.color_white }}>{label}</Text>
        {error ? (
          <Text style={{ color: color.color_error, fontSize: 16 }}>{error}</Text>
        ) : null}
      </View>
      <TextInput {...props} placeholder={placeholder} style={styles.input} />
      
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    paddingLeft: 10,
    backgroundColor: "#eefbfb",
    borderRadius: 3,
    borderWidth: 2,
    borderColor: color.color_glass,
    marginBottom: 10,
  },
});

export default FormInput;
