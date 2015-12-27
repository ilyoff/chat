var express = require('express');
var router = express.Router();
var config = require('../config');
var path = require('path');
var STATIC_PATH = config.get('static_dir');

router.get('/', function(req, res, next) {
  res.sendfile('index.html', { root: STATIC_PATH });
});

module.exports = router;
