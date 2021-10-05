import React from 'react';
import { StyleSheet, Safe } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import TabNavi from './navigator/TabNavi';
import HomeStackNavi from './navigator/HomeStackNavi'
import { Provider } from 'react-redux'
import { store } from './store'
// import Test from './test';
import { useDispatch } from 'react-redux';

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


