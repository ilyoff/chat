var mongoose = require('db');
var Schema = mongoose.Schema;

var schema = new Schema({
  author: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    required: true
  },

  recipients: {
    type: [Schema.ObjectId],
    ref: 'User'
  },

  private: {
    type: Boolean
  }
});


module.exports = mongoose.model('Message', schema);