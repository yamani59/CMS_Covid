const { User } = require('../model')
const { auth } = require('../middleware')


module.exports = {
  login: [auth.validasi, auth.authentication]
}