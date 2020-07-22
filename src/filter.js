const { keyWordList } = require('./keyword')
const { readFile } = require('./file')

const removeDuplicates = ({ originalData, data }) => {
  const idList = originalData.map((el) => el.id)

  const filteredData = data.filter((el) => {
    const idNotExist = !idList.includes(el.id)
    return idNotExist // id 不存在才保留
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
    return matchKeyword
  })
}

//! 待改用 OOP & jQuery 鍊式串接
const filterProcess = ({ apiName, data = [] }) => {
  const isEmptyArray = data.length < 0
  if (isEmptyArray) return []

  // 判斷 id 是否相同排除相同者
  const originalData = readFile().posts[apiName] || []

  const removeDuplicatesData = removeDuplicates({ apiName, originalData, data })

  // 判斷 標題 & 標籤 是否符合搜尋的關鍵字
  const matchKeyWords = filterKeyWords(removeDuplicatesData)

  const result = matchKeyWords

  return result
}

module.exports = {
  removeDuplicates,
  filterKeyWords,
  filterProcess,
}
