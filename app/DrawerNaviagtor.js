import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Home from './screens/Home';
import Scanner from './screens/Scanner';
import { getData } from './api/client';
import HistoryScreen from './screens/HistoryScreen';
import { useLogin } from './context/LoginProvider';
import { color } from './common/color';

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const { setIsLoggedIn, profile } = useLogin();

  const logout = () => {
    getData('api/mobilelogout')
    .then((response)=> response.json())
    .then(result => {
      console.log(result);
      let data = result;
      if(data.state == 200){
        setIsLoggedIn(false);
      }else {
        console.log(result);
      }
    })
  }
  
  
  return (
    <View style={{ flex: 1, backgroundColor: color.color_background }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            borderRadius: 7,
            backgroundColor: color.color_white,
            margin: 5,
            marginBottom: 20,
          }}
        >
          <View>
            <Text style={{color: color.color_success, fontWeight: '700', fontSize: 18}}>{profile.name}</Text>
            <Text style={{color: color.color_success}} >{profile.email}</Text>
          </View>
          <Image
            source={{
              uri:
                profile.avatar ||
                'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            }}
            style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor:color.color_success }}
          />
        </View>
        <DrawerItemList {...props} activeTintColor='#fff' activeBackgroundColor={color.color_primary} inactiveTintColor='rgba(0, 0, 0, .87)' inactiveBackgroundColor='transparent' style={{backgroundColor: '#000000'}} labelStyle={{color: '#ffffff'}}/>
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          padding: 20,
          backgroundColor: color.color_glass,
        }}
        onPress={() => logout()}
      >
        <Text style={{color: 'white'}}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: color.color_background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: '',
      }}
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName='Home'
    >
      <Drawer.Screen component={Home} name='HOME' />
      <Drawer.Screen component={Scanner} name='SCAN' />
      {/* <Drawer.Screen component={ResultScreen} name='ResultScreen' /> */}
      <Drawer.Screen component={HistoryScreen} name='SCAN HISTORY' />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
