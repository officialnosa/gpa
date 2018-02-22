import update from 'immutability-helper'

const initialState = {
  biu$csc$411: { name: 'NET-CENTRIC COMPUTING', creditLoad: 3 },
  biu$csc$412: { name: 'SOFTWARE ENGINEERING', creditLoad: 3 },
  biu$csc$413: {
    name: 'ADVANCED DATABASE MANAGEMENT SYSTEM',
    creditLoad: 3
  },
  biu$csc$414: { name: 'SYSTEM ANALYSIS AND DESIGN', creditLoad: 3 },
  biu$csc$415: { name: 'ARTIFICIAL INTELLIGENCE', creditLoad: 3 },
  biu$csc$416: { name: 'SEMINAR', creditLoad: 2 },
  biu$csc$418: { name: 'HUMAN COMPUTING INTERFACE', creditLoad: 2 },
  biu$ent$318: {
    name: 'INTRODUCTION TO ENTREPRENEURIAL SKILLS',
    creditLoad: 2
  }
}

const school = (state = initialState, { type, id, data }) => {
  switch (type) {
    case 'EDIT_COURSE':
      // state[id] = Object.assign({}, state[id], data)
      // return Object.assign({}, state, data)

      return update(state, {
        [id]: {
          $merge: data
        }
      })
    default:
      return state
  }
}

export default school
