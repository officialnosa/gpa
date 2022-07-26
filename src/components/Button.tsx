import type { ComponentProps, FC } from 'react'
import React from 'react'
import { Button as PaperButton } from 'react-native-paper'

type Props = ComponentProps<typeof PaperButton>

export const Button: FC<Props> = (props) => {
  return <PaperButton {...props} />
}
