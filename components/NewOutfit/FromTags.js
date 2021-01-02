import React from 'react'
import {
    View,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { useSelector } from 'react-redux'
import GlobalStyles from '../GlobalComponents/GlobalStyles'
import { useNavigation } from '@react-navigation/native'

const RenderTag = ({item}) => {

    const navigation = useNavigation()

    return (
        <View style={{
            width: '100%',
            height: 'auto'
        }}>
            <TouchableOpacity
            onPress={() => navigation.navigate('FROMTAGSLIST', {tag: item})}
            >
                <View style={{
                    margin: 10,
                    width: 'auto',
                    height: 'auto',
                }}>
                    <View style={[{
                        width: '100%',
                        borderRadius: 5,
                        padding: 5,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }, GlobalStyles.shadowLight]}>
                        <Text style={[
                            GlobalStyles.h4, {fontWeight: 'bold'}
                        ]}>
                            {item}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export const FromTags = () => {

    const taggedOutfits = useSelector(state => state.outfits.taggedOutfits)
    console.log(taggedOutfits)
    
    return (
        <View style={{
            backgroundColor: 'white',
            flex: 1
        }}>
            <TopNavScreenHeader title={'From Tags'} exitDestination={'HOMESCREEN'}/>
            <FlatList 
                data={Object.keys(taggedOutfits)}
                renderItem={item => <RenderTag {...item}/>}
                keyExtractor={key => key}
            />
        </View>
    )
}
//taggedOutfits