import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { Spec } from 'immutability-helper'
import update from 'immutability-helper'

export type UserState = {
  name: string
  hasSchool: boolean
  hasField: boolean
}

const initialState: UserState = {
  name: '',
  hasSchool: false,
  hasField: false,
}

export const userSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    resetUser: () => {
      return initialState
    },
    initSchool: (state) => {
      state.hasSchool = true
    },
    initField: (state) => {
      state.hasField = true
    },
    updateUser: (state, action: PayloadAction<Spec<UserState>>) => {
      return update(state, action.payload)
    },
  },
})
