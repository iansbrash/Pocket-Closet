import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ExitIcon, LeftIcon } from './GlobalIcons'
import GlobalStyles from './GlobalStyles'

// TEMPPERM
export const TopNav = ({title, exitDestination}) => {


    const navigation = useNavigation();

    return (
        <View style={{height: 30, width: '100%', backgroundColor: 'white'}}>
            <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity 
                style={[GlobalStyles.shadowLight, {marginLeft: 10}] }
                onPress={() => navigation.goBack()}>
                    <LeftIcon size={30} style={[GlobalStyles.colorMain]}/>
                </TouchableOpacity>
                <Text>{title}</Text>
                <TouchableOpacity
                onPress={() => navigation.navigate(exitDestination)}>
                    <ExitIcon size={30} style={[GlobalStyles.colorMain, {marginRight: 10}]}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}