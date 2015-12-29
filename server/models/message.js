var mongoose = require('db');
var Schema = mongoose.Schema;

var schema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },

  text: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },

  recipients: {
    type: [Schema.ObjectId],
    ref: 'User'
  },

  isPrivate: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    default: 'recieved'
  }
});


module.exports = mongoose.model('Message', schema);