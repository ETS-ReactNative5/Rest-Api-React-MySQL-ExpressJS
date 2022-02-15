const models = require('../models')
const Team = models.teams

exports.getTeamsParanoid = async (req, res) => {
    try {
        const teams = await Team.findAll({ paranoid: false })
        return res.send(teams)
    } catch (error) {
        return res.send(error)
    }
}

exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.findAll()
        return res.send(teams)
    } catch (error) {
        return res.send(error)
    }
}

exports.getTeamById = async (req, res) => {
    try {
        const homeResults = await Team.findAll({
            where: { id: req.params.id },
            attributes: [],
            raw: true,
            include: [{
                model: models.results,
                as: "homeTeam",
            }]
        })
        const awayResults = await Team.findAll({
            where: { id: req.params.id },
            attributes: [],
            raw: true,
            include: [{
                model: models.results,
                as: "awayTeam",
            }]
        })
        const teamPlayers = await Team.findAll({
            where: { id: req.params.id },
            attributes: ['team_name'],
            raw: true,
            include: [{
                model: models.players,
                as: "players"
            }]
        })
        return res.send({ homeResults, awayResults, teamPlayers })
    } catch (error) {
        return res.send(error)
    }
}


exports.createTeam = async (req, res) => {
    try {
        await Team.create(req.body)
        return res.send(req.body)
    } catch (error) {
        return res.send(error)
    }
}


exports.updateTeam = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id)
        await team.update(req.body)
        return res.send(req.body)
    } catch (error) {
        return res.send(error)
    }
}


exports.deleteTeam = async (req, res) => {
    const { id } = req.params
    try {
        Team.destroy({ where: { id: id } })
        return res.send(`Delete team with id: ${id} !`)
    } catch (error) {
        return res.send(error)
    }
}