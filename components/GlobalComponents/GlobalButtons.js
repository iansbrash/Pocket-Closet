import React, { useState } from 'react'
import {
    View,
    Pressable,
    Text,
} from 'react-native'
import GlobalStyles from './GlobalStyles'

export const MediumButton = ({title, icon, onPressFunc, buttonFunc}) => {

    const [pressed, setPressed] = useState(false)

    return (
        <View style={{
            height: 75,
            width: '100%',
            marginTop: 5,
            marginBottom: 5
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
                onPress={onPressFunc}
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}>
                    <View 
                    style={{ //block at the top of the button. cosmetic
                        height: 10, 
                        borderTopLeftRadius: 10, 
                        borderTopRightRadius: 10, 
                        backgroundColor: '#09122b',
                        width: '100%'}}></View>
                    <View style={{
                        height: 'auto',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text category='h4' 
                                style={[{fontWeight: 'bold', marginLeft: 15, height: 'auto'}, GlobalStyles.colorMain
                                , GlobalStyles.h5]}>
                                    {title}
                            </Text>
                        </View>
                        <Pressable style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}
                        onPress={buttonFunc ? buttonFunc : onPressFunc}>
                            {icon}
                            {/* <Entypo style={{marginRight: 15, marginLeft: 5}} name="plus" size={30} color="black" /> */}
                        </Pressable>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}