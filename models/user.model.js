const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  progress: {
    1: [Number],
    2: [Number],
    3: [Number],
    4: [Number],
    5: [Number],
    6: [Number],
  },
}, {
  timestamps: true
});

const escapeRegExp = string => string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');

userSchema.query.byUsername = function (username) {
  return this.where({
    username: new RegExp(`^${escapeRegExp(username)}$`, 'i')
  })
}

module.exports = mongoose.model('User', userSchema);