import type { FC } from 'react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Stack } from 'expo-router'

export const ScreenMap = {
  Tabs: 'home',
  Year: 'courses/[year]/[semester]',
  AdvancedSettings: 'settings/advanced',
  Settings: 'settings/index',
  ChooseField: 'choose/[school]/fields',
  ChooseSchool: 'schools',
  ChooseStructure: 'choose/[school]/[field]/structure',
  SetField: 'new-field',
  SetSchool: 'new-school',
  Welcome: 'welcome',
}

const config = {
  screens: ScreenMap,
}

const linking = {
  prefixes: ['https://aplus.osarogie.com', 'aplus://'],
  config,
}

export const Root: FC = () => {
  const { user } = useSelector((state: any) => ({ user: state.user }))
  const isOnboarding = !user.hasSchool || !user.hasField

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="home" />
      <Stack.Screen name="courses/[year]/[semester]" />
      <Stack.Screen name="settings/advanced" />
      <Stack.Screen name="settings/index" />
      <Stack.Screen name="choose/[school]/fields" />
      <Stack.Screen name="schools" />
      <Stack.Screen name="choose/[school]/[field]/structure" />
      <Stack.Screen name="new-field" />
      <Stack.Screen name="new-school" />
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}

export { withNavigation } from './hoc'
