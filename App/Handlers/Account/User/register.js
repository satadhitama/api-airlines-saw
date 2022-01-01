const bcrypt = require('bcrypt')
const ph = require('libphonenumber-js')

const service = require('../../../../Services')
const helper = require('../../../../Helpers')

module.exports = async function register(req, res) {
  try {
    let userData = req.body 
    userData.password = bcrypt.hashSync(userData.password, 10)
  
    const convertedPhone = helper.converter.toInternationalPhone(userData.phone)
    userData.phone = ph.parsePhoneNumber(convertedPhone).formatInternational()

    let newUser = await service.user.create(userData, 'user')
    return res.status(201).json({
      statusCode: 201,
      status: 'Created',
      result: {
        userId: newUser.id,
      },
      message: "Successfully Created User"
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      statusCode:400,
      status:'Bad Request',
      message: error.message
    })
  }
  
}