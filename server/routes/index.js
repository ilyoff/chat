var express = require('express');
var router = express.Router();
var config = require('../config');
var path = require('path');
var STATIC_PATH = config.get('static_dir');
var messages = require('./messages');
var users = require('users');
router.get('/', function(req, res, next) {
  res.sendfile('index.html', { root: STATIC_PATH });
});

router.get(messages);
router.use(users);

module.exports = router;
