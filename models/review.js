'use strict';
module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    reviewerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    star: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
    }
  }) 
  Review.associate = function(models) {
    Review.belongsTo(models.Vendor, {
      foreignKey: "vendorId"
    })
    Review.belongsTo(models.User, {
      foreignKey: "reviewerId",
    })
      // associations can be defined here
     
  };
  sequelize.sync();
  return Review;
};