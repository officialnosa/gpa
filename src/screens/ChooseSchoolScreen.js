import React, { useCallback, useMemo } from 'react'
import { Title, Button, Divider } from 'react-native-paper'
import schools from '../offlineData/schools'
import { View, Platform } from 'react-native'
import { initSchool } from '../redux/actions'
import { ScrollView } from 'react-native'
import { Toolbar } from '../components/Toolbar'
import { withNavigation } from 'react-navigation'
import { useDispatch } from 'react-redux'

function SchoolItem({ id, navigation }) {
  const dispatch = useDispatch()
  const select = useCallback(() => {
    dispatch(initSchool(schools[id]))
    navigation.navigate('ChooseField', { school: id })
  }, [navigation, id, dispatch])

  return (
    <View key={id}>
      <Button styleName="clear" onPress={select}>
        <Title styleName="bold">{schools[id].name}</Title>
      </Button>
      <Divider />
    </View>
  )
}

SchoolItem = withNavigation(SchoolItem)

export function ChooseSchoolScreen({ navigation }) {
  const openOthers = useCallback(() => {
    navigation.navigate('SetSchool')
  }, [navigation])

  const schoolIds = useMemo(() => Object.keys(schools || {}), [schools])

  return (
    <View
      style={{ flex: 1 }}
      styleName="paper middleCenter"
      style={styles.screen}
    >
      <Toolbar showNavIcon clear />

      <ScrollView>
        <Title style={styles.title} styleName="h-center">
          Choose your School
        </Title>
        {schoolIds.map((id) => (
          <SchoolItem key={id} id={id} />
        ))}
        <Button styleName="clear" onPress={openOthers}>
          <Title styleName="bold" style={styles.others}>
            New School
          </Title>
        </Button>
      </ScrollView>
    </View>
  )
}

const styles = {
  screen: { backgroundColor: '#ffd200' },
  others: {
    borderBottomWidth: 2,
    borderBottomColor: '#2c2c2c',

    ...Platform.select({ web: { borderBottomStyle: 'solid' }, default: {} }),
  },
  title: { marginTop: 100, marginBottom: 80 },
}
