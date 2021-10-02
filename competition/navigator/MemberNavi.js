
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../components/MemberScreens/sign/LoginScreen';
import SignUpScreen from '../components/MemberScreens/sign/SignUpScreen';

import FeatureHomeScreen from '../components/MemberScreens/features/FeatureHomeScreen';
import ChangeInfoScreens from '../components/MemberScreens/features/ChangeInfoScreen'
import { useSelector } from 'react-redux';
import { selectIsSignIn } from '../redux/slices/memberSlice';
import HistoryScreen from '../components/MemberScreens/features/HistoryScreens';

const Stack = createNativeStackNavigator();

export default function MemberNavi() {
    return (
        <Stack.Navigator>
            {useSelector(selectIsSignIn) == true ? (
                <>
                <Stack.Screen name="FeatureHome" component={FeatureHomeScreen} />
                <Stack.Screen name="ChangeInfo" component={ChangeInfoScreens} />
                <Stack.Screen name="History" component={HistoryScreen}/>
                </>
            ) : (
                <>
                <Stack.Screen name="SignIn" component={LoginScreen} options={{headerShown:false}} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}} />
                </>
            )}
        </Stack.Navigator>
  );
}





