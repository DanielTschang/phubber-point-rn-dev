import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TableStateNavigator from './TableStateNavigator';
import TableNotIn from './TableNotInScreen';
import TableIn from './TableInScreen';


const RootStack = createNativeStackNavigator()

const TableRootStackScreen = ({navigation}) => {
    return(
    // <Drawer.Navigator initialRouteName="Home">
    //     <Drawer.Screen name="Home" component={HomeScreen} />
    // <Drawer.Screen name="Login" component={LoginScreen} />
    // </Drawer.Navigator>
        <RootStack.Navigator initialRouteName="TableNavi"  >
            <RootStack.Screen name="TableNavi" component={TableStateNavigator} options={{headerShown:false}}/>
        </RootStack.Navigator>
    )
}

export default TableRootStackScreen;


{/* <RootStack.Screen name="" component={} options={{headerShown:false}}/> */}