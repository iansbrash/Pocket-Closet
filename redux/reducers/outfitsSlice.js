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
            fitpic: {
                fitpic: '',
                type: ''
            },
            date: '',
            favorite: false,
            descrition: '',
            tags: [],
            _id: '',
            // What if the _id wasn't random, but was instead some hash that
            // is created from the contents of the tops, bottoms, footwear, and otherArray
            // this hash is quickly computable, and serves as not only an _id, but a way to check if
            // an outfit is identical to another that is being created
            //      This function should give the same output regardless of the order of the clothingObjects
            //      --Might've been better to use Sets instead of Arrays
            outfitArr: {
                topsArray: [],
                bottomsArray: [],
                footwearArray: [],
                otherArray: [],
            }
        },
        taggedOutfits: { //each property contains the IDs of outfits that have used that tag
            tag1: [],
            tag2: [], //etc... we don't need these tags to contain objects that contain arrays unlike taggedClothing
        },
        status: 'idle', // idle, success, or error. call 'success' on creating an outfit to prompt animation
        error: null
    },
    reducers: {
        outfitCreatedFromHome: {
            reducer (state, action) {
                console.log("In outfitCreatedFromHome")

                //adds outfit to our state
                //date is tentative

                //update 11/5/20: we need to store our items as an array of IDs and 
                //fetch the corresponding items when we need them, or else we don't
                //have dynamic items that can be edited once we put them in
                //the outfits store
                //let date = new Date();

                //parse the date into ms after 1970... so it looks like
                //48916294801235
                //then we can retrieve the date info by doing new Date(outfitObject.date)
                //we might need to do this directly outside of this slice..
                //cuz this is bad practice?
                //action.payload.date = date;//Date.parse(date);
                


                //action.payload.fitpic = state.outfitInProgress.fitpic
                /** the object we push into the outfitsArray SHOULD (and hopefully will) look like this:
                 *  {
                 *      fitpic: {
                 *          fitpic: '',
                 *          type: 'imgur' or 'local', default ''
                 *      },             //not yet implemented
                 *      date: new Date(),
                 *      favorite: false,        //not yet implemented
                 *      description: ''         //not yet implemented
                 *      tags: []                //not yet implemented
                 *      _id: 'ms892-sdj3ds'
                 *      outfitArr: {            //each of these arrays only hold string _id's     
                 *          topsArray: [],
                 *          bottomsArray: [],
                 *          footwearArray: [],
                 *          otherArray: []
                 *      }
                 *  } 
                 */

                let { outfitArr, _id, date } = action.payload;

                state.outfitInProgress.outfitArr = outfitArr;
                state.outfitInProgress._id = _id;
                state.outfitInProgress.date = date;

                  // we previously used push, trying spread operator to get rid off:
                 //assign to read-only property' error
                // state.outfitsArray.push(action.payload);
                console.log('here is state.outfitInProgress before we push it')
                console.log(state.outfitInProgress)
                // we previously did the below... (similar to pushing)
                // state.outfitsArray = [...state.outfitsArray, state.outfitInProgress]

                // now we do this... so the most recent outfit is always nearest the front
                state.outfitsArray = [state.outfitInProgress, ...state.outfitsArray]


                //turns out outfitArr is an object... holding the 4 ararys... kill me
                console.log("about to log action.payload")
                console.log(action.payload)

                // resets outfit in progress
                state.outfitInProgress = {
                    fitpic: {
                        fitpic: '',
                        type: ''
                    },
                    date: '',
                    favorite: false,
                    description: '',
                    tags: [],
                    _id: '',
                    outfitArr: {
                        topsArray: [],
                        bottomsArray: [],
                        footwearArray: [],
                        otherArray: [],
                    }
                }
            },
            prepare( outfitArr, _id, date ) {
                return {
                    payload: {
                        outfitArr,
                        _id,
                        date
                    }
                }
            }
        },
        outfitInProgressItemAdded: {
            reducer (state, action) {
                if (!state.outfitInProgress.outfitArr[action.payload.itemType]
                        .find(clothingObj => clothingObj._id === action.payload.item._id)){
                    state.outfitInProgress.outfitArr[action.payload.itemType].push(action.payload.item)
                }
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
                state.outfitInProgress.outfitArr[action.payload.clothingType.toLowerCase() + "Array"] = 
                state.outfitInProgress.outfitArr[action.payload.clothingType.toLowerCase() + "Array"]
                    .filter(obj => obj._id !== action.payload._id)   //.splice(delIndex, 1);
            }
        },
        outfitInProgressAttributeAdded: {
            reducer (state, action) {
                console.log(`In outfitInProgressAttributeAdded. action.payload.keys: ${Object.keys(action.payload)}`)     
                Object.keys(action.payload).forEach(key => {
                    state.outfitInProgress[key] = action.payload[key];
                })
            }
        },
        outfitInProgressFitpicAdded: {
            reducer (state, action) {
                //this should just be the fitpic url, given our prepare function
                console.log(action.payload)

                if (action.payload.fitpic !== ''){
                    state.outfitInProgress.fitpic = {
                        fitpic: action.payload.fitpic,
                        type: action.payload.type
                    };
                } else {
                    console.log('no imgur url provided for fitpic')
                }
            },
            prepare (fitpic, type) {
                return {
                    payload: {
                        fitpic,
                        type
                    }
                }
            }
        },
        outfitInProgressCleansed: {
            reducer (state, action) {
                state.outfitInProgress = {
                    fitpic: {
                        fitpic: '',
                        type: ''
                    },
                    date: '',
                    favorite: false,
                    description: '',
                    tags: [],
                    _id: '',
                    outfitArr: {
                        topsArray: [],
                        bottomsArray: [],
                        footwearArray: [],
                        otherArray: [],
                    }
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
                console.log(`'toggling outfitFavorite for outfit ${action.payload._id}'`)
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
        createdOutfitTagged: {
            reducer (state, action) {
                console.log(`in createdOutfitTagged with _id ${_id}`)
                const { tagsArray, _id } = action.payload

                tagsArray.forEach(tag => {
                    // add tag if it isnt in the taggedOutfits object
                    !state.taggedOutfits[tag] ? state.taggedOutfits[tag] = [] : null;

                    state.taggedOutfits[tag].push(_id)
                })

            },
            prepare (_id, tagsArray) {
                return {
                    payload: {
                        tagsArray,
                        _id
                    }
                }
            }
        },
        pushClothingObjectsToOutfitInProgress: {
            reducer (state, action) {
                // should we cleanse beforehand? might leave residual description / tags... nah
                console.log(`action.payload.outfitArr.length: ${action.payload.outfitArr.length}`)
                state.outfitInProgress.outfitArr = action.payload.outfitArr
            },
            prepare (outfitArr) {
                return {
                    payload: {
                        outfitArr
                    }
                }
            }
        }
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
    outfitInProgressFitpicAdded,
    outfitInProgressAttributeAdded,
    createdOutfitTagged,
    pushClothingObjectsToOutfitInProgress
} = outfitsSlice.actions