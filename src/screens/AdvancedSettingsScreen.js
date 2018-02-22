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
  View
} from '@shoutem/ui'
import { ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { NumberSelector } from '../components/NumberSelector'
import { Toolbar } from '../components/Toolbar'
import { updateSchool } from '../redux/actions'

const mapStateToProps = state => ({
  school: state.school,
  field: state.field,
  gradingSystem: state.school.gradingSystem
})

const width = Dimensions.get('window').width

class AdvanceSettingsX extends React.Component {
  componentDidMount() {
    // this.school.focus()
  }

  changeGradingSystem = data =>
    this.props.dispatch(updateSchool({ gradingSystem: { $merge: data } }))

  render() {
    const { school, field, gradingSystem } = this.props

    return (
      <View>
        <Divider styleName="section-header">
          <Caption>GRADING SYSTEM</Caption>
        </Divider>
        <Row>
          <View styleName="vertical flexible">
            <View styleName="horizontal flexible">
              <Subtitle styleName="flexible">First Class</Subtitle>
              <TextInput
                style={styles.underline}
                value={String(gradingSystem.firstClass)}
                onChangeText={firstClass =>
                  this.changeGradingSystem({ firstClass })
                }
              />
            </View>

            <View styleName="horizontal flexible">
              <Subtitle styleName="flexible">
                Second Class (UPPER DIVISION)
              </Subtitle>
              <TextInput
                style={styles.underline}
                value={String(gradingSystem.secondClassUpper)}
                onChangeText={secondClassUpper =>
                  this.changeGradingSystem({ secondClassUpper })
                }
              />
            </View>
            <View styleName="horizontal flexible">
              <Subtitle styleName="flexible">
                Second Class (LOWER DIVISION)
              </Subtitle>
              <TextInput
                style={styles.underline}
                value={String(gradingSystem.secondClassLower)}
                onChangeText={secondClassLower =>
                  this.changeGradingSystem({ secondClassLower })
                }
              />
            </View>
            <View styleName="horizontal flexible">
              <Subtitle styleName="flexible">Third Class</Subtitle>
              <TextInput
                style={styles.underline}
                value={String(gradingSystem.thirdClass)}
                onChangeText={thirdClass =>
                  this.changeGradingSystem({ thirdClass })
                }
              />
            </View>
            <View styleName="horizontal flexible">
              <Subtitle styleName="flexible">Pass</Subtitle>
              <TextInput
                style={styles.underline}
                value={String(gradingSystem.pass)}
                onChangeText={pass => this.changeGradingSystem({ pass })}
              />
            </View>
          </View>
        </Row>
        <Divider styleName="section-header">
          <Caption>THE PERCENTAGE OF YOUR CGPA THAT EACH YEAR CARRIES</Caption>
          {/* <Caption>Percentage (%)</Caption> */}
        </Divider>
        <Row>
          <View styleName="vertical flexible">
            {Object.keys(field.levelWeight).map(k => (
              <View styleName="horizontal flexible" key={k}>
                <Subtitle styleName="flexible">Year {k}</Subtitle>
                <TextInput
                  style={styles.underline}
                  value={String(field.levelWeight[k] * 100)}
                />
                <Caption>% </Caption>
              </View>
            ))}
          </View>
        </Row>
        <Divider styleName="section-header" />
      </View>
    )
  }
}

const AdvancedSettings = connect(mapStateToProps)(AdvanceSettingsX)

export class AdvancedSettingsScreen extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Advanced Settings',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="settings" size={focused ? 25 : 23} color={tintColor} />
    )
  }

  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: '#fff' }}>
          <Toolbar title="Advanced Settings" showNavIcon />
          <AdvancedSettings />
        </View>
      </ScrollView>
    )
  }
}

const styles = {
  underline: { borderBottomWidth: 2, borderBottomColor: '#ddd' }
}
