import { createSlice } from '@reduxjs/toolkit'


const statsSlice = createSlice({
    name: 'stats',
    initialState: {
        statsObject: {
            verbalStats: {
                totalClosetWorth: 0,
                totalTimesWorn: 0,
                totalNumberOfBrands: 0,
                totalClosetSize: 0
            },
            variableStats: {
                piecesPerOutfit: {
                    pieces: [],     // i.e. [4, 5, 2, 6]
                },
                pricesPerOutfit: {
                    price: []
                },
                brandsPerOutfit: {
                    brands: []
                },
                colorsPerOutfit: {
                    colors: []
                },
                perOutfitDates: {
                    dates: []
                },
                closetQuantityPerMonth: {
                    //less impt
                },
                closetPricePerMonth: {

                }
            }
        }
    },
    reducers: {
        updateStatObjectFromIndividualStat: {
            reducer (state, action) {
                console.log(`in updateStatObjectFromIndividualStat`)
                const { statCategory, statName, stat } = action.payload;

                state.statsObject[statCategory][statName] = stat;
            },
            prepare (statCategory, statName, stat) {
                return {
                    payload: {
                        statCategory,
                        statName,
                        stat
                    }
                }
            }
        },
        updateStatObjectFromStatArray: {
            reducer (state, action) {
                console.log(`in updateStatObjectFromStatArray `)
                const { statCategory, statNameArray, statArray } = action.payload

                statNameArray.forEach((statName, index) => {
                    state.statsObject[statCategory][statNameArray[index]] = statArray[index]
                    console.log(state.statsObject[statCategory][statNameArray[index]])
                })
            },
            prepare (statCategory, statNameArray, statArray) {
                return {
                    payload: {
                        statCategory,
                        statNameArray,
                        statArray
                    }
                }
            }
        },
        updateVariableStats: {
            reducer (state, action) {
                // payload will look like:
                /**
                 * {
                 *      objectName: ['1', '2', '3']
                 *      objectAttribute: ['prices', 'colors', 'brands']
                 *      attributeValueToPush: ['3', '4', '2']
                 * }
                 * 
                 */

                const { objectName, objectAttribute, attributeValueToPush} = action.payload;

                objectName.forEach((obj, index) => {
                    let toPush = state.statsObject.variableStats[obj][objectAttribute[index]];
                    toPush.push(attributeValueToPush[index]);
                    toPush.length > 6 ? toPush.pop() : null;
                })
            },
            prepare (objectName, objectAttribute, attributeValueToPush) {
                return {
                    payload: {
                        objectName,
                        objectAttribute,
                        attributeValueToPush
                    }
                }
            }
        }
    },
})


export default statsSlice.reducer;
export const {
    updateStatObjectFromIndividualStat,
    updateStatObjectFromStatArray,
    updateVariableStats
} = statsSlice.actions
