const Peliculas = require('../models/Pelicula')
const Generos = require('../models/Genero')
const Reviews = require('../models/Reseña')

const Pelicula = {
  get: async (req, res) => {
    const { id } = req.params
    const Pelicula = await Peliculas.findOne({ _id: id }).populate({ path: 'generos', model: 'Genero' }).exec()
    res.status(200).send(Pelicula)
  },

  list: async (req, res) => {
    const peliculas = await Peliculas.find().populate({ path: 'generos', model: 'Genero' }).exec();
  
    // Modificar la estructura de los datos
    const peliculasSinGeneros = peliculas.map((pelicula) => {
      // Clonar el objeto de la película
      const peliculaSinGeneros = { ...pelicula.toObject() };
  
      // Eliminar la propiedad "peliculas" de "generos"
      peliculaSinGeneros.generos.forEach((genero) => {
        delete genero.peliculas;
      });
  
      return peliculaSinGeneros;
    });
  
    res.status(200).json({ peliculas: peliculasSinGeneros });
  },
  

  getGenres: async (req, res) =>{
    try{
      const { id } = req.params
      const generos = await Generos.find({ peliculas: id });
      res.status(200).json({generos});
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Ocurrió un error al obtener los generos de la pelicula' });
    }
  },

  getReviews: async (req, res) =>{
    try{
      const { id } = req.params
      const reviews = await Reviews.find({ pelicula: id });
      res.status(200).json({reviews});
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Ocurrió un error al obtener las reseñas de la pelicula' });
    }
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
