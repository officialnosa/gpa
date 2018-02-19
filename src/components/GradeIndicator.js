import React from 'react'
import { View, Text } from 'react-native'

// const initialScale = { a: 70, b: 65, c: 50, d: 45, f: 0 }
const initialScale = { a: 5, b: 4, c: 3, d: 2, e: 1, f: 0 }

export const getGradeFromPoint = (point, scale = initialScale) =>
  (Object.keys(scale).find(key => point === scale[key]) || '-').toUpperCase()

export const GradeIndicator = ({ point }) => (
  <View style={styles.bubble}>
    <Text style={styles.letter}>{getGradeFromPoint(point)}</Text>
  </View>
)

const styles = {
  bubble: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#50f',
    borderRadius: 30
  },
  letter: {
    fontSize: 30,
    color: '#fff'
  }
}
