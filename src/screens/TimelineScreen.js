import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import {
  View,
  Title,
  Subtitle,
  TextInput,
  FormGroup,
  Caption,
  Heading
} from '@shoutem/ui'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'

export class TimelineScreen extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Dashboard',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="home" size={focused ? 25 : 23} color={tintColor} />
    )
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View styleName="flexible" style={{ backgroundColor: '#fff' }}>
          <View style={{ margin: 20 }}>
            <Heading>Dashboard</Heading>
            <Caption>A summary of your academic progress</Caption>
          </View>
        </View>
      </ScrollView>
    )
  }
}
