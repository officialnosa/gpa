import React, { useCallback, useMemo } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { Divider, FAB, Title, TouchableRipple } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { Toolbar } from '@/components/Toolbar'
import schools from '../offlineData/schools'
import { initSchool } from '@/redux/actions'
import { ScreenMap } from '@/navigation'
import { router } from 'expo-router'

function SchoolItem({ id }) {
  const dispatch = useDispatch()
  const select = useCallback(() => {
    dispatch(initSchool(schools[id]))
    router.push({ pathname: ScreenMap.ChooseField, params: { school: id } })
  }, [id, dispatch])

  return (
    <>
      <TouchableRipple onPress={select} style={styles.schoolItem}>
        <Title>{schools[id].name}</Title>
      </TouchableRipple>
      <Divider />
    </>
  )
}

export function ChooseSchoolScreen() {
  const openOthers = useCallback(() => {
    router.push(ScreenMap.SetSchool)
  }, [])

  const schoolIds = useMemo(() => Object.keys(schools || {}), [])

  return (
    <SafeAreaView style={styles.screen}>
      <Toolbar showNavIcon clear />

      <ScrollView>
        <Title style={styles.title}>Choose your School</Title>
        {schoolIds.map((id) => (
          <SchoolItem key={id} id={id} />
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
    marginBottom: 20,
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
  schoolItem: { paddingHorizontal: 20, paddingVertical: 10 },
})
