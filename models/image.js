'use strict';
module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })  
  Image.associate = function(models) {
    Image.belongsTo(models.Vendor, {
      foreignKey: 'vendorId',
    });
  };
  sequelize.sync();
  return Image;
};