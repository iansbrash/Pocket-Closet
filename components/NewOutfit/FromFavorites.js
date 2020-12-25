import React from 'react'
import {
    View,
    Text,
    Image
} from 'react-native'
import { TopNavScreenHeader } from '../GlobalComponents/TopNav'
import { OutfitList } from '../ClosetScreen/OutfitList'
import { useSelector } from 'react-redux'
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


    const onClickFunc = (outfitObject) => {
        console.log(`'clicked!' ${outfitObject._id}`)
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