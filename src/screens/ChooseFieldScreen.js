import React from 'react'
import {
  View,
  Title,
  Screen,
  Heading,
  Button,
  Divider,
  Caption
} from '@shoutem/ui'
import { Platform } from 'react-native'
import fields from '../offlineData/fields'
import { connect } from 'react-redux'
import { safeObject } from '../utils'
import { ScrollView } from 'react-native'
import { Toolbar } from '../components/Toolbar'
// import { initField } from '../redux/actions'
// import Icon from 'react-native-vector-icons/Feather'

class ChooseFieldScreenX extends React.PureComponent {
  select = key => {
    // this.props.dispatch(initField(fields[key]))
    this.props.navigation.navigate('ChooseStructure', {
      // field: fields[this.getSchool()][key],
      field: key,
      school: this.getSchool()
    })
  }

  getSchool = () => {
    // const { school, navigation, user } = this.props

    // if (user.hasSchool) return school.id

    return safeObject(this.props.navigation)
      .get('state')
      .get('params').school
  }

  openOthers = () => {
    this.props.navigation.navigate('SetField')
  }

  render() {
    const school = this.getSchool()

    return (
      <Screen styleName="paper middleCenter" style={styles.screen}>
        <ScrollView>
          <Toolbar showNavIcon clear />
          <View style={styles.title}>
            <Heading styleName="h-center">Choose your Field</Heading>
            <Caption styleName="h-center">({this.props.schoolName})</Caption>
          </View>
          {Object.keys(fields[school] || {}).map(key => (
            <View key={key}>
              <Button styleName="clear" onPress={() => this.select(key)}>
                <Title styleName="bold">{fields[school][key].name}</Title>
              </Button>
              <Divider />
            </View>
          ))}
          <Button styleName="clear" onPress={this.openOthers}>
            <Title style={styles.others} styleName="bold">
              New Field
            </Title>
          </Button>
        </ScrollView>
      </Screen>
    )
  }
}
const ChooseFieldScreen = connect(state => ({
  user: state.user,
  school: state.school,
  schoolName: state.school.name
}))(ChooseFieldScreenX)
export { ChooseFieldScreen }

const styles = {
  screen: { backgroundColor: '#ffd200' },
  others: {
    borderBottomWidth: 2,
    ...Platform.select({ web: { borderBottomStyle: 'solid' }, default: {} }),
    borderBottomColor: '#2c2c2c'
  },
  title: { marginTop: 100, marginBottom: 80 }
}
