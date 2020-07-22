const cheerio = require('cheerio')

const formatBaseUrl = (url) => {
  //  檢查結尾是否為 '/' 否則加上
  const lastCharIsSlash = url[url.length - 1] === '/'
  return lastCharIsSlash ? `${url}?` : `${url}/?`
}

const urlWithQuery = ({ baseUrl, query }) => {
  return query.reduce((sum, el, index, arr) => {
    const isFirstItem = index === 0
    const { column, value } = el
    const queryStr = `${column}=${value}`
    return isFirstItem ? `${sum}${queryStr}` : `${sum}&${queryStr}`
  }, formatBaseUrl(baseUrl))
}

const itHomeApi = () => {
  const query = [
    { column: 'tab', value: 'hot' },
    { column: 'page', value: 1 },
  ]
  const baseUrl = 'https://ithelp.ithome.com.tw/'
  const url = urlWithQuery({ baseUrl, query })
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

      const tags = []
      $(elem).find('.qa-list__tags > .tag').each((i, tag) => {
        const tagStr = $(tag).text()
        tags.push(tagStr)
      })

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

const apiData = {
  itHome: itHomeApi(),
}

module.exports = { apiData }
