import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackNavi from './HomeStackNavi';
import MemberNavi from './MemberNavi';

const Tab = createBottomTabNavigator();

export default function TabNavi() {
    
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeNav" component={HomeStackNavi} options={{headerShown:false}} />
            <Tab.Screen name="Member" component={MemberNavi} options={{headerShown:false}} />
        </Tab.Navigator>
  );
}





