//Modulo mongoose
const mongoose = require('mongoose')

// Creo modelo de usuario
const Usuarios = mongoose.model('Usuario', {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  userType: { type: String, required: true },
  fechaRegistro: { type: String, required: true },
})

module.exports = Usuarios
