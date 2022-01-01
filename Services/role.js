const repository = require('../Repository')

async function getById(id) {
  const roleObj = await repository.role.getById(id)
  return roleObj
}

async function getRole(id) {
  const role = await repository.role.getRole(id)
  return role
}

async function getByUserId(userId) {
  const roleObj = await repository.role.getByUserId(userId)
  return roleObj
}

module.exports = {
  getById,
  getRole,
  getByUserId,
}