const express = require('express');
const router = express.Router();

const checkAuthenticated = require('../middleware/auth');

router.get('/', (req, res) => {
  res.render('index', {
    name: checkAuthenticated(req, res)
  });
})

module.exports = router;