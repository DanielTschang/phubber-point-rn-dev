
import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsSignIn, selectTableID } from '../../../redux/slices/memberSlice';
import { selectMemberAccount ,selectIsInTable, selectMemberID, selectMemberPwd, setIsInTable } from '../../../redux/slices/memberSlice';
import TableIn from './TableIn';
import CheckOutScreen from './checkout';
import TableNotIn from './TableNotIn';

import Detail from '../Detail';
import { Tab } from 'react-native-elements/dist/tab/Tab';

import TableFirst from './TableFirst';
import { useNavigation } from '@react-navigation/core';
import { View } from 'react-native';

const Get_requestOptions = {
    method: 'GET',
    redirect: 'follow'
};


const Stack = createNativeStackNavigator();

const TableNavi=()=> {
    const InTable = useSelector(selectIsInTable);
    const MemberID = useSelector(selectMemberID);
    const dispatch = useDispatch();
    const navigation = useNavigation()

    //set InTable
    async function CheckTableState(){
        let url = "https://phubber-point.herokuapp.com/table/intable/" + MemberID
        
        fetch(url, Get_requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log('checktableState : ')
            console.log(result.message)
            dispatch(setIsInTable(result.message));
        })
        .catch(error => console.log('error', error));
        
    }

    useEffect(()=>{
        CheckTableState();
        InTable == true ? navigation.navigate('TableIn') : navigation.navigate('TableNotIn')
    },[])

    

    return(
         <View></View>           
    )
}

export default TableNavi



