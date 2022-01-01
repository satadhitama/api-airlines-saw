const mongoose = require('mongoose')
const config = require('../../Config')

// create mongodb connection
function createClient() {
  // ${config.mongo.uri}/${config.mongo.dbName}
  return mongoose.connect(`${config.database.mongodb.uri}`, {
    user: config.database.mongodb.username,
    pass: config.database.mongodb.password,
    // authSource: config.database.mongodb.authSource,
  })
}

// close mongodb connection
function closeClient() {
  return mongoose.disconnect()
}

module.exports = {
  createClient,
  closeClient
}