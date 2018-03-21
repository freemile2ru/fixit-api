const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET || 'thisisademosecret';
/**
 * Class to implement authentication middlewares
 */
class Authenticator {
  /**
   * Method to authenticate a user before proceeding
   * to protected routes
   * @param {Object} req - The req Object
   * @param {Object} res - The res Object
   * @param {Function} next - Function call to move to the next middleware
   * or endpoint controller
   * @return {Void} - Returns void
   */
  static authenticateUser(req, res, next) {
    const token = req.headers.authorization ||
      req.headers['x-access-token'] ||
      req.body.token;
    if (token) {
      jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
          res.status(401).send({
            status: 'Failed',
            message: 'Authentication failed due to invalid token!'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(401).json({
        status: 'Failed',
        message: 'Authentication required for this route'
      });
    }
  }

  /**
   * Method to generate a token for a user
   * @param{Object} user - User Object
   * @return{String} - Token string
   */
  static generateToken(user) {
    return jwt.sign({
      userId: user.id,
      username: user.username,
      name: user.name,
      surname: user.surname
    }, SECRET_KEY);
  }
}
module.exports = Authenticator;