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
  authorization: (req, res, next) => {
    console.log(req.headers)
    const tokenWithBearer = req.headers.authorization
    if (!tokenWithBearer) res.status(401).json({ msg: 'unauthorization be procced' }).end()
    const token = tokenWithBearer.split(" ")[1]
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
      if (err) res.status(401).json({ msg: 'unauthorization user' }).end()
      req.auth = decoded
      req.token = token
      next()
    })
  },

  // for authentication 
  authentication: (req, res) => {
    const { username } = req.body
    User.getUserBy('username', username)
      .then(resolved => {
        const token = jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn: '1h' })
        const tokenInsert = {
          user_id: resolved[0].id,
          acces_token: token,
          ip_adress: ip.address()
        }

        User.insertToken(tokenInsert)
          .then(() => {
            res.status(200).json({
              msg: 'invalid authentication',
              token: token
            }).end()
          }).catch((err) => {
            console.log(err)
            res.status(401).json({ msg: 'unauthorization user' }).end()
          })
      })
  },

}