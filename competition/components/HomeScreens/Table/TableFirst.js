
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectCheckOut, selectIsInTable, selectMemberID, selectTableID, setIsInTable, setTableID } from '../../../redux/slices/memberSlice';

import { View,Text } from 'react-native';


const TableFirst=({navigation})=> {
    const dispatch = useDispatch();

    const InTableState = useSelector(selectIsInTable)
    const TableID = useSelector(selectTableID)

    const member_id = useSelector(selectMemberID);
    const table_id = useSelector(selectTableID)
    const checkout = useSelector(selectCheckOut)



    // async function Checkin(){
    //     let url = "https://phubber-point.herokuapp.com/table/takeSeat/"+ table_id+"/" + member_id

    //       fetch(url, Get_requestOptions)
    //         .then(response => response.json())
    //         .then(result => console.log('check in',result.message))
    //         .catch(error => console.log('error', error));
    // }

    useEffect(()=>{
        CheckTableState();
    });

    useEffect(()=>{
        if(checkout == false){
            if(TableID!=null){
                InTableState == true ? navigation.navigate('TableIn') : navigation.navigate('TableNotIn')
        }}
        return
    },)
    
    return (
        <View><Text>Loading</Text></View>
    )


    
}    


export default TableFirst





