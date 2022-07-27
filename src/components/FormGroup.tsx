import type { FC, PropsWithChildren } from 'react'
import React from 'react'
import { View } from 'react-native'

export const FormGroup: FC<PropsWithChildren<any>> = ({ children }) => {
  return <View>{children}</View>
}
