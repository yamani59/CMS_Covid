const { User, Berita } = require('../model')
const { auth } = require('../middleware')
const jwt = require('jsonwebtoken')

module.exports = {
  login: [auth.validasi, auth.authentication, auth.authorization],
  logout: auth.logout,


  /* 
      News
  */
  newNews: [auth.authorization, (req, res) => {
    Berita.insertNews(req.body)
      .then(resolved => {
        res.status(200).json({ msg: 'new added successfully' }).end()
      }).catch((err) => {
        res.status(401).json({ msg: 'invalid authentication' }).end()
      })
  }],
  deleteNews: [auth.authorization, (req, res) => {
    const { id } = req.params
    res.json(req.params)
  }],
  getNews: [auth.authorization, (req, res) => {
    Berita.getNews()
      .then(resolved => {
        res.status(200).json(resolved).end()
      }).catch(() => res.status(401).json({ msg: 'invalid' }).end())
  }],
  updateBerita: [auth.authorization, (req, res) => {
    Berita.updateNews(req.body)
      .then(resolved => {
        res.status(200).json({ msg: 'news updated successfully' }).end()
      }).catch(() => res.status(401).json({ msg: 'cannot be proceed' }).end())
  }],


  /* 
      Category controller
  */
  getCategory: [auth.authorization, (req, res) => {
    Berita.getCategory()
      .then(resolved => {
        res.status(200).json(resolved).end()
      }).catch(() => {
        res.status(422).json({ msg: 'cannot be proced' }).end()
      })
  }],
  updateCategory: [auth.authorization, (req, res) => {
    Berita.updateCategory(req.body)
      .then(resolved => {
        res.status(200).json({ msg: 'category updated' }).end()
      }).catch(() => res.status(401).json({ msg: 'cannot be proceed' }).end())
  }],
  insertCategory: [auth.authorization, (req, res) => {
    Berita.insertCategory(req.body)
      .then(resolved => {
        res.status(200).json({ msg: 'category added successfully' }).end()
      }).catch(() => {
        res.status(401).json({ msg: 'cannot be proceed' }).end()
      })
  }],
  deleteCategory: [auth.authorization, (req, res) => {
    Berita.deleteCategory(req.param.id)
      .then(resolved => {
        res.status(200).json({ msg: 'category deleted successfully' }).end()
      }).catch(() => res.status(401).json({ msg: 'cannot be proceed' }).end())
  }],


  /* 
      Admin controller
  */
  getAdmin : [auth.authorization, (req, res) => {
    Berita.getCategory()
      .then(resolved => {
        res.status(200).json(resolved).end()
      }).catch(() => {
        res.status(422).json({ msg: 'cannot be proced' }).end()
      })
  }],
  updateAdmin: [auth.authorization, (req, res) => {
    User.updateUser(req.body, req.params.id)
      .then(resolved => {
        res.status(200).json({ msg: 'category updated' }).end()
      }).catch(() => res.status(401).json({ msg: 'cannot be proceed' }).end())
  }],
  insertAdmin: [auth.authorization, (req, res) => {
    User.insertUser(req.body)
      .then(resolved => {
        res.status(200).json({ msg: 'category added successfully' }).end()
      }).catch(() => {
        res.status(401).json({ msg: 'cannot be proceed' }).end()
      })
  }],
  deleteAdmin: [auth.authorization, (req, res) => {
    User.deleteUser(req.param.id)
      .then(resolved => {
        res.status(200).json({ msg: 'category deleted successfully' }).end()
      }).catch(() => res.status(401).json({ msg: 'cannot be proceed' }).end())
  }],

}