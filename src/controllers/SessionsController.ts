import { SessionsRequest } from "../utils/types";
import { AppError } from '../utils/AppError';
import { auth } from "../config/auth";
import { sign } from "jsonwebtoken";
import { Response } from "express";
import { compare } from 'bcrypt';

import knex from "../database/knex";

export class SessionsController {
  async create(request: SessionsRequest, response: Response) {
    const { email, password } = request.body

    const user = await knex('users').where({ email }).first()

    if (!user) {
      throw new AppError('Email e/ou senha incorretos', 401)
    }

    if (user.google_user) {
      throw new AppError('Erro ao tentar fazer login')
    }

    const passwordMatches = await compare(password, user.password)


    if (!passwordMatches) {
      throw new AppError('Email e/ou senha incorretos', 401)
    }

    const { secret, expiresIn } = auth.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    return response.json({ user, token })

  }
}