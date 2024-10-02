import express from 'express'
import cors from 'cors'

import welcomeRouter from './routes/welcome.js'
import usersRouter from './routes/users'
import massagesRouter from './routes/massages'

const app = express()

const PORT = 3000

app.use(express.json())
app.use(cors())

app.use('/', welcomeRouter)
app.use('/users', usersRouter)
app.use('/massages', massagesRouter)


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
  
})