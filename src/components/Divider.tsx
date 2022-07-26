import type { FC } from 'react'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
  styleName?: 'section-header' | 'line'
}

export const Divider: FC<Props> = ({ styleName }) => {
  return (
    <View
      style={
        styleName === 'section-header' ? styles.sectionHeader : styles.line
      }
    />
  )
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 16,
    marginBottom: 8,
  },
  line: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
})
