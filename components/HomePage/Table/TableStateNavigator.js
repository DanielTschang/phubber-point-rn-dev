
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsInTable, selectMemberID, setIsInTable } from '../../../redux/slices/memberSlice';

import TableIn from './TableInScreen';
import TableCheckOutScreen from './TableCheckOutScreen';
import TableNotIn from './TableNotInScreen';

const GET_requestOptions = {
    method: 'GET',
    redirect: 'follow'
};


const Stack = createNativeStackNavigator();

const TableStateNavigator=()=> {
    const InTable = useSelector(selectIsInTable);
    const MemberID = useSelector(selectMemberID);
    const dispatch = useDispatch();

    //set InTable
    async function CheckTableState(){
        let url = "https://phubber-point.herokuapp.com/table/intable/" + MemberID
        
        fetch(url, GET_requestOptions)
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
        
    },[])

    

    return(
        <Stack.Navigator>
         {InTable == true ?(
            <>
            <Stack.Screen name="TableIn" component={TableIn} options={{ headerShown: false }} />
            <Stack.Screen name="TableCheckOut" component={TableCheckOutScreen} options={{ headerShown: false }} />
            </>

         ):(
            <>
            <Stack.Screen name="TableNotIn" component={TableNotIn} options={{headerShown:false}}/>
            </>
         )
         }  
         </Stack.Navigator>  
    )
}

export default TableStateNavigator



