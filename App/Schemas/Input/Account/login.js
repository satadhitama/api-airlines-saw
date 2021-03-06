const joi = require('joi')

module.exports = login = joi.object({
  header: joi.object().unknown(),
  body: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }).required(),
  query: joi.object().unknown(),
})