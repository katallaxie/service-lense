'use strict'

const crypto = require('crypto')
const profilesId = crypto.randomUUID()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('profiles', [
      {
        id: profilesId,
        name: 'demo',
        description: 'This is an initial demo workload'
      }
    ])
    await queryInterface.bulkInsert('workloads', [
      {
        id: crypto.randomUUID(),
        name: 'demo',
        description: 'This is an initial demo profile',
        profilesId
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('workloads', null, {})
    await queryInterface.bulkDelete('profiles', null, {})
  }
}
