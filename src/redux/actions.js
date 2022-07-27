import { coursesSlice } from './slices/courses'
import { fieldSlice } from './slices/field'
import { schoolSlice } from './slices/school'
import { userSlice } from './slices/user'

export const editCourse = coursesSlice.actions.editCourse
export const deregisterCourse = fieldSlice.actions.deregisterCourse
export const changeGrade = fieldSlice.actions.changeGrade
export const updateField = fieldSlice.actions.updateField
export const updateUser = userSlice.actions.updateUser
export const initSchool = (school) => (dispatch) => {
  dispatch(schoolSlice.actions.initSchool(school))
  dispatch(userSlice.actions.initSchool())
}

export const updateSchool = schoolSlice.actions.updateSchool

export const initField = (data) => (dispatch) => {
  dispatch(fieldSlice.actions.initField(data))
  dispatch(userSlice.actions.initField())
}

export const initCourses = coursesSlice.actions.initCourses

export const resetData = () => (dispatch) => {
  dispatch(userSlice.actions.resetUser())
  dispatch(fieldSlice.actions.resetField())
  dispatch(coursesSlice.actions.resetCourses())
  dispatch(schoolSlice.actions.resetSchool())

  return dispatch({ type: 'RESET' })
}

export const addCourse = (data) => (dispatch) => {
  const key = new Date().getTime()
  const name = data.name || 'Untitled Course'

  dispatch(coursesSlice.actions.addCourse({ key, name }))
  dispatch(
    fieldSlice.actions.addCourse({
      key,
      year: data.year,
      semester: data.semester,
    })
  )
}
