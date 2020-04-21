import React, { useMemo, useCallback } from 'react'
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { CourseRow } from './CourseRow'
import { useSelector, useDispatch } from 'react-redux'
import { Title } from 'react-native-paper'
import { getCoursesBySemester } from '../calculations'
import { addCourse } from '../redux/actions'
// import { SemesterScoreBadge } from './SemesterScoreBadge'

const mapStateToProps = (state) => ({
  field: state.field,
  courses: state.courses,
})

export function SemesterCourseList({ semester, year }) {
  const { field, courses } = useSelector(mapStateToProps)
  const dispatch = useDispatch()

  const registered = useMemo(
    () => getCoursesBySemester({ field, courses, semester, year }).reverse(),
    [field, courses, semester, year]
  )

  // const gpa = useMemo(
  //   () => getAverageBySemester({ list: registered }).toFixed(2),
  //   [registered]
  // )

  // function shouldComponentUpdate(
  //   { field: newField, courses: newCourses },
  //   { registered: oldRegistered }
  // ) {
  //   const { id, year, semester, field: oldField, courses: oldCourses } = props

  //   const oldFieldCourses = oldField.structure[`${year}$${semester}`]
  //   const newFieldCourses = newField.structure[`${year}$${semester}`]

  //   return (
  //     oldFieldCourses !== newFieldCourses ||
  //     JSON.stringify(oldCourses) !== JSON.stringify(newCourses) ||
  //     oldRegistered !== registered
  //   )
  // }

  // calculate = async () => {
  //   const gpa = await getAverageBySemester({ list: registered })
  //   setState({ gpa })
  // }

  const dispatchAddCourse = useCallback(() => {
    dispatch(
      addCourse({
        year,
        semester,
      })
    )
  }, [year, semester])

  const renderItem = useCallback(
    ({ item }) => <CourseRow id={item.id} year={year} semester={semester} />,
    [year, semester]
  )

  return (
    <View style={{ flex: 1 }}>
      {/* <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            justifyContent: 'center',
            backgroundColor: '#f9f9f9'
          }}
        >
          <Text styleName="h-center" style={{ color: '#000' }}>
            GPA {gpa}
          </Text>
        </View> */}
      {/* <SemesterScoreBadge year={year} semester={semester} /> */}
      <FlatList
        // ref={e => (list = e)}
        data={registered}
        renderItem={renderItem}
        // ItemSeparatorComponent={_ => (
        //   <View style={{ height: 1, backgroundColor: '#ddd' }} />
        // )}
        ListHeaderComponent={
          <TouchableOpacity
            onPress={dispatchAddCourse}
            style={styles.addCourseButton}
          >
            <View styleName="flexible">
              <Title>Add Course</Title>
            </View>
          </TouchableOpacity>
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  letter: {
    // fontSize: 20,
    color: '#fff',
    padding: 5,
    backgroundColor: '#05f',
    textAlign: 'center',
  },
  addCourseButton: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: 20,
    // padding: 10,
    borderRadius: 10,
    // elevation: 1,
    borderWidth: 2,
    borderColor: '#ffd20088',
    padding: 15,
    height: 60,
    backgroundColor: '#ffd20088',
    alignItems: 'center',
  },
})
