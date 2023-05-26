const express = require('express')
const router = express.Router()
const genero = require('../controllers/Genero')

router.get('/genero', genero.list)
router.get('/genero:id', genero.get)
// Obtener peliculas de un genero
router.get('/genero:id/pelicula', genero.getMovies)

router.post('/genero', genero.create)
router.put('/genero:id', genero.update)
router.delete('/genero:id', genero.destroy)

module.exports = router
