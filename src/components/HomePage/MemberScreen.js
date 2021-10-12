import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMemberAccount ,selectMemberID ,selectIsSignIn, selectMemberName, selectMemberPoint, selectMemberPwd, setMemberName, setMemberPoint } from '../../redux/slices/memberSlice';
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { Text, Button ,View, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


import * as Animatable from 'react-native-animatable';




const MemberScreen = ({navigation}) => {

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
    


    return(
      <View style={styles.container}>
      {/* Header */}
          <View
              style={{
                  flexDirection:"row",
                  marginTop:70,
                  alignItems:'center',
                  paddingHorizontal:25,
          }}
          >
              <Icon name="menu" size={30} color="white" style={{width:20,marginBottom:30}}/>
              <View style={[styles.brandView,{flexDirection:'column',marginLeft:40,marginTop:10}]}>
                  <Icon style={{marginBottom:10}} name="CodeSandbox" size={50} color="white" type="antdesign" />
                  <Animatable.Text
                              animation="bounceIn"
                              style={styles.brandViewText}
                          >
                              Phubber-Point
                  </Animatable.Text>
              </View>
              <Icon onPress={()=>navigation.navigate('member')} name="account-circle" size={33} color="white" style={{marginLeft:20,marginBottom:30}}/>
          </View>
      {/* Footer */}
      <View style={styles.footer}> 
      <Icon style={{marginLeft:300, marginTop:30}} name="reload1" color='blue' type="antdesign" size={30} onPress={()=>UpdateInfo(account,pwd)}/> 
      <View style={{ alignItems: 'center', justifyContent: 'center' , marginTop:30}}>
            
            <Text style={styles.footer_text}>Hello, {useSelector(selectMemberName)}</Text>
            <Text style={styles.footer_text}>您目前總共有 : {useSelector(selectMemberPoint)} 點</Text>
        </View>
        <View style={[styles.button,{marginLeft:60,marginTop:100}]}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={()=>Logout(signindata)}>
                            <LinearGradient
                            colors={['#4c669f', '#3b5998', '#192f6a']}
                            style={styles.signIn}
                            >
                                <Text style={[styles.textSign,{color:'white'}]}>Log Out</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                </View>

      </View>
      </View>
      
  )
  }

export default MemberScreen;


const styles = StyleSheet.create({
  container: {
      flex: 1, 
      backgroundColor: 'black'
    },
  flat_btn:{
      marginLeft:30,
      width:120,
      height:120,
      borderRadius:20,
  },
  footer:{
      backgroundColor:'white',
      flex:3,
      marginTop:45,
      borderTopStartRadius:30,
      borderTopEndRadius:30,
  },
  footer_text:{
      fontWeight:'bold',
      fontSize:25
  },
  checkin_btn:{
      alignItems:'center',
      justifyContent:'center',
      height:130,
      width:327,
      borderRadius:20
  },
  brandView:{
      
      flex:1,
      justifyContent:'center',
      alignItems:'center',
  },
  brandViewText:{
      color: 'white',
      
      fontSize: 25,
      justifyContent:'center',
      alignItems:'center',
      fontWeight: 'bold',
      textTransform: 'uppercase',


  },
  signIn: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
    fontSize: 21,
    fontWeight: 'bold'
}
  

})