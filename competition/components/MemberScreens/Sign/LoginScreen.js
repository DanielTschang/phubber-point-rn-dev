import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { setIsSignIn, setMemberID, setMemberName, setMemberPoint, setMemberPwd } from '../../../redux/slices/memberSlice';




export default function LoginScreen({navigation}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    

    function SignIn(username, password){

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "account": username,
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
          .then(result => {console.log(result.point)
            console.log(typeof result.point)
            if((typeof result.point) == 'number'){
                dispatch(setMemberID(username))
                dispatch(setMemberPwd(password))
                dispatch(setMemberName('New YoYoman'))
                dispatch(setIsSignIn(true))
                dispatch(setMemberPoint(result.point))
                navigation.navigate('Member')
            }
          })
          .catch(error => console.log('error', error));
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello this is Login Screen</Text>
            <Text>請輸入email/手機號碼</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                secureTextEntry
            />
            <Button title="Sign in" onPress={() => SignIn(username, password)} />
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


