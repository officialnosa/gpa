import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation'

import { HomeScreen } from './src/screens/HomeScreen'
import { AddFileScreen } from './src/screens/AddFileScreen'
// import { ExampleScreen } from './src/screens/ExampleScreen'

export const Tabs = TabNavigator(
  {
    Home: { screen: HomeScreen }
    // Examples: { screen: ExampleScreen }
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      inactiveTintColor: '#888',
      activeTintColor: '#000',
      labelStyle: {
        // fontSize: 15,
        // color: '#000'
      },
      style: {
        backgroundColor: '#fff',
        // paddingBottom: 6,
        // paddingTop: 6,
        // height: 56,
        // elevation: 10
        // borderWidth: 0,
        borderBottomColor: '#05f'
        // borderBottomRightRadius: 10,
        // borderBottomLeftRadius: 10
      }

      // tabBarShadowStyle: {
      //   height: 3
      // },
      // position: 1,
      // activeBackgroundColor: '#f2f2f2',
      // showLabel: false
    }
    // backBehavior: "Home"
  }
)

export const Root = StackNavigator(
  {
    Tabs: { screen: Tabs },
    AddFile: { screen: AddFileScreen }
  },
  { mode: 'card', headerMode: 'none' }
)
