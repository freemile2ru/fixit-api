const path = require('path');
const UsersRoute = require('./user');
const VendorsRoute = require('./vendor');

/**
 * IndexRoute contains all the routes for the api
 */
class IndexRoute {
/**
 * Index IndexRoute for catch all
 * @param{Object} app express app
 * @return{Void} return void
 */
  static Index(app) {
    app.all('*', (req, res) => {
      res.status(200)
        .send('welcome to comic app api');
    });
  }

/**
 * Users Route
 * @param{Object} app express app
 * @return{Void} return void
 */
  static Users(app) {
    app.use('/api/users', UsersRoute);
  }

/**
 * Vendors Route
 * @param{Object} app express app
 * @return{Void} return void
 */
  static Vendors(app) {
    app.use('/api/vendors', VendorsRoute);
  }

}
module.exports = IndexRoute;