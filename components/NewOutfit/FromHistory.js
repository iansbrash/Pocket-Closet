import React from 'react'
import { 
    View,
    Text
} from 'react-native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'

export const FromHistory = () => {


    return (
        <View style={{
            backgroundColor: 'white',
            flex: 1
        }}>
            <TopNavScreenHeader title={'From History'} exitDestination={'HOMESCREEN'}/>
        </View>
    )
}