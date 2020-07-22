const { keyWordList } = require('./keyword')
const { readFile } = require('./file')

// 目前只要判斷全小寫是否相符合
const extendKeyWordList = (data) => {
  return data.reduce((sum, el, index, arr) => {
    const original = el.toLowerCase()
    // const camelCase = el.toLowerCase()
    return [...sum, original]
  }, [])
}

const checkIdExist = ({ originalData, data }) => {
  const idList = originalData.map((el) => el.id)
  // console.log('checkIdExist', { idList })

  const filteredData = data.filter((el, index, arr) => {
    const idExist = idList.includes(el.id)
    // console.log('checkIdExist', { id: el.id, idExist })
    return idExist ? undefined : el
  })

  console.log({
    originalData: originalData.length,
    data: data.length,
    filteredData: filteredData.length,
  })

  return filteredData
}

const filterKeyWords = (data) => {
  return data.filter((el) => {
    const { title } = el
    const matchKeyword = keyWordList.some((elem) => title.includes(elem))
    // console.log('filterKeyWords', { matchKeyword, title })
    return matchKeyword ? el : undefined
  })
}

//* 待改用 OOP & jQuery 鍊式串接
const filterData = (data = []) => {
  // 判斷 id 是否相同排除相同者
  const originalData = readFile().posts || []

  const removeDuplicates = checkIdExist({ originalData, data })

  // 判斷 標題是否符合搜尋的關鍵字
  // const matchKeyWords = filterKeyWords(removeDuplicates)

  // console.log('filterData', { data, removeDuplicates, matchKeyWords })
  const result = removeDuplicates

  return result
}

module.exports = {
  checkIdExist,
  filterKeyWords,
  filterData,
}
