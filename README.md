# NodeJS WebCrawler

## 指令
- 安裝 node 10+ 版本
```
// 初始化 & 安裝專案
npm run init

// 執行定時爬蟲 => 寫入 db.json
npm run serve

// 啟動 JSON-Server
npm run server
```

## Todo
- 新增其他網站
- 迴圈抓取不同 page
- 待改用 OOP & jQuery 鍊式串接的寫法 (重構)

## 功能介紹
- nodeJS 計時器，定時抓取 [IT邦熱門討論區](https://bit.ly/2WLiiJt)
- 也可以調整參數，去抓取 最新 & 其他 page

## 新增網站
- 流程
  1. 前往 apiData.js => 撰寫新網站的設定
    - 參數 : url | query | template
    - template 需自行撰寫所需要的資訊  ( 使用 cheerio )
  2. 前往 main.js => 在 process Function 中啟用
- 其他參數
  - config.js    可以調整多久才去抓取一次資料
  - keywords.js  自行新增有興趣的關鍵字 (會判斷 tag & title 是否包含)

```js
// apiData.js
const itHomeApi = () => {
  const baseUrl = 'https://ithelp.ithome.com.tw/'
  const query = [ { column: 'page', value: 1 }, ]
  const url = urlWithQuery({ baseUrl, query })
  const template = (html) => {
    const $ = cheerio.load(html)
    const rawData = []
    $('.dom').each((index, elem) => {
      // 迴圈都會用到 each 方法，然後 push 到外層的 array
      // * 此處撰寫 cheerio 取得網頁上的資料並整理成物件
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
// main.js 主檔案加入 process 中
const process = () => {
  fetchApis({ apiName: 'itHome' })
}
```
