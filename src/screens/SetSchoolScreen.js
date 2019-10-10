import React from 'react'
// import Icon from 'react-native-vector-icons/Ionicons'
import {
  Text,
  TextInput,
  FormGroup,
  Caption,
  Row,
  Divider,
  Subtitle,
  View,
  Screen,
  Button
} from '@shoutem/ui'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
// import { NumberSelector } from '../components/NumberSelector'
import { Toolbar } from '../components/Toolbar'
import {
  // updateField,
  // updateSchool,
  // resetData,
  initSchool
} from '../redux/actions'
// import ModalSelector from 'react-native-modal-selector'
// import { runAsync } from '../utils'
// import { resolve } from 'any-promise')
// import { Stepper } from '../components/Stepper'

class SettingsX extends React.Component {
  state = {
    name: '',
    gradingSystem: {
      firstClass: 4.0,
      secondClassUpper: 3.5,
      secondClassLower: 2.5,
      thirdClass: 2.0,
      pass: 2.0
    }
  }

  changeGradingSystem = data =>
    this.setState(prev => ({
      gradingSystem: { ...prev.gradingSystem, ...data }
    }))

  changeSchoolName = name => this.setState({ name })

  save = () => {
    this.props.dispatch(initSchool(this.state))
    this.props.navigation.navigate('SetField')
  }

  render() {
    const { name, gradingSystem } = this.state

    return (
      <Screen>
        <Toolbar
          showNavIcon
          title="School"
          // rightComponent={
          //   <TouchableOpacity onPress={this.save}>
          //     <Text style={{ color: '#000' }} styleName="h-right">
          //       Continue
          //     </Text>
          //   </TouchableOpacity>
          // }
        />
        <ScrollView>
          <Screen>
            <Divider styleName="section-header" />
            <FormGroup>
              <Caption>School name</Caption>
              <TextInput
                ref={_ => (this.school = _)}
                // style={styles.underline}
                onChangeText={this.changeSchoolName}
                value={name}
                placeholder="eg. Benson Idahosa University"
              />
            </FormGroup>
            <Divider styleName="section-header">
              <Caption>GRADING SYSTEM</Caption>
            </Divider>
            <Row>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Subtitle styleName="flexible">First Class</Subtitle>
                  <TextInput
                    style={styles.underline}
                    value={String(gradingSystem.firstClass)}
                    onChangeText={firstClass =>
                      this.changeGradingSystem({
                        firstClass: Number(firstClass)
                      })
                    }
                  />
                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Subtitle styleName="flexible">
                    Second Class (UPPER DIVISION)
                  </Subtitle>
                  <TextInput
                    style={styles.underline}
                    value={String(gradingSystem.secondClassUpper)}
                    onChangeText={secondClassUpper =>
                      this.changeGradingSystem({
                        secondClassUpper: Number(secondClassUpper)
                      })
                    }
                  />
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Subtitle styleName="flexible">
                    Second Class (LOWER DIVISION)
                  </Subtitle>
                  <TextInput
                    style={styles.underline}
                    value={String(gradingSystem.secondClassLower)}
                    onChangeText={secondClassLower =>
                      this.changeGradingSystem({
                        secondClassLower: Number(secondClassLower)
                      })
                    }
                  />
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Subtitle styleName="flexible">Third Class</Subtitle>
                  <TextInput
                    style={styles.underline}
                    value={String(gradingSystem.thirdClass)}
                    onChangeText={thirdClass =>
                      this.changeGradingSystem({
                        thirdClass: Number(thirdClass)
                      })
                    }
                  />
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Subtitle styleName="flexible">Pass</Subtitle>
                  <TextInput
                    style={styles.underline}
                    value={String(gradingSystem.pass)}
                    onChangeText={pass =>
                      this.changeGradingSystem({ pass: Number(pass) })
                    }
                  />
                </View>
              </View>
            </Row>
          </Screen>
        </ScrollView>
        <Toolbar
          light
          rightComponent={
            <Button
              style={{
                backgroundColor: '#ffd200',
                borderRadius: 20,
                width: 100,
                alignSelf: 'flex-end'
              }}
              onPress={this.save}
            >
              <Text style={{ color: '#000' }} styleName="h-right">
                Continue
              </Text>
            </Button>
          }
        />
      </Screen>
    )
  }
}

const Settings = connect()(SettingsX)

export class SetSchoolScreen extends React.PureComponent {
  render() {
    const { navigation } = this.props
    return <Settings navigation={navigation} />
  }
}

const styles = {
  underline: { borderBottomWidth: 2, borderBottomColor: '#ddd' }
}
