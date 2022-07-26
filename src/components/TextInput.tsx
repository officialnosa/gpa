import type { ComponentProps, FC } from 'react'
import React from 'react'
import { TextInput as PaperTextInput } from 'react-native-paper'

type Props = ComponentProps<typeof PaperTextInput>

export const TextInput: FC<Props> = (props) => {
  return <PaperTextInput {...props} />
}
