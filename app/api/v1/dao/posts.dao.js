'use strict';

const userModel = require('./../../../models/user.js');
// const postsModel = require('./../../../models/posts.model.js');
const errorHelper = require('./../../../utils/errorHelper');
const passportUtil = require('./../../../utils/passport');
const postsModel = require('./../../../models/posts.model');
const commentModel = require('./../../../models/comment.model');
const _ = require('lodash');

module.exports.create = (data) => {

  const post = new postsModel();
  _.assign(post, data, data.body);
  return post.save()
  .catch((err) => {
    throw errorHelper.serverError(err);
  });
};

module.exports.findOne = (id) => {
  return postsModel.findById(id)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw errorHelper.serverError(err);
    });
};

module.exports.modify = (data) => {
  _.assign(data.post, data.body);
  return data.post.save()
    .catch((err) => {
      throw errorHelper.serverError(err);
    });
};

module.exports.getAll = () => {
  return postsModel.find().catch((err) => {
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
      .catch((err) => {throw errorHelper.serverError(err)});
  })
};
