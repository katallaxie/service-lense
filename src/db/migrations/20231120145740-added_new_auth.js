'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('verification_token', {
      identifier: {
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true
      },
      expires: {
        type: 'TIMESTAMPTZ',
        allowNull: false
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true
      }
    })

    await queryInterface.createTable('accounts', {
      id: {
        type: 'SERIAL',
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: false
      },
      providerAccountId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      refresh_token: {
        type: Sequelize.TEXT
      },
      access_token: {
        type: Sequelize.TEXT
      },
      expires_at: {
        type: Sequelize.BIGINT
      },
      id_token: {
        type: Sequelize.TEXT
      },
      scope: {
        type: Sequelize.TEXT
      },
      session_state: {
        type: Sequelize.TEXT
      },
      token_type: {
        type: Sequelize.TEXT
      }
    })    

    await queryInterface.createTable('sessions', {
      id: {
        type: 'SERIAL',
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      expires: {
        type: 'TIMESTAMPTZ',
        allowNull: false
      },
      sessionToken: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })

    await queryInterface.createTable('users', {
      id: {
        type: 'SERIAL',
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      emailVerified: {
        type: 'TIMESTAMPTZ'
      },
      image: {
        type: Sequelize.TEXT
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('verification_token')
    await queryInterface.dropTable('accounts')
    await queryInterface.dropTable('sessions')
    await queryInterface.dropTable('users')
  }
}
