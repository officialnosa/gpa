import React from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { SemesterPager } from '../components/SemesterPager'
import Icon from 'react-native-vector-icons/Entypo'
import { Toolbar } from '../components/Toolbar'
import { YearScoreBadge } from '../components/YearScoreBadge'
import { Text } from 'react-native-paper'

export class HomeScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Courses',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="open-book" size={focused ? 25 : 23} color={tintColor} />
    )
  }

  render() {
    const { year, semester } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        {/* <Toolbar title="Registered Courses" /> */}
        {/* <NavigationBar
          style={{
            componentsContainer: {
              paddingLeft: 20,
              backgroundColor: '#000'
            }
          }}
          leftComponent={
            <Title style={{ color: '#fff' }} styleName="bold white">
              Courses
            </Title>
          }
          rightComponent={
            <Button styleName="clear secondary">
              <Text>Add Course </Text>
              <Icon name="add-to-list" color="#fff" size={20} />
            </Button>
          }
        /> */}
        {/* <View
          style={{
            backgroundColor: '#000',
            height: Platform.select({ default: 23, web: 0 })
          }}
        /> */}
        {/* <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            justifyContent: 'center',
            backgroundColor: '#000'
          }}
        >
          <Text styleName="h-center" style={{ color: '#fff' }}>
            Year {this.props.navigation.state.params.year}
          </Text>
        </View> */}
        <Toolbar
          style={styles.toolbar}
          textStyle={styles.toolbarText}
          showNavIcon
          title={`Year ${year}`}
          rightComponent={
            <Text styleName="h-right">
              Year {year} GPA{' '}
              <YearScoreBadge year={year} style={styles.yearScore} />
            </Text>
          }
        />
        <SemesterPager year={year} semester={semester} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbarText: { fontSize: 16 },
  toolbar: { height: 50 },
  yearScore: { color: '#000' }
})
