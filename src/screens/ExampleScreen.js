import React from 'react'
import { Icon, View, Title } from '@shoutem/ui'
import { Examples } from '@shoutem/ui'

export class ExampleScreen extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Examples',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="home" size={focused ? 25 : 23} color={tintColor} />
    )
  }

  render() {
    return <Examples />
  }
}
