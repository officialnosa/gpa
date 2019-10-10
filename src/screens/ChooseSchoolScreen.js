import React from 'react'
import { Title, Button, Divider } from 'react-native-paper'
import schools from '../offlineData/schools'
import { View, Platform } from 'react-native'
import { connect } from 'react-redux'
import { initSchool } from '../redux/actions'
import { ScrollView } from 'react-native'
import { Toolbar } from '../components/Toolbar'

export class ChooseSchoolScreenX extends React.PureComponent {
  select = school => {
    this.props.dispatch(initSchool(schools[school]))
    this.props.navigation.navigate('ChooseField', { school })
  }

  openOthers = () => {
    this.props.navigation.navigate('SetSchool')
  }

  render() {
    return (
      <View
        style={{ flex: 1 }}
        styleName="paper middleCenter"
        style={styles.screen}
      >
        <Toolbar showNavIcon clear />

        <ScrollView>
          <Title style={styles.title} styleName="h-center">
            Choose your School
          </Title>
          {Object.keys(schools || {}).map(key => (
            <View key={key}>
              <Button styleName="clear" onPress={_ => this.select(key)}>
                <Title styleName="bold">{schools[key].name}</Title>
              </Button>
              <Divider />
            </View>
          ))}
          <Button styleName="clear" onPress={this.openOthers}>
            <Title styleName="bold" style={styles.others}>
              New School
            </Title>
          </Button>
        </ScrollView>
      </View>
    )
  }
}
const ChooseSchoolScreen = connect()(ChooseSchoolScreenX)
export { ChooseSchoolScreen }
const styles = {
  screen: { backgroundColor: '#ffd200' },
  others: {
    borderBottomWidth: 2,
    borderBottomColor: '#2c2c2c',

    ...Platform.select({ web: { borderBottomStyle: 'solid' }, default: {} })
  },
  title: { marginTop: 100, marginBottom: 80 }
}
