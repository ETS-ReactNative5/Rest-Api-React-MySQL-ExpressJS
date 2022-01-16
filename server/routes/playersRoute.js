const express = require('express')
const Players = require('../controllers/players.controller')
const router = express.Router()

router.get('/', Players.getPlayers)
router.get('/:id', Players.getPlayerById)
router.post('/', Players.createPlayer)
router.delete('/:id', Players.deletePlayer)
router.patch('/:id', Players.updatePlayer)
module.exports = router