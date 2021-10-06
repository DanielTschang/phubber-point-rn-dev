
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../components/HomeScreens/HomeScreen';
import Detail from '../components/HomeScreens/Detail';
import TableNavi from '../components/HomeScreens/Table/TableNavi';
import MenuScreen from '../components/HomeScreens/Menu/MenuScreen';
import TableIn from '../components/HomeScreens/Table/TableIn';
import TableNotIn from '../components/HomeScreens/Table/TableNotIn';
import CheckOutScreen from '../components/HomeScreens/Table/checkout';


const Stack = createNativeStackNavigator();

export default function HomeStackNavi() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown:false}}/>
        <Stack.Screen name="Detail" component={Detail}  options={{headerShown:false}}/>
        <Stack.Screen name="TableNavi" component={TableNavi} options={{headerShown:false}} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{headerShown:false}}/>
        <Stack.Screen name="TableIn"  component={TableIn}options={{headerShown:false}}/>
        <Stack.Screen name="CheckOut" component={CheckOutScreen}options={{headerShown:false}}/>
        <Stack.Screen name="TableNotIn" component={TableNotIn}options={{headerShown:false}}/>

    </Stack.Navigator>
  );
}





