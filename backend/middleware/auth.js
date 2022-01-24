const jwt = require('jsonwebtoken')

module.exports = {
  validasi: (req, res, next) => {
    const {
      username,
      email = null,
      password,
      role = null,
      nomor_phone = null
    } = req.body
  }
}