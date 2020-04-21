import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { TextInput } from '@shoutem/ui/components/TextInput'
import { Button } from '@shoutem/ui/components/Button'
import { Row } from '@shoutem/ui/components/Row'
import {
  Title,
  Subtitle,
  Caption,
  Text,
  Heading,
} from '@shoutem/ui/components/Text'
import { FormGroup } from '@shoutem/ui/components/FormGroup'
import { TouchableOpacity } from '@shoutem/ui/components/TouchableOpacity'
import { Divider } from '@shoutem/ui/components/Divider'
import { Screen } from '@shoutem/ui/components/Screen'

import { ScrollView, Alert, Platform, View } from 'react-native'
import { connect } from 'react-redux'
import { NumberSelector } from '../components/NumberSelector'
import { updateField, updateSchool, resetData } from '../redux/actions'
// import ModalSelector from 'react-native-modal-selector'
import { runAsync } from '../utils'
// import { resolve } from 'any-promise')
import { Stepper } from '../components/Stepper'
import { NavigationActions } from 'react-navigation'
import { Toolbar } from '../components/Toolbar'

const mapStateToProps = (state) => ({
  schoolName: state.school.name,
  fieldName: state.field.name,
  numOfYears: state.field.numOfYears,
  currentLevel: state.field.currentLevel,
  currentSemester: state.field.currentSemester,
})

const year = new Date().getFullYear()

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    const { numOfYears, currentLevel, currentSemester } = props
    this.state = {
      numOfYears,
      currentLevel,
      currentSemester,
    }
  }

  // componentWillReceiveProps(props) {
  //   this.setState({...props})
  // }

  openAdvanced = () => this.props.navigation.navigate('AdvancedSettings')

  changeCurrentLevel = (currentLevel) => {
    this.setState({ currentLevel })

    runAsync(() =>
      this.props.dispatch(updateField({ currentLevel: { $set: currentLevel } }))
    )
  }

  changeSchoolName = (schoolName) => {
    this.setState({ schoolName })

    runAsync(() =>
      this.props.dispatch(updateSchool({ name: { $set: schoolName } }))
    )
  }

  changeFieldName = (fieldName) => {
    this.setState({ fieldName })
    runAsync(() =>
      this.props.dispatch(updateField({ name: { $set: fieldName } }))
    )
  }

  changeCurrentSemester = (currentSemester) => {
    this.setState({ currentSemester })
    runAsync(() =>
      this.props.dispatch(
        updateField({ currentSemester: { $set: currentSemester } })
      )
    )
  }

  changeNumOfYears = (obj) => {
    const currentLevel = Math.min(obj, this.state.currentLevel)
    this.setState({ numOfYears: obj, currentLevel })

    runAsync(() =>
      this.props.dispatch(
        updateField({
          numOfYears: { $set: obj },
          currentLevel: {
            $set: currentLevel,
          },
        })
      )
    )
  }

  reset = () => {
    if (Platform.OS === 'web') {
      if (
        window.confirm(
          'Are you sure? You are about to delete this course. You are about to delete all your data. This cannot be undone.'
        )
      ) {
        this.props.dispatch(resetData())
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
        })
        this.props.navigation.dispatch(resetAction)
      }
    } else
      Alert.alert(
        'Are you sure?',
        'You are about to delete all your data. This cannot be undone.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {},
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              this.props.dispatch(resetData())
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
              })
              this.props.navigation.dispatch(resetAction)
            },
          },
        ]
      )
  }

  renderNumOfYears = () => {
    const { numOfYears } = this.state
    // const data = [
    //   { key: 0, section: true, label: 'Years required' },
    //   ...Array.from(new Array(10), (val, index) => ({
    //     key: ++index,
    //     label: `${index} year${index === 1 ? '' : 's'}`,
    //   })),
    // ]

    return (
      <Row style={styles.underline}>
        <Subtitle styleName="flexible">Years required</Subtitle>
        <View>
          <Stepper
            label={numOfYears === 1 ? ' Year' : ' Years'}
            min={1}
            max={10}
            containerStyle={{
              justifyContent: 'flex-end',
            }}
            onValueChange={this.changeNumOfYears}
            initialValue={numOfYears || 1}
          />
        </View>
      </Row>
    )
  }

  render() {
    const {
      schoolName,
      fieldName,
      currentSemester,
      currentLevel,
      numOfYears,
    } = this.state

    return (
      <View>
        <Divider styleName="section-header" />
        <FormGroup>
          <Caption>School name</Caption>
          <TextInput
            ref={(_) => (this.school = _)}
            style={styles.underline}
            onChangeText={this.changeSchoolName}
            value={schoolName}
            placeholder="eg. Benson Idahosa University"
          />
        </FormGroup>
        <Divider styleName="section-header" />
        <FormGroup>
          <Caption>Field of Study</Caption>
          <TextInput
            value={fieldName}
            onChangeText={this.changeFieldName}
            style={styles.underline}
            placeholder="eg. Computer Science"
          />
        </FormGroup>
        <Divider styleName="section-header" />

        {this.renderNumOfYears()}
        <Divider styleName="section-header">
          <Caption>ACADEMIC INFORMATION</Caption>
        </Divider>

        <Row>
          <Subtitle styleName="flexible">Your Current level</Subtitle>
          {/* <NumberSelector
            max={numOfYears}
            value={currentLevel}
            onChangeNumber={this.changeCurrentLevel}
          /> */}
          <View>
            <Stepper
              label={`00 Level`}
              min={1}
              containerStyle={{
                justifyContent: 'flex-end',
              }}
              max={numOfYears}
              onValueChange={this.changeCurrentLevel}
              initialValue={currentLevel || 1}
            />
          </View>
        </Row>
        <Row style={styles.underline}>
          <Subtitle styleName="flexible">Your Current semester</Subtitle>
          <NumberSelector
            max={2}
            value={currentSemester}
            onChangeNumber={this.changeCurrentSemester}
          />
        </Row>
        <Divider styleName="section-header" />
        <Button
          onPress={this.openAdvanced}
          style={{ ...styles.underline, height: 60 }}
        >
          <Subtitle styleName="flexible">Advanced Settings</Subtitle>
        </Button>
        <Divider styleName="section-header" />
        <Button
          onPress={this.reset}
          style={{ ...styles.underline, height: 60 }}
        >
          <Subtitle styleName="flexible" style={{ color: '#ec2222' }}>
            Delete All Data
          </Subtitle>
        </Button>
        <Divider styleName="section-header" />
      </View>
    )
  }
}

Settings = connect(mapStateToProps)(Settings)

export class SettingsScreen extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="settings" size={focused ? 25 : 23} color={tintColor} />
    ),
  }

  render() {
    const { navigation } = this.props
    return (
      <Screen styleName="paper">
        <Toolbar showNavIcon title="Settings" />
        <ScrollView>
          <Settings navigation={navigation} />
          <Divider />
          <Text styleName="h-center">&copy; {year} Nosa</Text>
          <Text styleName="h-center">www.osarogie.com</Text>
          <Divider />
        </ScrollView>
      </Screen>
    )
  }
}

const styles = {
  underline: { borderBottomWidth: 2, borderBottomColor: '#ddd' },
}
