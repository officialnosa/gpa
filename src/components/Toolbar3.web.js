import React from 'react'
import { Heading, TouchableOpacity } from 'react-native-paper'
import { Platform, View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { withNavigation } from 'react-navigation'
import { YELLOW } from '../ui'

class ToolbarX extends React.Component {
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
      textStyle
    } = this.props
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: light ? '#fff' : clear ? 'transparent' : YELLOW },
          style
        ]}
      >
        {showNavIcon ? (
          <TouchableOpacity onPress={() => window.appHistory.goBack()}>
            <Icon
              name="chevron-left"
              size={25}
              color={light ? '#000' : '#000'}
              style={iconStyle}
            />
          </TouchableOpacity>
        ) : null}
        {this.renderLeftComponent()}
        <Text style={[titleStyle, textStyle]}>{title}</Text>
        {this.renderRightComponent()}
      </View>
    )
  }
}

const Toolbar = withNavigation(ToolbarX)

export { Toolbar }
const iconStyle = { marginRight: 15 }
const titleStyle = {
  color: '#000',
  fontFamily: 'Paprika-Regular'
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Platform.select({
      web: 0,
      default: 0
    })
    // paddingBottom: 15,
  },
  middleRight: { flex: 1, alignItems: 'flex-end', justifyContent: 'center' },
  middleLeft: { flex: 1, alignItems: 'flex-start', justifyContent: 'center' }
})
