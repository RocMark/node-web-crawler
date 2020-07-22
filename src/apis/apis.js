const request = require('request')
const { filterData } = require('../filter')
const { writePost } = require('../file')
const { apiData } = require('./apiData')

/*
  流程
    1. 擷取網頁的 DOM 抽出需要的資料
    2. filterData => 過濾資料 ( 排除 id 相同 & title|tag 不含關鍵字內的資料 )
    3. 寫入檔案中
*/

const fetchApis = ({ apiName, overwriteUrl = '' }) => {
  const url = overwriteUrl || apiData[apiName].url
  request(url, (err, res, html) => {
    const requestSuccess = !err && res.statusCode === 200
    let rawData = []
    if (requestSuccess) {
      rawData = apiData[apiName].template(html)
      const filteredData = rawData.length > 0 ? filterData({ apiName, data: rawData }) : []
      writePost({ apiName, url, newData: filteredData })
    }
  })
}

module.exports = { fetchApis }
