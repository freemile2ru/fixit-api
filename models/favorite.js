'use strict';
module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define('Favorite', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })  
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    
    Favorite.hasOne(models.Vendor, {
      foreignKey: 'vendorId',
    })
  };
  sequelize.sync();
  return Favorite;
};