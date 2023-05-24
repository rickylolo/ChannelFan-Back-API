const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const PeliculaSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  año: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  generos: [{
    type: Schema.Types.ObjectId,
    ref: "Genero",
    required: true
  }],
  clasificacion: {
    type: String,
    required: true
  },
  sinopsis: {
    type: String,
    required: true
  },
  calificacion: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  duracion: {
    type: String,
    required: true
  },
  fechaEstreno: {
    type: String,
    required: true
  },
});

const Peliculas = mongoose.model('Pelicula', PeliculaSchema);

module.exports = Peliculas
