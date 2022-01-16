const express = require('express')
const team_players = require('../controllers/teamPlayers.controller')
const router = express.Router()

router.get('/', team_players.getAllTeamsPlayers)
router.get('/:id', team_players.getTeamPlayersById)
module.exports = router