const { keyWordList } = require('./keyword')
const { readFile } = require('./file')

const checkIdExist = ({ originalData, data }) => {
  const idList = originalData.map((el) => el.id)

  const filteredData = data.filter((el, index, arr) => {
    const idExist = idList.includes(el.id)
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
    const { title, tags = [] } = el
    const matchKeyword = keyWordList.some((elem) => {
      const tagStr = tags.toString().toLowerCase()
      return title.includes(elem) || tagStr.includes(elem)
    })
    console.log('filterKeyWords', { matchKeyword, title, tags })
    // return matchKeyword ? el : undefined
    return matchKeyword
  })
}

//! 待改用 OOP & jQuery 鍊式串接
const filterData = ({ apiName, data = [] }) => {
  // 判斷 id 是否相同排除相同者
  const originalData = readFile().posts[apiName] || []

  const removeDuplicates = checkIdExist({ apiName, originalData, data })

  // 判斷 標題 & 標籤 是否符合搜尋的關鍵字
  const matchKeyWords = filterKeyWords(removeDuplicates)

  const result = matchKeyWords

  return result
}

module.exports = {
  checkIdExist,
  filterKeyWords,
  filterData,
}
