import React, { useMemo } from 'react'
import { Text } from 'react-native-paper'
import { getAverageByYear } from '../calculations'
import { useSelector } from 'react-redux'

const mapStateToProps = (state) => ({
  field: state.field,
  courses: state.courses,
  firstClass: state.school.gradingSystem.firstClass,
})

export function YearScoreBadge({ style, year }) {
  const { field, firstClass, courses } = useSelector(mapStateToProps)

  const gpa = useMemo(
    () => getAverageByYear({ firstClass, field, courses, year }).toFixed(2),
    [firstClass, field, courses, year]
  )

  return <Text style={style}>{gpa}</Text>
}
