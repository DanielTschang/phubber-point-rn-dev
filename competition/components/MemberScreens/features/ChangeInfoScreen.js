import React from 'react';
import { Text, View, Button, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectMemberID ,selectIsSignIn, selectMemberName, selectMemberPoint, selectMemberPwd, setMemberName, setMemberPoint } from '../../../redux/slices/memberSlice';




const ChangeInfoScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello, {useSelector(selectMemberName)}</Text>
            <Text>這裡預計放修改資料的功能</Text>

        </SafeAreaView>
    );
  }

export default ChangeInfoScreen;