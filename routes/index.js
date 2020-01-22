const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

// routes for users/* requests
router.use('/users', require('./users_routes'));
router.use('/posts', require('./posts_routes'));

module.exports = router;