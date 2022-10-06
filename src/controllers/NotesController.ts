import { Response } from "express";
import { AppError } from '../utils/AppError'
import { NotesRequest, MovieNotes, Tags } from "../utils/types";

import knex from "../database/knex"

export class NotesController {
  /* 
  Create - POST para poder criar um registro
  Update - PUT para atualizar um registro

  Index - GET para listar varios registros
  Show - GET para exibir um registro especifico
  Delete - DELETE para remover um registro
  */

  async create(request: any, response: Response) {
    const { title, description, rating, tags } = request.body
    const user_id = request.user.id
    console.log(user_id)


    const note_id: MovieNotes = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    })

    const tagsInsert = tags.map((tag: Tags) => {
      return {
        name: tag,
        note_id,
        user_id,
      }
    })

    await knex("tags").insert(tagsInsert)

    response.json({
      message: "nota criada"
    })
  }

  async index(request: any, response: Response) {
    const user_id = request.user.id
    console.log(user_id)

    const notes = await knex("movie_notes").where({ user_id })

    const userTags = await knex("tags").where({ user_id })
    const notesWithTags = notes.map(note => {
      const noteTag = userTags.filter(tag => tag.note_id == note.id)

      return {
        ...note,
        tags: noteTag
      }
    })
    console.log(user_id, notesWithTags)
    return response.json(notesWithTags)

  }

  async show(request: NotesRequest, response: Response) {
    const { id } = request.params

    const movieNotes = await knex('movie_notes').where({ id }).first()

    if (!movieNotes) {
      throw new AppError("Nota não encontrada");
    }

    const tags = await knex("tags").where({ note_id: id }).orderBy('name')

    return response.json({
      ...movieNotes,
      tags
    })

  }

  async delete(request: NotesRequest, response: Response) {
    const { id } = request.params

    await knex("movie_notes").where({ id }).delete()

    return response.json()
  }
}