import { Request, Response } from 'express';
import { hash, compare } from 'bcrypt'
import knex from "../database/knex"

interface CreateUserPropsBody {
  name: string
  email: string
  password: string
}

interface CreateUserPropsBodyRequest extends Request {
  body: CreateUserPropsBody
}

export class UsersController {
  /* 
Create - POST para poder criar um registro
Update - PUT para atualizar um registro

Index - GET para listar varios registros
Show - GET para exibir um registro especifico
Delete - DELETE para remover um registro
*/

  async create(request: CreateUserPropsBodyRequest, response: Response) {
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
}