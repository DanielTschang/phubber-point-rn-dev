import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView } from 'react-native';



export default function SignUpScreen({navigation}) {
    const [lastname, setLastName] = useState('');
    const [firstname, setFirstName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_comfirm, setPasswordComform] = useState('');
    const [email, setEmail] = useState('');

    const [signupinfo, setSignUpInfo] = useState('happy')

    function SignUp(username, password, password_comfirm, firstname, lastname, email){
    
        if (password_comfirm !== password){
            setSignUpInfo('密碼與確認密碼不相同');
            console.log('error')
        }
        else{
        
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({
            "account": username,
            "pwd": password,
            "first_name":firstname,
            "last_name":lastname,
            "email":email
            });
            
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            
            fetch("https://phubber-point.herokuapp.com/member/account/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.message)
                if(result.message=="Account created!"){
                    navigation.navigate("MemberNavi")
                }
            }
            )
            .catch(error => console.log('error', error));
    }   
    }


    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello this is SignUp Screen</Text>

            <TextInput
                placeholder="姓"
                value={lastname}
                onChangeText={setLastName}
            />
            <TextInput
                placeholder="名"
                value={firstname}
                onChangeText={setFirstName}
            />

            <TextInput
                placeholder="帳號"
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
            />

            <TextInput
                placeholder="email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
            />
            <TextInput
                placeholder="密碼"
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                secureTextEntry
            />
            <TextInput
                placeholder="密碼確認"
                value={password_comfirm}
                onChangeText={setPasswordComform}
                autoCapitalize='none'
                secureTextEntry
            />

            <Button title="Sign Up" onPress={() => SignUp( username, password, password_comfirm, firstname, lastname, email)} />

            <Text>{signupinfo}</Text>

        </SafeAreaView>
    );
  }


const styles = StyleSheet.create({
    text:{
        color: 'purple',
    }
})