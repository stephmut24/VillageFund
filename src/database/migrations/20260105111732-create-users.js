'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      globalRole: {
        type: Sequelize.ENUM('USER', 'SUPER_ADMIN'),
        allowNull: false,
        defaultValue: 'USER',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_globalRole";'
    )
  
  }
};
