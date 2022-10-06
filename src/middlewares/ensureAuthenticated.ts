import { AppError } from "../utils/AppError";
import { auth } from "../config/auth";
import { verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";

export function ensureAuthenticated(request: any, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError("JWT token não informado", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, auth.jwt.secret)

    if (!user_id) {
      throw new AppError('JWT inválido', 401)
    }

    request.user = {
      id: user_id
    }

    return next()

  } catch {
    throw new AppError('JWT inválido', 401)
  }

}