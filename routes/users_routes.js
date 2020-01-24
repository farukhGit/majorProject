const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');



router.get('/user_home', passport.checkAuthentication, usersController.userHome);
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.post('/create', usersController.create);
router.post('/createSession', passport.authenticate('local', {
    failureRedirect : '/'
}), usersController.createSession);
router.get('/logout', usersController.destroySession);
module.exports = router;