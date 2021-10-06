import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, StyleSheet, Text, SafeAreaView, Button } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { useSelector, useDispatch } from 'react-redux';
import { selectIsSignIn, selectMemberName, selectTableID, selectScreenState } from '../../../redux/slices/memberSlice';
import { selectMemberID } from '../../../redux/slices/memberSlice';


const TableIn = ({navigation}) => {
    const screen = useSelector(selectScreenState)
    const memberid = useSelector(selectMemberID)
    const tableid = useSelector(selectTableID)
    const [history, setHistory] = useState([])
    

    async function updatestate(statetype){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "TableID": tableid,
            "MemberID": memberid,
            "State": statetype
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://phubber-point.herokuapp.com/table/state/", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
        updatestate(screen)
    }, [screen])

    return(
        <SafeAreaView>
            <Text>
                Hello, {useSelector(selectMemberName)};
            </Text>
            <Button title="結帳" onPress={()=>navigation.navigate('CheckOut')} />
        </SafeAreaView>
    )
}


export default TableIn