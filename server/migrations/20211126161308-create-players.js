'use strict';
module.exports = {
  up: async (queryInterface, Sequelize,) => {
    await queryInterface.createTable('players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamId: { type: Sequelize.INTEGER, allowNull: false, references: { model: "teams", key: "id" } },
      name: {
        type: Sequelize.STRING, allowNull: false,
        validate: {
          len: [3, 20],
          notNull: { msg: "You need to provide player's name !" }
        }
      },
      position: {
        type: Sequelize.STRING(), allowNull: false,
        validate: {
          notNull: { msg: "You need to provide position for the player !" }
        }
      },
      age: {
        type: Sequelize.INTEGER, allowNull: false,
        validate: {
          min: 16, max: 45,
          notNull: { msg: "You need to provide age for the player !" }

        }
      },
    },
      {
        uniqueKeys: {
          Items_unique: {
            fields: ['name']
          }
        }
      }
    ),
    {
      timestamps: false,
      freezeTableName: true,
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('players');
  }
};