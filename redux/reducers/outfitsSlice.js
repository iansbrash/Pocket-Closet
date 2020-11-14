import { createSlice } from '@reduxjs/toolkit'





/** TODO
 *  Each outfit needs a 'link' attribute
 *      Upload via imgur. Store link and deleteHash 
 */
const outfitsSlice = createSlice({
    name: 'outfits',
    initialState: {
        outfitsArray: [
            
        ],
        outfitInProgress: {
            topsArray: [
                
            ],
            bottomsArray: [

            ],
            footwearArray: [

            ],
            otherArray: [

            ],
            fitpic: ''
        },
        status: 'idle',
        error: null
    },
    reducers: {
        outfitCreatedFromHome: {
            reducer (state, action) {
                console.log(action.payload);

                //adds outfit to our state
                //date is tentative

                //update 11/5/20: we need to store our items as an array of IDs and 
                //fetch the corresponding items when we need them, or else we don't
                //have dynamic items that can be edited once we put them in
                //the outfits store
                let date = new Date();

                //parse the date into ms after 1970... so it looks like
                //48916294801235
                //then we can retrieve the date info by doing new Date(outfitObject.date)
                action.payload.item.date = Date.parse(date);

                /** the object we push into the outfitsArray SHOULD (and hopefully will) look like this:
                 *  {
                 *      fitpic: '',             //not yet implemented
                 *      date: new Date(),
                 *      favorite: false,        //not yet implemented
                 *      description: ''         //not yet implemented
                 *      _id: 'ms892-sdj3ds'
                 *      outfitArr: {            //each of these arrays only hold string _id's     
                 *          topsArray: [],
                 *          bottomsArray: [],
                 *          footwearArray: [],
                 *          otherArray: []
                 *      }
                 *  } 
                 */


                  // we previously used push, trying spread operator to get rid off:
                 //assign to read-only property' error
                // state.outfitsArray.push(action.payload);
                //this did not doa nything lmao
                state.outfitsArray = [...state.outfitsArray, action.payload.item]


                //turns out outfitArr is an object... holding the 4 ararys... kill me
                console.log("about to log action.payload")
                console.log(action.payload)

                // resets outfit in progress
                state.outfitInProgress = {
                    fitpic: '',
                    topsArray: [],
                    bottomsArray: [],
                    footwearArray: [],
                    otherArray: []
                }
            },
            prepare( outfitArr, _id ) {
                return {
                    payload: {
                        item: {
                            outfitArr,
                            _id
                        }
                        
                    }
                }
            }
        },
        outfitInProgressItemAdded: {
            reducer (state, action) {
                console.log(action.payload);
                state.outfitInProgress[action.payload.itemType].push(action.payload.item)
            },
            prepare (item, itemType) {
                return {
                    payload: {
                        itemType,
                        item
                    }
                }
            }
        },
        outfitInProgressItemDeleted: {
            reducer (state, action) {
                console.log(action.payload)
                state.outfitInProgress[action.payload.clothingType.toLowerCase() + "Array"] = 
                state.outfitInProgress[action.payload.clothingType.toLowerCase() + "Array"].filter(obj => obj._id !== action.payload._id)   //.splice(delIndex, 1);
            }
        },
        outfitInProgressFitpicAdded: {
            reducer (state, action) {
                //this should just be the fitpic url, given our prepare function
                console.log(action.payload)

                if (action.payload !== ''){
                    state.outfitInProgress.fitpic = action.payload;
                } else {
                    console.log('no imgur url provided for fitpic')
                }
            },
            prepare (fitpic) {
                return {
                    payload: {
                        fitpic: fitpic
                    }
                }
            }
        },
        outfitInProgressCleansed: {
            reducer (state, action) {
                state.outfitInProgress = {
                    topsArray: [
                        
                    ],
                    bottomsArray: [
        
                    ],
                    footwearArray: [
        
                    ],
                    otherArray: [
        
                    ]
                }
                console.log('cleansed outfitInProgress')
                console.log(state.outfitInProgress);
            }
        },
        outfitDeletedFromOutfits: {
            reducer (state, action) {
                console.log("outfitDeletedFromOutfits called. Action.payload:")
                console.log(action.payload)
                state.outfitsArray = state.outfitsArray.filter(outfitObject => outfitObject._id !== action.payload._id)
            },
            prepare (outfitId) {
                return {
                    payload: {
                        _id: outfitId
                    }
                }
            }
        },
        outfitFavoriteToggled: {
            reducer(state, action) {
                let itemToEdit = state.outfitsArray.find(outfitObject => outfitObject._id === action.payload._id)
                itemToEdit.favorite = !itemToEdit.favorite;
            },
            prepare (outfitId) {
                return {
                    payload: {
                        _id: outfitId
                    }
                }
            }
        },
    }

})

export default outfitsSlice.reducer
export const { 
    outfitCreatedFromHome, 
    outfitInProgressItemAdded,
    outfitInProgressItemDeleted,
    outfitInProgressCleansed,
    outfitDeletedFromOutfits,
    outfitFavoriteToggled,
    outfitInProgressFitpicAdded
} = outfitsSlice.actions