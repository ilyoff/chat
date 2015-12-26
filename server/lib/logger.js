var winston = require('winston');

var logger = new (winston.Logger)({
  console: {},
  transports: [
    new (winston.transports.Console)({
      colorize: true
    }),
    new (winston.transports.File)({ filename: './logs/app.log' })
  ]
});

module.exports = logger;