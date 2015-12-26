var nconf = require('nconf');
var path = require('path');

nconf
  .argv()
  .env()
  .file(path.join(__dirname, 'config.json'));

module.exports = nconf;