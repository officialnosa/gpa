import { Platform } from 'react-native'
import { HomeScreen } from './screens/HomeScreen'
// import { TimelineScreen } from './screens/TimelineScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { AdvancedSettingsScreen } from './screens/AdvancedSettingsScreen'
import { EmptyScreen } from './screens/EmptyScreen'
// import { FieldSelectScreen } from './screens/FieldSelectScreen'
import { ChooseFieldScreen } from './screens/ChooseFieldScreen'
import { ChooseSchoolScreen } from './screens/ChooseSchoolScreen'
import { ChooseStructureScreen } from './screens/ChooseStructureScreen'
import { SetSchoolScreen } from './screens/SetSchoolScreen'
import { SetFieldScreen } from './screens/SetFieldScreen'
import { YearScreen } from './screens/YearScreen'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createSwitchNavigator } from 'react-navigation'

export const Settings = createStackNavigator(
  {
    BasicSettings: { screen: SettingsScreen },
    AdvancedSettings: { screen: AdvancedSettingsScreen }
  },
  { mode: 'card', headerMode: 'none' }
)

const fade = props => {
  const { position, scene } = props

  const index = scene.index

  const translateX = 0
  const translateY = 0

  const opacity = position.interpolate({
    inputRange: [index - 0.7, index, index + 0.7],
    outputRange: [1, 1, 1]
  })

  return {
    opacity,
    transform: [{ translateX }, { translateY }]
  }
}
export const Tabs = createBottomTabNavigator(
  {
    // Timeline: { screen: TimelineScreen },
    Home: { screen: YearScreen },
    Settings: { screen: SettingsScreen }
  },
  {
    tabBarPosition: 'bottom',
    // tabBarComponent: TabBarBottom,
    // tabBarComponent: props => (
    //   <TabBarBottom
    //     {...props}
    //     indicatorStyle={{ backgroundColor: '#333', height: 2 }}
    //   />
    // ),
    tabBarOptions: {
      inactiveTintColor: '#0007',
      activeTintColor: '#000',
      // labelStyle: {
      //   // fontSize: 15,
      //   color: '#000'
      // },
      indicatorStyle: {
        borderTopColor: '#000',
        borderTopWidth: 2,
        borderTopStyle: 'solid'
      },
      style: {
        backgroundColor: '#fff',
        // paddingBottom: 6,
        // paddingTop: 6,
        height: 56,
        // elevation: 10
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        borderTopStyle: 'solid',
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 1 },
            shadowRadius: 2,
            shadowOpacity: 0.5
          },
          android: {
            elevation: 10
          }
        })
        // borderBottomRightRadius: 10,
        // borderBottomLeftRadius: 10
      },
      tabBarShadowStyle: {
        height: 3
      },
      // activeBackgroundColor: '#f2f2f2',
      // showLabel: false,
      showIcon: true
    },
    initialRouteName: 'Home',
    animationEnabled: false,
    swipeEnabled: false
    // backBehavior: "Home"
  }
)

export const Main = createStackNavigator(
  {
    Tabs: { screen: YearScreen, path: 'home' },
    Year: { screen: HomeScreen, path: 'courses/:year::semester' },
    AdvancedSettings: {
      screen: AdvancedSettingsScreen,
      path: 'settings/advanced'
    },
    Settings: { screen: SettingsScreen, path: 'settings' },
    // FieldSelect: { screen: FieldSelectScreen },
    ChooseField: {
      screen: ChooseFieldScreen,
      path: 'choose/:school/fields'
    },
    ChooseSchool: { screen: ChooseSchoolScreen, path: 'schools' },
    ChooseStructure: {
      screen: ChooseStructureScreen,
      path: 'choose/:school/:field/structure'
    },
    SetField: {
      screen: SetFieldScreen,
      path: 'new-field'
    },
    SetSchool: { screen: SetSchoolScreen, path: 'new-school' }
  },
  {
    mode: 'card',
    headerMode: 'none',
    transitionConfig: () => ({
      screenInterpolator: props => {
        return fade(props)
      }
    })
  }
)

export const Root = createSwitchNavigator({
  Empty: { screen: EmptyScreen, path: '' },
  Welcome: { screen: WelcomeScreen, path: 'welcome' },
  Main
})
