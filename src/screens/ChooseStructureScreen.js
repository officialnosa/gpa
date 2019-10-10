import React from 'react'
import { Title, Button } from 'react-native-paper'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { initField, initCourses } from '../redux/actions'
import { NavigationActions } from 'react-navigation'
import { Toolbar } from '../components/Toolbar'
import fields from '../offlineData/fields'
// import Icon from 'react-native-vector-icons/Feather'

export class ChooseStructureScreenX extends React.PureComponent {
  select = key => {
    const { navigation, dispatch } = this.props
    const { field: fieldId, school: schoolId } = navigation.state.params

    const field = fields[schoolId][fieldId]

    dispatch(initField(field.structure[key]))
    dispatch(initCourses(field.courses))

    navigation.navigate('Tabs')
  }
  render() {
    const {
      field: fieldId,
      school: schoolId
    } = this.props.navigation.state.params

    const field = fields[schoolId][fieldId]

    const { structure } = field
    return (
      <View styleName="paper middleCenter" style={styles.screen}>
        <Toolbar showNavIcon clear />
        <Title style={styles.title} styleName="h-center">
          Choose your Structure
        </Title>
        {Object.keys(structure || {}).map(key => (
          <View key={key}>
            <Button styleName="clear" onPress={_ => this.select(key)}>
              <Title styleName="bold">{structure[key].label}</Title>
            </Button>
          </View>
        ))}
      </View>
    )
  }
}
const ChooseStructureScreen = connect(state => ({
  user: state.user,
  school: state.school,
  schoolName: state.school.name
}))(ChooseStructureScreenX)
export { ChooseStructureScreen }

const styles = {
  screen: { backgroundColor: '#ffd200' },
  title: { marginTop: 100, marginBottom: 80 }
}
