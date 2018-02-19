export const setUser = (user, api_key = null) => ({
  type: 'SET_USER',
  user,
  api_key
})

export const logout = _ => ({
  type: 'LOGOUT'
})

export const setNightMode = night_mode => ({
  type: 'SET_NIGHT_MODE',
  night_mode
})

export const addCourse = ({ course, semester, year }) => ({
  type: 'ADD_COURSE',
  course,
  semester,
  year
})

export const removeCourse = ({ course, semester, year }) => ({
  type: 'REMOVE_COURSE',
  course,
  semester,
  year
})

export const editSchool = ({ course, semester, year }) => ({
  type: 'EDIT_SCHOOL',
  course,
  semester,
  year
})
