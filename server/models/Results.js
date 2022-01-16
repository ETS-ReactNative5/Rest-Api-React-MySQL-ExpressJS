const result = (sequelize, DataTypes) => {
    const Result = sequelize.define('results', {
        host_id: {
            type: DataTypes.INTEGER, allowNull: false,
            validate: {
                notNull: { msg: "You need to provide host_id !" }
            },
            references: { model: "teams", key: "id" }
        },
        guest_id: {
            type: DataTypes.INTEGER, allowNull: false,
            validate: {
                notNull: { msg: "You need to provide guest_id !" }
            },
            references: { model: "teams", key: "id" }
        },
        home_goals: {
            type: DataTypes.INTEGER, allowNull: false,
            validate: {
                min: 0,
                notContains: ".",
                len: [0, 2],
                notNull: { msg: "You need to provide home_goals !" }
            }
        },
        away_goals: {
            type: DataTypes.INTEGER(2, 0), allowNull: false,
            validate: {
                min: 0,
                notContains: ".",
                len: [0, 2],
                notNull: { msg: "You need to provide away_goals !" }
            }
        },
        date: {
            type: DataTypes.DATEONLY, allowNull: false,
            validate: {
                notNull: { msg: "You need to provide date !" }
            }
        },
        venue: { type: DataTypes.STRING, allowNull: false },
    },
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
    )
    Result.associate = models => {
        Result.belongsTo(models.teams, {
            as: "teams",
            foreignKey: "host_id",
            foreignKey: "guest_id",
            sourceKey: "id"
        })
    }
    Result.sync()
    return Result
}
module.exports = result