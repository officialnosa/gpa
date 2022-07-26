import React from 'react'
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button, Divider, TextInput } from 'react-native-paper'
import { connect } from 'react-redux'

import Icon from '@expo/vector-icons/MaterialIcons'
// import { resolve } from 'any-promise')
import { CommonActions } from '@react-navigation/native'

import { FormGroup } from '@components/form'

import { NumberSelector } from '../components/NumberSelector'
import { Stepper } from '../components/Stepper'
import { Toolbar } from '../components/Toolbar'
import { resetData, updateField, updateSchool } from '../redux/actions'
// import ModalSelector from 'react-native-modal-selector'
import { runAsync } from '../utils'

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
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
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
              const resetAction = CommonActions.reset({
                index: 0,
                routes: [{ routeName: 'Welcome' }],
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
      <View style={[styles.numOfYears, styles.underline]}>
        <Text style={{ flex: 1 }}>Years required</Text>
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
      </View>
    )
  }

  render() {
    const { schoolName, fieldName, currentSemester, currentLevel, numOfYears } =
      this.state

    return (
      <View>
        <Divider styleName="section-header" />
        <FormGroup>
          <Text style={styles.caption}>School name</Text>
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
          <Text style={styles.caption}>Field of Study</Text>
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
          <Text style={styles.caption}>ACADEMIC INFORMATION</Text>
        </Divider>

        <View style={styles.row}>
          <Text style={styles.subtitle}>Your Current level</Text>
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
        </View>
        <View style={[styles.underline, styles.row]}>
          <Text style={styles.subtitle}>Your Current semester</Text>
          <NumberSelector
            max={2}
            value={currentSemester}
            onChangeNumber={this.changeCurrentSemester}
          />
        </View>
        <Divider styleName="section-header" />
        <Button
          onPress={this.openAdvanced}
          style={{ ...styles.underline, height: 60 }}
        >
          <Text style={styles.subtitle}>Advanced Settings</Text>
        </Button>
        <Divider styleName="section-header" />
        <Button
          onPress={this.reset}
          style={{ ...styles.underline, height: 60 }}
        >
          <Text style={[styles.subtitle, { color: '#ec2222' }]}>
            Delete All Data
          </Text>
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
      <View style={styles.container}>
        <Toolbar showNavIcon title="Settings" />
        <ScrollView>
          <Settings navigation={navigation} />
          <Divider />
          <Text styleName="h-center">&copy; {year} Nosa</Text>
          <Text styleName="h-center">www.osarogie.com</Text>
          <Divider />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  underline: { borderBottomWidth: 2, borderBottomColor: '#ddd' },
  numOfYears: {
    flexDirection: 'row',
  },
  subtitle: {
    fontSize: 18,
    flex: 1,
  },
  caption: {
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
  },
})
