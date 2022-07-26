import React from 'react'
import { Provider } from 'react-redux'
import { Root } from './navigation'
import getStore from './redux/store'
import { PersistGate } from 'redux-persist/es/integration/react'
import { View, Text, ActivityIndicator, Platform } from 'react-native'
import update from 'immutability-helper'
// import { createBrowserApp } from './navhistory'
// import { ThemeProvider } from 'react-native-material-ui'
import { createBrowserApp } from '@react-navigation/web'

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }

const uiTheme = {
  palette: {
    primaryColor: '#fff',
    secondaryColor: '#000',
    accentColor: '#000',

    primaryTextColor: '#000',
    secondaryTextColor: '#000',
    alternateTextColor: '#000',
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
}
update.extend('$auto', (v, obj) => (obj ? update(obj, v) : update({}, v)))

const { store, persistor } = getStore()

const Splash = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#ffd200',

      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text
      style={{
        fontSize: 80,
        ...Platform.select({ web: { fontWeight: 'bold' }, default: {} }),
      }}
    >
      GPA
    </Text>
    <Text style={{ fontSize: 20, marginBottom: 20 }}>CALCULATOR</Text>
    <ActivityIndicator size="small" color="#000" />
  </View>
)

const Nav = createBrowserApp(Root)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {/* <ThemeProvider uiTheme={uiTheme}> */}
        <PersistGate persistor={persistor}>
          <Nav />
        </PersistGate>
        {/* </ThemeProvider> */}
      </Provider>
    )
  }
}
