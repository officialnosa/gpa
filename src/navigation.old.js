import { Platform } from 'react-native'
import { HomeScreen } from './screens/HomeScreen'
import { TimelineScreen } from './screens/TimelineScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { AdvancedSettingsScreen } from './screens/AdvancedSettingsScreen'
import { EmptyScreen } from './screens/EmptyScreen'
import { FieldSelectScreen } from './screens/FieldSelectScreen'
import { ChooseFieldScreen } from './screens/ChooseFieldScreen'
import { ChooseSchoolScreen } from './screens/ChooseSchoolScreen'
import { ChooseStructureScreen } from './screens/ChooseStructureScreen'
import { SetSchoolScreen } from './screens/SetSchoolScreen'
import { SetFieldScreen } from './screens/SetFieldScreen'
import { YearScreen } from './screens/YearScreen'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

export const Settings = createStackNavigator(
  {
    BasicSettings: { screen: SettingsScreen },
    AdvancedSettings: { screen: AdvancedSettingsScreen }
  },
  { mode: 'card', headerMode: 'none' }
)

export const Tabs = createBottomTabNavigator(
  {
    // Timeline: { screen: TimelineScreen },
    Home: { screen: YearScreen },
    Settings: { screen: SettingsScreen }
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      inactiveTintColor: '#0007',
      activeTintColor: '#000',
      // labelStyle: {
      //   // fontSize: 15,
      //   color: '#000'
      // },
      style: {
        backgroundColor: '#ffd200',
        // paddingBottom: 6,
        // paddingTop: 6,
        height: 56,
        // elevation: 10
        // borderWidth: 0,
        // borderTopColor: '#ddd',
        borderTopWidth: 0,
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

export const Root = createStackNavigator(
  {
    Empty: { screen: EmptyScreen },
    Welcome: { screen: WelcomeScreen },
    Tabs: { screen: Tabs },
    Year: { screen: HomeScreen },

    AdvancedSettings: { screen: AdvancedSettingsScreen },
    FieldSelect: { screen: FieldSelectScreen },
    ChooseField: { screen: ChooseFieldScreen },
    ChooseSchool: { screen: ChooseSchoolScreen },
    ChooseStructure: { screen: ChooseStructureScreen },
    SetField: { screen: SetFieldScreen },
    SetSchool: { screen: SetSchoolScreen }
  },
  { mode: 'card', headerMode: 'none' }
)
