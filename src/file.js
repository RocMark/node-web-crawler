const fs = require('fs')
const { getFormatDate } = require('./time')

const fileTemplate = { posts: {}, logs: [] }

/* Read Data */
const readFile = () => {
  const rawData = fs.readFileSync('db.json')
  const parsedData = JSON.parse(rawData)
  return {
    ...fileTemplate,
    ...parsedData,
  }
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
const writeFile = ({ apiName, newData = [], log }) => {
  const parseData = JSON.stringify(newData)
  fs.writeFileSync('db.json', parseData)
  writeLog({ log })
}

const writePost = ({ apiName, url, newData = [] }) => {
  const originalData = readFile()

  // 判斷是否已建立該屬性 posts: { "網站名": [] }
  const newPostData = () => {
    const columnExist = !!originalData.posts[apiName]
    const originalSiteData = columnExist ? originalData.posts[apiName] : []

    const newSiteData = {
      [apiName]: [
        ...originalSiteData,
        ...newData,
      ],
    }
    return newSiteData
  }

  const combineData = {
    ...originalData,
    posts: {
      ...originalData.posts,
      ...newPostData(),
    },
  }

  // 總筆數、新增筆數
  const newPostCount = newData.length
  const totalPostCount = combineData.posts[apiName].length
  const msg = `新增筆數: ${newPostCount} | 總筆數: ${totalPostCount}`

  const log = { action: 'writePost', apiName, msg, url, create_at: getFormatDate() }
  writeFile({ apiName, url, newData: combineData, log })
}

const resetFile = () => {
  const template = fileTemplate
  const templateData = JSON.stringify(template)
  fs.writeFileSync('db.json', templateData)

  const log = { action: 'resetFile', msg: 'Reset File', created_at: getFormatDate() }
  writeLog({ log })
}

const initFile = () => {
  const fileFormatValid = true
  if (fileFormatValid) {
    const template = { posts: {}, logs: [] }
    const templateData = JSON.stringify(template)
    fs.writeFileSync('db.json', templateData)

    const log = { action: 'initFile', msg: 'Init File', created_at: getFormatDate() }
    writeLog({ log })
  }
}

module.exports = {
  initFile,
  readFile,
  writeFile,
  writePost,
  resetFile,
}
