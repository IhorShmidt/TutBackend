const mongoose = require('mongoose');
const passportUtil = require('./../utils/passport');

const Schema = mongoose.Schema;
/**
 * @apiDefine user User access only
 * This optional description belong to to the group user.
 */
const user = new Schema({
  firstName: {type: String, trim: true, default: ''},
  lastName: {type: String, trim: true, default: ''},
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true,
    default: ''
  },
  password: {type: String, default: ''},
  role: {type: Number, default: 0}
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
  collection: 'users',
  _id: true
});

user.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id.toString();
        return ret;
    }
});

user.path('password').set((value) => {
  return passportUtil.encryptPassword(value);
});

user.path('email').validate((value) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
  return emailRegex.test(value);
}, 'Please fill a valid email address');

module.exports = mongoose.model('User', user);
