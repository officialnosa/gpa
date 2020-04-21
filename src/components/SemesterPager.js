import { Subheading } from 'react-native-paper'
import React, { useCallback, useState, useMemo } from 'react'
import { StyleSheet, Dimensions, Platform } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import { SemesterCourseList } from './SemesterCourseList'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
}

// const mapStateToProps = (state) => ({
//   // field: state.field
//   numOfYears: state.field.numOfYears,
//   currentLevel: state.field.currentLevel,
//   currentSemester: state.field.currentSemester,
// })

const nth = [undefined, '1st', '2nd']

export function SemesterPager({ year, semester, style }) {
  // const { numOfYears, currentLevel, currentSemester } = useSelector(
  //   mapStateToProps
  // )
  const [index, setIndex] = useState(() => (semester ? semester - 1 : 0))
  const routes = useMemo(() => [
    { key: '1', year, semester: 1, title: '1st Semester' },
    { key: '2', year, semester: 2, title: '2nd Semester' },
  ])
  const navigationState = useMemo(() => ({ index, routes }), [index, routes])

  // getRoute = i => {
  //   const [year, semester] = [(i / 2).toFixed(), i % 2 || 2]

  //   return {
  //     key: String(i),
  //     year,
  //     semester,
  //     title: `Year ${year} / ${nth[semester]} Semester`
  //   }
  // }

  // getRoutes = () => {
  //   const routes = []
  //   const it = 2 * (currentLevel - 1) + currentSemester

  //   for (let i = 1; i <= it; i++) {
  //     routes.push(this.getRoute(i))
  //   }

  //   this.setState({
  //     routes,
  //     index: routes.length - 1
  //   })
  // }

  const onTabPress = useCallback(({ route }) => {}, [])

  const renderHeader = useCallback(
    (props) => (
      <TabBar
        {...props}
        onTabPress={onTabPress}
        scrollEnabled={false}
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
      />
    ),
    [onTabPress]
  )

  const renderScene = useCallback(
    ({ route }) => (
      <SemesterCourseList year={route.year} semester={route.semester} />
    ),
    []
  )

  if (!routes.length) return <NoSemesters />

  return (
    <TabView
      style={[styles.container, style]}
      navigationState={navigationState}
      renderScene={renderScene}
      renderTabBar={renderHeader}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      // renderPager={props => <TabViewPagerPan {...props} />}
    />
  )
}
SemesterPager.appbarElevation = 0

const NoSemesters = () => (
  <View
    styleName="flexible"
    style={{
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
      <Subheading styleName="bold">one</Subheading> active semester
    </Subheading>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabbar: {
    backgroundColor: '#fff',
  },
  tab: {
    // width: 240,
    // height: 50,
    backgroundColor: '#fff',
  },
  indicator: {
    backgroundColor: '#ffd200',
  },
  label: {
    color: '#000',
    ...Platform.select({ web: { fontWeight: 400 }, default: {} }),
  },
})
