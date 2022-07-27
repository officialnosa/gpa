export const setUser = (user, api_key = null) => ({
  type: 'SET_USER',
  user,
  api_key,
})

export const logout = (_) => ({
  type: 'LOGOUT',
})

export const setNightMode = (night_mode) => ({
  type: 'SET_NIGHT_MODE',
  night_mode,
})

// export const addCourse = ({ course }) => ({
//   type: 'ADD_COURSE',
//   course
// })

export const editCourse = ({ id, ...data }) => ({
  type: 'EDIT_COURSE',
  id,
  data,
})

export const deleteCourse = ({ id }) => ({
  type: 'DELETE_COURSE',
  id,
})

export const deregisterCourse = ({ id, semester, year }) => ({
  type: 'DEREGISTER_COURSE',
  id,
  semester,
  year,
})

export const changeGrade = ({ id, semester, year, grade }) => ({
  type: 'CHANGE_GRADE',
  id,
  semester,
  year,
  grade,
})

export const updateField = (updater) => ({
  type: 'UPDATE_FIELD',
  updater,
})

export const updateSchool = (updater) => ({
  type: 'UPDATE_SCHOOL',
  updater,
})

export const updateUser = (updater) => ({
  type: 'UPDATE_USER',
  updater,
})

export const editSchool = ({ course, semester, year }) => ({
  type: 'EDIT_SCHOOL',
  course,
  semester,
  year,
})

export const initSchool = (data) => ({
  type: 'INIT_SCHOOL',
  data,
})

export const initField = (data) => ({
  type: 'INIT_FIELD',
  data,
})

export const initCourses = (data) => ({
  type: 'INIT_COURSES',
  data,
})

export const resetData = () => ({ type: 'RESET' })

export const addCourse = (data) => ({
  type: 'ADD_COURSE',
  data: {
    ...data,
    key: new Date().getTime(),
    name: data.name || 'Untitled Course',
  },
  year: data.year,
  semester: data.semester,
})
