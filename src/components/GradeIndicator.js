import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  grades: state.field.grades
})

// const grades = { a: 70, b: 65, c: 50, d: 45, f: 0 }
const grades = { a: 5, b: 4, c: 3, d: 2, e: 1, f: 0 }

// const getColor = point =>
//   ['#f00', '#c47', '#000', '#0ff', '#05f', '#2f5'][point]

const SHADES = ['22', '22', '55', '88', 'bb', 'ee']

export const getGradeFromPoint = (point, scale = grades) =>
  (Object.keys(scale).find(key => point === scale[key]) || '-').toUpperCase()

export const GradeIndicator = connect(mapStateToProps)(({ point, grades }) => (
  <View
    style={[
      styles.bubble,
      { backgroundColor: '#ffd200' + SHADES[point | 0] || '' }
    ]}
  >
    <Text style={styles.letter}>{getGradeFromPoint(point, grades)}</Text>
  </View>
))

GradeIndicator.displayName = 'connect(GradeIndicatorX)'

const styles = {
  bubble: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
    // elevation: 2
  },
  letter: {
    fontSize: 30,
    color: '#000'
  }
}
