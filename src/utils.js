export const runAsync = func =>
  new Promise(resolve => {
    setTimeout(() => {
      const result = func()
      resolve(result)
    }, 100)
  })

export const safeGet = (key, obj) => {
  if (typeof obj[key] === 'object') {
    const newObj = { ...obj[key] }
    return { ...newObj, get: key => safeGet(key, newObj) }
  }

  return (
    obj[key] || {
      get: key => safeGet(key, {})
    }
  )
}

export const safeObject = obj => ({
  ...obj,
  get: key => safeGet(key, obj)
})

// module.exports = {
//   safeObject,
//   safeGet,
//   runAsync
// }
