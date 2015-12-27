var express = require('express');
var router = express.Router();
var path = require('path')
var users = require(path.join(process.cwd(), '/models/user.js'));

router.post('/users/signup', function (req, res) {
  var user = new users(req.body)

  user.save(function (err, user) {
    if (err) {
      return res.json({
        success: false,
        message: 'Sign up error! ' + err
      });
    }

    res.json({success: true, user: user});
  });
});

router.post('/users/login', function (req, res) {
  var user = req.body;

  users.findOne({email: user.email}, function (err, user) {
    if (err) {
      return res.json({
        success: false,
        message: 'Login error!!! ' + err
      });
    }

    if (!user) {
      res.json({
        success: false, 
        message: 'No such user!'
      });
    }

    res.json({success: true, user: user});
  });
});

router.post('/users/edit', function (req, res) {
  var user = req.body;

  users.update({email: user.email}, user, function (err, user) {
    if (err) {
      return res.json({err: 'Edit login error!!! ' + err});
    }

    res.json({success: true, user: user});
  });
})

module.exports = router;