require('dotenv').config()

const mysql = require('mysql2')
const conn = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
})

if (!conn) throw new Error('Connection Failed')

module.exports = conn