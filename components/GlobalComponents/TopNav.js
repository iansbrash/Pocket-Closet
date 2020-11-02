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
        <View style={{height: 30, width: '100%', backgroundColor: 'white', zIndex: 2}}>
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


export const TopNavScreenHeader = ({title, exitDestination, extraFunc}) => {

    const navigation = useNavigation();


    const combineFunc = () => {
        if (extraFunc) {extraFunc()}
        navigation.navigate(exitDestination);
    }

    return (
        <View style={{
            height: 55, 
            width: '100%', 
            backgroundColor: 'white', 
            zIndex: 2,
            backgroundColor: 'white', //we need this to animate stuff sliding out
            borderBottomColor: 'lightgray', // this replaces the divider. fuck dividers
            borderBottomWidth: 1 // and this
            }}>
            <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity 
                style={[GlobalStyles.shadowLight, {marginLeft: 10}] }
                onPress={() => navigation.goBack()}>
                    <LeftIcon size={30} style={[GlobalStyles.colorMain]}/>
                </TouchableOpacity>

                <View style={{
                width: 'auto',
                height: 'auto',
                paddingTop: 5,
                paddingBottom: 10,
                }}>
                    <Text category='h2' style={[{fontWeight: 'bold'}, GlobalStyles.h1]}>{title}</Text>
                </View>

                <TouchableOpacity
                onPress={() => combineFunc()}>
                    <ExitIcon size={30} style={[GlobalStyles.colorMain, {marginRight: 10}]}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}