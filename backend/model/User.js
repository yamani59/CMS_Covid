const connection = require('./config')
const sanitzeHtml = require('sanitize-html')

const table = 'user'
const failed = 'cannot be proceed'

module.exports = {
  //Insert User (Post)
  insertUser: (data) => {
    const formData = {}
    for (const key in req.body) {
      formData[key] = sanitzeHtml(req.body[key])
    }
    return new Promise((resolved, reject) => {
      connection.query(
        `
        INSERT INTO ?? SET ?
        `, [table, formData], function (err, rows) {
        if (err) reject(err)
        resolved()
      })
    })
  },

  //get User
  getUser: () => {
    return new Promise((resolved, reject) => {
      connection.query(
        `
        SELECT * FROM user
        `, [table], function(err, rows) {
          if (err) reject(err)
          resolved(rows)
        }
      )
    })
  },

  //get User by
  getUserBy: (column, value) => {
    return new Promise((resolved, reject) => {
      connection.query(
        `
        SELECT * FROM ?? WHERE ?? = ?
        `, [table, column, value], function (err, rows) {
          if (err) reject(err)
          resolved(rows)
        }
      )
    })
  },

  //update User
  updateUser: (data, param) => {
    const formData = {}
    for (const key in data) {
      formData[key] = sanitzeHtml(data[key])
    }
    return new Promise((resolved, reject) => {
      connection.query(
        `
        UPDATE ?? SET ? WHERE ?? = ?
        `, [table, formData, 'id', param], function (err, rows) {
          if (err) reject(err)
          resolved(rows)
        }
      )
    })
  },

  //delete User
  deleteUser: (param) => {
    return new Promise((resolved, reject) => {
      connection.query(
        `
        DELETE FROM ?? WHERE ?? = ?
        `, [table, 'id', param], function (err, rows) {
          if (err) reject(err)
          resolved()
        }
      )
    })
  },

  // insert token to access_token
  insertToken: (data) => {
    return new Promise((resolved, reject) => {
      connection.query(
        `
        INSERT INTO ?? SET ?
        `['access_token', data], function (err, rows) {
          if (err) reject(err)
          resolved()
        }
      )
    })
  }
}