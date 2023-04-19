const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/Usuario')
const reseñaRoutes = require('./routes/Reseña')
const peliculaRoutes = require('./routes/Pelicula')
const generoRoutes = require('./routes/Genero')

const app = express()
const port = 3000

app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', reseñaRoutes)
app.use('/api', peliculaRoutes)
app.use('/api', generoRoutes)

//Aqui ira nuestra conexión con la base de datos
mongoose.connect('')

app.get('*', (req, res) => {
  res.status(404).send('Esta página no existe')
})

app.listen(port, () => {
  console.log('Arrancando al aplicación')
})
