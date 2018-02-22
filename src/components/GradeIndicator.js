import React from 'react'
import { View, Text } from 'react-native'

// const initialScale = { a: 70, b: 65, c: 50, d: 45, f: 0 }
const initialScale = { a: 5, b: 4, c: 3, d: 2, e: 1, f: 0 }

const getColor = point =>
  ['#f00', '#c47', '#000', '#0ff', '#05f', '#2f5'][point]

export const getGradeFromPoint = (point, scale = initialScale) =>
  (Object.keys(scale).find(key => point === scale[key]) || '-').toUpperCase()

export const GradeIndicator = ({ point }) => (
  <View style={[styles.bubble, { backgroundColor: '#ffd200' }]}>
    <Text style={styles.letter}>{getGradeFromPoint(point)}</Text>
  </View>
)

const styles = {
  bubble: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  letter: {
    fontSize: 30,
    color: '#000'
  }
}
