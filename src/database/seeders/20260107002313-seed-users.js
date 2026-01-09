'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // ← IMPORTANT: Ajouter cette dépendance

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('Password123', 10);

    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(), // ← UUID explicite
        fullName: 'Admin Super',
        email: 'superadmin@example.com', // ← Correction: superadmin (pas superdmin)
        password: passwordHash,
        globalRole: 'SUPER_ADMIN',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(), 
        fullName: 'User One',
        email: 'step@example.com',
        password: passwordHash,
        globalRole: 'USER',
        isActive: true, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(), 
        fullName: 'User Two',
        email: 'jac@example.com',
        password: passwordHash,
        globalRole: 'USER',
        isActive: true, // ← Champ requis
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {});
  },
};