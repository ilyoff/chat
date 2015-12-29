var _ = require('lodash');
var messages = require('../models/message.js');
var session = require('../middleware/session.js');
var connectedUsers = {all: []};

function updateUsersList(socket) {
  socket.broadcast.emit('users:updateList', connectedUsers.all);
  socket.emit('users:updateList', connectedUsers.all);
};

function getMessages (query, cb) {
  messages
    .find(query)
    .sort({$natural: -1})
    .limit(10)
    .populate('author recipients')
    .exec(cb);
};


module.exports = function (server) {
  var io = require('socket.io')(server)

  io.use(function (socket, next) {
    session(socket.request, socket.request.res, next);
  });

  io.on('connection', function (socket) {

    var userId = socket.request.session.user;

    var query = {};
    if (userId) {
      query = {$or: [
        {isPrivate: true,
          author: userId,
        },
        {isPrivate: true,
        recipients: userId},
        {isPrivate: false}
      ]};
    } else {
      query = {isPrivate: false}
      socket.emit('users:updateList', connectedUsers.all);
    }

    getMessages(query, function (err, messages) {
      socket.emit('messages:update', messages.reverse());
    });
    
    socket.on('users:join', function (user) {
      console.log(connectedUsers);
      if (user.email in connectedUsers) {
        return updateUsersList(socket);
      }

      console.log('user join');
      connectedUsers.all.push(user);
      connectedUsers[user.email] = socket;
      updateUsersList(socket);
    });

    socket.on('users:left', function (user) {
      delete connectedUsers[user.email];
      connectedUsers.all = _.remove(connectedUsers, function (item) {
        return user.email === item.email;
      });

      updateUsersList(socket);
    });

    socket.on('messages:new', function (data, cb) {
      var message = new messages(data);
      message.status = 'recieved';
      message.save(function (err, data) {
        if (err) {
          console.log(err);
        };

        messages.populate(data, {path: 'author recipients'}, function (err, data) {
          socket.broadcast.emit('messages:update', data);
          cb(data);
        });

        
      });
    });

    socket.on('messages:new:private', function (data, cb) {
      var message = new messages(data);
      message.status = 'recieved';

      message.save(function (err, data) {

        messages.populate(data, {path: 'author recipients'}, function (err, data) {
          for (user in message.recipients) {
            if (user.email in connectedUsers) {
              connectedUsers[user.email].emit('messages:update', data);
            }
          }
          cb(data);
        });
        
      });
    });



  });
};