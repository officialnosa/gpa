import type { Reducer } from 'react'

import update from 'immutability-helper'

type SchoolState = {
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

const school: Reducer<SchoolState, any> = (
  state = initialState,
  { type, updater, data }
) => {
  switch (type) {
    case 'INIT_SCHOOL':
      return { ...initialState, ...data }
    case 'UPDATE_SCHOOL':
      return update(state, updater)
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default school
