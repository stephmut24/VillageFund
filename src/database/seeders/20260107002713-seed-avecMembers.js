'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('avec_members', [
      {
        userId: 2, // user1
        avecId: 1, // AVEC Pending
        role: 'PRESIDENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3, // user2
        avecId: 2, // AVEC Active
        role: 'PRESIDENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('avec_members', {});
  },
};
