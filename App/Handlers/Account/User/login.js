const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const service = require('../../../../Services')
const config = require('../../../../Config')

module.exports = async function login(req, res) {
  try {
    let { email } = req.body
    let user = await service.user.getUserByEmail(email)
  
    if (user === null) return res.status(401).json({
      statusCode: 401,
      status: 'Unauthorized',
      message: "Invalid username, please try again!"
    })
  
    let userId = user.id
    let password = user.password
  
    if (user && bcrypt.compareSync(req.body.password, password)) {
      const token = jwt.sign({ userId }, config.jwt.secretToken)
      return res.status(200).json({
        statusCode: 200,
        status: 'OK',
        result: { token },
        message: 'Successfully login to the server'
        })
    } else {
      return res.status(401).json({
        statusCode: 401,
        status: 'Unauthorized',
        message: "Invalid Password please try again!"
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      statusCode:400,
      status:'Bad Request',
      message: error.message
    })
  }
}