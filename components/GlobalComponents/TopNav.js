import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native'

// TEMPPERM
export const TopNav = ({title, exitDestination}) => {

    if (true) return <View><Text>TOPNAVWASHEREXD</Text></View>;

    
    
    const ExitAction = () => {
        const navigation = useNavigation();
        return (
            <TopNavigationAction icon={ExitIcon} onPress={() => navigation.navigate(exitDestination)}/>
        )
    }
    
    const BackAction = () => {
        const navigation = useNavigation();
        return ( 
            <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()}/>
        )
    }

    return (
        <TopNavigation alignment='center' title={title} 
            accessoryLeft={BackAction}
            accessoryRight={ExitAction}/>
    )
}