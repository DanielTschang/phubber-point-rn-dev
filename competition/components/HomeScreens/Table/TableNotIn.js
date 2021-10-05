import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { useSelector, useDispatch } from 'react-redux';
import { selectIsSignIn, selectMemberName, selectTableID, selectScreenState } from '../../../redux/slices/memberSlice';
import { selectMemberID } from '../../../redux/slices/memberSlice';


const TableNotIn = ({navigation:{goBack}}) => {


    return(
        <View>
            <Text>
                Hello, {useSelector(selectMemberName)} , 您還未入桌;
            </Text>
            <Button title="結帳" onPress={()=>goBack()} />
        </View>
    )
}


export default TableNotIn