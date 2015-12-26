var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var pagesDir = path.join(__dirname, 'pages');

fs.readdir(pagesDir, function (err, routes) {
  routes.forEach(function(route){
    router.use(require(path.join(pagesDir, route)));
  });
});

module.exports = router;
