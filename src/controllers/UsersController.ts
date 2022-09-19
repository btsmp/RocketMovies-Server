import { UserBodyRequest, User } from "../utils/types"
import { hash, compare } from 'bcrypt'
import { Response } from 'express'

import knex from "../database/knex"

export class UsersController {
  async create(request: UserBodyRequest, response: Response) {
    const { name, email, password } = request.body

    const checkUserExists = await knex("users").where({ email }).first()

    if (checkUserExists) {
      return response.status(400).json({
        message: 'Usuário já cadastrado'
      })
    }

    const hashedPassword = await hash(password, 8)

    await knex('users').insert({
      name,
      email,
      password: hashedPassword
    })


    return response.status(201).json({
      message: 'deu tudo certo'
    })
  }

  async update(request: UserBodyRequest, response: Response) {
    const { name, email, password, oldPassword } = request.body
    const { user_id } = request.params

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

    if (oldPassword && password) {

      const passwordMatches = await compare(oldPassword, user.password)

      if (!passwordMatches) {
        return response.json({
          message: "senha incorreta"
        })
      }

      user.password = await hash(password, 8)
    }

    await knex('users')
      .where({ id: user_id })
      .update(user)

    response.json({ user })
  }
}