import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, Title, TouchableRipple } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { Toolbar } from '../components/Toolbar'
import fields from '../offlineData/fields'
import { initCourses, initField } from '../redux/actions'

export function ChooseStructureScreen({ navigation, route }) {
  const { field: fieldId, school: schoolId } = route.params
  const dispatch = useDispatch()

  const field = fields[schoolId][fieldId]

  const { structure } = field

  const select = useCallback(
    (key) => {
      dispatch(initField(field.structure[key]))
      dispatch(initCourses(field.courses))

      navigation.navigate('Tabs')
    },
    [field, navigation, dispatch]
  )

  return (
    <View style={styles.screen}>
      <Toolbar showNavIcon clear />

      <Title style={styles.title}>Choose your Structure</Title>

      {Object.keys(structure || {}).map((key) => (
        <React.Fragment key={key}>
          <TouchableRipple
            style={{ paddingHorizontal: 20, paddingVertical: 10 }}
            onPress={() => select(key)}
          >
            <Title>{structure[key].label}</Title>
          </TouchableRipple>
          <Divider />
        </React.Fragment>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#ffd200', flex: 1 },
  title: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginStart: 20,
  },
})
