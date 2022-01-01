const service = require("../../../../Services")

module.exports = async function getUser(req, res) {
  try {
    const sessionId = req.headers["session-id"]
    const userId = await service.session.getUserIdById(sessionId)
    const user = await service.user.getUserById(userId)
    return res.status(200).json({
      statusCode: 200,
      status: "OK",
      result: {
        name: user.name,
        email: user.email,
        phone: user.phone
      },
      message: "Sucessfully returned user's data"
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      statusCode: 400,
      status: "Bad Request",
      message: "Failed to return User's Identity"
    })
  }

}