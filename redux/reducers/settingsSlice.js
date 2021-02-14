import { createSlice } from '@reduxjs/toolkit'


const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        settingsObject: {
            test: 1
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
        }
    }
})


export default settingsSlice.reducer;
export const {
    // updateStatObjectFromIndividualStat,
    // updateStatObjectFromStatArray,
    // updateVariableStats
} = settingsSlice.actions
