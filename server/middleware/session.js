var config = require('../config');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('../lib/db.js');
var sessionConfig = config.get('session');

sessionConfig.store = new MongoStore({
  mongooseConnection: mongoose.connection
});


module.exports = session(sessionConfig);