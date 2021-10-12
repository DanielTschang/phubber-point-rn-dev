import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { View, StyleSheet, FlatList} from 'react-native';
import { useSelector } from 'react-redux';
import { selectMemberName } from '../../redux/slices/memberSlice';
import * as Animatable from 'react-native-animatable';


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

const MenuScreen = ({navigation}) => {
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
        <FlatList
            style={{marginLeft:10,marginTop:15,marginRight:35}}
            data={data}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>{

            }}
        />

            
  
        </View>
        </View>
        
    )
}

export default MenuScreen;

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