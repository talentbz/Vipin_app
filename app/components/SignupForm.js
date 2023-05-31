import React, { useState } from 'react';
import {  StyleSheet } from 'react-native';
import { Box, Button, useToast } from 'native-base';
import { StackActions } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { isValidEmail, isValidObjField, updateError, showToast } from '../utils/methods';
import {postData} from '../api/client';
import { color } from '../common/color';
import FormContainer from './FormContainer';
import FormInput from './FormInput';

const validationSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Name is required!'),
  email: Yup.string().email('Invalid email!').required('Email is required!'),
  password: Yup.string()
    .trim()
    .min(6, 'Password is too short!')
    .required('Password is required!'),
  confirmPassword: Yup.string().equals(
    [Yup.ref('password'), null],
    'Password does not match!'
  ),
});

const SignupForm = ({ navigation }) => {
  const userInfo = {
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const toast = useToast();

  const { fullname, email, phone, password, confirmPassword } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // we will accept only if all of the fields have value
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);
    // if valid name with 3 or more characters
    if (!fullname.trim() || fullname.length < 3)
      return updateError('Invalid name!', setError);
    // only valid email id is allowed
    if (!isValidEmail(email)) return updateError('Invalid email!', setError);
    // password must have 8 or more characters
    if (!password.trim() || password.length < 8)
      return updateError('Password is less then 8 characters!', setError);
    // password and confirm password must be the same
    if (password !== confirmPassword)
      return updateError('Password does not match!', setError);

    return true;
  };

  const sumbitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(userInfo);
    }
  };

  const signUp = async (values, formikActions) => {
    setIsLoading(true);
    postData('api/register', { ...values })
    .then((response) => response.json())
    .then(result => {
      setIsLoading(false);
      console.log(result);
      let data = result;
      if(data.state == 200){
        navigation.dispatch(
          StackActions.push('VerifyEmail', {
            email: email,
          })
        );
        formikActions.resetForm();
        formikActions.setSubmitting(false);
      }else {
        toast.show({
          placement: "top",
          render: () => {
            return <Box bg={color.color_error} 
                    _text={{
                      fontSize: "md",
                      fontWeight: "medium",
                      color: "warmGray.50",
                      letterSpacing: "lg"
                    }}
                    px="2" py="1" rounded="md" mb={5}>
                    {data.msg}
                  </Box>;
          }
        });
      }
    })
    .catch(error => {
      setIsLoading(false);
      console.log(error);
      alert(error.toString());
      // toast.show({
      //   placement: "top",
      //   render: () => {
      //     return <Box bg={color.color_error} 
      //             _text={{
      //               fontSize: "md",
      //               fontWeight: "medium",
      //               color: "warmGray.50",
      //               letterSpacing: "lg"
      //             }}
      //             px="2" py="1" rounded="md" mb={5}>
      //             {'Can\'t find server!'}
      //           </Box>;
      //   }
      // });
    })
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { fullname, email, password, phone, confirmPassword } = values;
          return (
            <>
              <FormInput
                value={fullname}
                error={touched.fullname && errors.fullname}
                onChangeText={handleChange('fullname')}
                onBlur={handleBlur('fullname')}
                label='Full Name'
                placeholder='John Smith'
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                autoCapitalize='none'
                label='Email'
                placeholder='example@email.com'
              />
              <FormInput
                value={phone}
                error={touched.phone && errors.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                label='Phone'
                keyboardType='phone-pad'
                placeholder='3373350421'
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                autoCapitalize='none'
                secureTextEntry
                label='Password'
                placeholder='********'
              />
              <FormInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                autoCapitalize='none'
                secureTextEntry
                label='Confirm Password'
                placeholder='********'
              />
              {!isloading ?<Button submitting={isSubmitting} onPress={handleSubmit}>Sign up</Button>:
              <Button isLoading isLoadingText="Submitting"></Button>}
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default SignupForm;
