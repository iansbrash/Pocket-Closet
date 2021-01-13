import React, { useState } from 'react'
import {
    View
} from 'react-native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { OutfitList } from '../ClosetScreen/OutfitList'
import { useSelector, useDispatch } from 'react-redux'
import { pushClothingObjectsToOutfitInProgress } from '../../redux/reducers/outfitsSlice'
import { populateArray } from '../GlobalFunctions/PopulateArray'
import { useNavigation } from '@react-navigation/native'
import { ClosetSearch } from '../ClosetScreen/NewClosetScreen'



export const FromTagsList = ({route}) => {

    const { tag } = route.params
    const tagArray = useSelector(state => state.outfits.taggedOutfits[tag])

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [searchInput, setSearchInput] = useState('')


    const filterTag = (outfitArray) => {
        return outfitArray.filter(outfitObject => tagArray.includes(outfitObject._id))
    }

    const onClickFunc = (outfitObject) => {
        //same as FromFavorites
        console.log(`'clicked!' ${outfitObject._id}`)

        let populatedOutfitArr = populateArray(outfitObject.outfitArr)

        dispatch(pushClothingObjectsToOutfitInProgress(populatedOutfitArr))
        navigation.navigate("FROMSCRATCH")
    }


    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <TopNavScreenHeader exitDestination={'HOMESCREEN'} title={tag}/>
            <View style={{
                marginBottom: 5
            }}>
                <ClosetSearch 
                    searchInput={searchInput} 
                    setSearchInput={setSearchInput} 
                    notClosetSearch={true} 
                    placeholder={`Search outfits!`}/>
            </View>
            
            <OutfitList 
                customFilter={filterTag} //Need to combine filterDate and filterTag
                onClickFunc={onClickFunc}
            />

        </View>
    )
}