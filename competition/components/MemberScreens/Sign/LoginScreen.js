import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { setMemberAccount ,setIsSignIn, setMemberID, setMemberName, setMemberPoint, setMemberPwd } from '../../../redux/slices/memberSlice';




export default function LoginScreen({navigation}) {
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    

    function SignIn(account, password){

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
            if((result.message) === 'success'){
                dispatch(setMemberAccount(account))
                dispatch(setMemberID(result.member_id))
                dispatch(setMemberPwd(password))
                dispatch(setMemberName(result.last_name + ' '+ result.first_name))
                dispatch(setIsSignIn(true))
                dispatch(setMemberPoint(result.point))
                navigation.navigate('Member')
            }
          })
          .catch(
            error => {console.log('error', error);
          });
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello this is Login Screen</Text>
            <Text>請輸入email/手機號碼</Text>
            <TextInput
                placeholder="Username"
                value={account}
                onChangeText={setAccount}
                autoCapitalize='none'
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                secureTextEntry
            />
            <Button title="Sign in" onPress={() => SignIn(account, password)} />
            <Button
            title="Sign Up"
            onPress={() => navigation.navigate("SignUp")} // We added an onPress event which would navigate to the About screen
            />
        </SafeAreaView>
    );
  }


const styles = StyleSheet.create({
    text:{
        color: 'purple',
    }
})


