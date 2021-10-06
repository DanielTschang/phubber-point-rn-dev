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

]

const MenuScreen = () => {

    function GetMenu(){
        // call Menu API
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

export default MenuScreen

const styles = StyleSheet.create({})