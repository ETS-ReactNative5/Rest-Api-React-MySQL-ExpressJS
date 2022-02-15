'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      host_id: {
        type: Sequelize.INTEGER, allowNull: false,
        validate: {
          notNull: { msg: "You need to provide host_id !" }
        },
        references: { model: "teams", key: "id" }
      },
      guest_id: {
        type: Sequelize.INTEGER, allowNull: false,
        validate: {
          notNull: { msg: "You need to provide guest_id !" }
        },
        references: { model: "teams", key: "id" }
      },
      home_goals: {
        type: Sequelize.INTEGER, allowNull: false,
        validate: {
          min: 0,
          notContains: ".",
          len: [0, 2],
          notNull: { msg: "You need to provide home_goals !" }
        }
      },
      away_goals: {
        type: Sequelize.INTEGER(2, 0), allowNull: false,
        validate: {
          min: 0,
          notContains: ".",
          len: [0, 2],
          notNull: { msg: "You need to provide away_goals !" }
        }
      },
      date: {
        type: Sequelize.DATEONLY, allowNull: false,
        validate: {
          notNull: { msg: "You need to provide date !" }
        }
      },
      venue: { type: Sequelize.STRING, allowNull: false },
    }),
    {
      timestamps: false,
      freezeTableName: true,
      validate: {
        hostGuest() {
          if (this.host_id === this.guest_id) {
            throw new Error("One team cannot play against itself !")
          }
        }
      }
    }

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('results');
  }
};