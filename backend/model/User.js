const connection = require('./config')
const sanitzeHtml = require('sanitize-html')

const table = 'user'
const failed = 'cannot be proceed'

module.exports = {
  //Insert User (Post)
  insertUser: (data) => {
    const formData = {}
    for (const key in data) {
      formData[key] = sanitzeHtml(data[key])
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
        SELECT * FROM ??
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



  /* 
      CRUD for token
  */

  // insert token to access_token
  insertToken: (data) => {
    const fiels = {
      user_id: data.user_id,
      acces_token: data.acces_token,
      ip_adress: data.ip_adress
    }
    return new Promise((resolved, reject) => {
      connection.query(
        `
        INSERT INTO ?? SET ?
        `,['access_token', fiels], function (err, rows) {
          if (err) reject(err)
          resolved()
        }
      )
    })
  },

  // delete token (logout)
  deleteToken: (param) => {
    return new Promise((resolved, reject) => {
      connection.query(
        `
        DELETE FROM ?? WHERE ?? = ?
        `, ['access_token', 'acces_token', param], function (err, rows) {
          if (err) reject(err)
          resolved()
        }
      )
    })
  },

  // get token by id
  getToken: (column, param) => {
    return new Promise((resolved, reject) => {
      connection.query(
        `
        SELECT * FROM ?? WHERE ?? = ?
        `, ['access_token', column, param], function (err, rows) {
          if (err) reject(err)
          resolved(rows)
        }
      )
    })
  }
}