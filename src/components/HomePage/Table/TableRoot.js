import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TableStateNavigator from './TableStateNavigator';


const RootStack = createNativeStackNavigator()

const TableRootStackScreen = ({navigation}) => {
    return(
        <RootStack.Navigator initialRouteName="TableNavi"  >
            <RootStack.Screen name="TableNavi" component={TableStateNavigator} options={{headerShown:false}}/>
        </RootStack.Navigator>
    )
}

export default TableRootStackScreen;


{/* <RootStack.Screen name="" component={} options={{headerShown:false}}/> */}