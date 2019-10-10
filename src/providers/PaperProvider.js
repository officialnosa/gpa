import React from 'react'
import { YELLOW } from './../ui'
import { Provider, DefaultTheme } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: YELLOW,
    accent: YELLOW
  }
}

export function PaperProvider({ children }) {
  return <Provider theme={theme}>{children}</Provider>
}
