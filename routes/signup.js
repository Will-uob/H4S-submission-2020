const express = require('express');
const router = express.Router();

const checkAuthenticated = require('../middleware/auth');

router.get('/', (req, res) => {
  if (checkAuthenticated(req, res)) {
    res.redirect('/');
  } else {
    res.render('signup', {
      name: null
    });
  }
})

const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  User.findOne().byUsername(req.body.username).exec((err, users) => {
    if (users) {
      req.flash('error', 'Username taken');
      res.redirect('/signup');
    } else {
      const user = new User({
        username: req.body.username,
        password: hashedPassword
      })

      user.save((err, newUser) => {
        if (err) {
          req.flash('error', 'Error creating account');
          res.redirect('/signup');
        } else {
          res.redirect('/login');
        }
      })
    }
  })
});

module.exports = router;