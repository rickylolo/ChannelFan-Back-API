const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeneroSchema = new Schema({
   nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  peliculas: [{
    type: Schema.Types.ObjectId,
    ref: "Pelicula",
    required: true
  }]
});

const Generos = mongoose.model('Genero', GeneroSchema);

module.exports = Generos;

