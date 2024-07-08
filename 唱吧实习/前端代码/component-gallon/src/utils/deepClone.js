export function deepClone(obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  if (obj instanceof Array) {
    let arr = []
    obj.forEach((item) => {
      arr.push(deepClone(item))
    })
    return arr
  }
  let res = {}
  for (let i in obj) {
    res[i] = obj[i]
  }
  return res
}
