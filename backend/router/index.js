const app = require('express').Router()
const control = require('../controller')

app.post('/v1/auth/login', control.login)
app.post('/v1/auth/logout', control.logout)

// news
app.post('/v1/news/new', control.newNews)
app.delete('/v1/news/:id', control.deleteNews)
app.get('/v1/news', control.getNews)
app.put('/v1/news/:id', control.updateBerita)

// category
app.get('/v1/category', control.getCategory)
app.delete('/v1/category/:id', control.deleteCategory)
app.post('/v1/category/new', control.insertCategory)
app.put('/v1/category/:id', control.updateCategory)

// admin
app.get('/v1/admin', control.getAdmin)
app.delete('/v1/admin/:id', control.deleteAdmin)
app.post('/v1/admin/new', control.insertAdmin)
app.put('/v1/admin/:id', control.updateAdmin)

// // slides
// app.get('/v1/slide', control.getSlide)
// app.delete('/v1/slide/:id', control.deleteSlide)
// app.put('/v1/slide/:id', control.updateSlide)
// app.post('/v1/slide/new', control.insertSlide)

module.exports = app