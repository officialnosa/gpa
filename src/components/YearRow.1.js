import React from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { withNavigation } from '@navigation/hoc'

import { SemesterScoreBadge } from './SemesterScoreBadge'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
}

const colors = [
  '#fed202',
  '#fed202',
  '#ecc303',
  '#e0b901',
  '#ceaa01',
  '#c7a502',
  '#b79804',
  '#b99903',
  '#a58701',
  '#9c8100',
  '#826a00',
]
const columns = 2

export const YearRow = withNavigation(({ year, semester, navigation }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: colors[year % colors.length] }]}
    onPress={() => navigation.navigate('Year', { year, semester })}
  >
    <View style={styles.info}>
      <Text style={styles.text}>Year {year}</Text>
      <Text style={styles.text2}>
        {[undefined, '1st', '2nd'][semester]} Semester
      </Text>
    </View>
    <View style={styles.gp}>
      <Text style={styles.gpText}>GPA</Text>
      <SemesterScoreBadge
        year={year}
        semester={semester}
        style={{ color: '#fff', flex: 1, textAlign: 'right' }}
      />
    </View>
  </TouchableOpacity>
))

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#000',
    ...Platform.select({ web: { fontWeight: 'bold' }, default: {} }),
  },
  text2: {
    color: '#000',
    ...Platform.select({ web: { fontWeight: 'bold' }, default: {} }),
    fontSize: 16,
  },
  tabbar: {
    backgroundColor: '#000',
  },
  tab: {
    width: 240,
    height: 50,
  },
  indicator: {
    backgroundColor: '#ffd200',
  },
  label: {
    color: '#fff',
    ...Platform.select({ web: { fontWeight: '400' }, default: {} }),
  },
  button: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 20,
    // alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ffd200',
    borderRadius: 5,
    // width: initialLayout.width / columns - 40
  },
  info: {
    padding: 15,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#ffd200',
    borderRadius: 5,
    // width: initialLayout.width / columns - 40
  },
  gp: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#000',
    flexDirection: 'row',
  },
  gpText: {
    flex: 1,
    color: '#fff8',
    // textAlign: 'center'
  },
})
