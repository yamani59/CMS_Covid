require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const PORT = process.env.port || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('common'))

//controller (ROUTER)
const route = require('./router')
app.use(route)

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})