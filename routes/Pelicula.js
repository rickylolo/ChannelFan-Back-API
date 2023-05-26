const express = require('express')
const router = express.Router()
const pelicula = require('../controllers/Pelicula')

router.get('/pelicula', pelicula.list)
router.get('/pelicula:id', pelicula.get)
// Obtener generos de una pelicula
router.get('/pelicula:id/genero', pelicula.getGenres)
// Obtener reseñas de una pelicula
router.get('/pelicula:id/review', pelicula.getReviews)

router.post('/pelicula', pelicula.create)
router.put('/pelicula:id', pelicula.update)
router.delete('/pelicula:id', pelicula.destroy)

module.exports = router
