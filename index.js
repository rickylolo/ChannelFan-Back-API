// Mis modulos de terceros
const express = require('express')
const mongoose = require('mongoose')

// Guardo mis rutas
const userRoutes = require('./routes/Usuario')
const reseñaRoutes = require('./routes/Reseña')
const peliculaRoutes = require('./routes/Pelicula')
const generoRoutes = require('./routes/Genero')

// Creo mi aplicación express
const app = express()

//Especifico el puerto a utilizar
const port = 3000

// Especifico que express use JSON para el body
app.use(express.json())

// Agrego mis rutas para crear los endpoints de las entidades
app.use('/api', userRoutes)
app.use('/api', reseñaRoutes)
app.use('/api', peliculaRoutes)
app.use('/api', generoRoutes)

//Aqui ira nuestra conexión con la base de datos
mongoose.connect('')

// Cualquier otra ruta que no este definida arroja un status 404 page not found
app.get('*', (req, res) => {
  res.status(404).send('Esta página no existe')
})

app.listen(port, () => {
  console.log('Arrancando al aplicación')
})
