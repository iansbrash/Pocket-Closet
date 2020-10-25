import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'


export const PlusButton = ({disabledHook, onPressFunc}) => {

    return (
        <View style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
        }}>
            { !disabledHook && (
                <TouchableOpacity 
                style={styles.TOSuccess}
                onPress={onPressFunc}>
                    {/* <Icon style={{marginRight: 5, marginLeft: 5}} width='50' height='50' fill='white' name='plus'/> */}
                    <Ionicons name="md-checkmark-circle" size={32} color="green" />
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
        backgroundColor: '#3366ff',
        justifyContent: 'center',
        alignItems:'center',
        elevation: 10
    }
})