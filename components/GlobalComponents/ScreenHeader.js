import React from 'react'
import { View, Text } from 'react-native'

export const ScreenHeader = ({title}) => {
    return (
        <View style={{zIndex: 1}}>
            <View style={{
                width: 'auto',
                height: 'auto',
                paddingLeft: 30,
                marginTop: 5,
                paddingBottom: 10,
                backgroundColor: 'white', //we need this to animate stuff sliding out
                borderBottomColor: 'lightgray', // this replaces the divider. fuck dividers
                borderBottomWidth: 1
            }}>
                <Text category='h2' style={{fontWeight: 'bold'}}>{title}</Text>
            </View>
        </View>
    )
}

export const MiniScreenHeader = ({title}) => {
    return (
        <View style={{zIndex: 1}}>
            <View style={{
                width: 'auto',
                height: 'auto',
                paddingLeft: 15,
                paddingBottom: 5,
                backgroundColor: 'white', //we need this to animate stuff sliding out
                borderBottomColor: 'lightgray', // this replaces the divider. fuck dividers
                borderBottomWidth: 1
            }}>
                <Text category='h4' style={{fontWeight: 'bold'}}>{title}</Text>
            </View>
        </View>
    )
}