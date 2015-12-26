var express = require('express');
router = express.Router();
var users = require('../../models/user.js');


/* GET users listing. */
router.get('/users', function(req, res, next) {
  users.find({}, function (err, users) {
    if (err) {
      return console.log('Not found')
    };

    res.render('users', {
      users: users
    });

  })
});
 
router.get('/users/:id', function (req, res, next) {
  var userId = req.params.id;
  console.log(userId);
  users.findOne({_id: userId}, function (err, user) {
    if (err) {
      return console.log('Not found')
    };

    res.render('users', {
      users: [user]
    });

    
  })
});

module.exports = router;