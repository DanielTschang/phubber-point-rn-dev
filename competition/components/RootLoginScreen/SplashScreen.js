import { View, Text, Dimensions, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements/dist/icons/Icon'
import * as Animatable from 'react-native-animatable';
import { StatusBar } from 'expo-status-bar';



const { height } = Dimensions.get("window");
const height_logo = height * 0.28



const SplashScreen = ({navigation}) =>{

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='green' style="light"/>
            <ImageBackground 
                source={require("../../static/img/bg-2.jpeg")}
                style={{height:height/1.5}}>
                    
        
                <View style={styles.brandView}>
                    <Icon style={{marginBottom:10}} name="CodeSandbox" size={50} color="white" type="antdesign" />
                    <Animatable.Text
                        animation="bounceIn"

                        style={styles.brandViewText}
                    >
                        Phubber-Point
                    </Animatable.Text>
                </View>
            </ImageBackground>
            {/* <View style={styles.header}>
                <Image
                    source={require('../static/img/logo.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View> */}
            <Animatable.View 
                style={styles.footer}
                animation="fadeInUpBig"
                >
                <Text style={styles.title}>準備好開始了嗎 ？</Text> 
                <Text style={styles.text}>Sign in with your account</Text>
                

                    <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("SignInScreen")}>
                        <LinearGradient
                            // Button Linear Gradient
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={styles.loginBtn}>
                            <Text style={styles.loginText}>Get Started
                                <Icon style={{left:3, top:1.5}} size={15} name="right" color="white" type='antdesign'/>
                            </Text>
                            
                        </LinearGradient>
                    </TouchableOpacity>
                


            </Animatable.View>
        </View>
    )

}

export default SplashScreen

const styles = StyleSheet.create({
    brandView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    brandViewText:{
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        textTransform: 'uppercase',


    },
    loginBtn:{
        marginBottom:10,
        marginTop:10,
        width:"70%",
        borderRadius:20,
        height:40,
        top:10,
        left:65,

        alignItems:"center",
        justifyContent:"center",

    },
    container: {
      flex: 1, 
      backgroundColor: 'black'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:10
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold'
    }
  });