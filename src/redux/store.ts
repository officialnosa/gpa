import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { persistCombineReducers, persistStore } from 'redux-persist'

import { courses, field, school, user } from './reducers'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants'

const config = {
  key: 'root',
  storage: AsyncStorage,
}

const reducer = persistCombineReducers(config, {
  school,
  field,
  courses,
  user,
})

const logger = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
})

export default () => {
  let persistor = persistStore(store)
  return { store, persistor }
}

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
