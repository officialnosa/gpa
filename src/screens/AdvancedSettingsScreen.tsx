import type { FC } from 'react'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { Divider } from '@components/Divider'
import { Row } from '@components/Row'
import { Screen } from '@components/Screen'
import { Caption, Subtitle } from '@components/Text'
import { TextInput } from '@components/TextInput'

import { Toolbar } from '../components/Toolbar'
import { updateField, updateSchool } from '../redux/actions'

const mapStateToProps = (state) => ({
  field: state.field,
  gradingSystem: state.school.gradingSystem,
})

export const AdvancedSettingsScreen: FC = () => {
  const dispatch = useDispatch()
  const { field, gradingSystem } = useSelector(mapStateToProps)
  const changeGradingSystem = (data) => {
    dispatch(updateSchool({ gradingSystem: { $merge: data } }))
  }
  const changeYearWeight = ({ year, weight }) => {
    dispatch(
      updateField({
        levelWeight: { $auto: { [year]: { $set: Number(weight) / 100 } } },
      })
    )
  }

  return (
    <Screen>
      <Toolbar title="Advanced Settings" showNavIcon />
      <ScrollView>
        <View>
          <Divider styleName="section-header">
            <Caption>GRADING SYSTEM</Caption>
          </Divider>
          <Row>
            <View style={styles.flex}>
              <View style={styles.classType}>
                <Subtitle style={styles.flex}>First Class</Subtitle>
                <TextInput
                  style={textStyleUnderline}
                  value={String(gradingSystem.firstClass)}
                  onChangeText={(firstClass) =>
                    changeGradingSystem({ firstClass: Number(firstClass) })
                  }
                />
              </View>

              <View style={styles.classType}>
                <Subtitle style={styles.flex}>
                  Second Class (UPPER DIVISION)
                </Subtitle>
                <TextInput
                  style={textStyleUnderline}
                  value={String(gradingSystem.secondClassUpper)}
                  onChangeText={(secondClassUpper) =>
                    changeGradingSystem({
                      secondClassUpper: Number(secondClassUpper),
                    })
                  }
                />
              </View>
              <View style={styles.classType}>
                <Subtitle style={styles.flex}>
                  Second Class (LOWER DIVISION)
                </Subtitle>
                <TextInput
                  style={textStyleUnderline}
                  value={String(gradingSystem.secondClassLower)}
                  onChangeText={(secondClassLower) =>
                    changeGradingSystem({
                      secondClassLower: Number(secondClassLower),
                    })
                  }
                />
              </View>
              <View style={styles.classType}>
                <Subtitle style={styles.flex}>Third Class</Subtitle>
                <TextInput
                  style={textStyleUnderline}
                  value={String(gradingSystem.thirdClass)}
                  onChangeText={(thirdClass) =>
                    changeGradingSystem({ thirdClass: Number(thirdClass) })
                  }
                />
              </View>
              <View style={styles.classType}>
                <Subtitle style={styles.flex}>Pass</Subtitle>
                <TextInput
                  style={textStyleUnderline}
                  value={String(gradingSystem.pass)}
                  onChangeText={(pass) =>
                    changeGradingSystem({ pass: Number(pass) })
                  }
                />
              </View>
            </View>
          </Row>
          <Divider styleName="section-header">
            <Caption>
              THE PERCENTAGE OF YOUR CGPA THAT EACH YEAR CARRIES
            </Caption>
            {/* <Caption>Percentage (%)</Caption> */}
          </Divider>
          <Row>
            <View style={styles.flex}>
              {Array.from(new Array(field.numOfYears), (v, year) => (
                <View style={styles.classType} key={year++}>
                  <Subtitle style={styles.flex}>Year {year}</Subtitle>
                  <TextInput
                    style={textStyleUnderline}
                    onChangeText={(weight) =>
                      changeYearWeight({ year, weight })
                    }
                    value={String((field.levelWeight[year] || 0) * 100)}
                  />
                  <Caption>% </Caption>
                </View>
              ))}
            </View>
          </Row>
          <Divider styleName="section-header" />
        </View>
      </ScrollView>
    </Screen>
  )
}

const textStyleUnderline = { borderBottomWidth: 2, borderBottomColor: '#ddd' }

const styles = StyleSheet.create({
  classType: { flexDirection: 'row', flex: 1 },
  flex: { flex: 1 },
})
