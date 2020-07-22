const { initFile, resetFile } = require('./file')
const { fetchApis } = require('./apis/apis')
const { triggerTime } = require('./config')

const process = () => {
  // fetchApis({ apiName: 'itHome', overwriteUrl: 'https://ithelp.ithome.com.tw/?tab=hot&page=5' })
  fetchApis({ apiName: 'itHome' })
}

initFile()
// resetFile()
// process()
setInterval(process, triggerTime)
