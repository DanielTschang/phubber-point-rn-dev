
import React from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { useSelector, useDispatch } from 'react-redux';
import { selectIsSignIn } from '../../../redux/slices/memberSlice';
import { selectIsInTable, selectMemberID, selectMemberPwd, setIsInTable } from '../../../redux/slices/memberSlice';

const Stack = createNativeStackNavigator();

async function CheckTableState(){
    //CallAPi 
    let tablestate=true;
    console.log('TableStateCheck')
    
    tablestate ? dispatch(setIsInTable(true)): dispatch(setIsInTable(false));
}

export default function TableNavi() {
    const dispatch = useDispatch();
    const username = useSelector(selectMemberID);
    const pwd = useSelector(selectMemberPwd);

    CheckTableState();
    
    return (
        
        useSelector(selectIsInTable) == true ? (
            <View>
                <Text>yoyo</Text>
            </View>
        ) : (
            <View>
                <Text>yoyo111</Text>
            </View>
        )
  );
}





