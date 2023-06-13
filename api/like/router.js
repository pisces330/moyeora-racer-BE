const express = require('express');
const { loginRequired } = require('../../middlewares');
const likeController = require('./controller');
const { serviceHandler } = require('../../utils');

const router = express.Router();

router.get('/likes', loginRequired, serviceHandler(likeController.selectLike));
router.post('/likes', loginRequired, serviceHandler(likeController.setLike));
router.delete(
  '/likes',
  loginRequired,
  serviceHandler(likeController.deleteLike)
);

module.exports = router;
