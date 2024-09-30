import express, { response } from 'express'
import {v4 as uuidv4} from 'uuid'
import bcrypt from 'bcrypt'


const app = express()
app.use(express.json())

const users = []
const massage = []

app.get('/',(request, response) => {
  return response.status(200).json({
  message: 'Bem vindo à aplicação'
  }) 
})


app.post('/signup', async (request, response) => {
  try {
    const {name, email, password} = request.body

    if (!name) {
      return response.status(400).json({
        message: 'Por favor, verifique se passou o nome.' 
      })
    }

    if (!email) {
      return response.status(400).json({
        message: 'Por favor, verifique se passou o email.' 
      })
    }

    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return response.status(400).json({
        message: 'Email já cadastrado, insira outro.'
      })
    }

    if (!password) {
      return response.status(400).json({
        message: 'Por favor, verifique se passou a senha.' 
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword
    }

    users.push(newUser)
    return response.status(201).json({
      message: `Seja bem vindo ${newUser.name}  ! Pessoa usuária registrada com sucesso!`
    })
  } catch(error) {
    response.status(500).json({
      message: `Erro ao registrar o usuário. ${error}`
    })
  }
})

app.post('/login', async (request, response) =>{
  try {
    const {email, password} = request.body

    if (!email) {
      return response.status(400).json({
        message: 'Insira um e-mail válido' 
      })
    }

    if (!password) {
      return response.status(400).json({
        message: 'Insira uma senha válida' 
      })
    }
    const user = users.find(user => user.email === email)

    if (!user) {
      return response.status(404).json({
        message: 'Email não encontrado no sistema, verifique ou crie uma conta'
      })
    }

    const isMath = await bcrypt.compare(password, user.password)

    if (!isMath) {
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

app.post('/massage', async (request, response) =>{

  const {title, description} = request.body

  const newMassage = {
    id: uuidv4(),
    title,
    description
  }

  massage.push(newMassage)

  return response.status(201).json({
    message: `Mensagem criada com sucesso! ${newMassage.description}`

  })

})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
})

