const Router = require('express')
const router = new Router()
const userControllers = require('../controllers/userControllers')

router.post('/registration', userControllers.registration)
router.post('/login', userControllers.login)
router.get('/auth', userControllers.check)

module.exports = router