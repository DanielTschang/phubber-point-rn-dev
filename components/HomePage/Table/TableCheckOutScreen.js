

import { useDispatch, useSelector } from 'react-redux';
import { selectMemberID, setTableID } from '../../../redux/slices/memberSlice';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements/dist/icons/Icon'
import * as Animatable from 'react-native-animatable';



const TableCheckOutScreen=({navigation})=> {
  const dispatch = useDispatch();
  const [result, setResult] = useState('not checked')
  const [pointgained, setPointGained] = useState(-1)
  const member_id = useSelector(selectMemberID)

  async function checkout(){  
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    let url = "https://phubber-point.herokuapp.com/table/checkout/" + member_id
    
    fetch(url , requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('check checkout')
        console.log(result)
        
        setPointGained(result.points)
        setResult('checked')
        dispatch(setTableID(null))
        
        
      })
      .catch(error => console.log('error', error));
  }

  useEffect(()=>{
    checkout()
  },[])
  return (

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
        <View style={{margin:50, marginLeft:60}}>
          <Text style={{fontSize:30,margin:10}}>您好, 謝謝您的惠顧, </Text>
          <Text style={{fontSize:25,margin:10 , fontWeight:'bold'}}>本次總共集了 {pointgained} 點。</Text>
          <Text style={{fontSize:25,margin:10}}>祝您有美好的一天☺️</Text>

          <View style={{marginLeft:50,marginBottom:50,marginTop:50}}>
              <TouchableOpacity
                  style={styles.scannedtext}
                  onPress={()=>navigation.navigate('HomePage')}>
                  <LinearGradient
                  colors={['#4c669f', '#3b5998', '#192f6a']}
                  style={styles.scannedtext}
                  >
                  <Text style={[styles.textSign,{color:'white'}]}>回到首頁</Text>
                  </LinearGradient>
              </TouchableOpacity>
              </View>
            </View>
        </View>
    </View>

      
  )
}
export default TableCheckOutScreen
const styles = StyleSheet.create({
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    margin:40,
    marginLeft:45,
    marginTop:10,
    marginBottom:20,
    borderRadius: 30,
    backgroundColor: 'tomato'
  },
  scannedtext: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
    },
    button: {
      alignItems: 'center',
      marginTop: 10
    },   
    textSign: {
      fontSize: 21,
      fontWeight: 'bold'
    },
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
});
  