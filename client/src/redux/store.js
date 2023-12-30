import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import {persistReducer, persistStore} from "redux-persist"

import storage from 'redux-persist/lib/storage'//local storage

//persistor-rootreducer
const rootReducer = combineReducers({user : userReducer })

const persistConfig = {
  key: "root",
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check for development
    }),
})

export const persistor = persistStore(store)