
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setMemberAccount ,setIsSignIn, setMemberID, setMemberName, setMemberPoint, setMemberPwd } from '../../../redux/slices/memberSlice';
import { UserOutlined } from '@ant-design/icons';

export default function LoginScreen({navigation}) {
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const [errortext, setErrorText] = useState('')

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
            else{
              setErrorText(result.message)
            }
          })
          .catch(
            error => {console.log('error', error);
          });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri:"https://links.papareact.com/gzs"}} />
      
            <StatusBar style="auto" />

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Account / Email"
                value={account}
                onChangeText={setAccount}
                autoCapitalize='none'
            /></View>
            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                secureTextEntry
            /></View>
            <TouchableOpacity>
              <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.errortextBlock}>
              <Text>{errortext}</Text>
            </View>
            
            

            <TouchableOpacity style={styles.loginBtn} onPress={() => SignIn(account, password)}>
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.forgot_button}>Sign Up?</Text>
            </TouchableOpacity>

        </View>
    );
  }


const styles = StyleSheet.create({
    errortextBlock:{
      backgroundColor:"#E1BCC6",
    },
    image: {
      marginBottom: 40,
      width:100,
      height:100,
      resizeMode: 'contain',
    },
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },

    inputView: {
      backgroundColor: "#7DD1FA",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
    
    TextInput: {
      height: 50,
      flex: 1,
      padding: 5,
      marginLeft: 10,
    },
    forgot_button: {
      height: 30,
      marginBottom: 25,
    },
    loginBtn:{
      marginBottom:10,
      width:"80%",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      backgroundColor:"#7DD1FA",
    }
})


