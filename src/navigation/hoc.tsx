import React from 'react'
import {useNavigation} from "expo-router";

export const withNavigation = (Component: React.FC) => {
  const NewComponent = (props: any) => {
    const navigation = useNavigation()

    return React.createElement(Component, {
      ...props,
      navigation,
    })
  }

  return NewComponent
}
