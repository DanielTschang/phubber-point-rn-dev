import React, { useState } from 'react';
import { Text, View, Button, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectMemberID ,selectIsSignIn, selectMemberName, selectMemberPoint, selectMemberPwd, setMemberName, setMemberPoint } from '../../../redux/slices/memberSlice';
import NavHistory from './NavHistory';




const HistoryScreen = () => {

  
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello, {useSelector(selectMemberName)}</Text>
            <NavHistory/>

        </SafeAreaView>
    );
  }

export default HistoryScreen;