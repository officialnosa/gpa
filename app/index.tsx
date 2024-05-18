import React from 'react'
import { Redirect } from 'expo-router'
import {useAppSelector} from "@/redux/hooks";

export default function Index() {
  const { user } = useAppSelector((state: any) => ({ user: state.user }))
  const isOnboarding = !user.hasSchool || !user.hasField
  console.log({isOnboarding})
  if (!isOnboarding) {
    return <Redirect href="/home" />
  }

  return <Redirect href="/welcome" />
}
