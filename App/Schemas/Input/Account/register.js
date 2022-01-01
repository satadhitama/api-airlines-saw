const joi = require('joi')

module.exports = register = joi.object({
  header: joi.object().unknown(),
  body: joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().trim().required(),
    password: joi.string().min(8).required(),
    passwordConfirmation: joi.any().valid(joi.ref('password')).required(),
    phone: joi.string().min(8).max(15).required(),
  }).required(),
  query: joi.object().unknown(),
})
