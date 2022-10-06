import { AppError } from '../utils/AppError';
import { auth } from "../config/auth";
import { sign } from "jsonwebtoken";
import { Response } from "express";


import knex from "../database/knex";

export class SessionsGoogleController {
  async create(request: any, response: Response) {
    const { email, id, avatar, name } = request.body

    const checkUserExists = await knex('users').where({ email }).first()

    if (!checkUserExists) {
      await knex('users').insert({
        id,
        name,
        email,
        avatar,
        google_user: true
      })
    }

    const user = await knex('users').where({ email }).first()

    const { secret, expiresIn } = auth.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    return response.json({ user, token })

  }
}