import React from 'react'
import Container from './src/App'

import { setDefaultThemeStyle } from '@shoutem/ui/init'

setDefaultThemeStyle()

export default function App() {
  return <Container />
}
