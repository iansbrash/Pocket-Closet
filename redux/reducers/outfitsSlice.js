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
            accessoriesArray: [

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
                let date = new Date();
                date = date.toDateString();
                action.payload.date = date;
                state.outfitsArray.push(action.payload);

                // resets outfit in progress
                state.outfitInProgress = {
                    topsArray: [],
                    bottomsArray: [],
                    footwearArray: [],
                    accessoriesArray: []}
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
                state.outfitInProgress[action.payload.clothingType + "Array"] = 
                state.outfitInProgress[action.payload.clothingType + "Array"].filter(obj => obj._id !== action.payload._id)   //.splice(delIndex, 1);
            }
        }
    }

})

export default outfitsSlice.reducer
export const { 
    outfitCreatedFromHome, 
    outfitInProgressItemAdded,
    outfitInProgressItemDeleted } = outfitsSlice.actions