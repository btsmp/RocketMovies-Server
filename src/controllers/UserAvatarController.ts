import { AppError } from '../utils/AppError'
import { Response } from 'express'
import { User } from "../utils/types"

import { DiskStorage } from '../providers/DiskStorage'

import knex from "../database/knex"


export class UsersAvatarController {
  async update(request: any, response: Response) {
    const user_id = request.user.id
    const avatarFilename = request.file.filename

    const diskStorage = new DiskStorage()

    const user: User = await knex('users').where({ id: user_id }).first()

    if (!user) {
      throw new AppError('Somente usuários autenticados podem mudar a foto do perfil', 401)
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    const urlFile = `http://localhost:3333/files/${filename}`
    user.avatar = urlFile

    await knex('users').update(user).where({ id: user_id })

    response.json(user)
  }
}