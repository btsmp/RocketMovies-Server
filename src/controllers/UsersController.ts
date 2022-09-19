import { Request, Response } from 'express';
import { hash, compare } from 'bcrypt'
import knex from "../database/knex"

interface UserInputProps {
  user_id: number
  name: string
  email: string
  password: string
  oldPassword: string
}

interface User {
  id: number
  name: string
  email: string
  password: string
  avatar?: string
  created_at: string
  updated_at: string
}

interface UserBodyRequestProps extends Request {
  body: UserInputProps
}

export class UsersController {
  /* 
Create - POST para poder criar um registro
Update - PUT para atualizar um registro

Index - GET para listar varios registros
Show - GET para exibir um registro especifico
Delete - DELETE para remover um registro
*/

  async create(request: UserBodyRequestProps, response: Response) {
    const { name, email, password } = request.body

    const checkUserExists = await knex("users").where({ email }).first()

    if (checkUserExists) {
      return response.status(400).json({
        message: 'Usuário já cadastrado'
      })
    }


    const hashedPassword = await hash(password, 8)


    await knex('users').insert({ name, email, password: hashedPassword })


    return response.status(201).json({
      message: 'deu tudo certo'
    })


  }

  async update(request: UserBodyRequestProps, response: Response) {
    const { name, email, password, oldPassword } = request.body
    const { user_id } = request.params
    console.log(oldPassword)
    console.log('oi')

    const user: User = await knex('users').where({ id: user_id }).first()

    const userWithUpdatedEmail: User = await knex("users").where({ email }).first()

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      return response.status(401).json({
        message: "E-mail já existente"
      })
    }

    user.name = name ?? user.name
    user.email = email ?? user.email


    if (!oldPassword && password) {
      console.log(oldPassword)
      return response.json({
        message: "Você precisa informar a senha atual para trocar a senha"
      })
    }


    const passwordMatches = await compare(oldPassword, user.password)

    if (!passwordMatches) {
      return response.json({
        message: "senha incorreta"
      })
    }

    user.password = await hash(password, 8)

    await knex('users')
      .where({ id: user_id })
      .update({ password: user.password })


    console.log(user)
    response.json({ user })
  }
}