import React, { useState } from 'react'
import {
    View,
    Pressable,
    Text,
    StyleSheet
} from 'react-native'
import GlobalStyles from './GlobalStyles'
import { CheckIcon } from './GlobalIcons'

export const MediumCheckButton = ({title, icon, onPressFunc, buttonFunc, disabled, checked, setChecked, isFromScratch, defaultScratchChecked}) => {

    const [pressed, setPressed] = useState(false)
    // const [checked, setChecked] = useState(defaultChecked);

    const [fromScratchChecked, setFromScratchChecked] = useState(false)
    //return completely different thing lmao
    if (isFromScratch){
        return (
            <View style={{
                height: 75,
                width: '100%',
                marginTop: 5,
                marginBottom: 5,
            }}>
                <View style={[{
                    width: 'auto',
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 5,
                    marginBottom: 5,
                    height: 'auto',
                    backgroundColor: 'white',
                    borderRadius: 10,
                }, GlobalStyles.shadowHeavy]}>
                    <Pressable style={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'column',
                        opacity: pressed ? 0.5 : 1.0
                    }}
                    disabled={!fromScratchChecked}
                    onPress={onPressFunc}
                    onPressIn={() => setPressed(true)}
                    onPressOut={() => setPressed(false)}>
                        <View style={{
                            height: 10,
                            width: '100%',
                            zIndex: 0,
                        }}>
                            <View style={[{
                                position: 'absolute',
                                top: 0,
                                width: '100%',
                                left: 0,
                                borderRadius: 10,
                                height: 20,
                                zIndex: 0,
                            }, !fromScratchChecked ? styles.barInactive : styles.barActive]}>
                            </View>
                        </View>
                        <View style={{
                            height: 'auto',
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            zIndex: 1,
                            backgroundColor: 'white'
                        }}>
                            <View style={{
                                height: '100%', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                flexDirection: 'row'}}>
                                <Pressable
                                    hitSlop={20}
                                    style={fromScratchChecked ? styles.checkboxActive : styles.checkbox}
                                    onPress={() => setFromScratchChecked(!fromScratchChecked)}>
                                    <CheckIcon size={25} style={{color: 'white'}}/>
                                </Pressable>
                                <Text category='h4' 
                                    style={[{fontWeight: 'bold', height: 'auto'}, 
                                    !fromScratchChecked ? styles.textInactive : GlobalStyles.colorMain, 
                                    GlobalStyles.h5]}>
                                        {title}
                                </Text>
                            </View>
                            <View 
                                style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}
                            >
                                {icon}
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
        )
    }

    
    
    return (
        <View style={{
            height: 75,
            width: '100%',
            marginTop: 5,
            marginBottom: 5,
        }}>
            <View style={[{
                width: 'auto',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
                height: 'auto',
                backgroundColor: 'white',
                borderRadius: 10,
            }, GlobalStyles.shadowHeavy]}>
                <Pressable style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                    opacity: pressed ? 0.5 : 1.0
                }}
                disabled={!checked || disabled}
                onPress={onPressFunc}
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}>
                    <View style={{
                        height: 10,
                        width: '100%',
                        zIndex: 0,
                    }}>
                        <View style={[{
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                            left: 0,
                            borderRadius: 10,
                            height: 20,
                            zIndex: 0,
                        }, !checked || disabled ? styles.barInactive : styles.barActive]}>
                        </View>
                    </View>
                    <View style={{
                        height: 'auto',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        zIndex: 1,
                        backgroundColor: 'white'
                    }}>
                        <View style={{
                            height: '100%', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            flexDirection: 'row'}}>
                            <Pressable
                                hitSlop={20}
                                style={checked ? styles.checkboxActive : styles.checkbox}
                                onPress={() => setChecked(!checked)}>
                                <CheckIcon size={25} style={{color: 'white'}}/>
                            </Pressable>
                            <Text category='h4' 
                                style={[{fontWeight: 'bold', height: 'auto'}, 
                                !checked || disabled ? styles.textInactive : GlobalStyles.colorMain, 
                                GlobalStyles.h5]}>
                                    {title}
                            </Text>
                        </View>
                        <Pressable style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}
                        onPress={checked || disabled ? (buttonFunc ? buttonFunc : onPressFunc) : null}>
                            {icon}
                        </Pressable>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export const MediumButton = ({title, icon, onPressFunc, buttonFunc, disabled}) => {

    const [pressed, setPressed] = useState(false)

    return (
        <View style={{
            height: 75,
            width: '100%',
            marginTop: 5,
            marginBottom: 5,
        }}>
            <View style={[{
                width: 'auto',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
                height: 'auto',
                backgroundColor: 'white',
                elevation: 10,
                borderRadius: 10,
            }, GlobalStyles.shadowHeavy]}>
                <Pressable style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                    opacity: pressed ? 0.5 : 1.0
                }}
                disabled={disabled}
                onPress={onPressFunc}
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}>
                    <View style={{
                        height: 10,
                        width: '100%',
                        zIndex: 0,
                    }}>
                        <View style={[{
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                            left: 0,
                            borderRadius: 10,
                            height: 20,
                            zIndex: 0,
                        }, disabled ? styles.barInactive : styles.barActive]}>

                        </View>
                    </View>
                    <View style={{
                        height: 'auto',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        zIndex: 2
                    }}>
                        <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text category='h4' 
                                style={[{fontWeight: 'bold', marginLeft: 15, height: 'auto'}, 
                                disabled ? styles.textInactive : GlobalStyles.colorMain, 
                                GlobalStyles.h5]}>
                                    {title}
                            </Text>
                        </View>
                        <Pressable style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}
                        onPress={!disabled ? (buttonFunc ? buttonFunc : onPressFunc) : null}>
                            {icon}
                        </Pressable>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    checkboxActive: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        backgroundColor: '#09122b',
        borderWidth: 1,
        borderColor: '#09122b'
    },
    checkbox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#6c7280'
    },
    barActive: {
        // height: 10, 
        // borderTopLeftRadius: 10, 
        // borderTopRightRadius: 10, 
        backgroundColor: '#09122b',
        // width: '100%'
    },
    barInactive: {
        backgroundColor: '#6c7280',
        // height: 10, 
        // borderTopLeftRadius: 10, 
        // borderTopRightRadius: 10, 
        // width: '100%'
    },
    textActive: {
        fontWeight: 'bold',
        color: '#09122b'
    }, textInactive: {
        fontWeight: 'bold',
        color: '#b7bcc7'
    },
    checkboxActive: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        backgroundColor: '#09122b',
        borderWidth: 1,
        borderColor: '#09122b'
    },
    checkbox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#6c7280'
    },
})