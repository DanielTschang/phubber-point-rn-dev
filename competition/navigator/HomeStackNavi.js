
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../components/HomeScreens/HomeScreen';
import Detail from '../components/HomeScreens/Detail';

const Stack = createNativeStackNavigator();

export default function HomeStackNavi() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="Detail" component={Detail} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}





