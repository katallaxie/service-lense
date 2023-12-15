'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('workload-lens-pillars-answers', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      workloadId: {
        type: Sequelize.UUID,
        references: {
          model: 'workloads',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      questionId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'lenses-pillars-questions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      notes: {
        type: Sequelize.STRING
      },
      doesNotApply: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      doesNotApplyReason: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })

    await queryInterface.createTable('workload-lens-pillar-choices', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      answerId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'workload-lens-pillars-answers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      choiceId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'lenses-pillars-choices',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('workload-lens-pillar-choices')
  }
}
