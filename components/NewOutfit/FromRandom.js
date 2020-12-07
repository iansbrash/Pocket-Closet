import React from 'react'
import { 
    View,
    Text
} from 'react-native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'

// maybe ask a few questions before assigning randomly
// i.e. 
//      is it hot, warm, cool, or cold outside
//      do you want to stand out?
//      do you want to try something new?
//      do you want me to choose a random previous outfit?
//

export const FromRandom = () => {


    return (
        <View style={{
            backgroundColor: 'white',
            flex: 1
        }}>
            <TopNavScreenHeader title={'From Random'} exitDestination={'HOMESCREEN'}/>
        </View>
    )
}

