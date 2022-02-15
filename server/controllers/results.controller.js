const models = require("../models")
const Results = models.results

exports.getResults = async (req, res) => {
    try {
        const host = await Results.findAll({
            raw: true,
            include: [{
                model: models.teams,
                as: "host",
                attributes: ["team_name"]
            }]
        })
        const guest = await Results.findAll({
            raw: true,
            include: [{
                model: models.teams,
                as: "guest",
                attributes: ["team_name"]
            }]
        })

        const teamName = [...host, ...guest]
        const output = Object.values(teamName.reduce((accu, { id, ...rest }) => {
            if (!accu[id]) accu[id] = {};
            accu[id] = { id, ...accu[id], ...rest };
            return accu;
        }, {}));   
        return res.send(output)
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