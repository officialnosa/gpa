import React from 'react'
import { Provider } from 'react-redux'
import { Root } from './navigation'
import getStore from './src/redux/store'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Font, AppLoading } from 'expo'
import { View, Text, StatusBar } from 'react-native'

const { store, persistor } = getStore()

const Splash = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#ffd200',

      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Text style={{ fontSize: 80, fontWeight: 'bold' }}>GPA</Text>
    <Text style={{ fontSize: 20 }}>CALCULATOR</Text>
  </View>
)

export default class App extends React.Component {
  state = {
    fontsAreLoaded: false
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf')
    })

    this.setState({ fontsAreLoaded: true })
  }

  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
        <View style={{ paddingTop: 20, backgroundColor: '#fff', flex: 1 }}>
          <StatusBar backgroundColor="#ffd200" />
          {this.state.fontsAreLoaded ? <Root /> : <Splash />}
        </View>
        {/* </PersistGate> */}
      </Provider>
    )
  }
}
