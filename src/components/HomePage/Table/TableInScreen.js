import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements/dist/icons/Icon'
import * as Animatable from 'react-native-animatable';
import Timeline from 'react-native-timeline-flatlist'

import { useSelector} from 'react-redux';
import { selectTableID, selectScreenState } from '../../../redux/slices/memberSlice';
import { selectMemberID } from '../../../redux/slices/memberSlice';



const TableIn = ({navigation}) => {
    const screen = useSelector(selectScreenState)
    const memberid = useSelector(selectMemberID)
    const tableid = useSelector(selectTableID)
    const [history, setHistory] = useState([])
    

    async function updatestate(statetype){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "TableID": tableid,
            "MemberID": memberid,
            "State": statetype
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://phubber-point.herokuapp.com/table/state/", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    async function gethistory(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        let url = "https://phubber-point.herokuapp.com/table/state/"+memberid
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(memberid)
            let tmp=[];
            var prevtitle='init';
            result.data.forEach(element => {
                let title;
                let color;
                switch(element.state){
                    case 'inactive':
                        title="集點速度 - Boost"
                        color='#35FF49'
                        break
                    case 'init':
                        title="入桌"
                        color='#35FF49'
                        break
                    case 'active':
                        title="集點速度 - Normal"
                        color='#9FFFC1'
                        break
                }
                if(title ==prevtitle){
                    prevtitle=title;
                }
                else{
                    prevtitle=title
                    tmp.push({time:element.time.slice(11,16),
                        title:title,
                        description:"",
                        lineColor:color,
                        circleColor:color,
                        })
            }
            })
            setHistory(tmp);
        }
        )
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
        updatestate(screen)
        gethistory()
    }, [screen])

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

                <Timeline
                    lineWidth={5}
                    data={history}
                    timeStyle={{fontSize:12, padding:3}}
                    timeContainerStyle={{backgroundColor:"#FFABC6", borderRadius:7}}
                    options={{
                        style:{paddingLeft:15,marginTop:15,paddingTop:15,}
                    }}
                />

            <View style={{marginLeft:122,marginBottom:50}}>
                <TouchableOpacity
                    style={styles.scannedtext}
                    onPress={()=>navigation.navigate('TableCheckOut')}>
                    <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.scannedtext}
                    >
                    <Text style={[styles.textSign,{color:'white'}]}>結帳</Text>
                    </LinearGradient>
                </TouchableOpacity>
                </View>

            </View>
        </View>
  
          
      )
}


export default TableIn

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
  