const express = require('express')
const team = require('../controllers/teams.controller')
const router = express.Router()

router.get('/paranoid', team.getTeamsParanoid)
router.get('/', team.getTeams)
router.get('/:id', team.getTeamById)
router.post('/', team.createTeam)
router.patch('/:id', team.updateTeam)
router.delete('/:id', team.deleteTeam)
module.exports = router