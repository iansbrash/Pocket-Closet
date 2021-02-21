import React from 'react'
import {
    View, 
    Text
} from 'react-native'
import { PlusIcon } from '../GlobalComponents/GlobalIcons'
import GlobalStyles from '../GlobalComponents/GlobalStyles'

export const ListEmptyComponent = ({text}) => {
    return (
        <View style={[{
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 10,
            backgroundColor: '#fafafa',
            padding: 5,
            width: 'auto'
        }, GlobalStyles.shadowLightest]}>
            <Text style={[{
                fontWeight: 'normal',
                // color: '#3e3e40'
            }, GlobalStyles.h6, GlobalStyles.lighterHint
            ]}>
                {text}
            </Text>
            <PlusIcon size={25} style={GlobalStyles.lighterHint}/>
        </View>
    )
}