import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { Provider } from 'react-redux'

import update from 'immutability-helper'
import { PersistGate } from 'redux-persist/es/integration/react'

import { Root } from '@/navigation'
import getStore from '@/redux/store'
import { PaperProvider } from '@/providers/PaperProvider'

// @ts-ignore
update.extend('$auto', (v, obj) => (obj ? update(obj, v) : update({}, v)))

const { store, persistor } = getStore()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    Paprika: require('../assets/fonts/Paprika-Regular.ttf'),
    'BR Firma Regular': require('../assets/fonts/BR Firma/BR Firma Regular.otf'),
    'BR Firma Medium': require('../assets/fonts/BR Firma/BR Firma Medium.otf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <PaperProvider>
            <Root />
          </PaperProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
