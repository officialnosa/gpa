import React, { Component } from 'react'
import { Text } from 'react-native-paper'
import { View, TouchableOpacity, Platform } from 'react-native'

const CircleButton = ({ onPress, sign }) => (
  <TouchableOpacity onPress={onPress} style={styles.circle}>
    <View style={styles.bubble}>
      <Text style={styles.letter}>{sign}</Text>
    </View>
  </TouchableOpacity>
)

export class Stepper extends Component {
  increment = () => {
    const { max, onValueChange, initialValue } = this.props

    if (initialValue < max)
      onValueChange && onValueChange(Math.min(initialValue + 1, max))
  }

  decrement = () => {
    const { min, onValueChange, initialValue } = this.props

    if (initialValue > min)
      onValueChange && onValueChange(Math.max(initialValue - 1, min))
  }

  render() {
    const {
      min,
      max,
      onValueChange,
      initialValue,
      containerStyle,
      label
    } = this.props
    return (
      <View style={{ ...styles.row, ...containerStyle, flexDirection: 'row' }}>
        <Text
          style={{
            fontSize: 16,
            // marginHorizontal: 10,

            color: '#000',
            ...Platform.select({ web: { fontWeight: 'bold' }, default: {} })
          }}
        >
          {initialValue}
          {label}
        </Text>
        <CircleButton sign="-" onPress={this.decrement} />
        <CircleButton sign="+" onPress={this.increment} />
      </View>
    )
  }
}

const styles = {
  bubble: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // marginLeft: 15,
    borderColor: '#ffd200',
    borderWidth: 2,
    backgroundColor: '#fff'
  },
  activeBubble: {
    backgroundColor: '#ffd200',
    borderColor: '#ffd200'
  },
  activeText: {
    // color: '#fff'
  },
  circle: {
    marginLeft: 10
  },
  letter: {
    fontSize: 16,
    color: '#000',
    ...Platform.select({ web: { fontWeight: 'bold' }, default: {} })
  },
  row: { flexDirection: 'row', alignItems: 'center' }
}

export default Stepper
