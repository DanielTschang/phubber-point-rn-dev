import React from 'react';
import { Text, View, Button, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectMemberAccount ,selectMemberID ,selectIsSignIn, selectMemberName, selectMemberPoint, selectMemberPwd, setMemberName, setMemberPoint } from '../../../redux/slices/memberSlice';




const FeatureHomeScreen = ({navigation}) => {

    const account = useSelector(selectMemberAccount);
    const pwd = useSelector(selectMemberPwd);

    const dispatch = useDispatch();

    function UpdateInfo(account, password){

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "account": account,
          "pwd": password
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://phubber-point.herokuapp.com/member/login/", requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.message == 'success'){
                dispatch(setMemberName(result.last_name + ' ' + result.first_name))
                dispatch(setMemberPoint(result.point))
            }
          })
          .catch(error => console.log('error', error));
    }
    


    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="reload" onPress={()=>UpdateInfo(account,pwd)}/>
            <Text>Hello, {useSelector(selectMemberName)}</Text>
            <Text>您目前總共有 : {useSelector(selectMemberPoint)} 點</Text>
            <Button title="修改資料" onPress={()=>{navigation.navigate('ChangeInfo')}}/>
            <Button title="用餐紀錄" onPress={()=>{navigation.navigate('History')}}/>
        </SafeAreaView>
    );
  }

export default FeatureHomeScreen;