const Router = require('express')
const router = new Router()
const classController = require('../controllers/classController')

router.post('/', classController.create)
router.get('/', classController.getAll)

module.exports = router