//Traigo mi modelo de usuario
const Users = require('../models/Usuario')

const User = {
  //------------------------ AQUI TENGO TODAS MIS ACCIONES -----------------------
  login: async (req, res) => {
    const user = new Users(req.body) // Pido el body al request (basicamente el body es el JSON que envian)
    try {
      // Busco si hay un usuario que haga match con correo y contraseña
      const isUser = await Users.findOne({
        email: user.email,
        contraseña: user.contraseña,
      })
      if (!isUser) {
        res.status(403).send('Email o contraseña inválida')
      } else {
        res.status(200).send(isUser._id) // Regreso mi usuario
      }
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  //Obtener datos del usuario
  get: async (req, res) => {
    const { id } = req.params
    const user = await Users.findOne({ _id: id }) //Obtener datos con un id
    res.status(200).send(user)
  },

  list: async (req, res) => {
    const users = await Users.find() //Encontrar todos los usuarios
    res.status(200).send(users)
  },

  create: async (req, res) => {
    const user = new Users(req.body)

    const isUser = await Users.findOne({ email: user.email })
    if (isUser) {
      return res.status(403).send('Usuario ya existente') // Validación para no repetir usuario en base de datos
    }
    const savedUser = await user.save() // Guardo al usuario
    res.status(201).send(savedUser.id) // Envio el id de mi usuario
  },

  update: async (req, res) => {
    const { id } = req.params
    const user = await Users.findOne({ _id: id }) //Obtengo mi usuario con el id
    Object.assign(user, req.body) // Le asigno los valores del body a ese usuario
    await user.save() // Lo guardo (se actualizan los datos)
    res.sendStatus(204)
  },

  destroy: async (req, res) => {
    const { id } = req.params
    const user = await Users.findOne({ _id: id })
    if (user) {
      await user.deleteOne({ _id: id })
    }
    res.sendStatus(204)
  },
}

module.exports = User
