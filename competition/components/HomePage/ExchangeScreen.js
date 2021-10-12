import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, Button, SafeAreaView, FlatList, Image } from 'react-native';


const data = [
    {
        id:'1',
        title:'ps5',
        dir:require("../../static/img/ps5.png"),
        point:40000,
    },
    {
        id:'2',
        title:'Macbook',
        dir:require("../../static/img/Macbook.png"),
        point:80000,
    },
    {
        id:'3',
        title:'iphone',
        dir:require("../../static/img/iphone.png"),
        point:50000,
    },
    {
        id:'4',
        title:'xbox',
        dir:require("../../static/img/Xbox.png"),
        point:30000,
    },
    {
        id:'5',
        title:'switch',
        dir:require("../../static/img/switch.png"),
        point:25000,
    },

]


const ExchangeScreen = () => {

    const pic_dir = '../../static/img/';
    const pic_type = '.png'
    const SPACING = 20;
    var tmp="";
    
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item)=>item.id}
                contentContainerStyle={{
                    padding:SPACING,
                    paddingTop:StatusBar.currentHeight ||42
                }}
                renderItem={({item})=>(
                    
                    
                    <View
                    style={{padding:SPACING, backgroundColor:'white',marginBottom:SPACING, borderRadius:16,
                    shadowColor:"#000",shadowOffset:{width:0,height:10},shadowOpacity:.5,shadowRadius:20}}
                        >{console.log(item.dir)}
                        <Image source={item.dir} style={{width:300,height:200}}/>
                        <View>
                            <Text style={{fontSize:22,fontWeight:'700'}}>{item.title}</Text>
                            <Text style={{marginTop:5,fontSize:18,opacity:0.7}}>{item.point} 點</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
  }

export default ExchangeScreen;