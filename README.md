# NodeJS WebCrawler

## Install

```
npm i
```

## command

```
// 執行定時爬蟲 => 寫入 db.json
npm run serve

// 啟動 JSON-Server
npm run server
```

## 新增網站
- 流程
  1. 前往 apiData.js => 撰寫新網站的設定
    - 參數 : url | query | template
    - template 需自行撰寫所需要的資訊  ( 使用 cheerio )
  2. 前往 main.js => 在 process Function 中啟用

```js
const itHomeApi = () => {
  const baseUrl = 'https://ithelp.ithome.com.tw/'
  const query = [ { column: 'page', value: 1 }, ]
  const url = urlWithQuery({ baseUrl, query })
  const template = (html) => {
    const $ = cheerio.load(html)
    const rawData = []
    $('.dom').each((index, elem) => {
      rawData.push(result)
    })
    return rawData
  }
  return { url, template, }
}

const apiData = {
  itHome: itHomeApi(),
}
```

```js
const process = () => {
  fetchApis({ apiName: 'itHome' })
}
```
