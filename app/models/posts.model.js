'use strict';


const mongoose = require('mongoose'),
  ObjectId = mongoose.Schema.Types.ObjectId,
  Schema = mongoose.Schema;

const post = new Schema({
  title: {
    type: String,
    trim: true
  },
  text: {
    type: String
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

post.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id.toString();
    return ret;
  }
});

module.exports = mongoose.model('Post', post);
