const express = require('express')
const router = express.Router()
const reseña = require('../controllers/Reseña')

router.get('/reseña', reseña.list)
router.get('/reseña:id', reseña.get)
router.post('/reseña', reseña.create)
router.put('/reseña:id', reseña.update)
router.delete('/reseña:id', reseña.destroy)

module.exports = router
