import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

import { validateUserRegistration } from './../middlewares/validation'
import { validateUserLogin } from './../middlewares/validation'

const router = express.Router()

// Exportação nomeada
export const users = []

router.post('/signup', validateUserRegistration, async (request, response) => {
  
  try {
    const { name, email, password } = request.body

    const emailAlreadyRegistration = users.find(user => user.email === email)

    if (emailAlreadyRegistration) {
      return response.status(400).json({
        message: 'Email já cadastrado, insira outro.'
      })
    }
   
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      id:uuidv4(),
      name,
      email,
      password: hashedPassword
    }

    users.push(newUser)
  
    
    response.status(201).json({
      message: `Seja bem vindo ${newUser.name}! Pessoa usuária registrada com sucesso! 
                id : ${newUser.id}`
    })
  } catch(error) {
    response.status(500).json({
      message: `Erro ao registrar o usuário. ${error}`
    })
  }
})

router.post('/login', validateUserLogin, async (request, response) => {
  try {
    const {email, password} = request.body
   
    const user = users.find(user => user.email === email)

    if (!user) {
      return response.status(404).json({
        message: 'Email não encontrado no sistema, verifique ou crie uma conta'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return response.status(400).json({
        message: 'Credenciais inválidas'
      })
    }

    return response.status(200).json({
      message: `Seja bem vindo ${user.name}! Pessoa usuária logada com sucesso!`
    })

  } catch(error) {
    response.status(500).json({
      message: `Erro ao registrar Usuário. ${error}`
    })
  }
})

// Exportação deafault
export default router


