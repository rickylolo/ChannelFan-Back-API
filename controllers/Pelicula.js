const Peliculas = require('../models/Pelicula')
const Generos = require('../models/Genero')
const Reviews = require('../models/Reseña')

const Pelicula = {
  get: async (req, res) => {
    const { id } = req.params;
    const Pelicula = await Peliculas.findOne({ _id: id }).populate({ path: 'generos', model: 'Genero' }).exec();
  
    // Modificar la estructura de los datos
    const peliculaSinGeneros = { ...Pelicula.toObject() };
    peliculaSinGeneros.generos.forEach((genero) => {
      delete genero.peliculas;
    });
  
    res.status(200).send(peliculaSinGeneros);
  }
  ,

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

  getReviews: async (req, res) => {
    try {
      const { id } = req.params;
      const reviews = await Reviews.find({ pelicula: id }).populate('usuario', '-pelicula -favoritos');
  
      const reviewsWithoutPelicula = reviews.map((review) => {
        const reviewWithoutPelicula = { ...review.toObject() };
        delete reviewWithoutPelicula.pelicula;
        delete reviewWithoutPelicula.usuario.favoritos;
        return reviewWithoutPelicula;
      });
  
      res.status(200).json({ reviews: reviewsWithoutPelicula });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Ocurrió un error al obtener las reseñas de la película' });
    }
  }
  ,

  create: async (req, res) => {

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
    const { id } = req.params;
  
    // Eliminar la película
    const pelicula = await Peliculas.findOne({ _id: id });
    if (pelicula) {
      await pelicula.deleteOne({ _id: pelicula._id });
    }
  
    // Eliminar la referencia de la película en la colección Genero
    await GeneroSchema.updateMany(
      { peliculas: id },
      { $pull: { peliculas: id } }
    );
  
    // Eliminar las reseñas asociadas a la película
    await ReseñaSchema.deleteMany({ pelicula: id });
  

    res.sendStatus(204);
  },
  
}

module.exports = Pelicula
