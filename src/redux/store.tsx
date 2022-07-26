import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { persistCombineReducers, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

import { courses, field, school, user } from './reducers'

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

export default () => {
  let store = configureStore({
    reducer,
    middleware: [thunk, logger],
  })
  let persistor = persistStore(store)
  return { store, persistor }
}
