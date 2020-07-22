const fs = require('fs')
const { getFormatDate } = require('./time')

/* Read Data */
const readFile = () => {
  const rawData = fs.readFileSync('db.json')
  const parsedData = JSON.parse(rawData)
  return parsedData
}

/* Write Log */
const writeLog = ({ log = {} }) => {
  const originalData = readFile()

  const originalLogs = originalData.logs || []
  const combineData = {
    ...originalData,
    logs: [
      ...originalLogs,
      log,
    ],
  }
  const parseData = JSON.stringify(combineData)
  fs.writeFileSync('db.json', parseData)
  console.log(`Log: ${JSON.stringify(log)}`)
}

/* Write Data */
const writeFile = ({ newData = [], log }) => {
  const parseData = JSON.stringify(newData)
  fs.writeFileSync('db.json', parseData)
  writeLog({ log })
}

const writePost = ({ newData = [] }) => {
  const originalData = readFile()
  const newPostData = () => {
    const originalPost = (originalData.posts || []).filter((el) => el !== null)
    return [
      ...originalPost,
      ...newData,
    ]
  }
  const combineData = {
    ...originalData,
    posts: newPostData(),
  }

  // 總筆數、新增筆數
  const newPostCount = newData.length
  const totalPostCount = combineData.posts.length
  const msg = `新增筆數: ${newPostCount} | 總筆數: ${totalPostCount}`

  const log = { action: 'writePost', msg, create_at: getFormatDate() }
  writeFile({ newData: combineData, log })
}

const resetFile = () => {
  const template = { posts: [], logs: [] }
  const templateData = JSON.stringify(template)
  fs.writeFileSync('db.json', templateData)

  const log = { action: 'resetFile', msg: 'Reset File', created_at: getFormatDate() }
  writeLog({ log })
}

module.exports = {
  readFile,
  writeFile,
  writePost,
  resetFile,
}
