import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Text, View, FlatList } from 'react-native'

import { selectMemberID ,selectMemberPoint} from '../../redux/slices/memberSlice';

import { StatusBar } from 'expo-status-bar'

const HistoryList = () => {
    const [historydata, setHistoryData] = useState(null)
    const memberid = useSelector(selectMemberID)
    const point = useSelector(selectMemberPoint)
    

    const GetHistory=()=>{

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        let url = "https://phubber-point.herokuapp.com/member/record/" + memberid
        
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.message=="ok!"){
                setHistoryData(result.record)
            }
        })
        .catch(error => console.log('error', error));
    }

    useEffect(()=>{
        console.log('loading')
        GetHistory()
    },[]);
    const SPACING = 20
    return (
        historydata != null ? (
        <View>
            <FlatList
                data={historydata}
                keyExtractor={(item)=>item.id.toString()}
                contentContainerStyle={{
                    padding:SPACING,
                    paddingTop:StatusBar.currentHeight ||42
                }}
                renderItem={({item})=>(
                    <View
                    onPress={()=>{}}
                    style={{padding:SPACING, backgroundColor:'white',marginBottom:SPACING, borderRadius:16,
                    shadowColor:"#000",shadowOffset:{width:0,height:10},shadowOpacity:.5,shadowRadius:20}}
                        >
                        <View>
                            <Text style={{fontSize:22,fontWeight:'700'}}>{item.Time}</Text>
                            <Text style={{marginTop:5,fontSize:18,opacity:0.7}}>{item.Point} 點</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    ) : (

        <View style={{margin:90}}><Text style={{fontSize:25}}>目前沒有用餐紀錄</Text></View>
    )
    
    )
}


export default HistoryList
