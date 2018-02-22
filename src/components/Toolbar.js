import React from 'react'
import { Heading, View, TouchableOpacity } from '@shoutem/ui'
import Icon from 'react-native-vector-icons/Feather'
import { withNavigation } from 'react-navigation'

export const Toolbar = withNavigation(
  ({ showNavIcon, backToHome, title, navigation }) => (
    <View
      styleName="horizontal"
      style={{ marginHorizontal: 15, marginTop: 30, marginBottom: 15 }}
    >
      {showNavIcon ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-left"
            size={30}
            color="#000"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ) : null}
      <Heading style={{}}>{title}</Heading>
    </View>
  )
)
