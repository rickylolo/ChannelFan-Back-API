const mongoose = require('mongoose')

const Generos = mongoose.model('Reseña', {
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
})

module.exports = Generos
