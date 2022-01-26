const connection = require('./config')
const sanitzeHtml = require('sanitize-html')

const table = 'news'
const failed = 'cannot be proceed'

module.exports = {
  // for insert news
  insertNews: (data) => {
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

  // for get news
  getNews: () => {
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

  // for get news by (search)
  getNewsBy: (param) => {
    return new Promise((resolved, reject) => {
      connection.query(
        `
        SELECT * FROM ?? WHERE
          ?? LIKE ? OR
          ?? LIKE ?
        `, [table, 'title', param, 'category', param],
        function(err, rows) {
          if (err) reject(err)
          resolved(rows)
        }
      )
    })
  },

  // for update news
  updateNews: (data) => {
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

  // for delete news
  deleteNews: (param) => {
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

  // for insert category
  insertCategory: (data) => {
    const formData = {}
    for (const key in data) {
      formData[key] = sanitzeHtml(data[key])
    }
    return new Promise((resolved, reject) => {
      connection.query(
        `
        INSERT INTO ?? SET ?  
        `,[table, formData], function (err, rows) {
          if (err) reject(err)
          resolved()
        }
      )
    })
  },

  // for delete category
  deleteCategory: (param) => {
    return new Promise((resolved, reject) => {
      connection.query(
        `
        DELETE FORM ?? WHERE ?? = ?
        `, [table, 'id', param], function (err, rows) {
          if (err) reject(err)
          resolved
        }
      )
    })
  },

  // for get category
  getCategory: () => {
    return new Promise((resolved, reject) => {
      connection.query(
        `
        SELECT * FROM ??
        `, [table], function (err, rows) {
          if (err) reject(err)
          resolved(rows)
        }
      )
    })
  }
}