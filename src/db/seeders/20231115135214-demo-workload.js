'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Workloads', [
      {
        name: 'demo',
        description: 'This is an initial demo workload',
        environment: 'development'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Workloads', null, {})
  }
}
