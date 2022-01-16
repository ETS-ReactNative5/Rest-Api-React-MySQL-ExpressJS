const models = require("../models")
const Results = models.results

exports.getResults = async (req, res) => {
    try {
        const results = await Results.findAll()
        return res.send(results)
    } catch (error) {
        return res.send(error)
    }
}


exports.getResultById = async (req, res) => {
    try {
        const result = await Results.findByPk(req.params.id);
        res.send(result)
    } catch (error) {
        return res.send(error)
    }
}

exports.createResult = async (req, res) => {
    try {
        await Results.findAll({
            include: [{
                model: models.teams,
                as: "teams",
            }]
        })
        await Results.create(req.body)
        return res.send(req.body)
    } catch (error) {
        return res.send(error)
    }
}


exports.updateResult = async (req, res) => {
    try {
        const result = await Results.findByPk(req.params.id)
        await result.update(req.body)
        return res.json(req.body);
    } catch (error) {
        return res.send(error)
    }
}


exports.deleteResult = async (req, res) => {
    const { id } = req.params
    try {
        await Results.destroy({ where: { id: id } })
        res.send(`Deleted result with id: ${id} ! `)
    } catch (error) {
        return res.send(error)
    }
}