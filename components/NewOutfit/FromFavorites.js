import React from 'react'
import {
    View,
    Text,
    Image
} from 'react-native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { OutfitList } from '../ClosetScreen/OutfitList'
import { useSelector, useDispatch } from 'react-redux'
import { pushClothingObjectsToOutfitInProgress } from '../../redux/reducers/outfitsSlice'
import { useNavigation } from '@react-navigation/native'
//              FROM FAVORITES
// List all outfits with 'favorite'
// Same layout as ClosetScreen outfits FlatList
// Clicking on an outfit yields a similar screen to ViewIndividualOutfit
//      But with a 'continue' button or an 'edit' button to tweak it slightly
//      The edit feature may not happen right now... seems like a lot of work
//      You cannot click on each clothing piece in the TypeTab to view it
//      


// options we have here
// record # of times an outfit is worn... tricky given different descriptions / tags / etc
//

export const FromFavorites = () => {

    const outfitsArray = useSelector(state => state.outfits.outfitsArray);
    const favoriteOutfitsArray = outfitsArray.filter(outfitObject => outfitObject.favorite)
    const closetObject = useSelector(state => state.closet.closetObject)

    const dispatch = useDispatch()

    const navigation = useNavigation()


    const onClickFunc = (outfitObject) => {
        // need to take the outfitObject clicked on,
        // look at the _ids in outfitArr
        // find the clothingObjects associated with those _ids
        // cleanse outfitInProgress,
        // push them to outfitInProgress,
        // navigate to From Scratch (but everything should be there)
        console.log(`'clicked!' ${outfitObject._id}`)

        let outfitArr = outfitObject.outfitArr
        let populatedOutfitArr = {
            topsArray: [],
            bottomsArray: [],
            footwearArray: [],
            otherArray: []
        }

        Object.keys(outfitArr).forEach(key => {
            outfitArr[key].forEach(_id => {
                //iterating through the _ids of each clothingObject
                populatedOutfitArr[key].push(
                    closetObject[key].find(clothingObject => clothingObject._id === _id)
                )
            })
        })

        dispatch(pushClothingObjectsToOutfitInProgress(populatedOutfitArr))
        navigation.navigate("FROMSCRATCH")
        
    }

    const filterFavorites = (outfitArray) => {
        return outfitArray.filter(outfitObject => outfitObject.favorite)
    }

    return (
        <View style={{
            backgroundColor: 'white',
            flex: 1
        }}>
            <TopNavScreenHeader title={'From Favorites'} exitDestination={'HOMESCREEN'}/>
            <OutfitList 
                customFilter={filterFavorites} 
                onClickFunc={onClickFunc}/>
        </View>
    )
}