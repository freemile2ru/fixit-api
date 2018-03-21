const  express = require('express');
const  UserController = require('../controllers/user');
const  Authenticator = require('../middlewares/authenticator');
const router = express.Router();

router.route('/login')
  .post(UserController.loginUser)

router.route('/signup')
  .post(UserController.createUser)

router.route('/:id')
  .get(Authenticator.authenticateUser, UserController.getUser)
  .put(Authenticator.authenticateUser, UserController.editUser)

module.exports = router