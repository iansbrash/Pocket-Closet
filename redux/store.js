import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import closetReducer from './reducers/closetSlice'
import outfitsReducer from './reducers/outfitsSlice'
import statsReducer from './reducers/statsSlice'
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux'
import {
    persistStore,
    persistReducer,
    persistCombineReducers,
  } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage } from 'react-native'
import {enableBatching, batchDispatchMiddleware} from 'redux-batched-actions';


/** Persist Starts Here */
const persistConfig = {
    key: 'primary',
    version: 1,
    storage: AsyncStorage
}

const rootReducer = combineReducers({
    closet: closetReducer,
    outfits: outfitsReducer,
    stats: statsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = createStore(persistedReducer, undefined, applyMiddleware(batchDispatchMiddleware))
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