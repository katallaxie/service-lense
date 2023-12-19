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

    const lensId = crypto.randomUUID()
    await queryInterface.bulkInsert('lenses', [
      {
        id: lensId,
        name: 'Web Application Security Lens',
        version: 1,
        description: 'This is an initial demo lens',
        isDraft: false,
        spec: '{"version":1,"name":"SAP Lens","description":"SAP Lens","pillars":[{"id":"operational_excellence","name":"Operational Excellence","description":"Operational Excellence","questions":[{"id":"question_1","name":"Question 1","description":"Question 1","choices":[{"id":"choice_1","name":"Choice 1","description":"Choice 1"}],"risks":[{"risk":"HIGH","condition":"default"}]}]}]}'
      },
      {
        id: crypto.randomUUID(),
        name: 'SAP Workload',
        version: 1,
        description: 'This is an initial demo lens',
        isDraft: true,
        spec: '{"version":1,"name":"SAP Lens","description":"SAP Lens","pillars":[{"id":"operational_excellence","name":"Operational Excellence","description":"Operational Excellence","questions":[{"id":"question_1","name":"Question 1","description":"Question 1","choices":[{"id":"choice_1","name":"Choice 1","description":"Choice 1"}],"risks":[{"risk":"HIGH","condition":"default"}]}]}]}'
      }
    ])

    await queryInterface.bulkInsert('environments', [
      {
        name: 'production',
        description: 'Production environment'
      },
      {
        name: 'staging',
        description: 'Staging environment'
      },
      {
        name: 'development',
        description: 'Development environment'
      }
    ])

    const workloadId = crypto.randomUUID()
    await queryInterface.bulkInsert('workloads', [
      {
        id: workloadId,
        name: 'SAP Workload',
        description: 'SAP Workload',
        profilesId: profileId
      }
    ])

    await queryInterface.bulkInsert('workloads-environment', [
      {
        workloadId: workloadId,
        environmentId: 1
      }
    ])

    await queryInterface.bulkInsert('workloads-lenses', [
      {
        lensId: lensId,
        workloadId: workloadId
      }
    ])

    const solutionId = crypto.randomUUID()
    await queryInterface.bulkInsert('solutions', [
      {
        id: solutionId,
        title: 'Example Solution',
        body: 'Example Solution'
      }
    ])

    await queryInterface.bulkInsert('solutions-comments', [
      {
        body: 'This is a new comment',
        solutionId
      }
    ])

    await queryInterface.bulkInsert('solutions-templates', [
      {
        title: 'Architecture Decision Record',
        description: 'Writing architectural decision records.',
        body: `# Decision record template by Michael Nygard

This is the template in [Documenting architecture decisions - Michael Nygard](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions).
You can use [adr-tools](https://github.com/npryce/adr-tools) for managing the ADR files.
 
In each ADR file, write these sections:
        
# Title
        
## Status
        
What is the status, such as proposed, accepted, rejected, deprecated, superseded, etc.?
        
## Context
        
What is the issue that we're seeing that is motivating this decision or change?
        
## Decision
        
What is the change that we're proposing and/or doing?
        
## Consequences
        
What becomes easier or more difficult to do because of this change?`
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('workloads', null, {})
    await queryInterface.bulkDelete('profiles', null, {})
    await queryInterface.bulkDelete('lenses', null, {})
  }
}
