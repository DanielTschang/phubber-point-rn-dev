import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Animatable from 'react-native-animatable';
import { selectMemberID, selectTableID, setIsInTable, setTableID } from '../../../redux/slices/memberSlice';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements/dist/icons/Icon'

const Get_requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

const TableNotIn = ({navigation}) => {
    const dispatch = useDispatch()
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedright, setScannedRight] = useState(false)
    const [text, setText] = useState('Not yet scanned')
    const MemberID = useSelector(selectMemberID);
    
    const TableID = useSelector(selectTableID);

    var output;
    var info;
    var info_memberid;
    var info_tableid;

    function checkin(id){

        let url = "https://phubber-point.herokuapp.com/table/takeSeat/"+ id +"/" + MemberID
  
          fetch(url, Get_requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('checkin',result.message)
            })
            .catch(error => {console.log('aaaaa')
            console.log('error', error)});
      }


    const askForCameraPermission = () => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })()
    }

    // Request Camera Permission
    useEffect(() => {
      askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      info = data.split('/');
      info_memberid = info[info.length-1]
      info_tableid = info[info.length-2]

      if(MemberID==info_memberid){
        if(info_tableid.slice(0,5) == 'table'){
            output = info_tableid
            setScannedRight(true)
            dispatch(setTableID(output))
                
        }
        else{
          output = "QR code有誤 - 桌號資訊錯誤"
        }
      }
      else{
        output = "QR code有誤 - 會員ID不匹配"
      }
      setText('您被分配到了 第'+output.slice(5,6)+'桌')
      console.log('Type: ' + type + '\nData: ' + data)
    };


    // Check permissions and return the screens
    if (hasPermission === null) {
      return (
        <View style={styles.container}>
          <Text>Requesting for camera permission</Text>
        </View>)
    }
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={{ margin: 10 }}>No access to camera</Text>
          <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>)
    }
    async function checkin(){
        let url = "https://phubber-point.herokuapp.com/table/takeSeat/" + TableID +"/" + MemberID
        fetch(url, Get_requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log('checkin check')
              console.log('checkin',result)
              dispatch(setIsInTable(true))
              navigation.navigate('TableNavi')

      })
          .catch(error => console.log('error', error));
    }



    // Return the View
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


      
      <View style={{margin:40}}>
        {scanned ==false?( 
        <>
          <Text style={{ fontSize: 20,right:4 }}> 您還沒入桌喔,</Text> 
          <Text style={{ fontSize: 30 }}>請跟櫃台索取QR code</Text> 
        </>):
          <Text style={{fontSize:30,alignItems:'center',justifyContent:'center',marginLeft:15}}>{text}</Text>}
           
      </View>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
        <View>
        {scanned ==true?( <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />):null}
        </View>
        <View style={styles.button}>

        {scannedright==true?( 
          
            <TouchableOpacity
                style={styles.scannedtext}
                onPress={()=>checkin()}>
                <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.scannedtext}
                >
                  <Text style={[styles.textSign,{color:'white'}]}>入桌</Text>
                </LinearGradient>
            </TouchableOpacity>
            ):null}
          </View> 

      </View>
      </View>

        
    );}


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
    width: 80,
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

export default TableNotIn