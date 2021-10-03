
import React from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { useSelector, useDispatch } from 'react-redux';
import { selectIsSignIn } from '../../../redux/slices/memberSlice';
import { selectIsInTable, selectMemberID, selectMemberPwd, setIsInTable } from '../../../redux/slices/memberSlice';

const Stack = createNativeStackNavigator();


export default function TableNavi() {
    const dispatch = useDispatch();
    const username = useSelector(selectMemberID);
    const pwd = useSelector(selectMemberPwd);
    

    async function CheckTableState(){
        let tablestate=true;
        //CallAPi 
        
        tablestate ? dispatch(setIsInTable(true)): dispatch(setIsInTable(false));
    }
    CheckTableState()

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





