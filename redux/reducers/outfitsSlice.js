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

            ]
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
                date = date.toDateString();
                action.payload.date = date;

                //this will be an object that holds 4 arrays that each hold the IDs of the clothing
                state.outfitsArray.push(action.payload);


                //turns out outfitArr is an object... holding the 4 ararys... kill me
                console.log("about to log action.payload")
                console.log(action.payload)

                // resets outfit in progress
                state.outfitInProgress = {
                    topsArray: [],
                    bottomsArray: [],
                    footwearArray: [],
                    otherArray: []
                }
            },
            prepare( outfitArr ) {
                return {
                    payload: {
                        outfitArr
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
        }
    }

})

export default outfitsSlice.reducer
export const { 
    outfitCreatedFromHome, 
    outfitInProgressItemAdded,
    outfitInProgressItemDeleted,
    outfitInProgressCleansed } = outfitsSlice.actions