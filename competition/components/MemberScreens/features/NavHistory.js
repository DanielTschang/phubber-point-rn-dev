import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { selectMemberID ,selectIsSignIn, selectMemberName, selectMemberPoint, selectMemberPwd, setMemberName, setMemberPoint } from '../../../redux/slices/memberSlice';
import tw from 'tailwind-react-native-classnames'

const NavHistory = () => {
    const [historydata, setHistoryData] = useState(null)
    const memberid = useSelector(selectMemberID)
    

    const GetHistory=()=>{

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        let url = "https://phubber-point.herokuapp.com/member/record/" + memberid
        
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            setHistoryData(result.record)
        })
        .catch(error => console.log('error', error));
    }

    useEffect(()=>{
        console.log('loading')
        GetHistory()
    },[]);

    return (
        historydata != null ? (
        <FlatList
            data={historydata}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=>(
                <View
                onPress={()=>{}}
                style={tw`p-0 pl-4 pb-8 pt-4 bg-gray-200 m-2 w-60`}>
                    <View>
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.Time}</Text>
                        <Text style={tw`mt-2 w-20 pl-4 text-lg font-semibold bg-gray-400`}>{item.Point} 點</Text>
                    </View>
                </View>
            )}
        />
    ) : (
        <View><Text>目前沒有用餐紀錄</Text></View>
    )
    
    )
}


export default NavHistory
