const initialState = {
  id: 'biu$csc',
  name: 'Computer Science',
  courses: {},
  structure: {
    '1$1': {},
    '1$2': {},
    '2$1': {},
    '2$2': {},
    '3$1': {},
    '3$2': {},
    '4$1': { biu$csc$411: 2, biu$csc$412: 5, biu$csc$416: 5, biu$csc$418: 4 },
    '4$2': {}
  },
  levelWeight: {
    level1: 0.05,
    level2: 0.2,
    level3: 0.35,
    level4: 0.4
  }
}

const field = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default field
