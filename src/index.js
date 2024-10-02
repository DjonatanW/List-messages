import express from 'express'
import cors from 'cors'

import usersRouter from './routes/users'
import massagesRouter from './routes/massages'

const app = express()

const PORT = 3000

app.use(express.json())
app.use(cors())

app.use('/users', usersRouter)
app.use('/massages', massagesRouter)

app.get('/',(request, response) => {
  return response.status(200).json({
  message: 'Bem vindo à aplicação'
  }) 
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
  
})