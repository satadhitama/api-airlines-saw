const service = require('../../../../Services')

module.exports = admin = async (req, res, next) => {
  try {
    const sessionId = req.headers['session-id']
    const userId = await service.session.getUserIdById(sessionId)

    const role = await service.user.getRole(userId)
    if (role !== 'admin') {
      throw new Error("Access denied! Please log in as Admin")
    } else next()
  } catch(error) {
    console.log(error)
    return res.status(401).json({
      statusCode: 401,
      status: "Unauthorized",
      message: error.message
    }) 
  }
}
