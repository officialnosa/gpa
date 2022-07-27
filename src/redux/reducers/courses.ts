import update from 'immutability-helper'

const initialState = {}

const school = (state = initialState, { type, id, data }) => {
  switch (type) {
    case 'INIT_COURSES':
      return data
    case 'EDIT_COURSE':
      // state[id] = Object.assign({}, state[id], data)
      // return Object.assign({}, state, data)

      return update(state, {
        [id]: {
          $merge: data,
        },
      })
    case 'RESET':
      return initialState
    case 'ADD_COURSE':
      return {
        ...state,
        [data.key]: {
          name: data.name,
          creditLoad: 0,
        },
      }
    default:
      return state
  }
}

export default school
