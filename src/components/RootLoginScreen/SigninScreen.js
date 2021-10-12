import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { setMemberAccount ,setIsSignIn, setMemberID, setMemberName, setMemberPoint, setMemberPwd } from '../../redux/slices/memberSlice';



const { height } = Dimensions.get("screen");
const height_logo = height * 0.28



const SignInScreen = ({navigation}) =>{
    const dispatch = useDispatch()
    const [errortext, setErrorText] = useState('')
    const [checkinputchange, setCheckInputChange] = useState(false)
    const [secureTextEntry, setSecureTextEntry] = useState(true)


    const [signindata, setSignInData] = useState({
            "account":'',
            "pwd":'',
    })

    const textInputChange = (val) =>{
        if(val.length !== 0){
            setSignInData({
                ...signindata,
                account:val,
            })
            setCheckInputChange(true)
        }
        else{
            setSignInData({
                ...signindata,
                account:val,
            })
            setCheckInputChange(false)
        }
    }

    const handlePassword = (val) => {
        setSignInData({
            ...signindata,
            pwd:val
        })
    };
    
    const updateSecureTextEntry = (val) =>{
        setSecureTextEntry(!secureTextEntry)
    };

    const SignIn = (data) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log(data.account)
        console.log(data.pwd)
        
        var raw = JSON.stringify({
 
            account: data.account,
            pwd: data.pwd
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
                dispatch(setMemberAccount(data.account))
                dispatch(setMemberID(result.member_id))
                dispatch(setMemberPwd(data.pwd))
                dispatch(setMemberName(result.last_name + ' '+ result.first_name))
                dispatch(setIsSignIn(true))
                dispatch(setMemberPoint(result.point))
                navigation.navigate('Root')
                console.log('aaa')
                
            }
            else{
                setErrorText(result.message)
            }
            })
            .catch(
            error => {console.log('error', error);
            });
        }





    return(

        <View style={styles.container}>


            <StatusBar backgroundColor='green' style="light"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome !</Text>
            </View>
            <Animatable.View 
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <Text style={styles.text_footer}>Username / Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Brandname@gmail.com"
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

                <Text style={[styles.text_footer,{marginTop:30}]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={26}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Your Password"
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

                <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={()=>SignIn(signindata)}>
                            <LinearGradient
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={styles.signIn}
                            >
                                <Text style={[styles.textSign,{color:'white'}]}>Sign In</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>navigation.navigate('SignUpScreen')}
                            style={[styles.signIn,{borderColor:'#4c669f', borderWidth:1,marginTop:15,}]}
                        >
                            <Text style={[styles.textSign,{color:"#4c669f"}]}>Sign Up</Text>
                            
                        </TouchableOpacity>

                </View>

                {/* Auth login */}
                
                
            </Animatable.View>
        </View>
        
    )



}

export default SignInScreen



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