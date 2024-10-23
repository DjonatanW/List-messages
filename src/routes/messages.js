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

router.get('/get/:email', (request, response) => {
  const { email } = request.params

  const { page, perPage } = request.query

  const user = users.find(user => user.email === email)

  if (!user) {
    return response.status(404).json({
      message: 'Usuário não encontrado'
    })
  }

  const currentPage = parseInt(page) || 1
  const itemsPerPage = parseInt(perPage) || 10

  const userNotes = messages.filter(message => message.email === email)

  const totalItems = userNotes.length

  const startIndex = (currentPage -1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const paginatedNotes = userNotes.slice(startIndex, endIndex)

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  response.status(200).json({
    message:paginatedNotes,
    totalPages,
    currentPage
  })

})

router.put('/:id', validateMessageCreate, (request, response) => {
  const { id } = request.params
  const { title, description } = request.body
  
  const messageUpdate = messages.find(message => message.id === id)

  if (!messageUpdate) {
    return response.status(404).json({
      messageUpdate: 'Por favor, informe um id válido da mensagem.'
    })
  }

  messageUpdate.title = title
  messageUpdate.description = description

  return response.status(200).json({
    message: 'Mensagem atualizada com sucesso!',
    messageUpdate
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

router.get('/details/:id', (request, response) => {
  const { id } = request.params

  const note = messages.find(note => note.id === id)

  if (!note) {
    return response.status(404).json({
      message: 'Recado não encontrado.'
    })
  }

  response.status(200).json(note)
})

export default router