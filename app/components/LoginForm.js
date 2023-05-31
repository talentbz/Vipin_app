import React, { useState } from 'react';
import {  StyleSheet, Text } from 'react-native';
import { Button } from 'native-base';
import { postData} from '../api/client';
import { useLogin } from '../context/LoginProvider';
import { isValidEmail, isValidObjField, updateError } from '../utils/methods';
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import { color } from '../common/color';

const LoginForm = () => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const { email, password } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);

    if (!isValidEmail(email)) return updateError('Invalid email!', setError);

    if (!password.trim() || password.length < 6)
      return updateError('Password is too short, must be bigger than 6 characters! ', setError);

    return true;
  };

  const submitForm = () => {
    if (isValidForm()) {
      try {
        setIsLoading(true);
        postData('api/login', { ...userInfo })
        .then((response) => response.json())
        .then(result => {
          setIsLoading(false);
          console.log(result);
          let data = result;
          if(data.state == 200){
            setUserInfo({ email: '', password: '' });
            setProfile(result);
            setIsLoggedIn(true);
          }else {
            updateError(data.msg, setError);
          }
        })
        .catch(error => {
          console.log(error);
          setIsLoading(false);
          alert(error)
        });
      } catch(error)  {
        console.log(error);
        setIsloading(false);
        updateError('Can\'t find server!', setError);
      }
    }
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: color.color_error, fontSize: 18, textAlign: 'center' }}>
          {error}
        </Text>
      ) : <></>}
      <FormInput
        value={email}
        onChangeText={value => handleOnChangeText(value, 'email')}
        label='Email'
        placeholder='example@email.com'
        autoCapitalize='none'
      />
      <FormInput
        value={password}
        onChangeText={value => handleOnChangeText(value, 'password')}
        label='Password'
        placeholder='********'
        autoCapitalize='none'
        secureTextEntry
      />
      {!isloading ?<Button onPress={submitForm}><Text style={{color: '#fff'}}>Login</Text></Button>:
      <Button isLoading isLoadingText="Submitting"></Button>}
      
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;
