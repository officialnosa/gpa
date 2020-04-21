import React, { useMemo } from 'react'
import { Text } from 'react-native-paper'
import { getCoursesBySemester, getAverageBySemester } from '../calculations'
import { useSelector } from 'react-redux'

const mapStateToProps = (state) => ({
  field: state.field,
  courses: state.courses,
  firstClass: state.school.gradingSystem.firstClass,
})

export function SemesterScoreBadge({ semester, year, style, styleName }) {
  const { field, courses, firstClass } = useSelector(mapStateToProps)

  const registered = useMemo(
    () =>
      getCoursesBySemester({
        field,
        courses,
        firstClass,
        semester,
        year,
      }).reverse(),
    [field, courses, firstClass, semester, year]
  )

  const gpa = useMemo(
    () => getAverageBySemester({ list: registered }).toFixed(2),
    [registered]
  )
  // gpa = (gpa - 5 + 1 + firstClass).toFixed(2)

  return (
    <Text styleName={styleName} style={style}>
      {gpa}
    </Text>
  )
}
