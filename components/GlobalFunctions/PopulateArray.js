import store from '../../redux/store'

// Takes in outfitArr (full of _ids) and returns an outfitArr with clothingObjects
export const populateArray = (outfitArr) => {


    // console.log(store.getState().closet.brandsArray)
    const closetObject = store.getState().closet.closetObject

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


    return populatedOutfitArr
}