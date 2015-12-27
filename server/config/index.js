var nconf = require('nconf');
var configFile = require('./config.js');

nconf
  .argv()
  .env()
  .defaults(configFile);

module.exports = nconf;