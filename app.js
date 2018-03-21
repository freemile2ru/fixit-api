require('dotenv').config();
const express =      require('express');
const path =         require('path');
const bodyParser =   require('body-parser');
      
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes.Users(app);
routes.Vendors(app);
routes.Index(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
