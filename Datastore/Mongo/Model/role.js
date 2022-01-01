const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: {
    type:String,
    require: true,
    unique: true,
  },
  role: {
    type:String
  },
  createdAt: {
    type: Date,
    require: true
  },
})

module.exports = mongoose.model('Roles', schema, 'roles')