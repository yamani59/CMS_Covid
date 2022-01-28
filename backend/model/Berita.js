const connection = require('./config')
const sanitzeHtml = require('sanitize-html')
const formidable = require('formidable')
const fs = require('fs')
const crypto = require('crypto');
const path = require('path')

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



  /*
      Crud query for category table
  */

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
        `,['category', formData], function (err, rows) {
          if (err) reject(err)
          resolved()
        }
      )
    })
  },

  // for update data category
  updateCategory: (data) => {
    const formData = {}
    for (const key in data) {
      formData[key] = sanitzeHtml(data[key])
    }
    return new Promise((resolved, reject) => {
      connection.query(
        `
        UPDATE ?? SET ? WHERE ?? = ?
        `, ['category', formData, 'id', param], function (err, rows) {
          if (err) reject(err)
          resolved(rows)
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
        `, ['category', 'id', param], function (err, rows) {
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
        `, ['category'], function (err, rows) {
          if (err) reject(err)
          resolved(rows)
        }
      )
    })
  },



  /*
      Crud for slide table
  */

  // insert slide
  insertSlide: (data) => {
    return new Promise((resolved, reject) => {
      const form = new formidable.IncomingForm()
      const newName = crypto.randomBytes(15).toString('hex')

      form.parse(data, (err, fields, files) => {
        if (err) reject(err)

        const oldPath = files.filetoupload.filepath
        if (!path.extname(oldPath) === ".jpg")
          reject(new Error('failed to save image'))

        const newPath = __dirname + "/images/" + newName + ".jpg"
        const formData = {
          title: data.body.title,
          description: data.body.description,
          link: data.body.link,
          image: newName + ".jpg"
        }

        connection.query(
          `
          INSERT INTO ?? SET ?
          `, ['slide', formData], function (err, rows) {
            if (err) reject(err)
          }
        )

        fs.copyFile(oldPath, newPath, (err) => {
          if (err) reject(err)
          resolved()
        })
      })
    })
  }
}