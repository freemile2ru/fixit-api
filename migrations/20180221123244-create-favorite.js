'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      vendorId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Favorites');
  }
};