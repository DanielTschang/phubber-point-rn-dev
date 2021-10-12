import React, {useRef, useEffect, useState} from 'react';
import { AppState, StyleSheet, Safe } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux'

import { Icon } from 'react-native-elements/dist/icons/Icon'
import tw from 'tailwind-react-native-classnames'

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

            
        appState.current = nextAppState;
        console.log(appState.current)
        if(appState.current!='background'){
          dispatch(setScreenState(appState.current))
        }
      };
    

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeNav') {
              iconName = focused
                ? 'appstore1'
                : 'appstore-o';
            } else if (route.name === 'Member') {
              iconName = focused ? 'smileo' : 'meh';
            }

            // You can return any component that you like here!
            return <Icon
            name={iconName} color={color} size={size} type='antdesign'/>;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
            <Tab.Screen name="HomeNav" component={HomeStackNavi} options={{headerShown:false}} />
            <Tab.Screen name="Member" component={MemberNavi} options={{headerShown:false}} />
        </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  icon:{
    width:40,
  },
})




