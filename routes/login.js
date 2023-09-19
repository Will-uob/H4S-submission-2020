const express = require('express');
const router = express.Router();

const checkAuthenticated = require('../middleware/auth');

router.get('/', (req, res) => {
  if (checkAuthenticated(req, res)) {
    res.redirect('/');
  } else {
    res.render('login', {
      name: null
    });
  }
})

const passport = require('passport');

router.post('/', passport.authenticate('local', {
  successRedirect: '/learn',
  failureRedirect: '/login',
  failureFlash: true
}))

module.exports = router;