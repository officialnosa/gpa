import type { FC } from 'react'
import React from 'react'
import type { TextProps } from 'react-native-paper'
import { Text } from 'react-native-paper'
import { Text as RNText } from 'react-native'

type Props = TextProps<RNText> & { styleName: 'flexible' }

export const AppText: FC<Props> = ({ styleName, ...props }) => {
  return (
    <Text
      variant="labelLarge"
      style={[
        styleName === 'flexible' && {
          flex: 1,
        },
        props.style,
      ]}
      {...props}
    />
  )
}

export const Caption: FC<Props> = ({ ...props }) => {
  return <AppText variant="labelLarge" {...props} />
}

export const Title: FC<Props> = ({ ...props }) => {
  return <AppText variant="titleMedium" {...props} />
}

export const Subtitle: FC<Props> = ({ ...props }) => {
  return <AppText variant="titleSmall" {...props} />
}

export { AppText as Text }
