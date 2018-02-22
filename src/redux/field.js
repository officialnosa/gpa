import update from 'immutability-helper'

const initialState = {
  id: 'biu$csc',
  name: '',
  structure: {
    '1$1': {},
    '1$2': {},
    '2$1': {},
    '2$2': {},
    '3$1': {},
    '3$2': {},
    '4$1': {
      biu$csc$411: 4,
      biu$csc$412: 5,
      biu$csc$416: 5,
      biu$csc$418: 4,
      biu$csc$413: 5,
      biu$csc$414: 5,
      biu$csc$415: 3,
      biu$ent$318: 5
    },
    '4$2': {}
  },
  levelWeight: {
    1: 0.05,
    2: 0.2,
    3: 0.35,
    4: 0.4
  },
  numOfYears: 4,
  currentLevel: 1,
  currentSemester: 1
}

const field = (state = initialState, { type, updater }) => {
  switch (type) {
    case 'DEREGISTER_COURSE':
      return update(state, {
        structure: {
          [`${year}$${semester}`]: {
            $unset: [id]
          }
        }
      })
    case 'UPDATE_FIELD':
      return update(state, updater)
    case 'CHANGE_GRADE':
      return update(state, {
        structure: {
          [`${year}$${semester}`]: {
            [id]: {
              $set: grade
            }
          }
        }
      })
    default:
      return state
  }
}

export default field
