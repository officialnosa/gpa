import React from 'react'
import { VirtualizedList, View } from 'react-native'
import { CourseRow } from './CourseRow'
import { connect } from 'react-redux'
import { Subtitle, Divider, Caption } from '@shoutem/ui'

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
    if (this.state.registered.length < 1) return 0

    const data = this.state.registered.reduce(
      (a, b, index) => ({
        point: a.point + b.point * b.creditLoad,
        creditLoad: a.creditLoad + b.creditLoad
      }),
      { creditLoad: 0, point: 0 }
    )

    if (data.creditLoad < 1) return 0

    const gpa = (data.point / data.creditLoad || 0).toPrecision(3)
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
        {/* <Subtitle style={styles.letter}> */}
        {/* <Subtitle styleName="bold" style={styles.letter}>
          {this.state.gpa} GPA
        </Subtitle> */}
        {/* </Subtitle> */}

        <VirtualizedList
          data={this.state.registered}
          renderItem={({ item }) => (
            <CourseRow id={item.id} year={year} semester={semester} />
          )}
          // ItemSeparatorComponent={_ => (
          //   <View style={{ height: 1, backgroundColor: '#ddd' }} />
          // )}
          ListHeaderComponent={
            <Divider styleName="section-header">
              <Caption>COURSE - {this.state.gpa} GPA</Caption>
              <Caption>GRADE</Caption>
            </Divider>
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

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  letter: {
    // fontSize: 20,
    color: '#fff',
    padding: 5,
    backgroundColor: '#05f',
    textAlign: 'center'
  }
}
