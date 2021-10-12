import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePageScreen from './HomePageScreen';
import TableRootStackScreen from './Table/TableRoot';
import MenuScreen from './MenuScreen';
import HistoryScreen from './HistoryScreen';
import ExchangeScreen from './ExchangeScreen';
import MemberScreen from './MemberScreen';

const RootStack = createNativeStackNavigator()

const HomeRootStackScreen = ({navigation}) => {
    return(
        <RootStack.Navigator initialRouteName=""  >
            <RootStack.Screen name="HomePage" component={HomePageScreen} options={{headerShown:false}}/>
            <RootStack.Screen name="TableRoot" component={TableRootStackScreen} options={{headerShown:false}}/>
            <RootStack.Screen name="Menu" component={MenuScreen} options={{headerShown:false}}/>
            <RootStack.Screen name="History" component={HistoryScreen} options={{headerShown:false}}/>
            <RootStack.Screen name="Exchange" component={ExchangeScreen} options={{headerShown:false}}/>
            <RootStack.Screen name="Member" component={MemberScreen} options={{headerShown:false}}/>

        </RootStack.Navigator>
    )
}

export default HomeRootStackScreen;


{/* <RootStack.Screen name="" component={} options={{headerShown:false}}/> */}