const express = require('express')

const middleware = require('../App/Middlewares') // Middleware
const schema = require('../App/Schemas') // Schema
const handler = require('../App/Handlers') // Handler

const router = express.Router()

router.get(
  '/',
  handler.account.user.getUser
)

router.post(
  '/register',
  middleware.validation.schema(schema.account.register),
  middleware.verification.isEmailExist,
  handler.account.user.register
)

router.post(
  '/login',
  middleware.validation.schema(schema.account.login),
  handler.account.user.login
)

router.post(
  '/logout',
  handler.account.user.logout
)

module.exports = router