import React, { useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native'
import { Divider, FAB, Title, TouchableRipple } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { useNavigation } from '@react-navigation/native'

import { Toolbar } from '../components/Toolbar'
import schools from '../offlineData/schools'
import { initSchool } from '../redux/actions'

function SchoolItem({ id }) {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const select = useCallback(() => {
    dispatch(initSchool(schools[id]))
    navigation.navigate('ChooseField', { school: id })
  }, [navigation, id, dispatch])

  return (
    <>
      <TouchableRipple onPress={select} style={styles.schoolItem}>
        <Title>{schools[id].name}</Title>
      </TouchableRipple>
      <Divider />
    </>
  )
}

export function ChooseSchoolScreen({ navigation }) {
  const openOthers = useCallback(() => {
    navigation.navigate('SetSchool')
  }, [navigation])

  const schoolIds = useMemo(() => Object.keys(schools || {}), [])

  return (
    <View style={styles.screen}>
      <Toolbar showNavIcon clear />

      <ScrollView>
        <Title style={styles.title}>Choose your School</Title>
        {schoolIds.map((id) => (
          <SchoolItem key={id} id={id} />
        ))}
      </ScrollView>

      <FAB
        icon="add"
        label="Add Yours"
        onPress={openOthers}
        color="#fff"
        style={styles.fab}
      />
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
