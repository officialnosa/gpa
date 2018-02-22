import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation'
import { HomeScreen } from './src/screens/HomeScreen'
// import { AddFileScreen } from './src/screens/AddFileScreen'
import { TimelineScreen } from './src/screens/TimelineScreen'
import { Platform } from 'react-native'
import { SettingsScreen } from './src/screens/SettingsScreen'
import { AdvancedSettingsScreen } from './src/screens/AdvancedSettingsScreen'

export const Settings = StackNavigator(
  {
    BasicSettings: { screen: SettingsScreen },
    AdvancedSettings: { screen: AdvancedSettingsScreen }
  },
  { mode: 'card', headerMode: 'none' }
)

export const Tabs = TabNavigator(
  {
    Timeline: { screen: TimelineScreen },
    Home: { screen: HomeScreen },
    Settings: { screen: Settings }
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,
    tabBarOptions: {
      inactiveTintColor: '#888',
      activeTintColor: '#000',
      labelStyle: {
        // fontSize: 15,
        color: '#000'
      },
      style: {
        backgroundColor: '#f9f9f9',
        // paddingBottom: 6,
        // paddingTop: 6,
        // height: 56,
        // elevation: 10
        // borderWidth: 0,
        borderTopColor: '#ddd',
        borderTopWidth: 1
        // ...Platform.select({
        //   ios: {
        //     shadowColor: '#000',
        //     shadowOffset: { width: 1, height: 1 },
        //     shadowRadius: 2,
        //     shadowOpacity: 0.5
        //   },
        //   android: {
        //     elevation: 3
        //   }
        // })
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
    swipeEnabled: false,
    animationEnabled: false
    // backBehavior: "Home"
  }
)

export const Root = StackNavigator(
  {
    Tabs: { screen: Tabs }
    // AddFile: { screen: AddFileScreen }
  },
  { mode: 'card', headerMode: 'none' }
)
