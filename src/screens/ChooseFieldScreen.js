import React, { useCallback, useMemo } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import {
  Caption,
  Divider,
  FAB,
  Title,
  TouchableRipple,
} from 'react-native-paper'
import { useSelector } from 'react-redux'

import { Toolbar } from '@/components/Toolbar'
import fields from '../offlineData/fields'
import { router, useLocalSearchParams } from 'expo-router'
import { ScreenMap } from '@/navigation'

function FieldItem({ id, name, schoolId }) {
  const select = useCallback(() => {
    router.push({
      pathname: ScreenMap.ChooseStructure,
      params: {
        field: id,
        school: schoolId,
      },
    })
  }, [id, schoolId])

  return (
    <>
      <TouchableRipple
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        onPress={select}
      >
        <Title>{name}</Title>
      </TouchableRipple>
      <Divider />
    </>
  )
}

export function ChooseFieldScreen() {
  const { schoolName } = useSelector((state) => ({
    schoolName: state.school.name,
  }))
  const { school } = useLocalSearchParams()
  const fieldsOfStudy = fields[school]
  const fieldIds = useMemo(
    () => Object.keys(fieldsOfStudy || {}),
    [fieldsOfStudy]
  )
  console.log({ school })
  const openOthers = useCallback(() => {
    router.push(ScreenMap.SetField)
  }, [])

  return (
    <SafeAreaView style={styles.screen}>
      <Toolbar showNavIcon clear />

      <ScrollView>
        <Title style={styles.title}>Choose your Field</Title>
        <Caption style={{ marginStart: 20, marginBottom: 20 }}>
          ({schoolName})
        </Caption>

        {fieldIds.map((id) => (
          <FieldItem
            key={id}
            id={id}
            name={fieldsOfStudy[id].name}
            schoolId={school}
          />
        ))}
      </ScrollView>

      <FAB
        icon="plus"
        label="Add Yours"
        onPress={openOthers}
        color="#fff"
        style={styles.fab}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#ffd200', flex: 1 },
  title: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    marginStart: 20,
  },
  fab: {
    margin: 20,
    height: 50,
    width: 170,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#000',
  },
})
