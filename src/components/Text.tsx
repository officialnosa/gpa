import type { FC } from 'react'
import React from 'react'
import type { TextProps } from 'react-native-paper'
import { Text } from 'react-native-paper'
import { Text as RNText } from 'react-native'

type Props = TextProps<RNText>

export const Caption: FC<Props> = ({ ...props }) => {
  return <Text variant="labelLarge" {...props} />
}

export const Title: FC<Props> = ({ ...props }) => {
  return <Text variant="titleMedium" {...props} />
}

export const Subtitle: FC<Props> = ({ ...props }) => {
  return <Text variant="titleSmall" {...props} />
}

export { Text } from 'react-native-paper'
