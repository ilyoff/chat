var nconf = require('nconf');
var path = require('path');

var config = {
  "port": 8000,
  "static_dir": path.relative(process.cwd(), '../client/build/app'),
  "mongoose": {
    "uri": "mongodb://localhost/chat",
    "options": {
      "server": {
        "socketOptions": {
          "keepAlive": 1
        }
      }
    },
  }
}

nconf
  .argv()
  .env()
  .defaults(config);

module.exports = nconf;