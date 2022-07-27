import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { Spec } from 'immutability-helper'
import update from 'immutability-helper'

import type { CourseState } from './courses'

const initialState: FieldState = {
  id: '[FIELD]',
  name: '',
  structure: {},
  levelWeight: {
    1: 1,
  },
  grades: {
    a: 4,
    b: 3,
    c: 2,
    d: 1,
    f: 0,
  },
  courses: {},
  numOfYears: 1,
  currentLevel: 1,
  currentSemester: 1,
}

type Structure = {
  [semesterId: string]: {
    [courseId: string]: number
  }
}

export type FieldState = {
  id: string
  name: string
  structure: Structure | any
  levelWeight: { [x: number]: number }
  grades: { [x: string]: number }
  courses: { [x: string]: CourseState }
  numOfYears: number
  currentLevel: number
  currentSemester: number
}

export const fieldSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    resetField: () => {
      return initialState
    },
    initField: (state, action: PayloadAction<FieldState>) => {
      return { ...state, ...action.payload }
    },
    updateField: (state, action: PayloadAction<Spec<FieldState>>) => {
      return update(state, action.payload)
    },
    changeGrade: (
      state,
      action: PayloadAction<{
        year: number
        semester: number
        id: string
        grade: string
      }>
    ) => {
      const { year, semester, id, grade } = action.payload

      return update(state, {
        structure: {
          [`${year}$${semester}`]: {
            $auto: {
              [id]: {
                $set: grade,
              },
            },
          },
        },
      })
    },
    addCourse: (
      state,
      action: PayloadAction<{ key: string; year: number; semester: number }>
    ) => {
      const { key, year, semester } = action.payload

      return update(state, {
        structure: {
          [`${year}$${semester}`]: {
            $auto: {
              [key]: {
                // Default course gp to the highest grade
                $set: Math.max(...Object.values(state.grades || {})),
              },
            },
          },
        },
      })
    },
    deregisterCourse: (
      state,
      action: PayloadAction<{
        year: number
        semester: number
        id: string | number
      }>
    ) => {
      const { year, semester, id } = action.payload

      return update(state, {
        structure: {
          [`${year}$${semester}`]: {
            $unset: [id],
          },
        },
      })
    },
  },
})
