'use strict';
module.exports = {
  up: async (queryInterface, Sequelize,) => {
    await queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      team_name: {
        type: Sequelize.STRING,
        allowNull: false,

        validate: {
          len: [3, 10],
          notNull: { msg: "You need to provide team name" }
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
    deletedAt: {
      type: Sequelize.DATE
  },
    },
      {
        uniqueKeys: {
          Items_unique: {
            fields: ['team_name']
          }
        }
      }
    ),
    {
      timestamps: true,
      freezeTableName: true,
      paranoid: true,
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Teams');
  }
};