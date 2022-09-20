import 'firebase/auth'
import 'firebase/firestore'

import type { FC } from 'react'
import React from 'react'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

import firebase from 'firebase/app'
const fbConfig = {}

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
}

firebase.initializeApp(fbConfig)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
}

export const AppStateProvider: FC = ({ children }) => {
  return (
    <ReactReduxFirebaseProvider {...rrfProps}>
      {children}
    </ReactReduxFirebaseProvider>
  )
}

// http://react-redux-firebase.com
