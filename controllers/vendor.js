/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */

const Authenticator = require('../middlewares/authenticator');
const Vendor = require('../services/dbs/vendor')

/**
 * Controller for Vendors
 */
class VendorController {
    /**
     * Method to set the various document routes
     * @param{Object} req - Server req
     * @return{Object} return req parameters
     */
  static postreq(req) {
    return (
        req.body &&
        req.body.username &&
        req.body.password &&
        req.body.surname &&
        req.body.LGA &&
        req.body.state &&
        req.body.name &&
        req.body.phone
    );
  }

  /**
   * Method used to create new vendor
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
  static async createVendor (req, res) {
    try{
      if (VendorController.postreq(req)) {
        const vendor = await Vendor.get(req.body.username);
        if(vendor){
          return res.status(400).send({
            success: false,
            message: 'username already exist',
          });  
        }
        const newVendor = await Vendor.create(req.body);
        return res.status(201).send({
          success: true,
          message: 'Vendor successfully signed up',
          token: Authenticator.generateToken(newVendor)
        })
      }
      return res.status(400).send({
        success: false,
        message: 'You did not input your field properly',
      });
    }
    catch(error){
      console.log(error)
      return res.send({
        success: false,
        message: error.errors[0].message
      });
    }
  }

 /**
   * Method used to login a vendor
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
 static async loginVendor(req, res) {
   const vendor = await Vendor.get(req.body.username);
   if (vendor && vendor.passwordMatched(req.body.password)) {
    const token = Authenticator.generateToken(vendor);
      res.status(200).send({
        message: 'login successfully',
        token,
      });
    } else {
      res.send({
        success: false,
        message: 'Invalid Credentials'
      });
    }
  }

 /**
   * Method used to get a vendor by id
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
  static async getVendor(req, res) {
    const vendor = await Vendor.get(req.params.id);
    if (vendor) {
       res.status(200).send({
         success: true,
         vendor,
       });
     } else {
       res.send({
         success: false,
         message: `No vendor with username ${username}`
       });
     }
  }

    /**
   * Method used to edit vendor information
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
  static async editVendor(req, res) {
    const user = req.decoded;
    if((user.userId !== req.params.id) && (user.role !== "admin")){
      res.status(403).send({
        success: false,
        message: "You are not allowed to view this endpoint"
      })
    }
    const vendor = await Vendor.get(req.params.id);
    if (vendor) {
       const updatedVendor = await Vendor.update(req.params.id, req.body);
       res.status(201).send({
         success: true,
         vendor: updatedVendor 
       })
     } else {
       res.send({
         success: false,
         message: `vendor not found`
       });
     }
  }

   /**
   * Method used to delete a vendor by id
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
  static async deleteVendor(req, res) {
    const vendor = await Vendor.get(req.params.id);
    if (vendor) {
       await Vendor.delete(req.params.id)
       res.status(200).send({
         success: true,
         message: "Vendor has been successfully deleted",
       });
     } else {
       res.send({
         success: false,
         message: `No vendor with username ${username}`
       });
     }
  }
 }

module.exports = VendorController