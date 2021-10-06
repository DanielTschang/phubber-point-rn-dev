import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { selectMemberID, selectTableID, setTableID } from '../../../redux/slices/memberSlice';
import { useNavigation } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';

const Get_requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

const TableNotIn = () => {
    const navigation = useNavigation()
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
      setText('你被分配到了 '+output + ' !!')
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
          fetch("https://phubber-point.herokuapp.com/table/takeSeat/table1/3", Get_requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('checkin check')
                console.log('checkin',result)
                navigation.navigate('TableIn')

        })
            .catch(error => console.log('error', error));
    }



    // Return the View
    return (
      <View style={styles.container}>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
        <Text style={styles.maintext}>{text}</Text>

        {scanned ==true?( <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />):<View/>}
        
        {scannedright==true?( <Button title={'入桌嗎？'} onPress={()=>checkin()}  /> ):<View/>}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});

export default TableNotIn