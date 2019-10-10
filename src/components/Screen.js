import React from 'react'
import { View } from 'react-native'

export default function Screen({ style, ...props }) {
  return <View style={[{ flex: 1 }, style]} {...props}></View>
}
