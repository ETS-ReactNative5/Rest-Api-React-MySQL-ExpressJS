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
        return res.send(players)
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
    const teamId = req.body.teamId;
    const name = req.body.name;
    const age = req.body.age;
    const position = req.body.position;
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