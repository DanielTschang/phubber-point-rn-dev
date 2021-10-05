import React, {useRef, useEffect, useState} from 'react';
import { AppState, StyleSheet, Safe } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux'

import HomeStackNavi from './HomeStackNavi';
import MemberNavi from './MemberNavi';
import { setScreenState } from '../redux/slices/memberSlice';

const Tab = createBottomTabNavigator();

export default function TabNavi() {
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
            // if(nextAppState == 'inactive'){
            //     console.log(new Date());
            //     setFirstTime(new Date());
            // }
            // if(nextAppState == 'background'){
            //     console.log(new Date());
            //     setSecondTime(new Date());
            //     console.log(secondtime-firsttime)
            // }
            // if(nextAppState == 'active'){
            //     setFirstTime(null)
            //     setSecondTime(null)
            // }
            
        appState.current = nextAppState;
        console.log(appState.current)
        if(appState.current!='background'){
          dispatch(setScreenState(appState.current))
        }
      };
    
    
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeNav" component={HomeStackNavi} options={{headerShown:false}} />
            <Tab.Screen name="Member" component={MemberNavi} options={{headerShown:false}} />
        </Tab.Navigator>
  );
}





