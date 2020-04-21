import React, { useCallback, useMemo } from 'react'
import {
  Title,
  Button,
  Divider,
  FAB,
  TouchableRipple,
} from 'react-native-paper'
import schools from '../offlineData/schools'
import { View, Platform, StyleSheet } from 'react-native'
import { initSchool } from '../redux/actions'
import { ScrollView } from 'react-native'
import { Toolbar } from '../components/Toolbar'
import { withNavigation } from 'react-navigation'
import { useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native'

function SchoolItem({ id, navigation }) {
  const dispatch = useDispatch()
  const select = useCallback(() => {
    dispatch(initSchool(schools[id]))
    navigation.navigate('ChooseField', { school: id })
  }, [navigation, id, dispatch])

  return (
    <>
      <TouchableRipple
        onPress={select}
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
      >
        <Title>{schools[id].name}</Title>
      </TouchableRipple>
      <Divider />
    </>
  )
}

SchoolItem = withNavigation(SchoolItem)

export function ChooseSchoolScreen({ navigation }) {
  const openOthers = useCallback(() => {
    navigation.navigate('SetSchool')
  }, [navigation])

  const schoolIds = useMemo(() => Object.keys(schools || {}), [schools])

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
  others: {
    borderBottomWidth: 2,
    borderBottomColor: '#2c2c2c',

    ...Platform.select({ web: { borderBottomStyle: 'solid' }, default: {} }),
  },
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
})
