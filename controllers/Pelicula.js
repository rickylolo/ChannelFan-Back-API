const Peliculas = require('../models/Pelicula')

const Pelicula = {
  get: async (req, res) => {
    const { id } = req.params
    const Pelicula = await Peliculas.findOne({ _id: id }).populate({ path: 'generos', model: 'Genero' }).exec()
    res.status(200).send(Pelicula)
  },

  list: async (req, res) => {
    const peliculas = await Peliculas.find().populate({ path: 'generos', model: 'Genero' }).exec()
    res.status(200).json({ peliculas })
  },

  create: async (req, res) => {
    console.log(req.body)
    const Pelicula = new Peliculas(req.body)
    const savedPelicula = await Pelicula.save()
    res.status(201).send(savedPelicula.id)
  },

  update: async (req, res) => {
    const { id } = req.params
    const Pelicula = await Peliculas.findOne({ _id: id })
    Object.assign(Pelicula, req.body)
    await Pelicula.save()
    res.sendStatus(204)
  },

  destroy: async (req, res) => {
    const { id } = req.params
    const Pelicula = await Peliculas.findOne({ _id: id })
    if (Pelicula) {
      await Pelicula.deleteOne(Pelicula._id)
    }
    res.sendStatus(204)
  },
}

module.exports = Pelicula
