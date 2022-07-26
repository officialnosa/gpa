import React from 'react'
import { Provider } from 'react-redux'

import { createBrowserApp } from '@react-navigation/web'
import update from 'immutability-helper'
import { PersistGate } from 'redux-persist/es/integration/react'

import { Root } from './navigation'
import getStore from './redux/store'

update.extend('$auto', (v, obj) => (obj ? update(obj, v) : update({}, v)))

const { store, persistor } = getStore()

const Nav = createBrowserApp(Root)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Nav />
        </PersistGate>
      </Provider>
    )
  }
}
