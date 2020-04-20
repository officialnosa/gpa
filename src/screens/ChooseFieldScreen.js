import React, { useCallback, useMemo } from 'react'
import {
  View,
  Title,
  Screen,
  Heading,
  Button,
  Divider,
  Caption,
} from '@shoutem/ui'
import { Platform } from 'react-native'
import fields from '../offlineData/fields'
import { connect, useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native'
import { Toolbar } from '../components/Toolbar'
import { withNavigation } from 'react-navigation'
// import { initField } from '../redux/actions'
// import Icon from 'react-native-vector-icons/Feather'

function SchoolItem({ id, navigation }) {
  const select = useCallback(() => {
    // const dispatch = useDispatch()
    // dispatch(initField(fields[id]))
    navigation.navigate('ChooseStructure', {
      field: id,
      id,
    })
  }, [navigation, id])

  return (
    <View>
      <Button styleName="clear" onPress={() => select(key)}>
        <Title styleName="bold">{schoolObject[key].name}</Title>
      </Button>
      <Divider />
    </View>
  )
}

SchoolItem = withNavigation(SchoolItem)

export function ChooseFieldScreen({ navigation }) {
  const { school, schoolName } = useSelector((state) => ({
    // user: state.user,
    school: state.school,
    schoolName: state.school.name,
  }))

  const school = useMemo(() => {
    // if (user.hasSchool) return school.id
    return navigation?.state?.params?.school
  }, [navigation])

  const schoolObject = useMemo(() => fields[school], [school])
  const schoolIds = useMemo(() => Object.keys(schoolObject || {}), [
    schoolObject,
  ])

  const openOthers = useCallback(() => {
    navigation.navigate('SetField')
  }, [navigation])

  return (
    <Screen styleName="paper middleCenter" style={styles.screen}>
      <ScrollView>
        <Toolbar showNavIcon clear />
        <View style={styles.title}>
          <Heading styleName="h-center">Choose your Field</Heading>
          <Caption styleName="h-center">({schoolName})</Caption>
        </View>
        {schoolIds.map((id) => (
          <SchoolItem key={id} id={id} />
        ))}
        <Button styleName="clear" onPress={openOthers}>
          <Title style={styles.others} styleName="bold">
            New Field
          </Title>
        </Button>
      </ScrollView>
    </Screen>
  )
}

const styles = {
  screen: { backgroundColor: '#ffd200' },
  others: {
    borderBottomWidth: 2,
    ...Platform.select({ web: { borderBottomStyle: 'solid' }, default: {} }),
    borderBottomColor: '#2c2c2c',
  },
  title: { marginTop: 100, marginBottom: 80 },
}
