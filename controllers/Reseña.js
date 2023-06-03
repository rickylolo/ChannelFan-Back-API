const Reseñas = require('../models/Reseña')
const Users = require('../models/Usuario')

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
    try {
      console.log(req.body)
      const { idPelicula, idUsuario, titulo, calificacion, descripcion,fecha} = req.body;
      
      const reviewData = {
        pelicula: idPelicula,
        usuario: idUsuario,
        titulo, 
        calificacion,
        descripcion,
        fecha
      };
   
      const review = new Reseñas(reviewData);
      const savedReview = await review.save();
      
      res.status(201).send(savedReview.id);
    } catch (error) {
      //console.error(error);
      res.status(500).send( 'Ocurrió un error al crear la reseña' );
    }
  }
  ,

  update: async (req, res) => {
    const { id } = req.params
    const Reseña = await Reseñas.findOne({ _id: id })
    Object.assign(Reseña, req.body)
    await Reseña.save()
    res.sendStatus(204)
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscar la reseña por su ID
      const reseña = await Reseñas.findOne({ _id: id });
  
      if (!reseña) {
        return res.status(404).json({ mensaje: 'La reseña no se encontró' });
      }
  
      // Eliminar la reseña
      await reseña.deleteOne();
  
      // Buscar los usuarios que tienen la reseña en su lista de favoritos
      const users = await Users.find({ favoritos: reseña._id });
  
      // Eliminar la ID de la reseña de la lista de favoritos de los usuarios
      for (const user of users) {
        user.favoritos.pull(reseña._id);
        await user.save();
      }
  
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Ocurrió un error al eliminar la reseña' });
    }
  }
  
}

module.exports = Reseña
