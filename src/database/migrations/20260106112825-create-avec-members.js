'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('avec_members', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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

      role: {
        type: Sequelize.ENUM('PRESIDENT', 'TREASURER', 'MEMBER'),
        allowNull: false,
        defaultValue: 'MEMBER',
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
    await queryInterface.dropTable('avec_members');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_avec_members_role";',
    );
  },
};
