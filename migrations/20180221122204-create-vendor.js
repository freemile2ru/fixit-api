'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Vendors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      state:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      LGA:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false
      },
      image:{
        type: Sequelize.STRING
      },
      surname:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Vendors');
  }
};