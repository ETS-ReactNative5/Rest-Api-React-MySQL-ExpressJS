const player = (sequelize, DataTypes) => {
    const Player = sequelize.define('players', {
        teamId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "teams", key: "id" } },
        name: {
            type: DataTypes.STRING(), allowNull: false, unique: true,
            validate: {
                len: [3, 20],
                notNull: { msg: "You need to provide player's name !" }
            }
        },
        position: {
            type: DataTypes.STRING(), allowNull: false,
            validate: {
                len: [2, 15],
                notNull: { msg: "You need to provide position for the player !" }
            }
        },
        age: {
            type: DataTypes.INTEGER, allowNull: false,
            validate: {
                min: 15, max: 45,
                notNull: { msg: "You need to provide age for the player !" },

            }
        },
    },
        {
            timestamps: false,
            freezeTableName: true
        }
    )
    Player.associate = models => {
        Player.belongsTo(models.teams, {
            as: "teams",
            foreignKey: 'teamId',
            targetKey: "id",
        })
    }
    Player.sync()
    return Player
}
module.exports = player