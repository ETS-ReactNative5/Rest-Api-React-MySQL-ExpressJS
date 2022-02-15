const models = require('../models')
const Teams = models.teams


exports.getAllTeamsPlayers = async (req, res) => {
    try {
        const team_players = await Teams.findAll({
            raw: true,
            attributes: ['team_name', 'id'],
            include: [{
                model: models.players,
                as: "players",
            }],
        })
        return res.send(team_players)
    } catch (error) {
        return res.send(error)
    }
}

exports.getTeamPlayersById = async (req, res) => {
    try {
        const team_players = await Teams.findAll({
            where: { id: req.params.id },
            raw: true,
            include: [{
                model: models.players,
                as: "players",
            }],
        })
        return res.send(team_players)
    } catch (error) {
        return res.send(error)
    }
}

