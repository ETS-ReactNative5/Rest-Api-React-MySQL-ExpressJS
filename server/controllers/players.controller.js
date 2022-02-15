const models = require('../models')
const Players = models.players

exports.getPlayers = async (req, res) => {
    try {
        const players = await Players.findAll({
            include: [{
                model: models.teams,
                as: "teams",
                attributes: ["team_name", "deletedAt"],
                paranoid: false
            }]
        })
        const teamExists = players.filter(player => (player.teams.deletedAt === null))
        const paranoid = players.filter(player => (player.teams.deletedAt !== null))
        return res.send({ teamExists, paranoid, players })
    } catch (error) {
        return res.send(error)
    }
}


exports.getPlayerById = async (req, res) => {
    try {
        const player = await Players.findByPk(req.params.id)
        res.send(player)
    } catch (error) {
        return res.send(error)
    }
}


exports.createPlayer = async (req, res) => {
    try {
        await Players.findAll({
            include: [{
                model: models.teams,
                as: "teams",
            }]
        })
        await Players.create(req.body)
        return res.send(req.body)
    } catch (error) {
        return res.send(error)
    }
}


exports.updatePlayer = async (req, res) => {
    try {
        const player = await Players.findByPk(req.params.id)
        await player.update(req.body)
        return res.json(req.body)
    } catch (error) {
        return res.send(error)
    }
}


exports.deletePlayer = async (req, res) => {
    const { id } = req.params
    try {
        await Players.destroy({ where: { id: id } })
        return res.send(` Successfuly deletet player with id: ${id} !`)
    } catch (error) {
        return res.send(error)
    }
}