const express = require('express')
const router = express.Router()
const reseña = require('../controllers/Reseña')

router.get('/review', reseña.list)
router.get('/review:id', reseña.get)
router.post('/review', reseña.create)
router.put('/review:id', reseña.update)
router.delete('/review:id', reseña.destroy)

module.exports = router
