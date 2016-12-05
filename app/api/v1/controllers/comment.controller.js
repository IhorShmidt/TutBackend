'use strict';

const express = require('express');
const router = express.Router();
const daoComment = require('./../dao/comment.dao');
const errorHelper = require('./../../../utils/errorHelper');
const passportMiddleware = require('./../middlewares/passport.midleware');

router.param('comment_id',(req, res, next, id) => {
  return daoComment.findOne(id)
    .then((comment) => {
      req.comment = comment;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
});

router.post('/', passportMiddleware.checkAuthToken, (req, res, next) => {
  return daoPost.create({body: req.body, author: res.locals.user})
    .then((post) => res.json(post))
    .catch((err) => next(err));
});

router.get('/', passportMiddleware.checkAuthToken, (req, res, next) => {
  return daoPost.getAll()
    .then((post) => res.json(post))
    .catch((err) => next(err));
});

router.put('/:comment_id', passportMiddleware.checkAuthToken, (req, res, next) => {
  if (!req.post) return next(errorHelper.forbidden());
  return daoPost.modify({body: req.body, post: req.post})
    .then((post) => res.json(post))
    .catch((err) => next(err));
});


module.exports = router;
