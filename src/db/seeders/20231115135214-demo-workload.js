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
    await queryInterface.bulkInsert('lenses', [
      {
        id: crypto.randomUUID(),
        name: 'demo',
        description: 'This is an initial demo lens',
        spec: '{"version":1,"name":"SAP Lens","description":"SAP Lens","pillars":[{"id":"operational_excellence","name":"Operational Excellence","description":"Operational Excellence","questions":[{"id":"question_1","name":"Question 1","description":"Question 1","choices":[{"id":"choice_1","name":"Choice 1","description":"Choice 1"}],"risks":[{"risk":"HIGH","condition":"default"}]}]}]}'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('workloads', null, {})
    await queryInterface.bulkDelete('profiles', null, {})
    await queryInterface.bulkDelete('lenses', null, {})
  }
}
