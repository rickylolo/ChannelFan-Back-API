const express = require('express')
const router = express.Router()

//Traigo mi controlador de usuario para usar las funciones
const user = require('../controllers/Usuario')

//Le asigno al router las acciones y su función a realizar
router.get('/user', user.list)
router.get('/user:id', user.get)
// Reseñas de un usario
router.get('/user:id/review', user.getReview)

router.post('/user/login', user.login)
router.post('/user', user.create)
router.put('/user:id', user.update)
router.delete('/user:id', user.destroy)

module.exports = router
