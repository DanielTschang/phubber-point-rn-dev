
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { useSelector, useDispatch } from 'react-redux';
import { selectIsSignIn } from '../../../redux/slices/memberSlice';
import { selectMemberAccount ,selectIsInTable, selectMemberID, selectMemberPwd, setIsInTable } from '../../../redux/slices/memberSlice';

const Stack = createNativeStackNavigator();

export default function TableNavi() {
    const dispatch = useDispatch();
    const [tablestate, setTableState] = useState(false)
    const member_id = useSelector(selectMemberID);
    const [statehistory, setStateHistory] = useState([])

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

    async function UpdateCurrentState(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://phubber-point.herokuapp.com/table/state/", requestOptions) + member_id
            .then(response => response.json())
            .then(result => {result.data})
            .catch(error => console.log('error', error));
    }

    CheckTableState();
    
    return (
        <Stack.Screen>
            {useSelector(selectIsInTable) == true ? (
                <>
                    {setInterval(UpdateCurrentState(), 3000)}
                    <View>
                        
                    </View>
                </>
            ) : (
                <>
                    <View>
                        <Text>尚未入桌，請跟櫃檯人員確認是否已分配座位給您
                        </Text>
                        <Button title='QR code' onPress={()=>{}}/>
                        <Button title='refresh' onPress={()=>CheckTableState()} />
                    </View>
                </>
            )}
        </Stack.Screen>
  );
}





