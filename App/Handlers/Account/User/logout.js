const service = require('../../../../Services')
const helper = require('../../../../Helpers')

module.exports = async function register(req, res) {
  try {
    const sessionId = req.headers['session-id']
    await service.session.destroy(sessionId)
    return res.status(200).json({
      statusCode: 200,
      status: "OK",
      message: "Account successfully logout"
    })
  } catch(error) {
    console.log(error)
    return res.status(400).json({
      statusCode: 400,
      status: "Conflict",
      message: "Failed to logout account"
    }) 
  }
}