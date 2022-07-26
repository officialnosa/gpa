import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Platform, StyleSheet, Text, View } from 'react-native'

import Icon from '@expo/vector-icons/Feather'

import { withNavigation } from '@navigation/hoc'

import { YELLOW } from '../ui'

export class Toolbar extends React.Component {
  renderLeftComponent() {
    const { leftComponent } = this.props
    if (leftComponent)
      return <View style={styles.middleLeft}>{leftComponent}</View>
    return null
  }

  renderRightComponent() {
    const { rightComponent } = this.props
    if (rightComponent)
      return <View style={styles.middleRight}>{rightComponent}</View>
    return null
  }

  render() {
    const {
      showNavIcon,
      backToHome,
      title,
      navigation,
      clear,
      light,
      style,
      textStyle,
      titleStyle,
    } = this.props
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: clear ? 'transparent' : light ? '#fff' : YELLOW },
          style,
        ]}
      >
        {showNavIcon ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              size={25}
              color={light ? '#fff' : '#000'}
              style={iconStyle}
            />
          </TouchableOpacity>
        ) : null}
        {this.renderLeftComponent()}
        <Text style={[defaultTitleStyle, titleStyle, textStyle]}>{title}</Text>
        {this.renderRightComponent()}
      </View>
    )
  }
}

console.log('withNavigation', typeof withNavigation, Toolbar)
Toolbar = withNavigation(Toolbar)

const iconStyle = { marginRight: 15 }
const defaultTitleStyle = {
  color: '#000',
  fontFamily: 'Paprika-Regular',
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Platform.select({
      web: 0,
      default: 0,
    }),
    // paddingBottom: 15,
  },
  middleRight: { flex: 1, alignItems: 'flex-end', justifyContent: 'center' },
  middleLeft: { flex: 1, alignItems: 'flex-start', justifyContent: 'center' },
})
