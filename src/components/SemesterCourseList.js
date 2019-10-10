import React from 'react'
import {
  View,
  VirtualizedList,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { CourseRow } from './CourseRow'
import { connect } from 'react-redux'
import { Title } from 'react-native-paper'
import { runAsync } from '../utils'
import { getCoursesBySemester, getAverageBySemester } from '../calculations'
import { GradeIndicator } from './GradeIndicator'
import { addCourse } from '../redux/actions'
// import { SemesterScoreBadge } from './SemesterScoreBadge'

const mapStateToProps = state => ({
  field: state.field,
  courses: state.courses
})

class SemesterCourseListX extends React.Component {
  state = {
    registered: [],
    gpa: '...'
  }

  async componentDidMount() {
    const registered = await getCoursesBySemester(this.props)

    this.setState({ registered: registered.reverse() })
    // this.calculate()
  }

  async componentWillReceiveProps(props) {
    const registered = await getCoursesBySemester(props)

    this.setState({ registered: registered.reverse() })
    // this.calculate()
  }

  shouldComponentUpdate(
    { field: newField, courses: newCourses },
    { registered: oldRegistered }
  ) {
    const {
      id,
      year,
      semester,
      field: oldField,
      courses: oldCourses
    } = this.props

    const oldFieldCourses = oldField.structure[`${year}$${semester}`]
    const newFieldCourses = newField.structure[`${year}$${semester}`]

    return (
      oldFieldCourses !== newFieldCourses ||
      JSON.stringify(oldCourses) !== JSON.stringify(newCourses) ||
      oldRegistered !== this.state.registered
    )
  }

  // calculate = async () => {
  //   const gpa = await getAverageBySemester({ list: this.state.registered })
  //   this.setState({ gpa })
  // }

  // getRegistered = ({ year, semester, field }) =>
  //   runAsync(() => {
  //     const list = field.structure[`${year}$${semester}`]

  //     return Object.keys(list || {})
  //       .map(registered => ({
  //         id: registered,
  //         creditLoad: this.props.courses[registered].creditLoad,
  //         point: list[registered]
  //       }))
  //       // .reverse()
  //   })

  addCourse = () => {
    const { dispatch, year, semester } = this.props
    runAsync(() =>
      dispatch(
        addCourse({
          year,
          semester
        })
      )
    )
  }

  renderItem = ({ item }) => (
    <CourseRow
      id={item.id}
      year={this.props.year}
      semester={this.props.semester}
    />
  )

  render() {
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
            GPA {this.state.gpa}
          </Text>
        </View> */}
        {/* <SemesterScoreBadge year={year} semester={semester} /> */}
        <VirtualizedList
          // ref={e => (this.list = e)}
          data={this.state.registered}
          renderItem={this.renderItem}
          // ItemSeparatorComponent={_ => (
          //   <View style={{ height: 1, backgroundColor: '#ddd' }} />
          // )}
          ListHeaderComponent={
            <TouchableOpacity
              onPress={this.addCourse}
              style={styles.addCourseButton}
            >
              <View styleName="flexible">
                <Title className="h-center">Add Course</Title>
              </View>
            </TouchableOpacity>
          }
          keyExtractor={item => item.id}
          getItemCount={data => data.length}
          getItem={(data, ii) => data[ii]}
        />
      </View>
    )
  }
}

const SemesterCourseList = connect(mapStateToProps)(SemesterCourseListX)
export { SemesterCourseList }

const styles = StyleSheet.create({
  letter: {
    // fontSize: 20,
    color: '#fff',
    padding: 5,
    backgroundColor: '#05f',
    textAlign: 'center'
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
    alignItems: 'center'
  }
})
