const router = require('express').Router()

// define the home page route
router.get('/', function (req, res) {
  res.send('Course home page')
});

// Todo Add Swagger Docs

module.exports = router