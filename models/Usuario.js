//Modulo mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  favoritos: [{
    type: Schema.Types.ObjectId,
    ref: "Reseña"
  }],
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  userType: { type: String, required: true },
  address: { type: String, required: true }
});

// Creo modelo de usuario
const Usuarios = mongoose.model('Usuario', UserSchema);

module.exports = Usuarios
