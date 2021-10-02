import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../components/HomeScreens/HomeScreen';
import LoginScreen from '../components/LoginScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavi() {
  
  return (
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
    </Drawer.Navigator>
  );
}





