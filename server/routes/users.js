var express = require('express');
var router = express.Router();
var path = require('path')
var generateAvatar = require('generateAvatar');
var error = require('error');
var users = require('../models/user.js');

router.post('/users/signup', function (req, res) {
  var user = new users(req.body);
  user.avatar = generateAvatar();

  user.save(function (err, user) {
    if (err) {
      return error(res, 500, 'Signup error', err);
    }

    req.session.user = user._id;
    req.session.save();
    res.json({data: {success: true, user: user}});
  });
});

router.post('/users/login', function (req, res) {
  var user = req.body;

  users.findOne({email: user.email}, function (err, user) {
    if (err) {
      return error(res, 500, 'Login error!', err);
    }

    if (!user) {
      return error(res, 404, 'User doesn\'t exists!', err);
    }

    req.session.user = user._id;
    res.json({data: {success: true, user: user}});
  });
});

router.get('/users/session', function (req, res) {
  console.log('session', req.session.user);

  if (req.session.user) {
    users.findOne({ _id: req.session.user }).exec(function (err, data) {
      if (err) {
        return next(err);
      }


      res.json({data: {success: true, user: data}});
    });
  } else {
    res.json({data: {success: false}});
  }
});

router.post('/users/logout', function (req, res, next) {
  req.session.destroy();
  res.json({success: true});
});

module.exports = router;