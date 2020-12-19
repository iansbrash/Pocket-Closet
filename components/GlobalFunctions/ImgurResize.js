import store from '../../redux/store'
import {clothingDeletedFromCloset, removeAttributesFromAttributedClothing } from '../../redux/reducers/closetSlice'
import {batchActions} from 'redux-batched-actions'
//90 x 90
export const makeSmallImage = (imgurUrl) => {
    if (imgurUrl){
        //adds an s after the image filename (not including jpeg/jpg/etc)
    //i.e. https://i.imgur.com/btOmlNRs.jpg (small) vs https://i.imgur.com/btOmlNR.jpg (normal size)
    return imgurUrl.substr(0, 20) + imgurUrl.substr(20, 7) + 's' + imgurUrl.substr(27)
    }
}

//160 x 160
export const makeMediumSmallImage = (imgurUrl) => {
    if (imgurUrl){
        //adds an s after the image filename (not including jpeg/jpg/etc)
    //i.e. https://i.imgur.com/btOmlNRs.jpg (small) vs https://i.imgur.com/btOmlNR.jpg (normal size)
    return imgurUrl.substr(0, 20) + imgurUrl.substr(20, 7) + 't' + imgurUrl.substr(27)
    }
}

//320 x 320
export const makeMediumImage = (imgurUrl) => {
    if (imgurUrl){
        //adds an s after the image filename (not including jpeg/jpg/etc)
    //i.e. https://i.imgur.com/btOmlNRs.jpg (small) vs https://i.imgur.com/btOmlNR.jpg (normal size)
    return imgurUrl.substr(0, 20) + imgurUrl.substr(20, 7) + 'm' + imgurUrl.substr(27)
    }
}

//640 x 640
export const makeLargeImage = (imgurUrl) => {
    if (imgurUrl){
        //adds an s after the image filename (not including jpeg/jpg/etc)
    //i.e. https://i.imgur.com/btOmlNRs.jpg (small) vs https://i.imgur.com/btOmlNR.jpg (normal size)
    return imgurUrl.substr(0, 20) + imgurUrl.substr(20, 7) + 'l' + imgurUrl.substr(27)
    }
}

//1024 x 1024
export const makeHugeImage = (imgurUrl) => {
    if (imgurUrl){
        //adds an s after the image filename (not including jpeg/jpg/etc)
    //i.e. https://i.imgur.com/btOmlNRs.jpg (small) vs https://i.imgur.com/btOmlNR.jpg (normal size)
    return imgurUrl.substr(0, 20) + imgurUrl.substr(20, 7) + 'h' + imgurUrl.substr(27)
    }
}

//we export this instead of clothingDeletedFromCloset because it lets us
//abstract the deletion process (as we have to delete many things)
export const deleteClothingFromCloset = (_id, clothingType, tagsArray, colorsArray, brandsArray) => {
    console.log(`_id: ${_id}`)
    console.log(`clothingType: ${clothingType}`)
    console.log(`tagsArray: ${tagsArray}`)
    console.log(`colorsArray: ${colorsArray}`)
    console.log(`brandsArray: ${brandsArray}`)

    // man
    clothingType = clothingType.toLowerCase();


    // const {
    //     clothingDeletedFromCloset,
    //     removeAttributesFromAttributedClothing
    // } = closetSlice.actions;

    store.dispatch(batchActions([
        clothingDeletedFromCloset(_id, clothingType),
        removeAttributesFromAttributedClothing(_id, clothingType, 'taggedClothing', tagsArray),
        removeAttributesFromAttributedClothing(_id, clothingType, 'coloredClothing', colorsArray),
        // uncomment the below when uninstalling expo (not in initialstate)
        // removeAttributesFromAttributedClothing(_id, clothingType, 'brandedClothing', brandsArray)
    ]))
}