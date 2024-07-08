var twoSum = function (arr, target) {
  arr.forEach((item, index) => {
    let tmp = arr.splice(index, 1)
    const tarIndex = tmp.indexOf(target - item)
    if( tarIndex !== -1){
      return [index, tarIndex]
    }
    return null
  })
}

console.log(twoSum([2,7,11,15], 9));