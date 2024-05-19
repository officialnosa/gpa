import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native'
import { useAppSelector } from '@/redux/hooks'

// const GRADES = [
//   { label: 'A', point: 5 },
//   { label: 'B', point: 4 },
//   { label: 'C', point: 3 },
//   { label: 'D', point: 2 },
//   { label: 'E', point: 1 },
//   { label: 'F', point: 0 }
// ]

type Props = {
  value: number
  onChangeValue: (value: number) => void
}

export function GradeSelector({ value, onChangeValue }: Props) {
  const grades = useAppSelector((state) => {
    const grades = state.field.grades
    return Object.keys(grades || {})
      .sort((a, b) => grades[b] - grades[a])
      .map((g) => ({
        label: g.toUpperCase(),
        point: grades[g],
      }))
  })

  return (
    <View style={styles.row}>
      {grades.map((n) => (
        <TouchableOpacity key={n.point} onPress={() => onChangeValue(n.point)}>
          <View
            style={[
              styles.bubble,
              value === n.point ? styles.activeBubble : null,
            ]}
          >
            <Text
              style={[
                styles.letter,
                value === n.point ? styles.activeText : null,
              ]}
            >
              {n.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  bubble: {
    height: 34,
    minWidth: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    marginLeft: 10,
    borderColor: '#ffd200',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  activeBubble: {
    backgroundColor: '#ffd200',
    borderColor: '#ffd200',
  },
  activeText: {
    // color: '#fff'
  },
  letter: {
    fontSize: 14,
    color: '#000',
    ...Platform.select({ web: { fontWeight: 'bold' }, default: {} }),
  },
  row: { flexDirection: 'row' },
})
