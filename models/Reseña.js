const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReseñaSchema = new Schema({
  pelicula: {
    type: Schema.Types.ObjectId,
    ref: "Pelicula",
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  calificacion: {
    type: String,
    required: true
  },
  fecha: {
    type: String,
    required: true
  },
});

const Reseña = mongoose.model('Reseña', ReseñaSchema);

module.exports = Reseña;
