'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('workloads', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      environment: {
        type: Sequelize.STRING
      },
      profilesId: {
        type: Sequelize.UUID,
        references: {
          model: 'profiles',
          key: 'id'
        },
        allowNull: true,
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

    await queryInterface.addColumn('workloads', 'lensesId', {
      type: Sequelize.UUID,
      references: {
        model: 'lenses',
        key: 'id'
      },
      allowNull: true,
      onDelete: 'CASCADE'
    })

    await queryInterface.addColumn('workloads', 'environmentsId', {
      type: Sequelize.UUID,
      references: {
        model: 'environments',
        key: 'id'
      },
      allowNull: true,
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('workload-lens-pillars-answers')
    await queryInterface.dropTable('workloads')
  }
}
