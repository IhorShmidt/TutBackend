'use strict';

const express = require('express');
const router = express.Router();
const daoComment = require('./../dao/comment.dao');
const daoPost = require('./../dao/posts.dao');
const errorHelper = require('./../../../utils/errorHelper');
const passportMiddleware = require('./../middlewares/passport.midleware');

router.param('comment_id', (req, res, next, id) => {
  return daoComment.findOne(id)
    .then((comment) => {
      req.comment = comment;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
});

router.param('post_id', (req, res, next, id) => {
  return daoPost.findOne(id)
    .then((post) => {
      req.post = post;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
});

router.post('/:post_id', passportMiddleware.checkAuthToken, (req, res, next) => {
  if (!req.post || !req.body) return next(errorHelper.forbidden());
  return daoComment.create({content: req.body.content, author: res.locals.user.id, post: req.post.id})
    .then((comment) => res.json(comment))
    .catch((err) => next(err));
});

router.get('/:post_id', passportMiddleware.checkAuthToken, (req, res, next) => {
  if (!req.post) return next(errorHelper.forbidden());
  return daoComment.getAll(req.post)
    .then((comment) => res.json(comment))
    .catch((err) => next(err));
});

router.put('/:comment_id', passportMiddleware.checkAuthToken, (req, res, next) => {
  if (!req.comment) return next(errorHelper.forbidden());
  return daoComment.modify({body: req.body, comment: req.comment})
    .then((post) => res.json(post))
    .catch((err) => next(err));
});


module.exports = router;
