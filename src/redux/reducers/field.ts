import update from 'immutability-helper'

import { fieldSlice } from '../slices/field'

const initialState = {
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

const field = (
  state = initialState,
  { type, updater, year, semester, id, grade, data }
) => {
  switch (type) {
    case 'INIT_FIELD':
      return { ...initialState, ...data }
    case 'DEREGISTER_COURSE':
      return update(state, {
        structure: {
          [`${year}$${semester}`]: {
            $unset: [id],
          },
        },
      })
    case 'UPDATE_FIELD':
      return update(state, updater)
    case 'CHANGE_GRADE':
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
    case 'RESET':
      return initialState
    case 'ADD_COURSE':
      // const { key, year, semester } = data
      return update(state, {
        structure: {
          [`${year}$${semester}`]: {
            $auto: {
              [data.key]: {
                $set: Math.max(...Object.values(state.grades || {})),
              },
            },
          },
        },
      })
    default:
      return state
  }
}

export default fieldSlice.reducer
