import * as React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { TabViewAnimated, TabBar, TabViewPagerPan } from 'react-native-tab-view'
import { SemesterCourseList } from './SemesterCourseList'
import { View } from '@shoutem/ui/components/View'
import { Subtitle } from '@shoutem/ui/components/Text'
import Icon from 'react-native-vector-icons/EvilIcons'
import { connect } from 'react-redux'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
}

const mapStateToProps = state => ({
  field: state.field
})

class SemesterPagerX extends React.Component {
  static appbarElevation = 0

  state = {
    index: 0,
    routes: [
      { key: '1', year: 4, semester: 1, title: 'Year 4 - 1st Semester' },
      { key: '2', year: 4, semester: 2, title: 'Year 4 - 2nd Semester' }
    ]
  }

  componentDidMount() {}

  componentWillReceiveProps(props) {}

  getRoutes = props => {
    // { key: '1', year: 4, semester: 1, title: 'Year 4 - Semester 1' },
    // { key: '2', year: 4, semester: 2, title: 'Year 4 - Semester 2' }
  }

  _handleIndexChange = index =>
    this.setState({
      index
    })

  _renderHeader = props => (
    <TabBar
      {...props}
      scrollEnabled
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
        <TabViewAnimated
          style={[styles.container, this.props.style]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
          renderPager={props => <TabViewPagerPan {...props} />}
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
    <Subtitle style={{ textAlign: 'center' }}>
      To manage your registered courses, you need at least{' '}
      <Subtitle styleName="bold">one</Subtitle> active semester
    </Subtitle>
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
    width: 240,
    height: 30
  },
  indicator: {
    backgroundColor: '#000'
  },
  label: {
    color: '#000',
    fontWeight: '400'
  }
})
