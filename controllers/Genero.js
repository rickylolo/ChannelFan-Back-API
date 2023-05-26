const Generos = require('../models/Genero')
const Peliculas = require('../models/Pelicula')

const Genero = {
  get: async (req, res) => {
    const { id } = req.params
    const Genero = await Generos.findOne({ _id: id }).populate({ path: 'peliculas', model: 'Pelicula' }).exec()
    res.status(200).send(Genero)
  },

  list: async (req, res) => {
    const Genero = await Generos.find().populate({ path: 'peliculas', model: 'Pelicula' }).exec();
  
    // Eliminar la propiedad "generos" de cada objeto "peliculas" en cada objeto "Genero"
    const GeneroSinPropiedad = Genero.map(genero => {
      const peliculasSinGenero = genero.peliculas.map(pelicula => {
        const { generos, ...peliculaSinGenero } = pelicula.toObject();
        return peliculaSinGenero;
      });
  
      return {
        ...genero.toObject(),
        peliculas: peliculasSinGenero
      };
    });
  
    res.status(200).json({ Genero: GeneroSinPropiedad });
  },

  getMovies: async (req, res) => {
    try {
      const { id } = req.params;
      const peliculas = await Peliculas.find({ generos: id });
  
      // Eliminar la propiedad "generos" del resultado
      const peliculasSinGeneros = peliculas.map(pelicula => {
        const { generos, ...peliculaSinGeneros } = pelicula.toObject();
        return peliculaSinGeneros;
      });
  
      res.status(200).json({ peliculas: peliculasSinGeneros });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Ocurrió un error al obtener las peliculas de un genero' });
    }
  }
  ,
  
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
      await Genero.deleteOne(Genero._id)
    }
    res.sendStatus(204)
  },
}

module.exports = Genero
