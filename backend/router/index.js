const app = require('express').Router()
const control = require('../controller')

app.route('/v1/auth/login')
  .post(control.login)

app.route('/v1/auth/logout')
  .post(control.logout)

app.route('/v1/')
  .get(control.news)

module.exports = app