import React, { useCallback } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Divider, Title, TouchableRipple } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { Toolbar } from '@/components/Toolbar'
import fields from '../offlineData/fields'
import { initCourses, initField } from '@/redux/actions'
import { router, useLocalSearchParams } from 'expo-router'
import { ScreenMap } from '@/navigation'

export function ChooseStructureScreen() {
  const { field: fieldId, school: schoolId } = useLocalSearchParams()
  const dispatch = useDispatch()

  const field = fields[schoolId][fieldId]

  const { structure } = field

  const select = useCallback(
    (key) => {
      dispatch(initField(field.structure[key]))
      dispatch(initCourses(field.courses))

      router.push(ScreenMap.Tabs)
    },
    [field, dispatch]
  )

  return (
    <SafeAreaView style={styles.screen}>
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
    </SafeAreaView>
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
