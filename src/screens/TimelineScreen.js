import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Title } from 'react-native-paper'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { runAsync } from '../utils'
import { getAverageBySemester } from '../calculations'
import { Toolbar } from '../components/Toolbar'

const mapStateToProps = (state) => ({
  // schoolName: state.school.name,
  // fieldName: state.field.name,
  numOfYears: state.field.numOfYears,
  currentLevel: state.field.currentLevel,
  currentSemester: state.field.currentSemester,
  field: state.field,
  courses: state.courses,
})
const nth = [0, '1st', '2nd']

class DashboardX extends React.Component {
  state = {}

  componentDidMount() {
    this.updateAverage(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateAverage(props)
  }

  getRoute = (i) => {
    const [year, semester] = [(i / 2).toFixed(), i % 2 || 2]

    return (
      <View style={{ flexDirection: 'row' }} key={i}>
        <Title styleName="flexible">
          {`${nth[semester]} Semester  Year ${year}`}{' '}
        </Title>
        <Title>{this.state[`${year}$${semester}`] || 'NA'}</Title>
      </View>
    )
  }

  renderUnits = () => {
    const { currentLevel, currentSemester } = this.props

    const routes = []
    const it = 2 * (currentLevel - 1) + currentSemester

    for (let i = 1; i <= it; i++) routes.push(this.getRoute(i))

    return routes.reverse()
  }

  updateAverage = ({ field, courses, currentLevel, currentSemester }) => {
    const it = 2 * (currentLevel - 1) + currentSemester
    for (let i = 1; i <= it; i++) {
      const [year, semester] = [(i / 2).toFixed(), i % 2 || 2]
      const gpa = getAverageBySemester({
        year,
        semester,
        field,
        courses,
      })
      this.setState({ [`${year}$${semester}`]: gpa })
    }
  }

  // updateAverage=async ()=>{
  //   const { currentLevel, currentSemester } = this.props

  //   const routes = []
  //   const it = 2 * (currentLevel - 1) + currentSemester

  //   for (let i = 1) i <= it) i++) routes.push(this.getRoute(i))

  //   return routes.reverse()
  // }

  render() {
    return (
      <ScrollView styleName="flexible" style={{ backgroundColor: '#fff' }}>
        <Row>
          <Title styleName="flexible">Overall CGPA </Title>
          <Title>NA</Title>
        </Row>
        {this.renderUnits()}
      </ScrollView>
    )
  }
}

const Dashboard = connect(mapStateToProps)(DashboardX)

export class TimelineScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Dashboard',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="dashboard" size={focused ? 25 : 23} color={tintColor} />
    ),
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Toolbar title="Your Insights" />
        <Dashboard />
      </ScrollView>
    )
  }
}
