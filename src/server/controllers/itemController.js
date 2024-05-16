const uuid = require('uuid')
const path = require('path')
const {Item, AmmoInfo, Equipment, Weapon, Containers, Artefacts, Grenades} = require('../models/models')
const ApiError = require('../error/ApiError')

class ItemController {

    async create(req, res, next) {
        try {
            let {name, description, weight, level, typeId, classId, ammo_info, artefacts, equipment, weapon, containers, grenade} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".png"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const item = await Item.create({name, description, weight, level, typeId, classId, img: fileName})

            if (ammo_info) {
                ammo_info = JSON.parse(ammo_info)
                ammo_info.forEach(i => 
                        AmmoInfo.create({
                            type_ammo: i.type_ammo,
                            breaking_throught: i.breaking_throught,
                            damage: i.damage,
                            itemId: item.id
                        })
                )
            }

            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {classId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 15
        let offset = page * limit - limit
        let items;
        if (!classId && !typeId) {
            items = await Item.findAndCountAll({limit, offset})
        }
        if (classId && !typeId) {
            items = await Item.findAndCountAll({where:{classId}, limit, offset})
        }
        if(!classId && typeId) {
            items = await Item.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (classId && typeId) {
            items = await Item.findAndCountAll({where:{classId, typeId}, limit, offset})
        }
        return res.json(items)
    }

    async getOne(req, res) {
        const {id} = req.params
        const item = await Item.findOne(
            {
                where: {id},
                include: [{model: AmmoInfo, as: 'ammo_info'}]
            }
        )
        return res.json(item)
    }
}

module.exports = new ItemController()