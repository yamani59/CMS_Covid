const app = require('express').Router()
const control = require('../controller')

app.route('/v1/auth/login')
  .post(control.login)

module.exports = app