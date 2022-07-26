import React from 'react'
import { useNavigation } from '@react-navigation/native'

export const withNavigation = (Component: React.FC) => {
  return (props: any) => {
    const navigation = useNavigation()

    return <Component navigation={navigation} {...props} />
  }
}
