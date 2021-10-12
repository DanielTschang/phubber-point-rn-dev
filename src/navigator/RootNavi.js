
import React, { useEffect, useRef, useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSignIn, setScreenState } from '../redux/slices/memberSlice';
import SignRootStackScreen from '../components/RootLoginScreen/SignRootStackScreen';
import HomeRootStackScreen from '../components/HomePage/HomeRootStackScreen';
import { AppState } from 'react-native';


const Stack = createNativeStackNavigator();

const RootNavigator =({navigation})=> {
    const SignIn = useSelector(selectIsSignIn)

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    // const [firsttime, setFirstTime ] = useState(null);
    // const [secondtime, setSecondTime] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        AppState.addEventListener('change', _handleAppStateChange);
  
        return () => {
          AppState.removeEventListener('change', _handleAppStateChange);
        };
      }, []);
  
        const _handleAppStateChange = (nextAppState) => {

            
        appState.current = nextAppState;
        console.log(appState.current)
        if(appState.current!='background'){
          dispatch(setScreenState(appState.current))
        }
      };


    return (
        <Stack.Navigator >
            {SignIn == true ? (
                <>
                <Stack.Screen name="HomeRoot" component={HomeRootStackScreen} options={{headerShown:false}}/>
                </>
            ) : (
                <>
                <Stack.Screen name="SignRoot" component={SignRootStackScreen} options={{headerShown:false}}/>
                </>
            )}
        </Stack.Navigator>
  );
}

export default RootNavigator