'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('Password123', 10);

    await queryInterface.bulkInsert('users', [
      {
        fullName: 'Admin Super',
        email: 'superdmin@example.com',
        password: passwordHash,
        globalRole: 'SUPER_ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: 'User One',
        email: 'step@example.com',
        password: passwordHash,
        globalRole: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: 'User Two',
        email: 'jac@example.com',
        password: passwordHash,
        globalRole: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {});
  },
};
