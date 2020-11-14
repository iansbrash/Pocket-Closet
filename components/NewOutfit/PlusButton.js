import React, {useState} from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { PlusIcon, EyeIcon } from '../GlobalComponents/GlobalIcons'
import GlobalStyles from '../GlobalComponents/GlobalStyles'

export const PlusButton = ({disabledHook, onPressFunc}) => {
    const [eyeVisible, setEyeVisible] = useState(false)

    const combinedFunc = () => {
        onPressFunc();
        setEyeVisible(!eyeVisible)
    }

    return (
        <View style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
        }}>
            { !disabledHook && (
                <TouchableOpacity 
                style={[styles.TOSuccess, GlobalStyles.bgColorMain]}
                onPress={() => combinedFunc()}>
                    {eyeVisible ? <PlusIcon style={[{marginRight: 5, marginLeft: 5, color: 'white'}]} size={50}/>
                    : <EyeIcon style={[{marginRight: 5, marginLeft: 5, color: 'white'}]} size={40}/>}
                    
                 </TouchableOpacity>
                 )
            }
        </View>
    )
} 

const styles = StyleSheet.create({
    TOBasic: {
        height: 70,
        width: 70,
        margin: 20,
        borderRadius: 5,
        backgroundColor: '#3366ff',
        justifyContent: 'center',
        alignItems:'center',
        elevation: 10
    },
    TOSuccess: {
        height: 70,
        width: 70,
        margin: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems:'center',
        elevation: 10
    }
})