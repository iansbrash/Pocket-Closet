import { DrawerActions } from '@react-navigation/native'
import { createSlice } from '@reduxjs/toolkit'
import { ActivityIndicatorComponent } from 'react-native';
 

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
                    pieceType: 'T-Shirt'
                },{
                    _id: 70,
                    clothingType: 'tops',
                    clothingName: 'white shirt',
                    brandName: ['Supreme'],
                    timesWorn: 0, //defaults to zero, user can't control this
                    favorite: false,
                    price: '$98',
                    color: 'black',
                    tags: ['hype', 'casual'],
                    pieceType: 'T-Shirt'
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
                    pieceType: 'coat'
                    
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
                    pieceType: 'T-Shirt'
                    
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
                pieceType: 'Jeans'
            },
        ],
            footwearArray: [
                {
                    _id: 21,
                    clothingType: 'footwear',
                    clothingName: 'Air Jordan 1',
                    brandName: ['Jordan', 'Nike'],
                    timesWorn: 0, //defaults to zero, user can't control this
                    favorite: true,
                    optionalProps: {
                    }
                },
            ],
            accessoriesArray: []
        },
        clothingPieceInProgress: {
            _id: 0,
            clothingType: '',
            clothingName: '',
            pieceType: '',
            size: '',
            price: '$0',
            color: '',
            brandName: [
                []
            ], // array of names and nicknames
            timesWorn: 0, //defaults to zero, user can't control this
            tags: [],
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
                ['Comme Des Garcons, CDG'], 
                ['Supreme'], 
                ['Undefeated', 'UNDFTD'],
                ['Ader Error', 'AE'],
                ['Cav Empt', 'CE'],
                ['Nike'],
                ['Jordan'],
                ['Guess', 'Guess Jeans', 'Guess USA']
            ]
        ,
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
                state.closetObject[action.payload.clothingType + 'Array'] =
                [...state.closetObject[action.payload.clothingType + 'Array'], action.payload]
            }
        },
        itemFavoriteToggled: {
            reducer(state, action) {
                console.log(action.payload);

                let itemToEdit = state.closetObject[action.payload.clothingType + 'Array']
                .find(clothingObj => clothingObj._id === action.payload._id);
                console.log(itemToEdit); //SHIT WORKS
                itemToEdit.favorite = !itemToEdit.favorite;
            }
        },
        clothingDeletedFromCloset: {
            reducer (state, action) {
                state.closetObject[action.payload.clothingType + 'Array'] = 
                state.closetObject[action.payload.clothingType + 'Array'].filter(
                    obj => obj._id !== action.payload._id
                )
            }
        },
        
        topAddedToCloset: {
            reducer(state, action) {
                console.log('fuck u')
            }
        }, bottomAddedToCloset: {
            reducer(state, action) {
                console.log('fuck u')
            }
        }, shoeAddedToCloset: {
            reducer(state, action) {
                console.log('fuck u')
            }
        }, accessoryAddedToCloset: {
            reducer(state, action) {
                console.log('fuck u')
            }
        }, outfitCreated: {
            reducer(state, action) {
                console.log('fuck u')
            }
        }
    },
})

export default closetSlice.reducer;
export const { 
    topAddedToCloset, 
    bottomAddedToCloset, 
    shoeAddedToCloset,
    accessoryAddedToCloset,
    outfitCreated,
    clothingInProgressAttributeAdded ,
    clothingAddedToCloset,
    itemFavoriteToggled,
    clothingDeletedFromCloset
} = closetSlice.actions;