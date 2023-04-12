const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')

const app = express()
const port = 3000

app.use(express.json())
app.use('/api', userRoutes)

//Aqui ira nuestra conexión con la base de datos

mongoose.connect('')

app.get('*', (req, res) => {
  res.status(404).send('Esta página no existe')
})

app.listen(port, () => {
  console.log('Arrancando al aplicación')
})
