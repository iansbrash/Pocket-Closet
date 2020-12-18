import React from 'react'
import { View, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RightIcon, CheckIcon } from '../GlobalComponents/GlobalIcons'
import GlobalStyles from '../GlobalComponents/GlobalStyles'

export const FinalizeButton = ({disabledHook, onPressFunc}) => {

    const navigation = useNavigation();

    

    return (
        <View style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
        }}>
            { !disabledHook && (
                <TouchableOpacity 
                style={[styles.TOSuccess, GlobalStyles.bgColorMain]}
                onPress={onPressFunc}>
                    {/* <Icon style={{marginRight: 5, marginLeft: 5}} width='50' height='50' fill='white' name='checkmark-outline'/> */}
                    <CheckIcon size={50} style={{marginRight: 5, marginLeft: 5, color: 'white'}}/>
                 </TouchableOpacity>
                 )
            }
        </View>
    )
} 

export const NextButton = ({disabledHook, navpath, extraFunc}) => {

    const navigation = useNavigation();

    const onClickFunc = () => {

        if (typeof extraFunc === "function") {
            extraFunc();
        }
        //changed to push
        navigation.push(navpath);
    }


    

    return (
        <View style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
        }}>
            {
            !disabledHook && (
                <Pressable 
                style={[styles.TOBasic, GlobalStyles.bgColorMain]}
                onPress={() => onClickFunc()}
                hitSlop={10}>
                    {/* <Icon style={{marginRight: 5, marginLeft: 5}} width='50' height='50' fill='white' name='arrow-forward-outline'/> */}
                    <RightIcon size={40} style={{color: 'white'}}/>
                 </Pressable>
                 )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    TOBasic: {
        height: 50,
        width: 50,
        margin: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems:'center',
        elevation: 10
    },
    TOSuccess: {
        height: 70,
        width: 70,
        margin: 20,
        borderRadius: 5,
        // backgroundColor: '#3366ff',
        justifyContent: 'center',
        alignItems:'center',
        elevation: 10
    }
})