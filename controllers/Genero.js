const Generos = require('../models/Genero')

const Genero = {
  get: async (req, res) => {
    const { id } = req.params
    const Genero = await Generos.findOne({ _id: id })
    res.status(200).send(Genero)
  },

  list: async (req, res) => {
    const Generos = await Generos.find()
    res.status(200).send(Generos)
  },

  create: async (req, res) => {
    console.log(req.body)
    const Genero = new Generos(req.body)
    const savedGenero = await Genero.save()
    res.status(201).send(savedGenero.id)
  },

  update: async (req, res) => {
    const { id } = req.params
    const Genero = await Generos.findOne({ _id: id })
    Object.assign(Genero, req.body)
    await Genero.save()
    res.sendStatus(204)
  },

  destroy: async (req, res) => {
    const { id } = req.params
    const Genero = await Generos.findOne({ _id: id })
    if (Genero) {
      await Genero.remove()
    }
    res.sendStatus(204)
  },
}

module.exports = Genero
