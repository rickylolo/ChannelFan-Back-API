const mongoose = require('mongoose')

const Peliculas = mongoose.model('Pelicula', {
  titulo: { type: String, required: true },
  año: { type: String, required: true },
  director: { type: String, required: true },
  idGenero: { type: String, required: true },
  clasificacion: { type: String, required: true },
  sinopsis: { type: String, required: true },
  calificacion: { type: String, required: true },
  imagen: { type: String, required: true },
  duracion: { type: String, required: true },
  fechaEstreno: { type: String, required: true },
})

module.exports = Peliculas
