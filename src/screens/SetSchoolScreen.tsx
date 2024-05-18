import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native'

import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { FormGroup } from '@/components/FormGroup'
import { Row } from '@/components/Row'
import { Screen } from '@/components/Screen'
import { Caption, Subtitle, Text } from '@/components/Text'
import { TextInput } from '@/components/TextInput'

import { Toolbar } from '@/components/Toolbar'
import {
  // updateField,
  // updateSchool,
  // resetData,
  initSchool,
} from '@/redux/actions'
import { useAppDispatch } from '@/redux/hooks'
import { router } from 'expo-router'
import { ScreenMap } from '@/navigation'
import { YELLOW } from '@/ui'

export function SetSchoolScreen() {
  const [state, setState] = useState({
    name: '',
    gradingSystem: {
      firstClass: 4.0,
      secondClassUpper: 3.5,
      secondClassLower: 2.5,
      thirdClass: 2.0,
      pass: 2.0,
    },
  })
  const { name, gradingSystem } = state

  const changeGradingSystem = (data: any) =>
    setState((prev) => ({
      ...prev,
      gradingSystem: { ...prev.gradingSystem, ...data },
    }))

  const changeSchoolName = (name: string) =>
    setState((prev) => ({ ...prev, name }))
  const dispatch = useAppDispatch()
  const save = () => {
    dispatch(initSchool(state))
    router.push(ScreenMap.SetField)
  }
  return (
    <SafeAreaView style={styles.screen}>
      <Toolbar showNavIcon title="School" />
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <Screen style={{ gap: 30 }}>
          <FormGroup>
            <Caption>School name</Caption>
            <TextInput
              onChangeText={changeSchoolName}
              value={name}
              placeholder=""
            />
          </FormGroup>
          <FormGroup>
            <Caption>GRADING SYSTEM</Caption>
            <View style={{ flex: 1 }}>
              <View style={styles.gradingItem}>
                <Subtitle>First Class</Subtitle>
                <TextInput
                  style={styles.underline}
                  value={String(gradingSystem.firstClass)}
                  onChangeText={(firstClass) =>
                    changeGradingSystem({
                      firstClass: Number(firstClass),
                    })
                  }
                />
              </View>

              <View style={styles.gradingItem}>
                <Subtitle>Second Class (UPPER DIVISION)</Subtitle>
                <TextInput
                  style={styles.underline}
                  value={String(gradingSystem.secondClassUpper)}
                  onChangeText={(secondClassUpper) =>
                    changeGradingSystem({
                      secondClassUpper: Number(secondClassUpper),
                    })
                  }
                />
              </View>
              <View style={styles.gradingItem}>
                <Subtitle>Second Class (LOWER DIVISION)</Subtitle>
                <TextInput
                  style={styles.underline}
                  value={String(gradingSystem.secondClassLower)}
                  onChangeText={(secondClassLower) =>
                    changeGradingSystem({
                      secondClassLower: Number(secondClassLower),
                    })
                  }
                />
              </View>
              <View style={styles.gradingItem}>
                <Subtitle>Third Class</Subtitle>
                <TextInput
                  style={styles.underline}
                  value={String(gradingSystem.thirdClass)}
                  onChangeText={(thirdClass) =>
                    changeGradingSystem({
                      thirdClass: Number(thirdClass),
                    })
                  }
                />
              </View>
              <View style={styles.gradingItem}>
                <Subtitle>Pass</Subtitle>
                <TextInput
                  style={styles.underline}
                  value={String(gradingSystem.pass)}
                  onChangeText={(pass) =>
                    changeGradingSystem({ pass: Number(pass) })
                  }
                />
              </View>
            </View>
          </FormGroup>
        </Screen>
      </ScrollView>
      <Toolbar
        light
        rightComponent={
          <Button
            style={{
              backgroundColor: '#ffd200',
              borderRadius: 20,
              width: 100,
              alignSelf: 'flex-end',
            }}
            onPress={save}
          >
            <Text style={{ color: '#000' }}>Continue</Text>
          </Button>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: YELLOW, flex: 1 },
  underline: { borderBottomWidth: 2, borderBottomColor: '#ddd' },
  gradingItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
})
