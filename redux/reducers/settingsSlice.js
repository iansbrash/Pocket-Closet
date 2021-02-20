import { createSlice } from '@reduxjs/toolkit'


const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        settingsObject: {
            homeSettings: {
                userName: 'User',
                userIcon: ''
            }
        }
    },
    reducers: {
        updateHomeUserName: {
            reducer (state, action) {
                const { newName } = action.payload;
                state.settingsObject.homeSettings.userName = newName;
            },
            prepare (newName) {
                return {
                    payload: {
                        newName
                    }
                }
            }
        },
        updateHomeUserIcon: {
            reducer (state, action) {
                const { uri } = action.payload;

                state.settingsObject.homeSettings.userIcon = uri;
            },
            prepare(uri) {
                return {
                    payload: {
                        uri
                    }
                }
            }
        }
    }
})


export default settingsSlice.reducer;
export const {
    updateHomeUserName,
    updateHomeUserIcon
} = settingsSlice.actions
