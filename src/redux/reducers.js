import { REHYDRATE, PURGE, persistCombineReducers } from 'redux-persist'

import school from './school'
import field from './field'
import courses from './courses'

import storage from 'redux-persist/lib/storage' // or whatever storage you are using

const config = {
  key: 'root',
  storage
}

export default persistCombineReducers(config, {
  school,
  field,
  courses
})
