'use strict';
module.exports = function(sequelize, DataTypes) {
  var Service = sequelize.define('Service', {
   name: {
     type: DataTypes.STRING,
     allowNull: false,
   },

  })
  Service.associate= function(models) {
    Service.hasMany(models.Vendor, {
      foreignKey: 'serviceId'
    })
  };
  sequelize.sync();
  return Service;
};