const dayjs = require('dayjs')

const getFormatDate = (date) => {
  const formatData = dayjs().format('YYYY-MM-DD HH:mm:ss')
  return formatData
}

module.exports = { getFormatDate }
