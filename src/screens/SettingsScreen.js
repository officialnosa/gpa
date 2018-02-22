import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import {
  Title,
  TextInput,
  FormGroup,
  Caption,
  Row,
  Divider,
  Heading,
  Subtitle,
  View,
  Button
} from '@shoutem/ui'
import { ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { NumberSelector } from '../components/NumberSelector'
import { updateField, updateSchool } from '../redux/actions'

const mapStateToProps = state => ({
  school: state.school,
  field: state.field,
  gradingSystem: state.school.gradingSystem
})

const width = Dimensions.get('window').width

class SettingsX extends React.Component {
  componentDidMount() {
    // this.school.focus()
  }

  openAdvanced = () => this.props.navigation.navigate('AdvancedSettings')

  changeCurrentLevel = level =>
    this.props.dispatch(updateField({ currentLevel: { $set: level } }))

  changeSchoolName = name =>
    this.props.dispatch(updateSchool({ name: { $set: name } }))

  changeFieldName = name =>
    this.props.dispatch(updateField({ name: { $set: name } }))

  changeCurrentSemester = semester =>
    this.props.dispatch(updateField({ currentSemester: { $set: semester } }))

  render() {
    const { school, field, gradingSystem } = this.props

    return (
      <View>
        <Divider styleName="section-header" />
        <FormGroup>
          <Caption>School name</Caption>
          <TextInput
            ref={_ => (this.school = _)}
            style={styles.underline}
            onChangeText={this.changeSchoolName}
            value={school.name}
            placeholder="eg. Benson Idahosa University"
          />
        </FormGroup>
        <Divider styleName="section-header" />
        <FormGroup>
          <Caption>Field of Study</Caption>
          <TextInput
            value={field.name}
            onChangeText={this.changeFieldName}
            style={styles.underline}
            placeholder="eg. Computer Science"
          />
        </FormGroup>
        <Divider styleName="section-header">
          <Caption>ACADEMIC INFORMATION</Caption>
        </Divider>

        <Row>
          <Subtitle styleName="flexible">Your Current level</Subtitle>
          <NumberSelector
            max={4}
            value={field.currentLevel}
            onChangeNumber={this.changeCurrentLevel}
          />
        </Row>
        <Row style={styles.underline}>
          <Subtitle styleName="flexible">Your Current semester</Subtitle>
          <NumberSelector
            max={2}
            value={field.currentSemester}
            onChangeNumber={this.changeCurrentSemester}
          />
        </Row>
        <Divider styleName="section-header" />
        <Button
          onPress={this.openAdvanced}
          style={{ ...styles.underline, height: 50 }}
        >
          <Subtitle styleName="flexible">Advanced Settings</Subtitle>
        </Button>
      </View>
    )
  }
}

const Settings = connect(mapStateToProps)(SettingsX)

export class SettingsScreen extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="settings" size={focused ? 25 : 23} color={tintColor} />
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <ScrollView>
        <View style={{ backgroundColor: '#fff' }}>
          <Heading
            style={{ marginHorizontal: 15, marginTop: 30, marginBottom: 15 }}
          >
            Settings
          </Heading>
          <Settings navigation={navigation} />
        </View>
      </ScrollView>
    )
  }
}

const styles = {
  underline: { borderBottomWidth: 2, borderBottomColor: '#ddd' }
}
