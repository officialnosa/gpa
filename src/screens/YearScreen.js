import React from 'react'
import {
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Cog6ToothIcon } from 'react-native-heroicons/outline'
import { Text } from 'react-native-paper'
import { useFirebase } from 'react-redux-firebase'

import { useAuth } from 'src/features/auth/hooks'

import { Button } from '@components/Button'

// import Icon from '@expo/vector-icons/Entypo'
import { Toolbar } from '../components/Toolbar'
import { YearList } from '../components/YearList'

export const YearScreen = ({ navigation }) => {
  const openSettings = () => navigation.navigate('Settings')

  return (
    <ImageBackground
      source={require('../images/bg.jpeg')}
      style={styles.imageBackground}
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <StatusBar barStyle="light-content" />
        <YearList style={styles.list} />
        <Toolbar
          clear
          light
          style={styles.toolbar}
          titleStyle={styles.toolbarTitle}
          title="Courses"
          rightComponent={
            <View style={styles.toolbarActions}>
              <Text style={styles.gpa}>Overall CGPA ...</Text>
              {Platform.select({ web: true }) && (
                <TouchableOpacity
                  onPress={openSettings}
                  style={styles.settingsButton}
                >
                  <Cog6ToothIcon size={25} color="#fff" />
                </TouchableOpacity>
              )}
              <AuthStatus />
            </View>
          }
        />
      </View>
    </ImageBackground>
  )
}

const AuthStatus = () => {
  const { auth, loaded } = useAuth()
  const firebase = useFirebase()
  const loginWithGoogle = () => {
    return firebase.login({ provider: 'google', type: 'popup' })
  }

  console.log({
    loaded,
    login: firebase.login,
    auth: firebase.auth,
  })
  return (
    <Button style={styles.authButton} onPress={loginWithGoogle}>
      <Text>Sign In</Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  authButton: {
    backgroundColor: '#fff',
    marginStart: 20,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'flex-start',
    position: 'relative',
    justifyContent: 'flex-start',
    // backgroundColor: '#fff'
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: '#0007',
  },
  content: { width: '100%', flex: 1, position: 'relative' },
  list: { marginTop: 60 },
  toolbar: {
    backgroundColor: '#0008',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  toolbarTitle: { color: '#fff', fontSize: 20 },
  toolbarActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  settingsButton: { marginLeft: 10 },
  gpa: { color: '#eee' },
})
