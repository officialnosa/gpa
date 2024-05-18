import React from 'react'
import { Dimensions, Platform, StyleSheet, VirtualizedList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { Subheading, Text } from 'react-native-paper'
import { TabBar } from 'react-native-tab-view'
import { connect } from 'react-redux'

import Icon from '@expo/vector-icons/EvilIcons'

import { withNavigation } from '@/navigation/hoc'

import { YearRow } from './YearRow'
import { router } from 'expo-router'
import { ScreenMap } from '@/navigation'

const mapStateToProps = (state) => ({
  // field: state.field
  numOfYears: state.field.numOfYears,
  currentLevel: state.field.currentLevel,
  currentSemester: state.field.currentSemester,
})

const nth = [undefined, '1st', '2nd']

export class YearList extends React.Component {
  static appbarElevation = 0

  tabs = []

  state = {
    index: 0,
    routes: [
      // { key: '1', year: 4, semester: 1, title: 'Year 4 - 1st Semester' },
      // { key: '2', year: 4, semester: 2, title: 'Year 4 - 2nd Semester' }
    ],
  }

  openSettings = () => router.push(ScreenMap.Settings)

  componentDidMount() {
    this.getRoutes(this.props)
  }

  componentWillReceiveProps(props) {
    this.getRoutes(props)
  }

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

  getRoute = (i) => {
    const [year, semester] = [(i / 2).toFixed(), i % 2 || 2]

    return {
      key: String(i),
      year: i,
      semester,
      title: `Year ${year} / ${nth[semester]} Semester`,
    }
  }

  getRoutes = ({ currentLevel }) => {
    const routes = []
    const it = currentLevel //2 * (currentLevel - 1) + currentSemester

    for (let i = 1; i <= it; i++) {
      routes.push(this.getRoute(i))
    }

    this.setState({
      routes,
      index: routes.length - 1,
    })
  }

  _handleIndexChange = (index) =>
    this.setState({
      index,
    })

  onTabPress = () => {}

  _renderHeader = (props) => (
    <TabBar
      {...props}
      onTabPress={this.onTabPress}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  )

  render() {
    if (this.state.routes.length) {
      return (
        <VirtualizedList
          ref={(e) => (this.list = e)}
          data={this.state.routes}
          style={{ paddingBottom: 30, flex: 1 }}
          // ItemSeparatorComponent={() => (
          //   <RNView style={{ height: 1, backgroundColor: '#ddd' }} />
          // )}
          numColumns={2}
          renderItem={({ item }) => <YearRow id={item.id} year={item.year} />}
          ListHeaderComponent={<View style={this.props.style} />}
          ListFooterComponent={
            <View style={{ paddingVertical: 20, marginBottom: 30 }}>
              <TouchableOpacity
                onPress={this.openSettings}
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#fff' }}>
                  Add more semesters in settings
                </Text>
              </TouchableOpacity>
            </View>
          }
          keyExtractor={(item) => item.key}
          getItemCount={(data) => data.length}
          getItem={(data, ii) => data[ii]}
        />
      )
    }

    return <NoSemesters />
  }
}

YearList = withNavigation(connect(mapStateToProps)(YearList))

const NoSemesters = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
        justifyContent: 'center',
      }}
    >
      <Icon name="calendar" size={130} color="#333" />
    </View>
    <Subheading style={{ textAlign: 'center' }}>
      To manage your registered courses, you need at least{' '}
      <Subheading>one</Subheading> active semester
    </Subheading>
  </View>
)

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#000',
  },
  tab: {
    width: 240,
    height: 50,
  },
  indicator: {
    backgroundColor: '#ffd200',
  },
  label: {
    color: '#fff',

    ...Platform.select({ web: { fontWeight: 'bold' }, default: {} }),
  },
})
