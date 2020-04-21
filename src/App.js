import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { Root } from './navigation'
import getStore from './redux/store'
import { PersistGate } from 'redux-persist/es/integration/react'
import {
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Platform,
} from 'react-native'
import update from 'immutability-helper'
import 'react-native-gesture-handler'
// import { NavigationContainer } from '@react-navigation/native'
const NavigationContainer = View
update.extend('$auto', (v, obj) => (obj ? update(obj, v) : update({}, v)))

const { store, persistor } = getStore()

// const Splash = () => (
//   <View
//     style={{
//       flex: 1,
//       backgroundColor: '#ffd200',
//       alignItems: 'center',
//       justifyContent: 'center',
//     }}
//   >
//     <Text
//       style={{
//         fontSize: 80,
//         ...Platform.select({ web: { fontWeight: 'bold' }, default: {} }),
//       }}
//     >
//       GPA
//     </Text>
//     <Text style={{ fontSize: 20, marginBottom: 20 }}>CALCULATOR</Text>
//     <ActivityIndicator size="small" color="#000" />
//   </View>
// )

export default function App() {
  // const [fontsAreLoaded, setFontsAreLoaded] = useState(true)

  // async componentWillMount() {
  //   await Font.loadAsync({
  //     'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
  //     'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
  //     'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
  //     'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
  //     'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
  //     'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
  //     'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
  //     'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
  //     'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
  //     'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
  //     'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf')
  //   })

  //   setFontsAreLoaded(true)
  // }

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
