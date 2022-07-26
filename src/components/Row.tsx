import type { FC } from 'react'
import React from 'react'
import type { ViewProps } from 'react-native'
import { View } from 'react-native'

export const Row: FC<ViewProps> = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}
      {...props}
    />
  )
}
