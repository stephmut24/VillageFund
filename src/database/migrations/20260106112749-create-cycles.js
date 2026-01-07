'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cycles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      avecId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'avecs',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      sharePrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      minShares: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      maxShares: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },

      interestRate: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      loanMultiplier: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3,
      },

      socialContributionAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cycles');
  },
};
