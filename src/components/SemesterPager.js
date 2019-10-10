import { Subheading } from 'react-native-paper'
import React from 'react'
import { StyleSheet, Dimensions, Platform } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import { SemesterCourseList } from './SemesterCourseList'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import { connect } from 'react-redux'
import { runAsync } from '../utils'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
}

const mapStateToProps = state => ({
  // field: state.field
  numOfYears: state.field.numOfYears,
  currentLevel: state.field.currentLevel,
  currentSemester: state.field.currentSemester
})

const nth = [undefined, '1st', '2nd']

class SemesterPagerX extends React.Component {
  static appbarElevation = 0

  tabs = []

  // state = {
  //   index: 0,
  //   routes: [
  //     // { key: '1', year: 4, semester: 1, title: 'Year 4 - 1st Semester' },
  //     // { key: '2', year: 4, semester: 2, title: 'Year 4 - 2nd Semester' }
  //   ]
  // }
  constructor(props) {
    super(props)
    this.state = {
      index: props.semester ? props.semester - 1 : 0,
      routes: [
        { key: '1', year: props.year, semester: 1, title: '1st Semester' },
        { key: '2', year: props.year, semester: 2, title: '2nd Semester' }
      ]
    }
  }
  // componentDidMount() {
  //   this.getRoutes(this.props)
  // }

  // componentWillReceiveProps(props) {
  //   this.getRoutes(props)
  // }

  shouldComponentUpdate(
    { numOfYears, currentLevel, currentSemester },
    nextState
  ) {
    return (
      nextState !== this.state ||
      numOfYears !== this.state.numOfYears ||
      currentLevel !== this.state.currentLevel ||
      currentSemester !== this.state.currentSemester
    )
  }

  getRoute = i => {
    const [year, semester] = [(i / 2).toFixed(), i % 2 || 2]

    return {
      key: String(i),
      year,
      semester,
      title: `Year ${year} / ${nth[semester]} Semester`
    }
  }

  getRoutes = ({ numOfYears, currentLevel, currentSemester }) => {
    const routes = []
    const it = 2 * (currentLevel - 1) + currentSemester

    for (let i = 1; i <= it; i++) {
      routes.push(this.getRoute(i))
    }

    this.setState({
      routes,
      index: routes.length - 1
    })
  }

  _handleIndexChange = index =>
    this.setState({
      index
    })

  onTabPress = ({ route }) => {}

  _renderHeader = props => (
    <TabBar
      {...props}
      onTabPress={this.onTabPress}
      scrollEnabled={false}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  )

  _renderScene = ({ route }) => (
    <SemesterCourseList year={route.year} semester={route.semester} />
  )

  render() {
    if (this.state.routes.length)
      return (
        <TabView
          style={[styles.container, this.props.style]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
          // renderPager={props => <TabViewPagerPan {...props} />}
        />
      )

    return <NoSemesters />
  }
}

const SemesterPager = connect(mapStateToProps)(SemesterPagerX)

export { SemesterPager }

const NoSemesters = () => (
  <View
    styleName="flexible"
    style={{
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <View
      style={{
        width: 170,
        height: 170,
        marginBottom: 20,
        borderRadius: 100,
        backgroundColor: '#ffd200',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Icon name="calendar" size={130} color="#333" />
    </View>
    <Subheading style={{ textAlign: 'center' }}>
      To manage your registered courses, you need at least{' '}
      <Subheading styleName="bold">one</Subheading> active semester
    </Subheading>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabbar: {
    backgroundColor: '#fff'
  },
  tab: {
    // width: 240,
    height: 50
  },
  indicator: {
    backgroundColor: '#ffd200'
  },
  label: {
    color: '#000',
    ...Platform.select({ web: { fontWeight: 400 }, default: {} })
  }
})
