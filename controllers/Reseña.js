const Reseñas = require('../models/Reseña')

const Reseña = {
  get: async (req, res) => {
    const { id } = req.params
    const Reseña = await Reseñas.findOne({ _id: id })
    res.status(200).send(Reseña)
  },

  list: async (req, res) => {
    const Reseñas = await Reseñas.find()
    res.status(200).send(Reseñas)
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
      await Reseña.remove()
    }
    res.sendStatus(204)
  },
}

module.exports = Reseña
