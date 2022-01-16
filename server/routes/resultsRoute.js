const express = require('express')
const Results = require('../controllers/results.controller')
const router = express.Router()

router.get("/", Results.getResults)
router.get('/:id', Results.getResultById)
router.post("/", Results.createResult)
router.patch('/:id', Results.updateResult)
router.delete("/:id", Results.deleteResult)
module.exports = router