var path = require('path');

module.exports = {
  "port": 8000,
  "static_dir": path.relative(process.cwd(), '../client/build/app')
};