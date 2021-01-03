import React, { useState } from 'react'
import { 
    View,
    Text
} from 'react-native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { OutfitList } from '../ClosetScreen/OutfitList'
import { populateArray } from '../GlobalFunctions/PopulateArray'
import { useDispatch } from 'react-redux'
import { pushClothingObjectsToOutfitInProgress } from '../../redux/reducers/outfitsSlice'
import { useNavigation } from '@react-navigation/native'
import { ClosetSearch } from '../ClosetScreen/NewClosetScreen'

export const FromHistory = () => {


    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [searchInput, setSearchInput] = useState('')

    const onClickFunc = (outfitObject) => {
        console.log(`'clicked!' ${outfitObject._id}`)

        let populatedOutfitArr = populateArray(outfitObject.outfitArr)

        dispatch(pushClothingObjectsToOutfitInProgress(populatedOutfitArr))
        navigation.navigate("FROMSCRATCH")
        
    }

    const filterFavorites = (outfitArray, input = searchInput) => {
        /**             HOW TO FILTER BY:
         *  Year - 4 digits - e.g. 2020
         *  Month - Name - e.g. January
         *  Day - Name - e.g. Monday
         *  Abbreviation - Number - e.g. 20, 01, 04, etc. Very general. */
        //new Date(item.date).toLocaleString('en-GB').substr(0, 10)

        console.log(input)

        return outfitArray.filter(outfitObject => {
            let parsedDate = new Date(outfitObject.date);

            return parsedDate.toLocaleString('en-GB').substr(0, 10).includes(input)
        })
    }

    return (
        <View style={{
            backgroundColor: 'white',
            flex: 1
        }}>
            <TopNavScreenHeader title={'From History'} exitDestination={'HOMESCREEN'}/>
            <View style={{
                marginBottom: 5
            }}>
                <ClosetSearch searchInput={searchInput} setSearchInput={setSearchInput} notClosetSearch={true} placeholder={`Search outfits!`}/>
            </View>
            <OutfitList onClickFunc={onClickFunc} customFilter={filterFavorites}/>
        </View>
    )
}