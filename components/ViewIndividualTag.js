import React from 'react'
import { TopNavScreenHeader } from './GlobalComponents/TopNav'
import {
    View,
    Text
} from 'react-native'
import { RenderSingleLineClosetItem } from './ClosetScreen/ClosetList'
import { useSelector } from 'react-redux'

export const ViewIndividualTag = ({route}) => {
    const {tag, type} = route.params;

    let taggedItems;
    if (type === 'clothing'){
        console.log('it was indeed clothing')
        taggedItems = useSelector(state => state.closet.taggedClothing[tag.toLowerCase()])
    }

    const closetObject = useSelector(state => state.closet.closetObject)
    // console.log(closetObject)

    console.log(taggedItems)
    console.log(Object.keys(taggedItems))

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <TopNavScreenHeader title={tag} exitDestination={'CLOSETSCREEN'}/>
            <View style={{
                flexDirection: 'column'
            }}>
                {Object.keys(taggedItems).map(key => (
                    taggedItems[key].map((_id, index) => (
                        // Using index as a key here is OK because we the position of each clothingObject is static
                        <RenderSingleLineClosetItem 
                            key={_id} 
                            item={closetObject[key].find(clothingObject => clothingObject._id === _id)}
                            debugId={_id}/>
                    ))
                ))}
            </View>
        </View>
    )
}