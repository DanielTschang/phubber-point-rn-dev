import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';
import React, { useState } from 'react';

import { FontAwesome, Feather } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements/dist/icons/Icon'
import * as Animatable from 'react-native-animatable';
import { background, style } from 'styled-system';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { setMemberAccount ,setIsSignIn, setMemberID, setMemberName, setMemberPoint, setMemberPwd } from '../../redux/slices/memberSlice';




const SignUpScreen = () =>{
    const dispatch = useDispatch()
    const [errortext, setErrorText] = useState('')
    const [checkinputchange, setCheckInputChange] = useState(false)
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true)


    const [signupdata, setSignUpData] = useState({
            "account":'',
            "pwd":'',
            "confirmpwd":'',
            "first_name":'',
            "last_name":'',
    })

    const textInputChange = (val) =>{
        if(val.length !== 0){
            setSignUpData({
                ...signupdata,
                account:val,
            })
            setCheckInputChange(true)
        }
        else{
            setSignUpData({
                ...signupdata,
                account:val,
            })
            setCheckInputChange(false)
        }
    }

    const handlePassword = (val) => {
        setSignUpData({
            ...signupdata,
            pwd:val
        })
        if (val != signupdata.confirmpwd){
            setErrorText("密碼與確認密碼不同！")
        }
        else{
            setErrorText("")
        }
    };

    const handleConfirmPassword = (val) => {
        setSignUpData({
            ...signupdata,
            confirmpwd:val
        })
        if (val != signupdata.pwd){
            setErrorText("'密碼'與'確認密碼' 不同！")
        }
        else{
            setErrorText("")
        }

    };
    
    const updateSecureTextEntry = (val) =>{
        setSecureTextEntry(!secureTextEntry)
    };
    const updateSecureTextEntryConfirm = (val) =>{
        setSecureTextEntryConfirm(!secureTextEntryConfirm)
    };

    const SignUp = (data) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if(data.pwd != data.confirmpwd){
            setErrorText("請把'密碼'或'確認密碼' 更正！")
        }

        var raw = JSON.stringify({
        "account": data.account,
        "pwd": data.pwd,
        "email": data.account,
        "first_name": data.first_name,
        "last_name": data.last_name,
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
            if(result.message=="Account created!"){
                dispatch(setMemberAccount(data.account))
                dispatch(setMemberID(result.member_id))
                dispatch(setMemberPwd(data.pwd))
                dispatch(setMemberName(data.last_name + ' '+ data.first_name))
                dispatch(setIsSignIn(true))
                navigation.navigate('Root')
            }
            else{
                setErrorText("註冊失敗，請再檢查輸入資料！")
            }
            
        })
        .catch(error => {
            console.log('error', error)
            setErrorText("註冊失敗，伺服器有問題！")
        });
    }



    return(
        <View style={styles.container}>

        <StatusBar backgroundColor='green' style="light"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now !</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            {/* 帳號 */}
            <Text style={styles.text_footer}>Username / Email</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="帳號 / Email"
                    autoCapitalize="none"
                    onChangeText={(val)=> textInputChange(val)}
                />
                {checkinputchange ?
                <Animatable.View animation="bounceIn">
                    <Feather
                        name="check-circle"
                        color="blue"
                        size={20}
                    />
                </Animatable.View>
                 : null}
                
            </View>

                        {/* 姓名 */}
                        <View style={{flexDirection:"row"}}>
                <View style={{flexDirection:"column", flex:1}}>
                    <Text style={[styles.text_footer,{marginTop:30}]}>First Name</Text>
                    <View style={[styles.action,{right:5}]}>
                        {/* <FontAwesome
                            name="lock"
                            color="#05375a"
                            size={26}
                        /> */}
                        <TextInput
                            style={styles.textInput}
                            placeholder="名"
                            autoCapitalize="none"
                            onChangeText={(val)=>{}}
                        />
                    </View>
                </View>
                <View style={{flexDirection:"column", flex:1}}>
                    <Text style={[styles.text_footer,{marginTop:30}]}>Last Name</Text>
                    <View style={[styles.action,{right:5}]}>
                        {/* <FontAwesome
                            name="lock"
                            color="#05375a"
                            size={26}
                        /> */}
                        <TextInput
                            style={styles.textInput}
                            placeholder="姓"
                            autoCapitalize="none"
                            onChangeText={(val)=>{}}
                        />
                    </View>
                </View>
            </View>


            {/* 密碼 */}
            <Text style={[styles.text_footer,{marginTop:30}]}>Password</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="lock"
                    color="#05375a"
                    size={26}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="密碼"
                    autoCapitalize="none"
                    secureTextEntry={secureTextEntry ? true: false}
                    onChangeText={(val)=>handlePassword(val)}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                    {secureTextEntry ? 
                    <Feather
                        name= "eye-off"
                        color="blue"
                        size={20}
                    /> :
                    <Feather
                        name= "eye"
                        color="blue"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            {/* 確認密碼 */}
            <Text style={[styles.text_footer,{marginTop:30}]}>Confirm Password</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="lock"
                    color="#05375a"
                    size={26}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="確認密碼"
                    autoCapitalize="none"
                    secureTextEntry={secureTextEntryConfirm ? true: false}
                    onChangeText={(val)=>handleConfirmPassword(val)}
                />
                <TouchableOpacity onPress={updateSecureTextEntryConfirm}>
                    {secureTextEntryConfirm ? 
                    <Feather
                        name= "eye-off"
                        color="blue"
                        size={20}
                    /> :
                    <Feather
                        name= "eye"
                        color="blue"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            {/* 確認密碼文字 */}
            <View style={{alignItems:'center', top:15, }}>
                <View style={{flexDirection:"row"}}>
                    {errortext !="" ? 
                    <Feather name="alert-circle" color="red" size={15} style={{marginRight:5}}/>
                    : null
                    }  
                    <Text style={{color:'red'}}>{errortext}</Text>
                </View>
            </View>



            <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={()=>SignUp(signupdata)}>
                        <LinearGradient
                        colors={['#4c669f', '#3b5998', '#192f6a']}
                        style={styles.signIn}
                        >
                            <Text style={[styles.textSign,{color:'white'}]}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>



            </View>


            
            
        </Animatable.View>
  
    </View>
)



}

export default SignUpScreen



const styles = StyleSheet.create({
container: {
  flex: 1, 
  backgroundColor: 'black'
},
header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
},
footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
},
text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
},
text_footer: {
    color: '#05375a',
    fontSize: 18
},
action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},
actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
},
textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
},
errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},
button: {
    alignItems: 'center',
    marginTop: 50
},
signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
    fontSize: 21,
    fontWeight: 'bold'
}
});