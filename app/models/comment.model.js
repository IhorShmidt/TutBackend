const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new Schema({
  content: {
    type: String,
    trim: true,
    required: true,
    default: ''
  },
  author: {type: ObjectId, ref: 'user'},
  post: {type: ObjectId, ref: 'Post'},
  likes: {type: Number}
}, {
  timestamps: true
});

CommentSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    ret.id = ret._id.toString();
    return ret;
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
