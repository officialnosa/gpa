import type { FC } from 'react'
import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

type Props = {
  max: number
  value: number
  onChangeNumber: (value: number) => void
}

export const NumberSelector: FC<Props> = ({ max, value, onChangeNumber }) => {
  const handleChangeNumber = (newValue) => {
    if (newValue === value) {
      return
    }

    onChangeNumber?.(newValue)
  }
  const nums = []

  for (let i = 0; i < max; i++) {
    nums.push(i + 1)
  }
  return (
    <View style={styles.row}>
      {nums.map((n) => (
        <TouchableOpacity key={n} onPress={() => handleChangeNumber(n)}>
          <View
            style={[styles.bubble, value === n ? styles.activeBubble : null]}
          >
            <Text
              style={[styles.letter, value === n ? styles.activeText : null]}
            >
              {n}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  bubble: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginLeft: 15,
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
