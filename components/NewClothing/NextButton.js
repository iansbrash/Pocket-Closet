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
                style={[
                    styles.TOSuccess, 
                    GlobalStyles.shadowLight,
                    {backgroundColor: 'white'}    
                ]}
                onPress={onPressFunc}>
                    <CheckIcon size={40} style={[
                        GlobalStyles.colorMain,
                        GlobalStyles.shadowLightest
                    ]}/>
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
                <TouchableOpacity 
                style={[
                    styles.TOBasic, 
                    GlobalStyles.shadowLight,
                    {backgroundColor: 'white'}
                ]}
                onPress={() => onClickFunc()}
                // hitSlop={10}
                >
                    {/* <Icon style={{marginRight: 5, marginLeft: 5}} width='50' height='50' fill='white' name='arrow-forward-outline'/> */}
                    <RightIcon size={40} style={[
                        GlobalStyles.colorMain,
                        GlobalStyles.shadowLightest
                    ]}/>
                 </TouchableOpacity>
                 )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    TOBasic: {
        height: 50,
        width: 50,
        margin: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems:'center',
    },
    TOSuccess: {
        height: 50,
        width: 50,
        margin: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems:'center',
    }
})