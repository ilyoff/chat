var express = require('express');
var router = express.Router();
var messages = require('../models/message.js');

router.get('/messages', function (req, res, next) {
    messages
      .find({}, { limit: 10 })
      .populate('recipients')
      .exec(function (err, messages) {
        if (err) {
          return next(err);
        }

        res.json(messages);
      });

  }
);

module.exports = router;