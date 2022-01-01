const repository = require('../Repository')

async function getUserByEmail(email) {
  let user = await repository.user.getUserByEmail(email)
  return user
}

async function getUserById(id) {
  let user = await repository.user.getUserById(id)
  return user
}

async function create(data, role) {
  let newData = await repository.user.create(data, role)
  return newData
}

async function getAllSubUserById(id) {
  let subUser = await repository.user.getAllSubUserById(id)
  return subUser
}

async function getRole(userId) {
  const user = await getUserById(userId)
  const roleId = await user.role
  if (parseInt(roleId) === 1) {
    return 'user'
  } 
  const role = await require('./role').getRole(roleId)
  return role
}

module.exports = {
  create,
  getUserByEmail,
  getUserById,
  getAllSubUserById,
  getRole,
}
