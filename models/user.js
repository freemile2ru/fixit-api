'use strict';
const bcrypt = require('bcrypt');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
          msg: 'surname should contain only letters'
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
  User.associate = (models) => {
    User.hasMany(models.Favorite, {
      foreignKey: 'UserId'
    });
    User.hasMany(models.Review, {
      foreignKey: 'reviewerId',
      as: 'reviewerId'
    });
  };
  User.prototype.passwordMatched = function (password){
      return bcrypt.compareSync(password, this.password);
  };
  sequelize.sync();
  return User;
};