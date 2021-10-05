
import React from 'react';
import {View,Text} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function CheckOutScreen() {
  return (
    <View>
        <Text>this is check out screen</Text>
    </View>
  );
}

