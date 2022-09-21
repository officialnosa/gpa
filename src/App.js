import 'react-native-gesture-handler'

import React from 'react'

import update from 'immutability-helper'

import { Root } from './navigation'
import { AppStateProvider } from './providers/AppStateProvider'

update.extend('$auto', (v, obj) => (obj ? update(obj, v) : update({}, v)))

export default function App() {
  return (
    <AppStateProvider>
      <Root />
    </AppStateProvider>
  )
}
