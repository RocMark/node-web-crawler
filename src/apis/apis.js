const request = require('request')
const cheerio = require('cheerio')
const { filterData } = require('../format')
const { writePost } = require('../file')

const itHomeApi = () => {
  const url = 'https://ithelp.ithome.com.tw/?tab=hot&page=1'
  const template = (html) => {
    const $ = cheerio.load(html)
    const rawData = []
    $('.qa-list').each((index, elem) => {
      const view = $(elem)
        .find('.qa-list__condition > a')
        .next().next()
        .find('.qa-condition__count')
        .text()

      const createAt = $(elem).find('.qa-list__info-time').text()
      const tags = $(elem).find('.qa-list__tags').toArray()
        .reduce((sum, el) => {
          return `${sum} ${el}`
        }, '')

      const link = $(elem).find('.qa-list__title-link').attr('href')
      const getID = (urlStr) => {
        const splitStrArray = urlStr.split('/')
        const id = splitStrArray[splitStrArray.length - 1]
        return id
      }
      const id = getID(link)
      const title = $(elem).find('.qa-list__title-link').text().toLowerCase()

      const result = { id, link, view, create_at: createAt, tags, title }
      rawData.push(result)
    })
    return rawData
  }
  return {
    url,
    template,
  }
}

const fetchPost = (callback) => {
  request(itHomeApi().url, (err, res, html) => {
    const requestSuccess = !err && res.statusCode === 200
    let rawData = []
    if (requestSuccess) {
      rawData = itHomeApi().template(html)
    }
    return callback(rawData)
  })
}

const itHomeCronJob = () => {
  // 先將網頁上要的資料取出整理
  fetchPost((data) => {
    // 過濾掉自行設定的條件不需要的內容
    const filteredData = filterData(data)
    // 讀取舊有資料 & 寫入資料
    writePost({ newData: filteredData })
  })
}

const cronJob = (data) => {
  // 過濾掉自行設定的條件不需要的內容
  const filteredData = filterData(data)
  // 讀取舊有資料 & 寫入資料
  writePost({ newData: filteredData })
}

module.exports = { itHomeCronJob, fetchPost }
