import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { Spec } from 'immutability-helper'
import update from 'immutability-helper'

export type SchoolState = {
  name: string
  gradingSystem: {
    firstClass: number
    secondClassUpper: number
    secondClassLower: number
    thirdClass: number
    pass: number
  }
}

const initialState: SchoolState = {
  name: '',
  gradingSystem: {
    firstClass: 4.0,
    secondClassUpper: 3.5,
    secondClassLower: 2.5,
    thirdClass: 2.0,
    pass: 2.0,
  },
}

export const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    resetSchool: () => {
      return initialState
    },
    initSchool: (state, action: PayloadAction<SchoolState>) => {
      return { ...state, ...action.payload }
    },
    updateSchool: (state, action: PayloadAction<Spec<SchoolState>>) => {
      return update(state, action.payload)
    },
  },
})
