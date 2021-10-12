import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import tw from 'tailwind-react-native-classnames'

const data = [
    {
        id: "123",
        title: "Meau",
        image:"https://links.papareact.com/28w",
        screen: "Menu"
    },
    {
        id: "456",
        title: "入桌",
        image:"https://links.papareact.com/28w",
        screen: "TableNavi"
    },
    {
        id: "4526",
        title: "detail",
        image:"https://links.papareact.com/28w",
        screen: "Detail"
    },
]

const HomeOptions = () => {
//const NavOptions = ({navigation}) =>{
    const navigation = useNavigation();
    return (
        <FlatList
            style={{marginLeft:100}}
            data={data}
            horizontal
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>(
                <TouchableOpacity
                onPress={()=>navigation.navigate(item.screen)}
                style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
                    <View>
                        <Image
                            style={{width:120, height:120, resizeMode:"contain"}}
                            source={{ uri: item.image}}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                            name="arrowright" color="white" type='antdesign'
                        />
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default HomeOptions

const styles = StyleSheet.create({})
