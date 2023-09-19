const express = require('express');
const router = express.Router();

let User = require('../models/user.model');
const checkAuthenticated = require('../middleware/auth');

router.get('/', (req, res) => {
  let name = checkAuthenticated(req, res)
  if (name) {
    User.findOne().byUsername(name).then(user => {
      let moduleProgress = [];

      for (let data of Object.values(user.progress)) {
        if (data !== true) {
          moduleProgress.push(data.length);
        }
      }

      res.render('learn', {
        name,
        progress: moduleProgress
      });
    })
  } else {
    req.flash('info', 'Create an account to get started');
    res.redirect('/signup');
  }
})

router.get('/:module', (req, res) => {
  let name = checkAuthenticated(req, res);

  if (name) {
    User.findOne().byUsername(name).then(user => {
      res.render(`modules/${req.params.module}`, {
        layout: 'layouts/module.ejs',
        name,
        correctQuestions: user.progress[req.params.module],
      });
    })
  } else {
    req.flash('info', 'Login to view course content');
    res.redirect('/login');
  }
})

router.post('/:module', (req, res) => {
  let name = checkAuthenticated(req, res);

  if (name) {
    User.findOne().byUsername(name).then(user => {
      user.progress[req.params.module] = req.body.correctQuestions;
      user.save((err, user) => {
        res.status(200).end();
      });
    })
  }
})

module.exports = router;