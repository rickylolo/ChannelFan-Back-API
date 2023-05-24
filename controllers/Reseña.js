const Reseñas = require('../models/Reseña')

const Reseña = {
  get: async (req, res) => {
    const { id } = req.params
    const Reseña = await Reseñas.findOne({ _id: id }).populate({ path: 'pelicula', model: 'Pelicula' }).populate({ path: 'usuario', model: 'Usuario' }).exec()
    res.status(200).send(Reseña)
  },

  list: async (req, res) => {
    const Reseña = await Reseñas.find().populate({ path: 'pelicula', model: 'Pelicula' }).populate({ path: 'usuario', model: 'Usuario' }).exec()
    res.status(200).send(Reseña)
  },

  create: async (req, res) => {
    console.log(req.body)
    const Reseña = new Reseñas(req.body)
    const savedReseña = await Reseña.save()
    res.status(201).send(savedReseña.id)
  },

  update: async (req, res) => {
    const { id } = req.params
    const Reseña = await Reseñas.findOne({ _id: id })
    Object.assign(Reseña, req.body)
    await Reseña.save()
    res.sendStatus(204)
  },

  destroy: async (req, res) => {
    const { id } = req.params
    const Reseña = await Reseñas.findOne({ _id: id })
    if (Reseña) {
      await Reseña.deleteOne(Reseña._id)
    }
    res.sendStatus(204)
  },
}

module.exports = Reseña
