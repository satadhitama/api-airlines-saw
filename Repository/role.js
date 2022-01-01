const bcrypt = require('bcrypt')
const uuid = require('uuid')

const model = require('../Datastore/Mongo/Model')
const helper = require('../Helpers')

async function create(role) {
  const  dateTimeNow = new Date(helper.datetime.now())
  const id = uuid.v4()
  const roleId = bcrypt.hashSync(role, 10)
  const data = {
    id,
    roleId,
    createdAt: dateTimeNow
  }
  return model.role.create(data)
}

async function getById(id) {
  return model.role.findOne({ id })
}

async function getRole(id) {
  const roleObj = await getById(id)
  const role = roleObj.role
  let type
  const roleTypes = ['user', 'admin']
  roleTypes.forEach((roleType) => {
    if (bcrypt.compareSync(roleType, role)) {
      type = roleType
    }
  })
  return type
}

async function getByUserId(userId) {
  const user = await require('./user').getUserById(userId)
  const roleId = await user.role
  let type = await etRole(roleId)
  return {
    userId,
    id: roleId,
    role: type,
    createdAt: role.createdAt
  }
}

module.exports = {
  create,
  getById,
  getRole,
  getByUserId,
}