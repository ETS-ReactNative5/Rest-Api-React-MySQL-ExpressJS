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
            attributes: ['team_name'],
            raw: true,
            include: [{
                model: models.results,
                as: "homeTeam",
            }]
        })
        const awayResults = await Team.findAll({
            where: { id: req.params.id },
            attributes: ['team_name'],
            raw: true,
            include: [{
                model: models.results,
                as: "awayTeam",
            }]
        })
        const allTeamNames = await Team.findAll({attributes:["team_name", "id"]})

        const teamPlayers = await Team.findAll({
            where: { id: req.params.id },
            attributes: ['team_name'],
            raw: true,
            include: [{
                model: models.players,
                as: "players"
            }]
        })
        const awayResultHostId = awayResults.map(teamId=>teamId['awayTeam.host_id'])
        const homeResultGuestId = homeResults.map(teamId=>teamId['homeTeam.guest_id'])
        const hostTeamName = allTeamNames.filter(team=> awayResultHostId.includes(team.id))
        const guestTeamName = allTeamNames.filter(team=> homeResultGuestId.includes(team.id))

        return res.send({ homeResults, awayResults, teamPlayers, hostTeamName, guestTeamName })
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