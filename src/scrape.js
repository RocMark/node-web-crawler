const request = require('request')
const cheerio = require('cheerio')

// 下關鍵字 & 迴圈去讀內容

request('https://ithelp.ithome.com.tw/', (err, res, html) => {
  const requestSuccess = !err && res.statusCode === 200
  if (requestSuccess) {
    // console.log(html)

    const $ = cheerio.load(html)

    const post = $('.qa-list')
    const viewCount = $('.qa-condition__count')

    // console.log(post.html())
    console.log(viewCount.html())
  }
})
