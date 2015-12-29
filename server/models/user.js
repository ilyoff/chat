var crypto = require('crypto');
var mongoose = require('db');
var Schema = mongoose.Schema;
var path = require('path');

var schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },

  hashed_pass: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },

  avatar: {
    type: String
  }
});

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashed_pass = this.encryptPassword(password);
  })
  .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('User', schema);