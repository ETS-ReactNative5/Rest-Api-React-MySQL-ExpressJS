const express = require('express')
const Standings = require('../controllers/standings.controller')
const router = express.Router()

router.get("/", Standings.getStandings)

module.exports = router