const dotenv = require('dotenv');

dotenv.config();
const configuration = {
  production:{
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    log: false
  },
  development: {
    url: process.env.DEV_DBURL,
    dialect: 'postgres',
    log: false
  }
};

module.exports = configuration[process.env.NODE_ENV || 'development'];