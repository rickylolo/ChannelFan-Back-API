//Traigo mi modelo de usuario
const Users = require('../models/Usuario')
const Reviews = require('../models/Reseña')

const User = {
  //------------------------ AQUI TENGO TODAS MIS ACCIONES -----------------------
  login: async (req, res) => {
    const user = new Users(req.body) // Pido el body al request (basicamente el body es el JSON que envian)
    try {
      // Busco si hay un usuario que haga match con correo y contraseña
      const isUser = await Users.findOne({
        email: user.email,
        password: user.password,
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

    //Obtener datos de reseñas de un usuario
  getReview: async (req, res) => {
      try{
        const { id } = req.params
        const reviews = await Reviews.find({ usuario: id });
        res.status(200).json({reviews});
      }
      catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Ocurrió un error al obtener las reseñas del usuario' });
      }
  },

  getFavoriteReviews: async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscar el usuario por su ID
      const user = await Users.findById(id);
  
      // Verificar si el usuario no existe
      if (!user) {
        return res.status(404).json({ mensaje: 'El usuario no se encontró' });
      }
  
      // Verificar si el usuario no tiene reseñas favoritas
      if (!user.favoritos || user.favoritos.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron reseñas favoritas para el usuario' });
      }
  
      // Cargar las reseñas favoritas del usuario con la información completa de la película
      await user.populate({ path: 'favoritos', populate: { path: 'pelicula' } });
      const favoriteReviews = user.favoritos.map((review) => {
        const { generos, ...pelicula } = review.pelicula.toObject();
        return {
          ...review.toObject(),
          pelicula,
        };
      });
  
      res.status(200).json({favoriteReviews}); // Devolver las reseñas favoritas
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Ocurrió un error al obtener las reseñas del usuario' });
    }
  },

   //Añadir una reseña a favoritos
   addFavoriteReview: async (req, res) => {
    try {
      const { idUsuario, idReview } = req.body;
  
      // Verificar si el usuario ya tiene el ID de la reseña en la colección de favoritos
      const user = await Users.findById(idUsuario);
      if (user.favoritos.includes(idReview)) {
        return res.status(400).json({ mensaje: 'La reseña ya está en la lista de favoritos' });
      }
  
      // Agregar la ID de la reseña a la colección de favoritos
      user.favoritos.push(idReview);
      await user.save();
  
      res.status(200).json(user); // Devolver el usuario actualizado con la reseña agregada a favoritos
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Ocurrió un error al añadir una reseña a favoritos' });
    }
  },

  list: async (req, res) => {
    const users = await Users.find() //Encontrar todos los usuarios
    res.status(200).json({ users })
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
    const { id } = req.params;
    const user = await Users.findOne({ _id: id });
  
    if (req.body.password === "") {
      // Si el campo de contraseña está vacío, mantén la contraseña actual
      delete req.body.password; // Elimina el campo de contraseña del cuerpo
    }
  
    Object.assign(user, req.body); // Asigna los valores del cuerpo al usuario
    await user.save(); // Guarda los cambios (actualiza los datos)
    res.sendStatus(204);
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
