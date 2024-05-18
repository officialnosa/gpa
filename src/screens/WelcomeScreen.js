import React from 'react'
import { Platform } from 'react-native'
import { Image, ImageBackground, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

import Icon from '@expo/vector-icons/Feather'
import { Link } from 'expo-router'

export class WelcomeScreen extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="home" size={focused ? 25 : 23} color={tintColor} />
    ),
  }
  state = { schools: [] }

  render() {
    const platform = Platform.select({
      web: 'online ',
      android: 'Android',
      ios: 'iOS',
      default: '',
    })
    return (
      <ImageBackground
        source={require('../images/bg.jpeg')}
        style={{
          flex: 1,
          alignItems: 'center',
          position: 'relative',
          justifyContent: 'center', // backgroundColor: '#fff'
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
        {/* <Screen
        styleName="paper"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffd200'
        }}
      > */}
        {/* <View
          style={{
            // backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            height: 100,
            width: 100,
            borderRadius: 10
          }}
        >
          <Text
            style={{
              fontFamily: 'Paprika-Regular',
              fontSize: 70,
              color: '#000'
            }}
          >
            A+
          </Text>
        </View> */}
        <View
        // style={{
        //   backgroundColor: '#c887ad',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   height: 100,
        //   width: 100,
        //   borderRadius: 10
        // }}
        >
          <Image
            style={{
              height: 150,
              width: 150,
            }}
            source={require('../images/logo.png')}
          />
        </View>
        <Text
          style={{
            // fontFamily: 'Paprika-Regular',
            fontSize: 25,
            marginTop: 20, // marginBottom: 20,
            maxWidth: 300,
            position: 'relative',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            // fontFamily: 'Paprika-Regular',
            fontSize: 18,
            marginTop: 20,
            marginBottom: 50,

            ...Platform.select({ web: { fontWeight: 'bold' }, default: {} }),
            maxWidth: 300,
            position: 'relative',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          Track your progress with ease
        </Text>
        <Link href="/schools" asChild>
          <Button
            styleName="clear"
            contentStyle={{
              height: 50,
            }}
            style={{
              width: 200,
              borderRadius: 5,
              backgroundColor: '#fff',
            }}
          >
            <Text
              style={{
                // fontFamily: 'Paprika-Regular',
                color: '#000',
                fontSize: 16,
              }}
            >
              Get Started
            </Text>
          </Button>
        </Link>
        {/* </Screen> */}
      </ImageBackground>
    )
  }
}
