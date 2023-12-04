'use strict'

const crypto = require('crypto')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const profileId = crypto.randomUUID()
    await queryInterface.bulkInsert('profiles', [
      {
        id: profileId,
        name: 'demo',
        description: 'This is an initial demo workload'
      }
    ])

    const answerId = crypto.randomUUID()
    await queryInterface.bulkInsert('profile-question-answer', [
      {
        id: answerId,
        name: 'demo',
        description: 'This is an initial demo answer'
      }
    ])

    const questionId = crypto.randomUUID()
    await queryInterface.bulkInsert('profile-question', [
      {
        id: questionId,
        name: 'demo',
        description: 'This is an initial demo question'
      }
    ])

    await queryInterface.bulkInsert('profile-question-answers', [
      {
        id: crypto.randomUUID(),
        questionId,
        answerId
      }
    ])

    await queryInterface.bulkInsert('profile-questions', [
      {
        id: crypto.randomUUID(),
        questionId: questionId,
        profileId: profileId
      }
    ])

    await queryInterface.bulkInsert('workloads', [
      {
        id: crypto.randomUUID(),
        name: 'demo',
        description: 'This is an initial demo profile',
        profilesId: profileId
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

    await queryInterface.bulkInsert('environments', [
      {
        id: crypto.randomUUID(),
        name: 'production',
        description: 'Production environment'
      },
      {
        id: crypto.randomUUID(),
        name: 'staging',
        description: 'Staging environment'
      },
      {
        id: crypto.randomUUID(),
        name: 'development',
        description: 'Development environment'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('workloads', null, {})
    await queryInterface.bulkDelete('profiles', null, {})
    await queryInterface.bulkDelete('lenses', null, {})
  }
}
