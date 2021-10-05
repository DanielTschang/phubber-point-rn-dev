import React, {useRef, useEffect, useState} from 'react';
import { AppState, StyleSheet, Safe } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import TabNavi from './navigator/TabNavi';
import HomeStackNavi from './navigator/HomeStackNavi'
import { Provider, useDispatch } from 'react-redux'
import { store } from './store'

import useAppState from 'react-native-appstate-hook';


export default function App() {

    return (
      <Provider store={store}>
          <NavigationContainer>
            <TabNavi/>
          </NavigationContainer> 
      </Provider>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



      // <NavigationContainer>
      //   <TabNavi/>
      // </NavigationContainer> 


