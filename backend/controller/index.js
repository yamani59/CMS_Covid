const { User } = require('../model')
const { auth } = require('../middleware')
const jwt = require('jsonwebtoken')

module.exports = {
  login: [auth.validasi, auth.authentication, auth.authorization],
  logout: (req, res) => {
    jwt.destroy(req.token)
    User.deleteToken(req.token)
  }
}