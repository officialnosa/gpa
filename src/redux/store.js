import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
})

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers'

export default () => {
  const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware))

  let store = createStore(rootReducer, {}, enhancer)
  // let persistor = persistStore(store)
  return { store }
  // return { store, persistor }
}
