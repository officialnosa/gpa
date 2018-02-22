import React from 'react'
import { View, Title, NavigationBar, Button, Text } from '@shoutem/ui'
import { SemesterPager } from '../components/SemesterPager'
import Icon from 'react-native-vector-icons/Feather'

export class HomeScreen extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Courses',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="book" size={focused ? 25 : 23} color={tintColor} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ padding: 20, backgroundColor: '#fff' }}>
          <Title>Registered Courses</Title>
        </View>
        <NavigationBar
          style={{
            componentsContainer: {
              paddingLeft: 20
            }
          }}
          leftComponent={<Title>Courses</Title>}
          rightComponent={
            <Button>
              <Icon name="plus" size={20} />
              <Text>Add Course</Text>
            </Button>
          }
        />
        <SemesterPager />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1
  }
}
