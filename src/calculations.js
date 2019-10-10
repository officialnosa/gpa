import { runAsync } from './utils'

const getAverage = ({ handler, list, ...options }) =>
  runAsync(async () => {
    list = list || (await handler(options))

    if (list.length < 1) return 0

    const data = list.reduce(
      (a, b, index) => ({
        point: a.point + b.point * b.creditLoad,
        creditLoad: a.creditLoad + b.creditLoad
      }),
      { creditLoad: 0, point: 0 }
    )

    if (data.creditLoad < 1) return 0
    const gpa = data.point / data.creditLoad || 0
    return gpa
  })

export const getCoursesBySemester = ({ year, semester, field, courses }) =>
  runAsync(() => {
    const list = field.structure[`${year}$${semester}`] || {}

    return Object.keys(list).map(registered => ({
      id: registered,
      creditLoad: courses[registered].creditLoad,
      point: list[registered]
    }))
  })

export const getCoursesByYear = ({ year, field, courses }) =>
  runAsync(() => {
    const list1 = field.structure[`${year}$1`] || {}
    const list2 = field.structure[`${year}$2`] || {}
    const list = { ...list1, ...list2 }

    return Object.keys(list).map(registered => ({
      id: registered,
      creditLoad: courses[registered].creditLoad,
      point: list[registered]
    }))
  })

export const getAverageBySemester = options =>
  getAverage({ handler: getCoursesBySemester, ...options })

export const getAverageByYear = async options =>
  getAverage({ handler: getCoursesByYear, ...options })
