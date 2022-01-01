const uuid = require('uuid')

const model = require('../Datastore/Mongo/Model')
const helper = require('../Helpers')

async function create(data, role) {
  // Check roles
  const roles = ['admin', 'user']
  if (!roles.includes(role)) throw new Error('Role is not available at the moment')
  const id = uuid.v4()
  const dateTimeNow =  new Date(helper.datetime.now())
  // Create role for new user
  let newRole = await require('./role').create(role)
  const roleId = newRole.id
  // Preparing data
  const userData = {
    id,
    ...data,
    roleId,
    createdAt: dateTimeNow,
    updatedAt: dateTimeNow,
  }
  return model.user.create(userData) // Insert data
}

function getUserByEmail(email) {
  return model.user.findOne({ email })
} 

function getUserById(id) {
  return model.user.findOne({ id })
} 

async function getAllSubUserById(id) {
  const user = await model.user.findOne({id})
  return user.subUser
}

module.exports = {
  getUserByEmail,
  getUserById,
  getAllSubUserById,
  create,
}