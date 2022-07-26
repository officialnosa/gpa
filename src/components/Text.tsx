import type { FC } from 'react'
import React from 'react'
import type { TextProps } from 'react-native'
import { Text } from 'react-native'

type Props = TextProps

export const Caption: FC<Props> = ({ ...props }) => {
  return <Text {...props} />
}

export const Heading: FC<Props> = ({ ...props }) => {
  return <Text {...props} />
}

export const Title: FC<Props> = ({ ...props }) => {
  return <Text {...props} />
}

export const Subtitle: FC<Props> = ({ ...props }) => {
  return <Text {...props} />
}

export { Text } from 'react-native-paper'
