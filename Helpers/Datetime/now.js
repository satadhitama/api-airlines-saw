const luxon = require('luxon')
const moment = require('moment-timezone')

module.exports = now = () => {
  return moment.tz(luxon.DateTime.now().toString(), "Asia/Jakarta")
}
