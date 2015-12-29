var path = require('path');

module.exports = function genarateAvatar() {
  var randomText = '';
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < 11; i++) {
      randomText += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return path.join('https://robohash.org', randomText, '?set=set2');
};