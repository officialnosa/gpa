import React, { Component } from 'react'
import { Text } from 'react-native-paper'
import { getAverageByYear } from '../calculations'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  field: state.field,
  courses: state.courses,
  firstClass: state.school.gradingSystem.firstClass
})

class YearScoreBadgeX extends Component {
  state = {
    gpa: '...'
  }

  async componentDidMount() {
    this.calculate()
  }

  async componentWillReceiveProps(props) {
    this.calculate()
  }

  calculate = async () => {
    const gpa = await getAverageByYear(this.props)
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

const YearScoreBadge = connect(mapStateToProps)(YearScoreBadgeX)
export { YearScoreBadge }
