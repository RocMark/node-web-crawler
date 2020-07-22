const { initFile, resetFile } = require('./file')
const { fetchApis } = require('./apis/apis')
const { triggerTime } = require('./config')

const process = () => {
  fetchApis({ apiName: 'itHome' })
  // fetchApis({ apiName: 'itHome' })
}

initFile()
// process()
// setInterval(process, triggerTime)
