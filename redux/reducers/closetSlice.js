import { DrawerActions } from '@react-navigation/native'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ActivityIndicatorComponent } from 'react-native';
 

// TODO
/**
 * I think I'm trying to dispatch 2 actions at once
 *      one to increment the timesWorn attribute on each piece of clothing
 *      one to push the outfitObject into our state.outfits.outfitArray
 * Possible solutions:
 *      Directly install thunk (it seems like rn doesn't like what I'm doing rn?)
 */ //Gonna use redux-batched-actions instead
// export const clothingInOutfitWornThunk = createAsyncThunk(
//     'closet/clothingInOutfitWorn',
//     async (arg, thunkAPI) => {
//         // console.log('arg')
//         // console.log(arg)
//         // Object.keys(arg).forEach(key => {
//         //     arg[key].forEach(id => {
//         //         thunkAPI.getState().closetObject[key].find(clothingObject => {
//         //             clothingObject._id === id
//         //         }).timesWorn++;
//         //     })
//         // })
//         // return arg;
//         console.log('in think XD')
//         thunkAPI.dispatch(clothingInOutfitWorn(arg))
//     }
// )

const closetSlice = createSlice({
    name: 'closet',
    initialState: {
        closetObject: {
            topsArray: [
                {
                    _id: 69,
                    clothingType: 'tops',
                    clothingName: 'shirt',
                    brandName: ['Comme Des Garcons', 'CDG'],
                    timesWorn: 0, //defaults to zero, user can't control this
                    favorite: false,
                    price: '$98',
                    color: 'black',
                    tags: ['hype', 'casual', 'stolen', 'retail', 'ugly'],
                    images: [],
                    pieceType: 'T-Shirt',
                    oufitsInArray: []
                },{
                    _id: 70,
                    clothingType: 'tops',
                    clothingName: 'white shirt',
                    brandName: ['Supreme'],
                    timesWorn: 0, //defaults to zero, user can't control this
                    favorite: false,
                    price: '$98',
                    color: 'black',
                    images: [],
                    tags: ['hype', 'casual'],
                    pieceType: 'T-Shirt',
                    oufitsInArray: []
                },{
                    _id: 71,
                    clothingType: 'tops',
                    clothingName: 'tan coat',
                    brandName: ['UNDFTD', 'Undefeated'],
                    timesWorn: 0, //defaults to zero, user can't control this
                    favorite: false,
                    
                    price: '$98',
                    color: 'black',
                    tags: ['hype', 'casual'],
                    images: [],
                    pieceType: 'coat',
                    oufitsInArray: []
                    
                },{
                    _id: 72,
                    clothingType: 'tops',
                    clothingName: 'baby milo shirt',
                    brandName: ['Bape', 'A Bathing Ape'],
                    timesWorn: 0, //defaults to zero, user can't control this
                    favorite: false,
                    price: '$98',
                    color: 'black',
                    tags: ['hype', 'casual'],
                    images: [],
                    pieceType: 'T-Shirt',
                    oufitsInArray: []
                    
                },
            ],
            bottomsArray: [
                {
                _id: 333,
                clothingType: 'bottoms',
                clothingName: 'Light Wash Jeans',
                brandName: ['Acne', 'Acne Studios'],
                timesWorn: 0, //defaults to zero, user can't control this
                favorite: true,
                price: '$198',
                color: 'blue',
                tags: ['casual'],
                images: [],
                pieceType: 'Jeans'
            },
        ],
            footwearArray: [
                {
                    _id: 3123,
                    clothingType: 'footwear',
                    clothingName: 'Air Jordan 1 Mocha',
                    brandName: ['Nike', 'Jordan'],
                    timesWorn: 0, //defaults to zero, user can't control this
                    favorite: true,
                    price: '$170',
                    color: 'brown',
                    tags: ['casual'],
                    images: [],
                    pieceType: 'Sneakers',
                    oufitsInArray: []
                },
            ],
            otherArray: [
                {
                    _id: 44,
                    clothingType: 'other',
                    clothingName: 'Gucci Ring',
                    brandName: ['Gucci'],
                    timesWorn: 0, //defaults to zero, user can't control this
                    favorite: true,
                    price: '$500',
                    color: 'silver',
                    tags: ['luxury'],
                    images: [],
                    pieceType: 'ring',
                    oufitsInArray: []
                },
            ]
        },
        clothingPieceInProgress: {
            _id: 0,
            clothingType: '',
            clothingName: '',
            pieceType: '',
            size: '',
            price: '', //$0
            color: '',
            brandName: [
                []
            ], // array of names and nicknames
            timesWorn: 0, //defaults to zero, user can't control this
            tags: [],
            images: [],
            favorite: false,
            
        },
        typesOfClothing: {
            // case matters
            tops: ['T-Shirt', 'Jacket', 'Trenchcoat', 'Sweater', 'Hoodie','Dress Shirt'],
            bottoms: ['Jeans', 'Cargo Pants', 'Shorts', 'Swim Trunks', 'Sweatpants'],
            footwear: ['Sneakers', 'Sandals', 'Flip Flops', 'Socks', 'Boots', 'Dress Shoes'],
            other: ['Ring', 'Jewelery', 'Glasses', 'Backpack', 'Fanny Pack']
        },
        brandsArray: 
            [
                ['Comme Des Garcons', 'CDG'], 
                ['Supreme'], 
                ['Undefeated', 'UNDFTD'],
                ['Ader Error', 'AE'],
                ['Cav Empt', 'CE'],
                ['Nike'],
                ['Jordan'],
                ['Guess', 'Guess Jeans', 'Guess USA']
            ]
        ,
        sizingObject: {
            letter: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
            number: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13],
            other: []
        },
        status: 'idle',
        error: null
    },
    reducers: {
        itemAddedToCloset: {

        },
        clothingInProgressAttributeAdded: {
            reducer(state, action) {
                let payloadKeys = Object.keys(action.payload);
                payloadKeys.forEach(key => (
                    state.clothingPieceInProgress[key] = action.payload[key]
                ))
            },
        },
        clothingAddedToCloset: {
            reducer(state, action) {


                /**
                 * _id: 72,
                    clothingType: 'tops',
                    clothingName: 'baby milo shirt',
                    brandName: ['Bape', 'A Bathing Ape'],
                    timesWorn: 0, //defaults to zero, user can't control this
                    favorite: false,
                    price: '$98',
                    color: 'black',
                    tags: ['hype', 'casual'],
                    images: [],
                    pieceType: 'T-Shirt'
                    oufitsInArray: []
                 */
                state.closetObject[action.payload.clothingType.toLowerCase() + 'Array'] =
                [...state.closetObject[action.payload.clothingType.toLowerCase() + 'Array'], action.payload]
            }
        },
        itemFavoriteToggled: {
            reducer(state, action) {
                console.log(action.payload);
                console.log('the full array of that type')
                console.log(state.closetObject[action.payload.clothingType.toLowerCase() + 'Array'])

                let itemToEdit = state.closetObject[action.payload.clothingType.toLowerCase() + 'Array']
                .find(clothingObj => clothingObj._id === action.payload._id);
                itemToEdit.favorite = !itemToEdit.favorite;
            }
        },
        clothingDeletedFromCloset: {
            reducer (state, action) {
                state.closetObject[action.payload.clothingType.toLowerCase() + 'Array'] = 
                state.closetObject[action.payload.clothingType.toLowerCase() + 'Array'].filter(
                    obj => obj._id !== action.payload._id
                )
            }
        },
        typesOfClothingSpecificTypeAdded: {
            reducer (state, action) {
                console.log(action.payload)
                state.typesOfClothing[action.payload.clothingType] =
                [...state.typesOfClothing[action.payload.clothingType], action.payload.newSpecificType]
            }
        },
        typesOfClothingSpecificTypeDeleted: {
            reducer (state, action) {
                console.log(action.payload);
                state.typesOfClothing[action.payload.clothingType] = 
                state.typesOfClothing[action.payload.clothingType].filter(type => type !== action.payload.specificTypeToDelete)
            }
        },
        sizeAdded: {
            reducer (state, action) {
                if (action.payload.sizeToAdd !== ''){
                    state.sizingObject[action.payload.sizeType] = 
                    [...state.sizingObject[action.payload.sizeType], action.payload.sizeToAdd]
                }else {
                    console.log(`entered a '' payload, not saving`)
                }
                
            }
        },
        sizeDeleted: {
            reducer (state, action) {
                state.sizingObject[action.payload.sizeType] =
                state.sizingObject[action.payload.sizeType].filter(sz => sz !== action.payload.sizeToDelete)
            }
        },
        brandAdded: {
            reducer (state, action) {
                if (action.payload.newBrandArray[0] !== ''){
                    state.brandsArray = [...state.brandsArray, action.payload.newBrandArray]
                } else {
                    console.log(`entered a '' payload, not saving`)
                }
                
            }
        },
        brandDeleted: {
            reducer (state, action) {
                state.brandsArray = 
                state.brandsArray.filter(brandArray => brandArray[0] !== action.payload.brandArrayToRemove[0])
            }
        },
        clothingInProgressCleansed: {
            reducer (state, action) {
                state.clothingPieceInProgress = {
                    _id: 0,
                    clothingType: '',
                    clothingName: '',
                    pieceType: '',
                    size: '',
                    price: '', //$0
                    color: '',
                    brandName: [
                        []
                    ], // array of names and nicknames
                    timesWorn: 0, //defaults to zero, user can't control this
                    outfitsWornIn: [], //defaults to empty array
                    tags: [],
                    images: [],
                    favorite: false,
                }
                console.log('cleansed clothingPieceInProgress')
                console.log(state.clothingPieceInProgress);
            }
        },
        clothingInOutfitWorn: {
            reducer (state, action){
                //increment timesWorn,
                //add the outfitObject _id to an "outfitsWornIn" array
                //this requires some restructuring of our redux logic
                //  --needs _id in each outfitObject... could alternatively use the 'date' attrute
                //  --deleting an outfit means deleting that outfitId from each clothing with it saved in outfitsWornIn
                //  --deleting a clothing means retracing to each outfit it is worn in, and deleting its ID to not cause errors
                console.log("In clothingInOutfitWorn")
                Object.keys(action.payload.idObjectArray).forEach(key => {
                    action.payload.idObjectArray[key].forEach(id => {
                        console.log(`id we're finding: ${id}`)
                        let toInc = state.closetObject[key].find(clothingObject => 
                            clothingObject._id === id
                        )
                        toInc.timesWorn++;
                        //adds the _id of the outfit this clothing is worn in to the outfitsWornIn array
                        if (!toInc.outfitsWornIn){
                            toInc.outfitsWornIn = [];
                        }
                        toInc.outfitsWornIn = [...toInc.outfitsWornIn, action.payload._id]
                    })
                })
            },
            prepare(idObjectArray, _id) {
                return {
                    payload: {
                        idObjectArray,
                        _id
                    }
                }
            }
        }
    },
})

export default closetSlice.reducer;
export const { 
    outfitCreated,
    clothingInProgressAttributeAdded ,
    clothingAddedToCloset,
    itemFavoriteToggled,
    clothingDeletedFromCloset,
    typesOfClothingSpecificTypeAdded,
    typesOfClothingSpecificTypeDeleted,
    sizeAdded,
    sizeDeleted,
    brandAdded,
    brandDeleted,
    clothingInProgressCleansed,
    clothingInOutfitWorn
} = closetSlice.actions;