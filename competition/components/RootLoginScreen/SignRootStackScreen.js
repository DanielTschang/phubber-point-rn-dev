import React from 'react';


import SplashScreen from './SplashScreen';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SigninScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator()

const SignRootStackScreen = ({navigation}) => {
    return(
        <RootStack.Navigator initialRouteName="SplashScreen"  >
            <RootStack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}}/>
            <RootStack.Screen name="SignInScreen" component={SignInScreen} options={{headerShown:false}}/>
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown:false}}/>     
        </RootStack.Navigator>
    )
}

export default SignRootStackScreen;