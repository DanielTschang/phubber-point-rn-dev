
import React, { useEffect, useState } from 'react';
import {SafeAreaView,Text} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { selectMemberID, setCheckOut,setTableID, setIsInTable } from '../../../redux/slices/memberSlice';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';

const Stack = createNativeStackNavigator();

export default function CheckOutScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [result, setResult] = useState('not checked')
  const [pointgained, setPointGained] = useState(-1)
  const member_id = useSelector(selectMemberID)

  async function checkout(){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    let url = "https://phubber-point.herokuapp.com/table/checkout/" + member_id
    
    fetch(url , requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('check checkout')
        console.log(result)
        
        setPointGained(result.points)
        setResult('checked')
        dispatch(setTableID(null))
        dispatch(setIsInTable(false))
        
      })
      .catch(error => console.log('error', error));
  }

  useEffect(()=>{
    checkout()
  },[])
  return (
    <SafeAreaView>
        <Text>this is check out screen, {result}, {pointgained}</Text>
        <Button title="回首頁" onPress={()=> navigation.navigate('HomeNav')}/>
    </SafeAreaView>
  );
}

