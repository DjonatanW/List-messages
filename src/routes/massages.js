import express, { request, response } from 'express'
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

  const massages = massages.filter(massage => massage.email === email)

  return response.status(200).json({
    message: `Seja bem-vindo!` , massages
  })

})


router.put('/:id', validateMassageCreate, (request, response) => {
  const { id } = request.params
  const { title, description } = request.body

  const massage = massages.find(massage => massage.id === id)

  if (!massage) {
    return response.status(404).json({
      message: ' Por favor, informe um id válido da mensagem.'
    })
  }

  massage.title = title
  massage.description = description

  return response.status(200).json({
    message: `Mensagem atualizada com sucesso!` , massage
  })
})

export default router