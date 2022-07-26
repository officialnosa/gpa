import type { FC, PropsWithChildren } from 'react'
import React from 'react'
import { View } from 'react-native'

export const Screen: FC<PropsWithChildren<any>> = ({ style, ...props }) => {
  return <View style={[{ flex: 1 }, style]} {...props} />
}
