'use strict';

const express = require('express');
const router = express.Router();
const daoPost = require('./../dao/posts.dao');
const errorHelper = require('./../../../utils/errorHelper');
const passportMiddleware = require('./../middlewares/passport.midleware');

router.param('post_id',(req, res, next, id) => {
  return daoPost.findOne(id)
    .then((post) => {
      req.post = post;
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

router.get('/', (req, res, next) => {
  return daoPost.getAll()
    .then((post) => res.json(post))
    .catch((err) => next(err));
});

router.get('/:author', (req, res, next) => {
   console.log(req.params.author);
  return daoPost.getAllPosts({author:req.params.author})
    .then((post) => res.json(post))
    .catch((err) => next(err));
});

router.put('/:post_id', passportMiddleware.checkAuthToken, (req, res, next) => {
  if (!req.post) return next(errorHelper.forbidden());
    return daoPost.modify({body: req.body, post: req.post})
    .then((post) => res.json(post))
    .catch((err) => next(err));
});

router.delete('/post_id', passportMiddleware.checkAuthToken, (req, res, next) => {
  if (!req.post) return next(errorHelper.forbidden());
  return daoPost.remove({user: req.user, postId: req.post.id})
    .then((post) => res.json(post))
    .catch((err) => next(err));
});


module.exports = router;
