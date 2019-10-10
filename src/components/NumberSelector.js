import React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'

export class NumberSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = props || {}
  }
  componentWillReceiveProps(props) {
    this.setState(props)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.max !== this.state.max ||
      nextState.value !== this.state.value ||
      nextProps.max !== this.props.max ||
      nextProps.value !== this.props.value
    )
  }
  onChangeNumber = value => {
    const { onChangeNumber } = this.props

    if (value !== this.state.value) {
      this.setState({ value })
      onChangeNumber && onChangeNumber(value)
    }
  }
  render() {
    const { max } = this.state
    const nums = []

    const value =
      this.props && this.props.hasOwnProperty('value')
        ? this.props.value
        : this.state.value

    for (let i = 0; i < max; i++) {
      nums.push(i + 1)
    }
    return (
      <View style={styles.row}>
        {nums.map(n => (
          <TouchableOpacity key={n} onPress={() => this.onChangeNumber(n)}>
            <View
              style={[styles.bubble, value == n ? styles.activeBubble : null]}
            >
              <Text
                style={[styles.letter, value == n ? styles.activeText : null]}
              >
                {n}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
    marginLeft: 15,
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
  letter: {
    fontSize: 14,
    color: '#000',
    ...Platform.select({ web: { fontWeight: 'bold' }, default: {} })
  },
  row: { flexDirection: 'row' }
}
