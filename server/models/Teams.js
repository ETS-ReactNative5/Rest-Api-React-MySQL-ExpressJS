const team = (sequelize, DataTypes) => {
    const Team = sequelize.define(
        'teams', {
        team_name: {
            type: DataTypes.STRING(), allowNull: false, unique: true,
            validate: {
                len: [3, 20],
                notNull: { msg: "You need to provide team name" }
            }
        },
    },
        {
            timestamps: true,
            freezeTableName: true,
            deletedAt: 'deletedAt',
            paranoid: true,
        },
    )
    Team.associate = models => {
        Team.belongsTo(models.players, {
            foreignKey: "id",
            as: 'players',
            targetKey: "teamId"
        })
        Team.belongsTo(models.results, {
            as: "homeTeam",
            foreignKey: "id",
            targetKey: "host_id",
        })
        Team.belongsTo(models.results, {
            as: "awayTeam",
            foreignKey: "id",
            targetKey: "guest_id",
        })
    }
    Team.sync()
    return Team
}
module.exports = team


