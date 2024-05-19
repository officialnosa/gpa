import React from 'react'
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import Icon from '@expo/vector-icons/Feather'
import { Toolbar } from '@/components/Toolbar'
import { YearList } from '@/components/YearList'
import { router } from 'expo-router'
import { ScreenMap } from '@/navigation'

export function YearScreen() {
  const openSettings = () => router.push(ScreenMap.Settings)

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../images/bg.jpeg')}
        style={{
          flex: 1,
          alignItems: 'flex-start',
          position: 'relative',
          justifyContent: 'flex-start',
        }}
        imageStyle={{
          width: null,
          height: null,
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: '#0007',
          }}
        />
        <View style={{ width: '100%', flex: 1, position: 'relative' }}>
          <StatusBar barStyle="light-content" />
          <YearList style={{ marginTop: 60 }} />
          <Toolbar
            clear
            light
            style={{
              backgroundColor: '#0008',
              position: 'absolute',
              left: 0,
              right: 0,
            }}
            titleStyle={{ color: '#fff', fontSize: 20 }}
            title="Courses"
            rightComponent={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#eee' }}>Overall CGPA ...</Text>
                <TouchableOpacity
                  onPress={openSettings}
                  style={{ marginLeft: 10 }}
                >
                  <Icon name="settings" size={25} color="#fff" />
                </TouchableOpacity>
              </View>
            }
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = {
  container: {
    flex: 1,
  },
}
