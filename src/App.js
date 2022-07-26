import 'react-native-gesture-handler'

import React from 'react'
import { Provider } from 'react-redux'

import update from 'immutability-helper'
import { PersistGate } from 'redux-persist/es/integration/react'

import { Root } from './navigation'
import getStore from './redux/store'

update.extend('$auto', (v, obj) => (obj ? update(obj, v) : update({}, v)))

const { store, persistor } = getStore()

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  )
}
