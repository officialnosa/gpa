import type { FC } from 'react'
import React from 'react'
import { useSelector } from 'react-redux'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AdvancedSettingsScreen } from '../screens/AdvancedSettingsScreen'
import { ChooseFieldScreen } from '../screens/ChooseFieldScreen'
import { ChooseSchoolScreen } from '../screens/ChooseSchoolScreen'
import { ChooseStructureScreen } from '../screens/ChooseStructureScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { SetFieldScreen } from '../screens/SetFieldScreen'
import { SetSchoolScreen } from '../screens/SetSchoolScreen'
import { SettingsScreen } from '../screens/SettingsScreen'
import { WelcomeScreen } from '../screens/WelcomeScreen'
import { YearScreen } from '../screens/YearScreen'

const config = {
  screens: {
    Tabs: 'home',
    Year: 'courses/:year/:semester',
    AdvancedSettings: 'settings/advanced',
    Settings: 'settings',
    ChooseField: 'choose/:school/fields',
    ChooseSchool: 'schools',
    ChooseStructure: 'choose/:school/:field/structure',
    SetField: 'new-field',
    SetSchool: 'new-school',
    Welcome: 'welcome',
  },
}

const linking = {
  prefixes: ['https://aplus.osarogie.com', 'aplus://'],
  config,
}

const RootStack = createNativeStackNavigator()
export const Root: FC = () => {
  const { user } = useSelector((state: any) => ({ user: state.user }))
  const isOnboarding = !user.hasSchool || !user.hasField

  return (
    <NavigationContainer linking={linking}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isOnboarding && (
          <RootStack.Screen name="Welcome" component={WelcomeScreen} />
        )}
        <RootStack.Screen name="Tabs" component={YearScreen} />
        <RootStack.Screen name="Year" component={HomeScreen} />
        <RootStack.Screen
          name="AdvancedSettings"
          component={AdvancedSettingsScreen}
        />
        <RootStack.Screen name="Settings" component={SettingsScreen} />
        <RootStack.Screen name="ChooseField" component={ChooseFieldScreen} />
        <RootStack.Screen name="ChooseSchool" component={ChooseSchoolScreen} />
        <RootStack.Screen
          name="ChooseStructure"
          component={ChooseStructureScreen}
        />
        <RootStack.Screen name="SetField" component={SetFieldScreen} />
        <RootStack.Screen name="SetSchool" component={SetSchoolScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export { withNavigation } from './hoc'
