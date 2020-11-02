import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import closetReducer from './reducers/closetSlice'
import outfitsReducer from './reducers/outfitsSlice'
import { combineReducers } from 'redux';
import { createStore } from 'redux'
import {
    persistStore,
    persistReducer,
    persistCombineReducers,
  } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage } from 'react-native'


/** Persist Starts Here */
const persistConfig = {
    key: 'primary',
    version: 1,
    storage: AsyncStorage
}

const rootReducer = combineReducers({
    closet: closetReducer,
    outfits: outfitsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = createStore(persistedReducer)
/** Persist Ends Here */


/** Non-persisted storage starts here */
// const store = configureStore({
//     reducer: {
//         closet: closetReducer,
//         outfits: outfitsReducer
//     }
// })
/** Non-persisted storage ends here */

export default store