import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { selectMemberID ,selectIsSignIn, selectMemberName, selectMemberPoint, selectMemberPwd, setMemberName, setMemberPoint } from '../../../redux/slices/memberSlice';
import tw from 'tailwind-react-native-classnames'

const data = 
[
    {
        id:"123",
        Time:"08/19, 17:54 - 20:20",
        Point:"58"
    },
    {
        id:"456",
        Time:"08/29, 12:31 - 19:19",
        Point:"61"
    },
    {
        id:"4563",
        Time:"08/29, 12:31 - 12:45",
        Point:"61"
    },
    {
        id:"4561",
        Time:"08/29, 12:31",
        Point:"61"
    },
    {
        id:"4562",
        Time:"08/29, 12:31",
        Point:"61"
    },
    {
        id:"4566",
        Time:"08/29, 12:31",
        Point:"61"
    },
    {
        id:"4586",
        Time:"08/29, 12:31",
        Point:"61"
    },
]

const NavHistory = () => {

    const [historydata, setHistoryData] = useState(null)
    const username = useSelector(selectMemberID);
    const password = useSelector(selectMemberPwd);


    function GetHistory(){

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "account": username,
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
          .then(result => {console.log(result.point)
            console.log(typeof result.point)
            if(result.message == 'success'){
              setHistoryData(result.data);
            }
          })
          .catch(error => console.log('error', error));
    }
    
    // GetHistory();

    const navigation = useNavigation();
        return (
            <FlatList
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                    <View
                    onPress={()=>{}}
                    style={tw`p-0 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-60`}>
                        <View>
                            <Text style={tw`mt-2 text-lg font-semibold`}>{item.Time}</Text>
                            <Text style={tw`mt-2 text-lg font-semibold`}>{item.Point} 點</Text>
                        </View>
                    </View>
                )}
            />
        )
}

export default NavHistory

const styles = StyleSheet.create({})