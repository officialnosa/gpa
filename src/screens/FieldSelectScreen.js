import React from 'react'
import { View } from 'react-native-paper'

import Icon from '@expo/vector-icons/Feather'

export class FieldSelectScreen extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="home" size={focused ? 25 : 23} color={tintColor} />
    ),
  }
  render() {
    return <View style={{ flex: 1 }} />
  }
}
