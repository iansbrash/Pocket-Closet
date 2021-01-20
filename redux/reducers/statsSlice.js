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
        }

    },
})


export default statsSlice.reducer;
export const {
    updateStatObjectFromIndividualStat,
    updateStatObjectFromStatArray
} = statsSlice.actions
