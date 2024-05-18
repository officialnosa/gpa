import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

import { SemesterPager } from '@/components/SemesterPager'
import { Toolbar } from '@/components/Toolbar'
import { YearScoreBadge } from '@/components/YearScoreBadge'
import { useLocalSearchParams } from 'expo-router'

export function HomeScreen() {
  const { year, semester } = useLocalSearchParams()

  if (!year || !semester) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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
