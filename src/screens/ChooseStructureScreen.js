import React, { useCallback } from 'react'
import { Title, Button, TouchableRipple, Divider } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
import { initField, initCourses } from '../redux/actions'
import { Toolbar } from '../components/Toolbar'
import fields from '../offlineData/fields'
import { useDispatch } from 'react-redux'
// import Icon from 'react-native-vector-icons/Feather'

export function ChooseStructureScreen({ navigation }) {
  const { field: fieldId, school: schoolId } = navigation.state.params
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
