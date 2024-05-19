import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Icon from '@expo/vector-icons/Feather'

import { YELLOW } from '@/ui'
import { router } from 'expo-router'

export function Toolbar({
  leftComponent,
  rightComponent,
  showNavIcon,
  title,
  clear,
  light,
  style,
  textStyle,
  titleStyle,
}) {
  const goBack = () => {
    if (router.canGoBack()) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: clear ? 'transparent' : light ? '#fff' : YELLOW },
        style,
      ]}
    >
      {showNavIcon ? (
        <TouchableOpacity onPress={goBack}>
          <Icon
            name="chevron-left"
            size={25}
            color={light ? '#fff' : '#000'}
            style={iconStyle}
          />
        </TouchableOpacity>
      ) : null}
      {leftComponent && <View style={styles.middleLeft}>{leftComponent}</View>}
      <Text style={[defaultTitleStyle, titleStyle, textStyle]}>{title}</Text>
      {rightComponent && (
        <View style={styles.middleRight}>{rightComponent}</View>
      )}
    </View>
  )
}

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
    }), // paddingBottom: 15,
  },
  middleRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  middleLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
})
