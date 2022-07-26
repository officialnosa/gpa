import React from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { withNavigation } from '@navigation/hoc'
import { SemesterScoreBadge } from './SemesterScoreBadge'
import { YELLOW } from '../ui'
import { YearScoreBadge } from './YearScoreBadge'

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

export const YearRow = withNavigation(({ id, year, semester, navigation }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: '#fff' }]}
    onPress={() => navigation.navigate('Year', { year, semester: 1 })}
  >
    <View style={styles.info}>
      <Text style={styles.text}>Year {year}</Text>
      <Text style={[styles.text, { textAlign: 'right' }]}>
        <YearScoreBadge year={year} style={styles.text} /> GPA
      </Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors[year % colors.length] + '99',
          borderBottomLeftRadius: 5,
        }}
      >
        <Text style={styles.text2}>1st Semester</Text>
        <View style={styles.gp}>
          <Text style={styles.gpText}>GPA</Text>
          <SemesterScoreBadge
            year={year}
            semester={1}
            style={{ color: '#000', flex: 1, textAlign: 'right' }}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Year', { year, semester: 2 })}
        style={{
          flex: 1,
          backgroundColor: colors[year % colors.length] + '55',
          borderBottomRightRadius: 5,
        }}
      >
        <Text style={styles.text2}>2nd Semester</Text>
        <View style={styles.gp}>
          <Text style={styles.gpText}>GPA</Text>
          <SemesterScoreBadge
            year={year}
            semester={2}
            style={{ color: '#000', flex: 1, textAlign: 'right', fontSize: 18 }}
          />
        </View>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
))

const styles = {
  container: {
    flex: 1,
  },
  text: {
    color: '#000',
    fontSize: 20,
    flex: 1,
    ...Platform.select({ web: { fontWeight: 'bold' }, default: {} }),
  },
  text2: {
    color: '#000',
    marginLeft: 15,
    marginTop: 15,
    // backgroundColor: '#000',
    // ...Platform.select({ web: { fontWeight: 'bold' }, default: {} }),
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
    marginVertical: 15,
    // alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ffd200',
    borderRadius: 5,
    // width: initialLayout.width / columns - 40
  },
  info: {
    padding: 15,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#ffd200',
    // borderRadius: 5
    // width: initialLayout.width / columns - 40
  },
  gp: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    // backgroundColor: '#000',
    flexDirection: 'row',
  },
  gpText: {
    flex: 1,
    color: '#0008',
    fontSize: 18,
    // textAlign: 'center'
  },
}
