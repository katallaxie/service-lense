'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('workload-lens-pillar-answer', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
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

    await queryInterface.createTable('workload-lens-pillar-answers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
      answerId: {
        type: Sequelize.UUID,
        references: {
          model: 'workload-lens-pillar-answer',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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

    await queryInterface.createTable('workload-lens-pillar-answer-choices', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      answerId: {
        type: Sequelize.UUID,
        references: {
          model: 'workload-lens-pillar-answer',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      choiceId: {
        type: Sequelize.UUID,
        references: {
          model: 'lens-pillar-choice',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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

    await queryInterface.addColumn(
      'workload-lens-pillar-answer',
      'questionId',
      {
        type: Sequelize.UUID,
        references: {
          model: 'lens-pillar-question',
          key: 'id'
        },
        allowNull: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('workload-lens-pillar-answer-choices')
    await queryInterface.dropTable('workload-lens-pillar-answers')
    await queryInterface.dropTable('workload-lens-pillar-answer')
  }
}
