import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import update from 'immutability-helper'

export type CourseState = {
  [x: string]: {
    id: string
    name: string
    creditLoad: number
  }
}

const initialState: CourseState = {}

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    resetCourses: () => {
      return initialState
    },
    initCourses: (state, action: PayloadAction<CourseState>) => {
      return { ...state, ...action.payload }
    },
    editCourse: (state, action: PayloadAction<CourseState[0]>) => {
      return update(state, {
        [action.payload.id]: {
          $merge: action.payload,
        },
      })
    },
    addCourse: (
      state,
      action: PayloadAction<{ key: string; name: string }>
    ) => {
      state[action.payload.key] = {
        id: action.payload.key,
        name: action.payload.name,
        creditLoad: 0,
      }
    },
  },
})
