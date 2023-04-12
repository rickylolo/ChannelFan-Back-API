const Users = require('./user')

const User = {
  login: async (req, res) => {
    const user = new Users(req.body)
    try {
      const isUser = await Users.findOne({ email: user.email })
      if (!isUser) {
        res.status(403).send('Email o contraseña inválida')
      } else {
        // TODO: Comparar Usuario con el de la base de datos
        if (isMatch) {
          const signed = signToken(isUser._id)
          res.status(200).send(signed)
        } else {
          res.status(403).send('Email o contraseña inválida')
        }
      }
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  //Obtener datos del usuario
  get: async (req, res) => {
    const { id } = req.params
    const user = await Users.findOne({ _id: id })
    res.status(200).send(user)
  },

  list: async (req, res) => {
    const users = await Users.find()
    res.status(200).send(users)
  },

  create: async (req, res) => {
    console.log(req.body)
    const user = new Users(req.body)
    const savedUser = await user.save()
    res.status(201).send(savedUser.id)
  },

  update: async (req, res) => {
    const { id } = req.params
    const user = await Users.findOne({ _id: id })
    Object.assign(user, req.body)
    await user.save()
    res.sendStatus(204)
  },

  destroy: async (req, res) => {
    const { id } = req.params
    const user = await Users.findOne({ _id: id })
    if (user) {
      await user.remove()
    }
    res.sendStatus(204)
  },
}

module.exports = User
