import React, { Component } from 'react'
import {
  Row,
  Divider,
  Caption,
  View,
  Text,
  TouchableOpacity
} from '@shoutem/ui'
import Icon from 'react-native-vector-icons/EvilIcons'
import { YELLOW } from '../ui'
export class GradesEditorRow extends Component {
  delete = () => {
    this.props.onDeletePress && this.props.onDeletePress(this.props.label)
  }
  render() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.gradeBox}>
          <Text style={styles.gradeText}>{this.props.label.toUpperCase()}</Text>
        </View>
        <View
          styleName="flexible"
          style={{ ...styles.gradeBox, ...styles.pointBox }}
        >
          <Text style={styles.gradeText}>
            {this.props.point}
            {/* point
          {this.props.point !== 1 && 's'} */}
          </Text>
        </View>
        <TouchableOpacity onPress={this.delete} style={{ padding: 10 }}>
          <Icon name="trash" size={25} color="#000" />
        </TouchableOpacity>
      </View>
    )
  }
}

export default GradesEditorRow

const styles = {
  underline: { borderBottomWidth: 2, borderBottomColor: '#ddd' },
  gradeBox: {
    marginRight: 20,
    height: 30,
    borderRadius: 5,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: YELLOW
  },
  pointBox: {
    alignItems: 'flex-start',
    paddingLeft: 20,
    backgroundColor: '#eee'
  },
  gradeText: { color: '#000' }
}
