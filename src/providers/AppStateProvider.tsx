import 'firebase/auth'
import 'firebase/firestore'

import type { FC } from 'react'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import type { ReactReduxFirebaseConfig } from 'react-redux-firebase'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

import { initializeApp } from 'firebase/app'
import { PersistGate } from 'redux-persist/es/integration/react'

import getStore from '../redux/store'

const firebaseConfig = {
  apiKey: 'AIzaSyAKRs4DhA2evZhQa_rudN-a6ASMMuLoj8Y',
  authDomain: 'osarogie-247.firebaseapp.com',
  projectId: 'osarogie-247',
  storageBucket: 'osarogie-247.appspot.com',
  messagingSenderId: '1439811314',
  appId: '1:1439811314:web:91c7d7174287006503326b',
  measurementId: 'G-K86VNBND4K',
}
const rrfConfig: Partial<ReactReduxFirebaseConfig> = {
  userProfile: 'users', // where profiles are stored in database
  presence: 'presence', // where list of online users is stored in database
  sessions: 'sessions', // where list of user sessions is stored in database (presence must be enabled)
  useFirestoreForProfile: true,
}

const firebaseApp = initializeApp(firebaseConfig)

const { store, persistor } = getStore()

export const AppStateProvider: FC = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebaseApp}
        config={rrfConfig}
        dispatch={store.dispatch}
      >
        {/* @ts-ignore */}
        <PersistGate persistor={persistor}>{children}</PersistGate>
      </ReactReduxFirebaseProvider>
    </ReduxProvider>
  )
}
