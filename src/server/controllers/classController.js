const { Class } = require("../models/models")

class ClassController {

    async create(req, res) {
        const {name, img} = req.body
        const clas = await Class.create({name, img})
        return res.json(clas)
    }

    async getAll(req, res) {
        const clases = await Class.findAll()
        return res.json(clases)
    }
}

module.exports = new ClassController()