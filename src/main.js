const { resetFile, writePost } = require('./file')
const { itHomeCronJob } = require('./apis/apis')

const process = () => {
  itHomeCronJob()
}

const devMode = true

if (devMode) {
  resetFile()
  // process()
}

const startCronJob = true
if (startCronJob) {
  const min = 60 * 1000
  const triggerTime = 0.05 * min // 3sec
  setInterval(process, triggerTime)
}
