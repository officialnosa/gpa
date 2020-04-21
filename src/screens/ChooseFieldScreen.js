import React, { useCallback, useMemo } from 'react'

import { TextInput } from '@shoutem/ui/components/TextInput'
import { Button } from '@shoutem/ui/components/Button'
import { Row } from '@shoutem/ui/components/Row'
import {
  Title,
  Subtitle,
  Caption,
  Text,
  Heading,
} from '@shoutem/ui/components/Text'
import { FormGroup } from '@shoutem/ui/components/FormGroup'
import { TouchableOpacity } from '@shoutem/ui/components/TouchableOpacity'
import { Divider } from '@shoutem/ui/components/Divider'
import { Screen } from '@shoutem/ui/components/Screen'

import { Platform, View } from 'react-native'
import fields from '../offlineData/fields'
import { useSelector } from 'react-redux'
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
