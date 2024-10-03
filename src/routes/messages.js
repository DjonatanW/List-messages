import express, { request, response } from 'express'
import {users} from './users'
import { v4 as uuidv4 } from 'uuid'

import { validateMessageCreate } from '../middlewares/validation'

const router = express.Router()

const messages = []


router.post('/message', validateMessageCreate, (request, response) =>{

  const { title, description, email } = request.body

  const user = users.find(user => user.email === email)

  if (!user) {
    return response.status(404).json({
      message: 'Email não encontrado, verifique ou crie uma conta.'
    })
  }

  const newmessage = {
    id: uuidv4(),
    title,
    description,
    email
  }

  messages.push(newmessage)

  return response.status(201).json({
    message: `Mensagem criada com sucesso! ${newmessage.description}`

  })

})

router.get('/:email', (request, response) => {
  const { email } = request.params

  const user = users.find(user => user.email === email)
  
  if (!user) {
    return response.status(404).json({
      message: 'Email não encontrado, verifique ou crie uma conta.'
    })
  }

  const messagesFilter = messages.filter(message => message.email === email)

  if (messagesFilter.length === 0) {
    return response.status(404).json({
      message: 'Nenhuma mensagem encontrada.'
    })
  }

  return response.status(200).json({
    message: 'Seja bem-vindo!' , 
    messagesFilter
  })

})


router.put('/:id', validateMessageCreate, (request, response) => {
  const { id } = request.params
  const { title, description } = request.body
  
  const message = messages.find(message => message.id === id)

  if (!message) {
    return response.status(404).json({
      message: 'Por favor, informe um id válido da mensagem.'
    })
  }

  message.title = title
  message.description = description

  return response.status(200).json({
    message: 'Mensagem atualizada com sucesso!', message
  })
})


router.delete('/:id', (request, response) => {
  const { id } = request.params

  const messageIndex = messages.findIndex(message => message.id === id)

  if (messageIndex === -1) {
    return response.status(404).json({
      message: 'Mensagem não encontrada, verifique o identificador em nosso banco.'
    })
  }

  const [deletemessage] = messages.splice(messageIndex, 1)

  return response.status(200).json({
    message: 'Mensagem apagada com sucesso'
    })
})

export default router