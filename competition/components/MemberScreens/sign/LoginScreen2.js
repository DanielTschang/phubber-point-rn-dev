
import React from 'react';
import {Text, ScrollView, ImageBackground, Dimensions, View, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';



const LoginScreenTwo = ({navigation}) => {
    return(
        <ScrollView 
            style={{flex:1, backgroundColor:'#ffffff'}} 
            showsVerticalScrollIndicator={false}>

            {/* Brand View */}
            <ImageBackground 
                source={require("../../../static/img/bg-2.jpeg")}
                style={{height:Dimensions.get('window').height/2.5}}>
        
                <View style={styles.brandView}>
                    {/* <AA name='location-sharp' style ={{color:'#fffffff', fontSize:100}}></AA> */}
                    <Text style={styles.brandViewText}>Brand Name</Text>
                </View>
            </ImageBackground>

            {/* Bottom View */}

            <View style={styles.bottomView}>
                {/* Welcome View */}
                <View style={{padding:40}}>
                    <Text style={{color:"#4632A1", fontSize:35}}>Welcome</Text>
                    <Text>Dont have an account?
                        <Text style={{color:'red', fontSize:'italic'}}>Register now</Text>
                    </Text>

                    {/* Form Input View */}
                    <View style={{marginTop:50}}>

                    </View>

                </View>
            </View>

        </ScrollView>
    );
};

export default LoginScreenTwo

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
    bottomView:{
        flex:1.5,
        backgroundColor:'white',
        bottom:50,
        borderTopStartRadius:60,
        borderTopEndRadius:60
    }
})