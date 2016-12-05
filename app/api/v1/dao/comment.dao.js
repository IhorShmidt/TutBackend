'use strict';

// const userModel = require('./../../../models/user.js');
// const postsModel = require('./../../../models/posts.model.js');
const errorHelper = require('./../../../utils/errorHelper');
const passportUtil = require('./../../../utils/passport');
const postsModel = require('./../../../models/posts.model');
const commentModel = require('./../../../models/comment.model');
const _ = require('lodash');

module.exports.create = (data) => {
  const comment = new commentModel();
  _.assign(comment, data);
  return comment.save()
    .catch((err) => {
      throw errorHelper.serverError(err);
    });
};

module.exports.findOne = (id) => {
  return commentModel.findById(id)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw errorHelper.serverError(err);
    });
};

module.exports.modify = (data) => {
  _.assign(data.comment, data.body);
  return data.comment.save()
    .catch((err) => {
      throw errorHelper.serverError(err);
    });
};

module.exports.getAll = (post) => {
  return commentModel.find({
    post: post.id
  })
  .catch((err) => {
    throw errorHelper.serverError(err);
  });
};

module.exports.remove = (data) => {
  let promise = [];

  commentModel.find({
    author: data.user.id,
    post: data.id
  }).then((result) => {
    _.each(result, item => promsie.push(item.remove()));
    return Promise.all(promise).then((result) => result)
      .catch((err) => {
        throw errorHelper.serverError(err)
      });
  })
};
