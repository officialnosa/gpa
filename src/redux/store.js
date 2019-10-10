import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'
const config = {
  key: 'root',
  storage
}

const reducer = persistReducer(config, rootReducer)

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
})

export default () => {
  const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware))

  let store = createStore(reducer, {}, enhancer)
  let persistor = persistStore(store)
  return { store, persistor }
}
