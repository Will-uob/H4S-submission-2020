const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

let User = require('../models/user.model');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({
      usernameField: 'username'
    }, (username, password, done) => {
      User.findOne().byUsername(username).then(user => {
        if (!user) {
          return done(null, false, {
            message: 'Incorrect username or password'
          })
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return done(err);
          } else if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: 'Incorrect username or password'
            });
          }
        });
      })
    }));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));
}