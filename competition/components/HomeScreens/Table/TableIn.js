import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { useSelector, useDispatch } from 'react-redux';
import { selectIsSignIn, selectTableID } from '../../../redux/slices/memberSlice';
import { selectMemberID } from '../../../redux/slices/memberSlice';


const TableIn = () => {
    async function updatestate(statetype){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "TableID": useSelector(selectTableID),
            "MemberID": useSelector(selectMemberID),
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
    return(
        
    )
}


export default TableIn