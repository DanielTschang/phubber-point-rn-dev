import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Provider, useDispatch } from 'react-redux'
import { store } from './store';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootNavigator from './navigator/RootNavi';

const Stack = createNativeStackNavigator();
export default function App() {

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Root">
            <Stack.Screen name="Root" component={RootNavigator} options={{headerShown:false}}/>
          </Stack.Navigator>
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




      // <Provider store={store}>
      //     <NavigationContainer>
      //       <TabNavi/>
            
      //     </NavigationContainer> 
      // </Provider>