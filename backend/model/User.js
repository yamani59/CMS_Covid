const connection = require('./config')
const sanitzeHtml = require('sanitize-html')

const table = 'user'
const failed = 'cannot be proceed'

module.exports = {
  //Insert User (Post)
  insertUser: (req, res) => {
    const formData = {}
    for (const key in req.body) {
      formData[key] = sanitzeHtml(req.body[key])
    }
    connection.query(
      `
      INSERT INTO ?? SET ?
      `, [table, formData], function (err, rows) {
      if (err) res.status(422).json({ msg: failed }).end()
      res.status(200)
      res.json({
        msg: 'admin added successfully'
      })
      res.end()
    })
  },

  //get User
  getUser: (req, res) => {
    connection.query(
      `
      SELECT * FROM user
      `, [table], function(err, rows) {
        if (err) res.status(422).json({ msg: failed }).end()
        res.json(rows)
        res.status(200)
        res.end()
      }
    )
  },

  //get User by Id
  getUserById: (req, res) => {
    const param = req.params.id
    connection.query(
      `
      SELECT * FROM ?? WHERE ?? = ?
      `, [table, 'id', param], function (err, rows) {
        if (err) res.status(422).json({ msg: failed }).end()
        res.status(200).json(rows).end()
      }
    )
  },

  //update User
  updateUser: (req, res) => {
    const param = req.params.id
    const formData = {}
    for (const key in req.body) {
      formData[key] = sanitzeHtml(req.body[key])
    }
    connection.query(
      `
      UPDATE ?? SET ? WHERE ?? = ?
      `, [table, formData, 'id', param], function (err, rows) {
        if (err)  res.status(422).json({ msg: failed })
        res.status(200).json({
          msg: 'admin updated successfully'
        }).end()
      }
    )
  },

  //delete User
  deleteUser: (req, res) => {
    const param = req.params.id
    connection.query(
      `
      DELETE FROM ?? WHERE ?? = ?
      `, [table, 'id', param], function (err, rows) {
        if (err)  res.status(422).json({ msg: failed }).end()
        res.status(200).json({
          msg: 'admin deleted successfully'
        }).end()
      }
    )
  }
}