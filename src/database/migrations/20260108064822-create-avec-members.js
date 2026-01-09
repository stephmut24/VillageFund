'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('avec_members', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      role: {
        type: Sequelize.ENUM('PRESIDENT', 'TREASURER', 'MEMBER'),
        allowNull: false,
        defaultValue: 'MEMBER',
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

    // Ajouter des index composés pour éviter les doublons et améliorer les performances
    await queryInterface.addIndex('avec_members', ['userId', 'avecId'], {
      unique: true,
      name: 'unique_user_avec'
    });
    
    await queryInterface.addIndex('avec_members', ['userId']);
    await queryInterface.addIndex('avec_members', ['avecId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('avec_members');
  }
};
