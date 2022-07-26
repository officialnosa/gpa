import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { SemesterPager } from '../components/SemesterPager'
import { Toolbar } from '../components/Toolbar'
import { YearScoreBadge } from '../components/YearScoreBadge'

export const HomeScreen = ({ route }) => {
  const { year, semester } = route.params

  if (!year || !semester) {
    return null
  }

  return (
    <View style={styles.container}>
      <Toolbar
        style={styles.toolbar}
        textStyle={styles.toolbarText}
        showNavIcon
        title={`Year ${year}`}
        rightComponent={
          <Text>
            GPA <YearScoreBadge year={year} style={styles.yearScore} />
          </Text>
        }
      />
      <SemesterPager year={year} semester={semester} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbarText: { fontSize: 16 },
  toolbar: { height: 50 },
  yearScore: { color: '#000' },
})
