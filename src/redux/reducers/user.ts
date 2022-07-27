import update from 'immutability-helper'

const initialState = {
  name: '',
  hasSchool: false,
  hasField: false,
}

const user = (state = initialState, { type, updater }) => {
  switch (type) {
    case 'INIT_FIELD':
      return { ...state, hasField: true }
    case 'INIT_SCHOOL':
      return { ...state, hasSchool: true }
    case 'UPDATE_USER':
      return update(state, updater)
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default user
