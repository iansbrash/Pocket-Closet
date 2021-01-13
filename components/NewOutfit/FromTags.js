import React, { useState } from 'react'
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
import { ClosetSearch } from '../ClosetScreen/NewClosetScreen'
import { TieIcon } from '../GlobalComponents/GlobalIcons'
const RenderTag = ({item, length}) => {

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
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 5,
                    marginBottom: 5
                }}>
                    <View style={{
                        height: 5,
                        width: '100%'
                    }}>
                        <View style={[{
                            position: 'absolute',
                            width: '100%',
                            height: 10,
                            borderRadius: 5,
                        }, GlobalStyles.bgColorMain]}>

                        </View>
                    </View>
                    <View style={{
                        width: 'auto',
                        height: 'auto',
                    }}>
                        <View style={[{
                            width: '100%',
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            padding: 5,
                            backgroundColor: 'white',
                            justifyContent: 'space-between',
                            alignItems: 'space-between',
                            flexDirection: 'row'
                        }, GlobalStyles.shadowLight]}>
                            <Text style={[
                                GlobalStyles.h4, {fontWeight: 'bold'}, GlobalStyles.colorMain
                            ]}>
                                {item}
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={[
                                    GlobalStyles.h4, {fontWeight: 'bold', marginRight: 5}, GlobalStyles.lighterHint
                                ]}>
                                    {length}
                                </Text>
                                <TieIcon size={22} style={GlobalStyles.lighterHint}/>
                            </View>
                            
                        </View>
                    </View>
                </View>
                
            </TouchableOpacity>
        </View>
    )
}

const RenderTagTwo = ({item}) => {

    const navigation = useNavigation()

    return (
        <View style={{
            margin: 5,
        }}>
            <TouchableOpacity
            onPress={() => navigation.navigate('FROMTAGSLIST', {tag: item})}
            >
                <View style={[{
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5
                }, GlobalStyles.shadowLight, GlobalStyles.bgColorMain]}>
                    <Text style={[{
                        color: 'white',
                        fontWeight: 'bold'
                    }, GlobalStyles.h1]}>
                        {item}
                    </Text>
                </View> 
            </TouchableOpacity>
            
        </View>
    )
}

export const FromTags = () => {

    const taggedOutfits = useSelector(state => state.outfits.taggedOutfits)
    console.log(taggedOutfits)
    

    const [searchInput, setSearchInput] = useState('')

    return (
        <View style={{
            backgroundColor: 'white',
            flex: 1
        }}>
            <TopNavScreenHeader title={'From Tags'} exitDestination={'HOMESCREEN'}/>
            <View style={{
                margin: 5
            }}>
                <ClosetSearch 
                    searchInput={searchInput} 
                    setSearchInput={setSearchInput} 
                    notClosetSearch={true} 
                    placeholder={`Search tags!`}/>
            </View>
            <FlatList 
                data={Object.keys(taggedOutfits).filter(tag => tag.toLowerCase().includes(searchInput.toLowerCase()))}
                renderItem={item => <RenderTag {...item} length={taggedOutfits[item.item].length}/>}
                keyExtractor={key => key}
            />
            {/* <View style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexWrap: 'wrap',
                flexDirection: 'row'
            }}>
                {
                    Object.keys(taggedOutfits).map(tag => (
                        <>
                            <RenderTagTwo item={tag} />
                        </>
                    ))
                }
            </View> */}
        </View>
    )
}
//taggedOutfits