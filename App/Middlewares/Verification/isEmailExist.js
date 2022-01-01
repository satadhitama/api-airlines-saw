const service = require('../../../Services')

module.exports = isEmailExist = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await service.user.getUserByEmail(email)
    if (user !== null) {
      throw new Error("Email has alsready been taken!")
    } else next()
  } catch(error) {
    console.log(error)
    return res.status(409).json({
      statusCode: 409,
      status: 'Conflict',
      message: error.message
    }) 
  }
}
