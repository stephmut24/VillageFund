'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('avecs', [
      {
        name: 'AVEC Pending',
        ownerId: 2, // user1
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'AVEC Active',
        ownerId: 3, // user2
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('avecs', {});
  },
};
