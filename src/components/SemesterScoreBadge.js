import React, { Component } from 'react'
import { Text } from 'react-native-paper'
import { getCoursesBySemester, getAverageBySemester } from '../calculations'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  field: state.field,
  courses: state.courses,
  firstClass: state.school.gradingSystem.firstClass
})

class SemesterScoreBadgeX extends Component {
  state = {
    registered: [],
    gpa: '...'
  }

  async componentDidMount() {
    const registered = await getCoursesBySemester(this.props)

    this.setState({ registered: registered.reverse() })
    this.calculate()
  }

  async componentWillReceiveProps(props) {
    const registered = await getCoursesBySemester(props)

    this.setState({ registered: registered.reverse() })
    this.calculate()
  }

  shouldComponentUpdate(p, { gpa }) {
    return gpa !== this.state.gpa
  }

  calculate = async () => {
    const gpa = await getAverageBySemester({ list: this.state.registered })
    // this.setState({ gpa: (gpa - 5 + 1 + this.props.firstClass).toFixed(2) })
    this.setState({ gpa: gpa.toFixed(2) })
  }

  render() {
    return (
      <Text styleName={this.props.styleName} style={this.props.style}>
        {this.state.gpa}
      </Text>
    )
  }
}

const SemesterScoreBadge = connect(mapStateToProps)(SemesterScoreBadgeX)
export { SemesterScoreBadge }
