'use strict';

const express = require('express');
const router = express.Router();
const daoPost = require('./../dao/posts');
const dtoUser = require('./../dto/user');
const errorHelper = require('./../../../utils/errorHelper');
const passportMiddleware = require('./../middlewares/passport');
const userMiddleware = require('./../middlewares/user');

router.post('/', (req, res, next) => {
	return daoPost.create(req.body).then((post) => {
		return res.json(post);
	}).catch((err) => {
		return next(err);
	})
})

module.exports = router;