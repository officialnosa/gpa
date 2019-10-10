import React from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  grades: state.field.grades
})

// const GRADES = [
//   { label: 'A', point: 5 },
//   { label: 'B', point: 4 },
//   { label: 'C', point: 3 },
//   { label: 'D', point: 2 },
//   { label: 'E', point: 1 },
//   { label: 'F', point: 0 }
// ]

class GradeSelectorX extends React.Component {
  constructor(props) {
    super(props)
    this.state = props || {}
  }
  componentWillReceiveProps(props) {
    this.setState(props)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.value !== this.state.value ||
      nextProps.value !== this.props.value
    )
  }
  onChangeValue = value => {
    const { onChangeValue } = this.props

    if (value !== this.state.value) {
      this.setState({ value })
      onChangeValue && onChangeValue(value)
    }
  }
  render() {
    const value =
      this.props && this.props.hasOwnProperty('value')
        ? this.props.value
        : this.state.value

    const { grades } = this.props

    const GRADES = Object.keys(grades || {})
      .sort((a, b) => grades[b] - grades[a])
      .map(g => ({
        label: g.toUpperCase(),
        point: grades[g]
      }))

    return (
      <View style={styles.row}>
        {GRADES.map(n => (
          <TouchableOpacity
            key={n.point}
            onPress={() => this.onChangeValue(n.point)}
          >
            <View
              style={[
                styles.bubble,
                value === n.point ? styles.activeBubble : null
              ]}
            >
              <Text
                style={[
                  styles.letter,
                  value === n.point ? styles.activeText : null
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
}

const GradeSelector = connect(mapStateToProps)(GradeSelectorX)

export { GradeSelector }

const styles = {
  bubble: {
    height: 34,
    minWidth: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    marginLeft: 10,
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
