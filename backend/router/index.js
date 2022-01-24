const app = require('express').Router()
const { User } = require('../model')

app.route('/v1/auth/login')
  .post(User.insertUser)

module.exports = app