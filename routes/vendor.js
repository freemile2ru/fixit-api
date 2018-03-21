const  express = require('express');
const  VendorController = require('../controllers/vendor');
const  Authenticator = require('../middlewares/authenticator');
const  router = express.Router();

router.route('/login')
  .post(VendorController.loginVendor)

router.route('/signup')
  .post(VendorController.createVendor)

router.route('/:id')
  .get(Authenticator.authenticateUser, VendorController.getVendor)
  .put(Authenticator.authenticateUser, VendorController.editVendor)
  .delete(Authenticator.authenticateUser, VendorController.deleteVendor)

module.exports = router