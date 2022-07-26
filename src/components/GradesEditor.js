import { Component } from 'react'
import { Platform, View } from 'react-native'
import { connect } from 'react-redux'

import Icon from '@expo/vector-icons/MaterialIcons'
import { Button } from '@shoutem/ui/components/Button'
import { Divider } from '@shoutem/ui/components/Divider'
import { Row } from '@shoutem/ui/components/Row'
import { Screen } from '@shoutem/ui/components/Screen'
import { Caption, Text } from '@shoutem/ui/components/Text'
import { TextInput } from '@shoutem/ui/components/TextInput'
import update from 'immutability-helper'

import { YELLOW } from '../ui'
import { GradesEditorRow } from './GradesEditorRow'
import { Modal } from './modal'

const mapStateToProps = (state) => ({
  grades: state.field.grades,
})

export class GradesEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      grades: props.grades,
    }
  }
  getGrades = () => this.state.grades
  openAddGrade = () => this.setModalVisible(true)
  closeAddGrade = () =>
    this.setState({ modalVisible: false, tempLabel: '', tempPoint: '' })
  addGrade = () => {
    if (this.state.tempLabel)
      this.setState(({ grades, tempLabel, tempPoint }) => ({
        modalVisible: false,
        tempLabel: '',
        tempPoint: '',
        grades: update(grades, {
          [String(tempLabel).toLowerCase()]: {
            $set: Number(tempPoint || 0),
          },
        }),
      }))
  }
  changeTempPoint = (tempPoint) => this.setState({ tempPoint })
  changeTempLabel = (tempLabel) => this.setState({ tempLabel })
  setModalVisible = (v) => this.setState({ modalVisible: v })
  onDeletePress = (key) =>
    this.setState(({ grades }) => ({
      grades: update(grades, { $unset: [key] }),
    }))

  render() {
    const { grades } = this.state
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.')
          }}
        >
          <Screen
            style={{
              backgroundColor: YELLOW,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Caption>Grade</Caption>
            <TextInput
              // ref={_ => (this.school = _)}
              style={styles.textInput}
              onChangeText={this.changeTempLabel}
              value={this.state.tempLabel}
              placeholder="eg. A+"
            />
            <Divider />
            <Caption>Point</Caption>
            <TextInput
              // ref={_ => (this.school = _)}
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={this.changeTempPoint}
              value={this.state.tempPoint}
              placeholder="eg. 5"
            />
            <View style={{ flexDirection: 'row' }}>
              <Button style={styles.button} onPress={this.closeAddGrade}>
                <Icon name="close" size={25} color="#000" />
                <Text>Cancel</Text>
              </Button>
              <Button style={styles.button} onPress={this.addGrade}>
                <Icon name="check" size={25} color="#000" />
                <Text>Add</Text>
              </Button>
            </View>
          </Screen>
        </Modal>
        <Divider styleName="section-header">
          <Caption>GRADES</Caption>
          {/* <Caption style={{ marginLeft: 70 }}>POINTS</Caption> */}
        </Divider>
        <Row style={styles.underline}>
          <View styleName="vertical">
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.gradeBox}>
                <Text style={styles.gradeText}>GRADE</Text>
              </View>
              <View
                styleName="flexible"
                style={{ ...styles.gradeBox, ...styles.pointBox }}
              >
                <Text style={styles.gradeText}>POINT</Text>
              </View>
            </View>
            <View>
              {Object.keys(this.state.grades)
                .sort((a, b) => grades[b] - grades[a])
                .map((g) => (
                  <GradesEditorRow
                    onDeletePress={this.onDeletePress}
                    label={g}
                    point={this.state.grades[g]}
                    key={g}
                  />
                ))}
            </View>
            <Button
              style={{
                backgroundColor: '#ffd200',
                width: 200,
                borderRadius: 20,
                marginTop: 40,
                alignSelf: 'flex-end',
              }}
              onPress={this.openAddGrade}
            >
              <Text style={{ color: '#000' }} styleName="h-right">
                + Add another grade
              </Text>
            </Button>
          </View>
        </Row>
      </View>
    )
  }
}

export default connect(mapStateToProps)(GradesEditor)

const styles = {
  underline: { borderBottomWidth: 2, borderBottomColor: '#ddd' },
  button: { paddingHorizontal: 15, borderRadius: 5, margin: 20 },
  textInput: {
    backgroundColor: 'transparent',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    ...Platform.select({ web: { borderBottomStyle: 'solid' }, default: {} }),
  },
  gradeBox: {
    marginRight: 20,
    height: 30,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointBox: {
    alignItems: 'flex-start',
  },
  gradeText: { color: '#000' },
}
