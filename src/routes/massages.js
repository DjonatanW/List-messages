import express from 'express'
import {users} from './users'
import { v4 as uuidv4 } from 'uuid'

import { validateMassageCreate } from './../middlewares/validation'

const router = express.Router()

const massages = []


router.post('/massage', validateMassageCreate, async (request, response) =>{

  const { title, description, email } = request.body

  const user = users.find(user => user.email === email)

  if (!user) {
    return response.status(404).json({
      message: 'Email não encontrado, verifique ou crie uma conta.'
    })
  }

  const newMassage = {
    id: uuidv4(),
    title,
    description,
    email
  }

  massages.push(newMassage)

  return response.status(201).json({
    message: `Mensagem criada com sucesso! ${newMassage.description}`

  })

})


router.get('/email', (request, response) => {
  const { email } = request.query

  const user = users.find(user => user.email === email)
  
  if (!user) {
    return response.status(404).json({
      message: 'Email não encontrado, verifique ou crie uma conta.'
    })
  }

  const filterMassages = massages.filter(massage => massage.email === email)

  return response.status(200).json({
    message: ` Seja bem-vindo!` , filterMassages
  })

})


export default router