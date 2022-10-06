import { User } from "../utils/types"
import { AppError } from '../utils/AppError'
import { hash, compare } from 'bcrypt'
import { Response } from 'express'
import { v4 as uuidv4 } from 'uuid';

import knex from "../database/knex"

export class UsersController {
  async create(request: any, response: Response) {
    const { name, email, password } = request.body

    const checkUserExists = await knex("users").where({ email }).first()

    if (checkUserExists) {
      throw new AppError('E-mail já cadastrado')
    }
    const id = uuidv4()
    const hashedPassword = await hash(password, 8)

    await knex('users').insert({
      id,
      name,
      email,
      password: hashedPassword,
      google_user: false
    })


    return response.status(201).json({
      message: 'deu tudo certo'
    })
  }

  async update(request: any, response: Response) {
    const { name, email, password, oldPassword } = request.body
    const user_id = request.user.id

    const user: User = await knex('users').where({ id: user_id }).first()

    const userWithUpdatedEmail: User = await knex("users").where({ email }).first()

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Email já cadastrado')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (!oldPassword && password) {
      console.log(oldPassword)
      throw new AppError("Você precisa informar a senha atual para trocar a senha")
    }

    if (oldPassword && password) {

      const passwordMatches = await compare(oldPassword, user.password)

      if (!passwordMatches) {
        throw new AppError('Senha incorreta')
      }

      user.password = await hash(password, 8)
    }

    await knex('users')
      .where({ id: user_id })
      .update(user)

    response.json({ user })
  }
}