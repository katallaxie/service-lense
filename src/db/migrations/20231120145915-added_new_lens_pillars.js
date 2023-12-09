'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lens-pillars', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      lensId: {
        type: Sequelize.UUID,
        references: {
          model: 'lenses',
          key: 'id'
        }
      },
      pillarId: {
        type: Sequelize.UUID,
        references: {
          model: 'lens-pillar',
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

    await queryInterface.addColumn('lenses', 'pillarId', {
      type: Sequelize.UUID,
      references: {
        model: 'lens-pillars',
        key: 'id'
      },
      allowNull: true,
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('lenses', 'lenses_pillarId_fkey', {})
    await queryInterface.dropTable('lens-pillars')
    await queryInterface.dropTable('lenses')
  }
}
