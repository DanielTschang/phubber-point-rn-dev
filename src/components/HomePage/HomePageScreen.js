import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { Text, View, StyleSheet, FlatList} from 'react-native';
import { useSelector } from 'react-redux';
import { selectMemberName } from '../../redux/slices/memberSlice';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';


const data = [
    {
        id: "123",
        title: "菜單",
        image:"https://links.papareact.com/28w",
        screen: "Menu"
    },
    {
        id: "456",
        title: "用餐紀錄",
        image:"https://links.papareact.com/28w",
        screen: "History"
    },
    {
        id: "789",
        title: "會員專區",
        image:"https://links.papareact.com/28w",
        screen: "Member"
    },
]


const RootStack = createNativeStackNavigator()

const HomePageScreen = ({navigation}) => {
    const membername = useSelector(selectMemberName);

    return(
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
            <View style={{paddingTop:35,paddingLeft:30}}>
                <Text style={styles.footer_text}>Hello,</Text>
                <Text style={{fontSize:30, fontWeight:'bold'}}>Daniel ☺️</Text>
            </View>

            <View>
                <TouchableOpacity 
                    onPress={()=>{navigation.navigate('TableRoot')}}
                    style={[styles.checkin_btn,{marginTop:20, marginLeft:30,marginRight:30,marginBottom:20, backgroundColor:'#FF883C'}]}
                    >
                    <View>
                        <Text style={{fontSize:23,color:'white'}}>準備入桌，開始集點數！</Text>
                    </View>
                </TouchableOpacity>
                <FlatList
                    style={{marginLeft:10,marginTop:15,marginRight:35}}
                	horizontal
                    data={data}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=>
                    <View style={{borderRadius:20}}>

                        <TouchableOpacity
                            onPress={()=>navigation.navigate(item.screen)}
                            style={[styles.flat_btn]}
                        >
                    
                            <View>
                                <Text style={{alignItems:'center',justifyContent:'center',margin:10,marginTop:15, fontWeight:'bold', fontSize:17,color:'white',paddingLeft:15,paddingTop:30}}>{item.title}</Text>
                            </View>
                        
                        </TouchableOpacity>
                    </View>
                    
                    } 
                />
                <TouchableOpacity 
                    onPress={()=>{navigation.navigate('Exchange')}}
                    style={[styles.checkin_btn,{marginTop:35, marginLeft:30,marginRight:30,marginBottom:20, backgroundColor:'grey'}]}
                    >
                    <View>
                        <Text style={{fontSize:30}}>商品兌換專區</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        </View>
        
    )
}

export default HomePageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'black'
      },
    flat_btn:{
        marginLeft:30,
        width:120,
        height:120,
        borderRadius:20,
        backgroundColor:"#5745FF"
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
    

})