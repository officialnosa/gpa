import React from 'react'
import { VirtualizedList } from 'react-native'
import { CourseRow } from './CourseRow'
import { connect } from 'react-redux'
import { Caption, View, Text } from '@shoutem/ui'

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
    this.setState({ registered: await this.getRegistered(this.props) })
    await this.calculate()
  }

  async componentWillReceiveProps(props) {
    this.setState({ registered: await this.getRegistered(props) })
    await this.calculate()
  }

  calculate = async () => {
    const data = this.state.registered.reduce((a, b, index) => ({
      point:
        (index < 2 ? a.point * a.creditLoad : a.point) + b.point * b.creditLoad,
      creditLoad: a.creditLoad + b.creditLoad
    }))

    const gpa = data.point / data.creditLoad
    this.setState({ gpa })
  }

  getRegistered = async ({ year, semester, field }) => {
    const list = field.structure[`${year}$${semester}`]

    return Object.keys(list).map(registered => ({
      id: registered,
      creditLoad: this.props.courses[registered].creditLoad,
      point: list[registered]
    }))
  }

  render() {
    const { year, semester, field } = this.props
    return (
      <View style={styles.container}>
        <Caption style={styles.letter}>
          Year {year} Semester{semester} GPA: {this.state.gpa}
        </Caption>
        <VirtualizedList
          data={this.state.registered}
          renderItem={({ item }) => (
            <CourseRow id={item.id} year={year} semester={semester} />
          )}
          ItemSeparatorComponent={_ => (
            <View style={{ height: 1, backgroundColor: '#ddd' }} />
          )}
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

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  letter: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center'
  }
}
