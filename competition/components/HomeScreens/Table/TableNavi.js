
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { useSelector, useDispatch } from 'react-redux';
import { selectIsSignIn } from '../../../redux/slices/memberSlice';
import { selectMemberAccount ,selectIsInTable, selectMemberID, selectMemberPwd, setIsInTable } from '../../../redux/slices/memberSlice';

const Stack = createNativeStackNavigator();

export default function TableNavi() {
    const dispatch = useDispatch();
    const [tablestate, setTableState] = useState(false)
    const member_id = useSelector(selectMemberID);

    async function CheckTableState(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let url = "https://phubber-point.herokuapp.com/table/intable/" + member_id
        
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            setTableState(boolean(result.message))
        })
        .catch(error => console.log('error', error));
        
        tablestate ? dispatch(setIsInTable(true)): dispatch(setIsInTable(false));
    }

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





