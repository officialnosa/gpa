import React from 'react'
import { Provider } from 'react-redux'
import { Root } from './navigation'
import getStore from './redux/store'
import { PersistGate } from 'redux-persist/es/integration/react'
import update from 'immutability-helper'
import 'react-native-gesture-handler'

update.extend('$auto', (v, obj) => (obj ? update(obj, v) : update({}, v)))

const { store, persistor } = getStore()

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
