require('dotenv').config({ path: '../' })

const ip = require('ip')
const jwt = require('jsonwebtoken')
const { User } = require('../model')

module.exports = {
  // for validasi form user
  validasi: (req, res, next) => {
    const { username, password } = req.body
    if (!username && !password)
      res.status(422).json({ msg: 'cannot be procced' }).end()
    
    next()
  },

  // for authorization API
  authorizationCheck: (req, res, next) => {
    const tokenWithBearer = req.headers.authorizatioin
    if (!tokenWithBearer) res.status(401).json({ msg: 'unauthorization be procced' }).end()
    const token = tokenWithBearer.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
      if (err) res.status(401).json({ msg: 'unauthorization user' }).end()
      req.auth = decoded
      next()
    })
  },

  // for authentication 
  authentication: (req, res, next) => {
    const { username, password } = req.body
    User.getUserBy('username', username)
      .then(resolved => {
        const token = jwt.sign({username}, procced.env.TOKEN_SECRET, { expiresIn: '1h' })
        const tokenInsert = {
          userId: resolved[0].id,
          token: token,
          id: ip.address()
        }

        User.insertToken(tokenInsert)
          .then(token => {
            next()
          }).catch(err => {
            res.status(401).json({ msg: 'unauthorization user' }).end()
          })
      })
  }
}