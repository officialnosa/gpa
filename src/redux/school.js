const initialState = {
  name: 'Benson idahosa University',
  gradingSystem: {
    firstClass: 4.0,
    secondClassUpper: 3.5,
    secondClassLower: 2.5,
    thirdClass: 2.0,
    fail: 1
  }
}

const school = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default school
