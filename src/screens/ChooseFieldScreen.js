import React, { useCallback, useMemo } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native'
import {
  Button,
  Caption,
  Divider,
  FAB,
  Title,
  TouchableRipple,
} from 'react-native-paper'
import { useSelector } from 'react-redux'

import { withNavigation } from '@navigation/hoc'

import { Toolbar } from '../components/Toolbar'
import fields from '../offlineData/fields'
// import { initField } from '../redux/actions'
// import Icon from 'react-native-vector-icons/Feather'

function FieldItem({ id, navigation, name, schoolId }) {
  const select = useCallback(() => {
    // const dispatch = useDispatch()
    // dispatch(initField(fields[id]))
    navigation.navigate('ChooseStructure', {
      field: id,
      school: schoolId,
    })
  }, [navigation, id, schoolId])

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

FieldItem = withNavigation(FieldItem)

const mapStateToProps = (state) => ({
  // user: state.user,
  // school: state.school,
  schoolName: state.school.name,
})

export function ChooseFieldScreen({ navigation }) {
  const { schoolName } = useSelector(mapStateToProps)

  const school = useMemo(() => {
    // if (user.hasSchool) return school.id
    return navigation?.state?.params?.school
  }, [navigation])

  const fieldObject = useMemo(() => fields[school], [school])
  const fieldIds = useMemo(() => Object.keys(fieldObject || {}), [fieldObject])

  const openOthers = useCallback(() => {
    navigation.navigate('SetField')
  }, [navigation])

  return (
    <View style={styles.screen}>
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
            name={fieldObject[id].name}
            schoolId={school}
          />
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
    ...Platform.select({ web: { borderBottomStyle: 'solid' }, default: {} }),
    borderBottomColor: '#2c2c2c',
  },
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
