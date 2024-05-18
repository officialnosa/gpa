import React from 'react'
import { YELLOW } from '@/ui'
import {
  configureFonts,
  DefaultTheme,
  MD3TypescaleKey,
  Provider,
} from 'react-native-paper'
import type { ThemeProp } from 'react-native-paper/src/types'
import { Platform } from 'react-native'
import { MD3Type } from 'react-native-paper/lib/typescript/types'

const isAndroid = Platform.OS === 'android'
const fontConfig: Partial<Record<MD3TypescaleKey, Partial<MD3Type>>> = {
  displayLarge: {
    fontFamily: 'BR Firma Bold',
    fontWeight: 'normal',
  },
  displayMedium: {
    fontFamily: 'BR Firma Medium',
    fontWeight: 'normal',
  },
  displaySmall: {
    fontFamily: 'BR Firma Regular',
    fontWeight: 'normal',
  },
  headlineLarge: {
    fontFamily: 'BR Firma Bold',
    fontWeight: 'normal',
  },
  headlineMedium: {
    fontFamily: 'BR Firma Medium',
    fontWeight: 'normal',
  },
  headlineSmall: { fontFamily: 'BR Firma Regular', fontWeight: 'normal' },
  titleLarge: {
    fontFamily: 'BR Firma Bold',
    fontWeight: 'normal',
  },
  titleMedium: {
    fontFamily: 'BR Firma Medium',
    fontWeight: 'normal',
    lineHeight: 30,
    fontSize: 30,
  },
  titleSmall: {
    fontFamily: 'BR Firma Regular',
    fontWeight: 'normal',
  },
  labelLarge: {
    fontFamily: 'BR Firma Bold',
    fontWeight: 'normal',
    lineHeight: 24,
  },
  labelMedium: {
    fontFamily: 'BR Firma Medium',
    fontWeight: 'normal',
  },
  labelSmall: {
    fontFamily: 'BR Firma Regular',
    fontWeight: 'normal',
  },
  bodyLarge: {
    fontFamily: 'BR Firma Regular',
  },
  bodyMedium: {
    fontFamily: 'BR Firma Regular',
  },
  bodySmall: {
    fontFamily: 'BR Firma Regular',
    fontWeight: 'normal',
  },
}

const theme: ThemeProp = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: YELLOW,
    secondary: YELLOW,
  },
  fonts: {
    ...DefaultTheme.fonts,
    ...configureFonts({ config: fontConfig }),
    default: {
      fontFamily: 'BR Firma Regular',
      fontWeight: 'normal',
    },
  },
}

export function PaperProvider({ children }: React.PropsWithChildren) {
  return <Provider theme={theme}>{children}</Provider>
}
