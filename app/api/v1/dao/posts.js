'use strict';

const userModel = require('./../../../models/user.js');
const postsModel = require('./../../../models/posts.model.js');
const errorHelper = require('./../../../utils/errorHelper');
const passportUtil = require('./../../../utils/passport');

module.exports.create = (data) => {
  return postsModel.create(data)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw errorHelper.serverError(err);
    });
};
