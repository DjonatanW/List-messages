# Aplicação Lista de Recados - BACKEND

Essa aplicação foi construída utilizando `Node.js` e `Express.js`. A aplicação oferece funcionalidades de cadastro e login de usuários, além de permitir a criação, atualização, exclusão e consulta de recados de usuários.

---

## Sumário

- [Funcionalidades-API](#funcionalidades)
  - [Rotas de Usuários](#rotas-de-usuários)
    - [Cadastro de Usuário (Sign Up)](#cadastro-de-usuário-sign-up)
    - [Login de Usuário](#login-de-usuário)
  - [Rotas de recados](#rotas-de-recados)
    - [Criação do Recado](#criação-do-recado)
    - [Atualização do Recado](#atualização-do-recado)
    - [Deletar o Recado](#deletar-o-recado)
    - [Consulta de Recados](#consulta-de-recados)

- [Tecnologias Utilizadas](#tecnologias-utilizadas)

- [Como Executar](#como-executar)

---

## Funcionalidades

### Rotas de Usuários

- link de toda a documentação das rotas
  https://documenter.getpostman.com/view/38729660/2sAXxS8XTN

#### Cadastro de Usuário (Sign Up)

- **Rota**: `POST /users/signup`
- **Descrição**: Permite que novos usuários se cadastrem na aplicação.
- **Parâmetros da Requisição**:
  - `name` (string): Nome do usuário.
  - `email` (string): Email do usuário (deve ser único).
  - `password` (string): Senha do usuário (será criptografada).
- **Exemplo de Requisição**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securePassword123"
  }

#### Login de Usuário

- **Rota**: `POST /users/login`
- **Descrição**: Autentica os usuários cadastrados, permitindo que eles acessem suas mensagens e outras funcionalidades da aplicação.
  
- **Parâmetros da Requisição**:
  - `email` (string): O endereço de email do usuário que deseja fazer login.
  - `password` (string): A senha do usuário.

- **Exemplo de Requisição**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securePassword123"
  }

### Rotas de recados

#### Criação do Recado

- **Rota**: `POST /messages/message`
- **Descrição**: Cria novos recados com um título e descrição, vinculando-os ao usuário autenticado.
  
- **Parâmetros da Requisição**:
  - `title` (string): O título do recado.
  - `description` (string): A descrição do recado.

- **Exemplo de Requisição**:
  ```json
  {
    "title": "Compra de Material",
    "description": "Comprar papel e canetas"
  }

#### Atualização do Recado

- **Rota**: `PUT /messages/:id`
- **Descrição**: Atualiza o título e a descrição de um recado específico, identificado pelo seu ID.
  
- **Parâmetros da Requisição**:
  - `id` (string): O identificador único do recado a ser atualizado.
  - `title` (string, opcional): O novo título do recado.
  - `description` (string, opcional): A nova descrição do recado.

- **Exemplo de Requisição**:
  ```json
  {
    "title": "Atualização de Compra",
    "description": "Comprar papel, canetas e lápis"
  }

#### Deletar o Recado

- **Rota**: `DELETE /messages/:id`
- **Descrição**: Remove um recado específico, identificado pelo seu ID.

- **Parâmetros da Requisição**:
  - `id` (string): O identificador único do recado a ser removido.

- **Exemplo de Requisição**:
  ```http
  DELETE /api/notes/f47ac10b-58cc-4372-a567-0e02b2c3d479

#### Consulta de Recados

- **Rota**: `GET /messages/:email`
- **Descrição**: Consulta todos os recados cadastrados pelo usuário autenticado.

- **Parâmetros da Requisição**:
  - Nenhum.

- **Exemplo de Requisição**:
  ```http
  GET /api/notes
---

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor, permitindo o desenvolvimento de aplicações escaláveis.
- **Express.js**: Framework web minimalista para Node.js, usado para construir APIs e lidar com rotas e requisições de forma simplificada.
- **UUID**: Biblioteca utilizada para gerar identificadores únicos universais (UUIDs), garantindo IDs exclusivos para usuários e mensagens.
- **Bcrypt**: Biblioteca para criptografia de senhas, garantindo que os dados sensíveis sejam armazenados de forma segura.
- **CORS**: Middleware que habilita o **Cross-Origin Resource Sharing**, permitindo que aplicações web façam requisições a servidores em diferentes origens (domínios).
- **Render**: Serviço de hospedagem em nuvem que permite a implantação e o gerenciamento de aplicações web de maneira simples e eficiente.

---


## Como Executar

1. Clone o repositório:
  ```bash
    git clone https://github.com/DjonatanW/List-messages.git
  ```

2. Navegue até o diretório do projeto:
  ```bash
    cd List-messages
  ```

3.Instale as dependências:
  ```bash
    npm install
  ```

4.Inicie o servidor em modo de desenvolvimento:
  ```bash
    npm run dev
  ```













   
