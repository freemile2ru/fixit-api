/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */

const Authenticator = require('../middlewares/authenticator');
const User = require('../services/dbs/user')

/**
 * Controller for Users
 */
class UserController {
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
        req.body.name &&
        req.body.surname &&
        req.body.LGA &&
        req.body.state
    );
  }

  /**
   * Method used to create new user
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
  static async createUser (req, res) {
    try{
      if (UserController.postreq(req)) {
        const user = await User.get(req.body.username);
        if(user){
          return res.status(400).send({
            success: false,
            message: 'Username already exist',
          });  
        }
        const newUser = await User.create(req.body);
        return res.status(201).send({
          success: true,
          message: 'User successfully signed up',
          token: Authenticator.generateToken(newUser)
        })
      }
      return res.status(400).send({
        success: false,
        message: 'You did not input your field properly',
      });
    }
    catch(error){
      console.log(error.errors[0].message)
      return res.send({
        success: false,
        message: error.errors[0].message
      });
    }
  }

 /**
   * Method used to login a user
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
 static async loginUser(req, res) {
   const user = await User.get(req.body.username);
   if (user && user.passwordMatched(req.body.password)) {
    const token = Authenticator.generateToken(user);
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
   * Method used to get a user by id
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
  static async getUser(req, res) {
    const user = await User.get(req.params.id);
    if (user) {
       res.status(200).send({
         success: true,
         user,
       });
     } else {
       res.send({
         success: false,
         message: `No user with username ${username}`
       });
     }
  }

    /**
   * Method used to edit user information
   * @param{Object} req - Server req
   * @param{Object} res - Server res
   * @returns{Void} return Void
   */
  static async editUser(req, res) {
    const user = req.decoded;
    if((user.userId !== req.params.id) && (user.role !== "admin")){
      res.status(403).send({
        success: false,
        message: "You are not allowed to view this endpoint"
      })
    }
    const user = await User.get(req.params.id);
    if (user) {
       const updatedUser = await User.update(req.params.id, req.body);
       res.status(201).send({
         success: true,
         user: updatedUser 
       })
     } else {
       res.send({
         success: false,
         message: `user not found`
       });
     }
  }
}

module.exports = UserController