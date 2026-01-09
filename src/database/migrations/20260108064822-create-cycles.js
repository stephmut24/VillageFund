'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cycles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
      },
      avecId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'avecs',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      sharePrice: {
        type: Sequelize.DECIMAL(10, 2),
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
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      loanMultiplier: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3,
      },
      socialContributionAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Ajouter des index
    await queryInterface.addIndex('cycles', ['avecId']);
    await queryInterface.addIndex('cycles', ['startDate', 'endDate']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cycles');
  }
};