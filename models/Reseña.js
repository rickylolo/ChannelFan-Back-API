const mongoose = require('mongoose')

const Reseñas = mongoose.model('Reseña', {
  idPelicula: { type: String, required: true },
  idUsuario: { type: String, required: true },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  calificacion: { type: String, required: true },
  fecha: { type: String, required: true },
})

module.exports = Reseñas
