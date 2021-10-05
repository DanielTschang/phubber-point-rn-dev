
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { useSelector, useDispatch } from 'react-redux';
import { selectIsSignIn } from '../../../redux/slices/memberSlice';
import { selectMemberAccount ,selectIsInTable, selectMemberID, selectMemberPwd, setIsInTable } from '../../../redux/slices/memberSlice';

const Stack = createNativeStackNavigator();

export default function TableNavi() {
    const dispatch = useDispatch();
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
            dispatch(setIsInTable(boolean(result.message)));
        })
        .catch(error => console.log('error', error));
        
    }

    CheckTableState();
    
    return (
        <Stack.Navigator>
            {useSelector(selectIsInTable) == true ? (
                <>
                    <Stack.Screen component={}/>
                    <Stack.Screen component={}/>
                </>
            ) : (
                <>
                    <Stack.Screen component={}/>
                    <Stack.Screen component={}/>
                </>
            )}
        </Stack.Navigator>
  );
}





