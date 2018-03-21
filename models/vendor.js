'use strict';
const bcrypt = require('bcrypt');
module.exports = function(sequelize, DataTypes) {
  var Vendor = sequelize.define('Vendor', {
    username: { 
      type: DataTypes.STRING
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name field is empty'
        },
        is: {
          args: /^[a-z]+$/i,
          msg: 'name should contain only letters'
        }

      }
    },
    state:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'state field is empty'
        },
        is: {
          args: /^[a-z]+$/i,
          msg: 'state should contain only letters'
        }

      }
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    LGA:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'LGA field is empty'
        },
        is: {
          args: /^[a-z]+$/i,
          msg: 'LGA should contain only letters'
        }

      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING
    },
    surname:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'surname field is empty'
        },
        is: {
          args: /^[a-z]+$/i,
          msg: 'name should contain only letters'
        }

      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'regular'
    }
  },{
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
      beforeUpdate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  })  
  Vendor.associate = (models) => {
    Vendor.belongsTo(models.Favorite, {
      foreignKey: 'vendorId'
    });
    Vendor.belongsTo(models.Service, {
      foreignKey: 'serviceId'
    });
    Vendor.hasMany(models.Review, {
      foreignKey: 'vendorId'
    });
    Vendor.hasMany(models.Image, {
      foreignKey: 'vendorId'
    });
  };  
  Vendor.prototype.passwordMatched = function(password){
    return bcrypt.compareSync(password, this.password);
  };
  sequelize.sync();
  return Vendor;
};