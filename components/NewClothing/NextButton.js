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
            right: 20,
            bottom: 20,
        }}>
            {
            !disabledHook && (
                <View style={{
                    height: 50,
                    aspectRatio: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity 
                        onPress={() => onPressFunc()}
                    >
                        <View style={{
                            height: 5,
                            width: 50
                        }}>
                            <View style={[{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: 50,
                                height: 10,
                                borderRadius: 5
                            }, GlobalStyles.bgColorMain]}>

                            </View>
                        </View>
                        <View style={[{
                            backgroundColor: 'white',
                            height: 45,
                            width: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5
                        }, GlobalStyles.shadowLight]}>
                            
                            <CheckIcon size={40} style={[
                                GlobalStyles.colorMain,
                                GlobalStyles.shadowLightest
                            ]}/>
                        </View>
                    </TouchableOpacity>
                </View>
                
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
            right: 20,
            bottom: 20,
        }}>
            {
            !disabledHook && (
                <View style={{
                    height: 50,
                    aspectRatio: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity 
                        onPress={() => onClickFunc()}
                    >
                        <View style={{
                            height: 5,
                            width: 50
                        }}>
                            <View style={[{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: 50,
                                height: 10,
                                borderRadius: 5
                            }, GlobalStyles.bgColorMain]}>

                            </View>
                        </View>
                        <View style={[{
                            backgroundColor: 'white',
                            height: 45,
                            width: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5
                        }, GlobalStyles.shadowLight]}>
                            
                                <RightIcon size={40} style={[
                                    GlobalStyles.colorMain,
                                    GlobalStyles.shadowLightest
                                ]}/>
                        </View>
                    </TouchableOpacity>
                </View>
                
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    TOBasic: {
        height: 45,
        width: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems:'center',
        // borderWidth: 4,
        // borderStyle: 'solid',
        // borderColor: 'black'
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